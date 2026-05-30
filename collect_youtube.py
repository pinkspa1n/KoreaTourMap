import os
import json
import re
import time
import requests
from googleapiclient.discovery import build
from dotenv import load_dotenv

load_dotenv()

YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')
NAVER_CLIENT_ID = os.getenv('NAVER_CLIENT_ID')
NAVER_CLIENT_SECRET = os.getenv('NAVER_CLIENT_SECRET')
ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')
KAKAO_API_KEY = os.getenv('KAKAO_API_KEY')

def translate_to_english(name, address):
    import re as _re
    prompt = f'Translate to English. Return ONLY JSON with keys nameEn and addressEn.\nName: {name}\nAddress: {address}'
    try:
        res = requests.post(
            'https://api.anthropic.com/v1/messages',
            headers={'Content-Type': 'application/json', 'x-api-key': ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01'},
            json={'model': 'claude-haiku-4-5-20251001', 'max_tokens': 200, 'messages': [{'role': 'user', 'content': prompt}]},
            timeout=30
        )
        text = res.json()['content'][0]['text'].strip()
        match = _re.search(r'\{.*\}', text, _re.DOTALL)
        if match:
            data = json.loads(match.group())
            return data.get('nameEn', name), data.get('addressEn', address)
    except:
        pass
    return name, address

CHANNELS = [
    {
        'name': '재슐랭가이드',
        'id': 'UCzgpOnor-MzT-1iflZil2GQ',
        'type': 'shorts',
        'source': 'description',
        'pattern': r'📍\s*위치\s*[:：]\s*([^\n#]+)',
        'use_claude': False,
    },
    #     'name': '성시경',
    #     'id': 'UCl23-Cci_SMqyGXE1T_LYUg',
    #     'type': 'video',
    #     'source': 'description',
    #     'pattern': r'([가-힣\w\s]+(?:시|구|군)\s+[가-힣\w\s]+(?:로|길|동|가)\s*\d+[^\n]*)',
    #     'use_claude': False,
    # },
    # {
    #     'name': '백년해방',
    #     'id': 'UCSW_W-SE71e9OhZwPEkEDLA',
    #     'type': 'shorts',
    #     'source': 'description',
    #     'pattern': None,
    #     'use_claude': True,
    # },
]

youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

def get_channel_videos(channel_id, video_type='shorts', max_results=500):
    videos = []
    next_page_token = None
    while len(videos) < max_results:
        params = {
            'part': 'id,snippet',
            'channelId': channel_id,
            'maxResults': min(50, max_results - len(videos)),
            'order': 'date',
            'type': 'video',
        }
        if next_page_token:
            params['pageToken'] = next_page_token
        res = youtube.search().list(**params).execute()
        for item in res.get('items', []):
            videos.append({
                'id': item['id']['videoId'],
                'title': item['snippet']['title'],
            })
        next_page_token = res.get('nextPageToken')
        if not next_page_token:
            break
    return videos

def get_video_description(video_id):
    res = youtube.videos().list(part='snippet', id=video_id).execute()
    items = res.get('items', [])
    if items:
        return items[0]['snippet'].get('description', '')
    return ''

def get_pinned_comment(video_id):
    try:
        res = youtube.commentThreads().list(
            part='snippet',
            videoId=video_id,
            order='relevance',
            maxResults=5
        ).execute()
        for item in res.get('items', []):
            text = item['snippet']['topLevelComment']['snippet'].get('textDisplay', '')
            if text.strip():
                return text
    except:
        pass
    return ''

def extract_address(text, pattern):
    if not pattern or not text:
        return None
    matches = re.findall(pattern, text)
    return matches[0].strip() if matches else None

def claude_extract(title, text):
    """Claude Haiku로 맛집 이름+주소 추출. 비용 최소화를 위해 텍스트 500자로 제한."""
    if not text or len(text.strip()) < 5:
        return []
    prompt = f"""유튜브 영상 제목과 설명/댓글에서 맛집 이름과 주소를 추출하세요.
맛집 소개가 아니면 []를 반환하세요.

제목: {title}
내용: {text[:500]}

JSON만 반환 (다른 텍스트 없이):
[{{"name": "맛집이름", "address": "주소 또는 null"}}]"""
    try:
        res = requests.post(
            'https://api.anthropic.com/v1/messages',
            headers={
                'x-api-key': ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json',
            },
            json={
                'model': 'claude-haiku-4-5-20251001',
                'max_tokens': 200,  # 비용 최소화
                'messages': [{'role': 'user', 'content': prompt}]
            },
            timeout=15
        )
        content = res.json()['content'][0]['text'].strip()
        content = re.sub(r'^```json\s*|\s*```$', '', content).strip()
        return json.loads(content)
    except:
        return []

def geocode_address(address):
    """카카오 Geocoding — 무료."""
    url = 'https://dapi.kakao.com/v2/local/search/address.json'
    headers = {'Authorization': f'KakaoAK {KAKAO_API_KEY}'}
    try:
        res = requests.get(url, headers=headers, params={'query': address})
        docs = res.json().get('documents', [])
        if docs:
            return float(docs[0]['y']), float(docs[0]['x'])
    except:
        pass
    return None, None

def search_restaurant_address(name):
    """네이버 로컬 검색으로 주소 보완 — 무료."""
    url = 'https://openapi.naver.com/v1/search/local.json'
    headers = {
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
    }
    try:
        res = requests.get(url, headers=headers, params={'query': name, 'display': 1})
        items = res.json().get('items', [])
        if items:
            addr = items[0].get('roadAddress') or items[0].get('address', '')
            return re.sub('<[^>]+>', '', addr)
    except:
        pass
    return None

def get_place_details(name, address):
    """Google Places API — 유료이므로 꼭 필요한 필드만, 1회만 호출."""
    GOOGLE_API_KEY = os.getenv('GOOGLE_PLACES_API_KEY')
    if not GOOGLE_API_KEY:
        return {}
    try:
        res = requests.post(
            'https://places.googleapis.com/v1/places:searchText',
            headers={
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': GOOGLE_API_KEY,
                # 필요한 필드만 요청 → 비용 최소화
                'X-Goog-FieldMask': 'places.internationalPhoneNumber,places.regularOpeningHours,places.priceLevel',
            },
            json={'textQuery': f'{name} {address}', 'languageCode': 'ko'},
            timeout=10
        )
        places = res.json().get('places', [])
        if not places:
            return {}
        place = places[0]
        price_map = {
            'PRICE_LEVEL_INEXPENSIVE': '₩',
            'PRICE_LEVEL_MODERATE': '₩₩',
            'PRICE_LEVEL_EXPENSIVE': '₩₩₩',
            'PRICE_LEVEL_VERY_EXPENSIVE': '₩₩₩₩',
        }
        weekday = place.get('regularOpeningHours', {}).get('weekdayDescriptions', [])
        return {
            'phone': place.get('internationalPhoneNumber', ''),
            'hours': ' | '.join(weekday) if weekday else '',
            'priceRange': price_map.get(place.get('priceLevel', ''), ''),
        }
    except:
        return {}

def get_region(address):
    if not address:
        return 'other'
    if '서울' in address: return 'seoul'
    if '부산' in address: return 'busan'
    if '제주' in address: return 'jeju'
    if any(k in address for k in ['경기', '수원', '성남', '고양', '용인', '평택', '안양', '부천', '광명', '파주', '의정부', '하남', '오산']):
        return 'gyeonggi'
    if '인천' in address: return 'incheon'
    if '강원' in address: return 'gangwon'
    if any(k in address for k in ['충청', '대전', '충북', '충남', '세종']):
        return 'chungcheong'
    if any(k in address for k in ['전라', '광주', '전북', '전남']):
        return 'jeolla'
    if any(k in address for k in ['경상', '대구', '경북', '경남', '울산']):
        return 'gyeongsang'
    return 'other'

def get_category(name, description):
    text = (name + ' ' + description).lower()
    if any(k in text for k in ['초밥', '스시', '라멘', '우동', '돈카츠', '돈까스', '일식']): return 'japanese'
    if any(k in text for k in ['짜장', '짬뽕', '중식', '마라', '탕수육', '양꼬치']): return 'chinese'
    if any(k in text for k in ['파스타', '피자', '스테이크', '양식', '브런치', '버거', '햄버거']): return 'western'
    if any(k in text for k in ['쌀국수', '팟타이', '동남아', '베트남', '태국']): return 'asian'
    if any(k in text for k in ['케이크', '디저트', '카페', '커피', '아이스크림', '빵', '베이커리', '베이글']): return 'dessert'
    return 'korean'

def load_existing():
    try:
        with open('restaurants.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return []

def save_restaurants(data):
    with open('restaurants.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def process_video(channel, video, existing_addresses):
    vid_id = video['id']
    title = video['title']

    if any(k in title for k in ['월간', '연간', '모음', '광고', 'AD']):
        return None

    if channel['source'] == 'both':
        desc = get_video_description(vid_id)
        text = desc if desc.strip() else get_pinned_comment(vid_id)
    elif channel['source'] == 'description':
        text = get_video_description(vid_id)
    else:
        text = get_pinned_comment(vid_id)

    if not text or not text.strip():
        return None

    # Claude 채널
    if channel.get('use_claude'):
        extracted = claude_extract(title, text)
        results = []
        for item in extracted:
            name = item.get('name', '').strip()
            address = item.get('address') or ''
            if not name:
                continue
            # 주소 불완전하면 네이버로 보완
            if not address or address == 'null' or len(address) < 10:
                address = search_restaurant_address(name) or ''
            if not address:
                continue
            if len(name) > 30:
                continue
            if address in existing_addresses:
                continue
            lat, lng = geocode_address(address)
            if not lat or not lng:
                continue
            # Google Places는 주소가 정확할 때만 호출 (비용 절약)
            details = get_place_details(name, address) if len(address) > 15 else {}
            results.append({'name': name, 'address': address, 'lat': lat, 'lng': lng, 'details': details, 'text': text})
        return results if results else None

    # 패턴 채널 (성시경)
    address = extract_address(text, channel['pattern'])
    if not address:
        return None

    name_match = re.search(r'📍\s*매장명\s*[:：\*]+\s*([^\n📍]+)', text)
    if not name_match:
        bracket_match = re.search(r'^\[([^\]]+)\]', text.strip())
        name = bracket_match.group(1).strip() if bracket_match else address
    else:
        name = name_match.group(1).strip()

    if not name or len(name) > 30 or name == address:
        return None
    if address in existing_addresses:
        return None

    lat, lng = geocode_address(address)
    if not lat or not lng:
        return None
    details = get_place_details(name, address) if len(address) > 15 else {}
    return [{'name': name, 'address': address, 'lat': lat, 'lng': lng, 'details': details, 'text': text}]

def main():
    existing = load_existing()
    existing_addresses = {r.get('address', '').strip() for r in existing}
    next_id = max((r['id'] for r in existing), default=0) + 1
    new_restaurants = []

    for channel in CHANNELS:
        print(f"\n📺 {channel['name']} 처리 중...")
        videos = get_channel_videos(channel['id'], channel['type'])
        print(f"  영상 {len(videos)}개 발견")

        for video in videos:
            try:
                results = process_video(channel, video, existing_addresses)
                if not results:
                    continue
                for r in results:
                    name_en, addr_en = translate_to_english(r['name'], r['address'])
                    restaurant = {
                        'id': next_id,
                        'name': r['name'],
                        'nameEn': name_en,
                        'region': get_region(r['address']),
                        'category': get_category(r['name'], r['text']),
                        'address': addr_en,
                        'description': f"{channel['name']} 영상 출처",
                        'lat': r['lat'],
                        'lng': r['lng'],
                        'rating': 4.0,
                        'phone': r['details'].get('phone', ''),
                        'hours': r['details'].get('hours', ''),
                        'priceRange': r['details'].get('priceRange', ''),
                        'source': channel['name'],
                    }
                    new_restaurants.append(restaurant)
                    existing_addresses.add(r['address'])
                    next_id += 1
                    print(f"  ✅ {r['name']} - {r['address']}")
                time.sleep(0.3)
            except Exception as e:
                print(f"  ⚠️ 오류: {e}")
                continue

    if new_restaurants:
        save_restaurants(existing + new_restaurants)
        print(f"\n🎉 완료! {len(new_restaurants)}개 맛집 추가됨")
    else:
        print("\n새로 추가된 맛집이 없습니다.")

if __name__ == '__main__':
    main()