import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('PUBLIC_DATA_API_KEY')
KAKAO_API_KEY = os.getenv('KAKAO_API_KEY')

# 서울 지하철역 좌표 (주요 역)
STATION_COORDS = {
    '서울역': (37.5547, 126.9706),
    '시청': (37.5652, 126.9774),
    '종각': (37.5700, 126.9828),
    '종로3가': (37.5710, 126.9918),
    '동대문': (37.5714, 127.0097),
    '신도림': (37.5087, 126.8913),
    '홍대입구': (37.5572, 126.9240),
    '합정': (37.5497, 126.9143),
    '강남': (37.4979, 127.0276),
    '역삼': (37.5007, 127.0366),
    '선릉': (37.5048, 127.0498),
    '삼성': (37.5088, 127.0633),
    '잠실': (37.5133, 127.1001),
    '건대입구': (37.5404, 127.0699),
    '왕십리': (37.5613, 127.0374),
    '신촌': (37.5553, 126.9368),
    '이대': (37.5566, 126.9462),
    '아현': (37.5555, 126.9568),
    '충정로': (37.5599, 126.9631),
    '을지로입구': (37.5663, 126.9826),
    '을지로3가': (37.5669, 126.9925),
    '을지로4가': (37.5672, 127.0017),
    '동대문역사문화공원': (37.5651, 127.0079),
    '신당': (37.5654, 127.0197),
    '상왕십리': (37.5614, 127.0286),
    '용답': (37.5636, 127.0500),
    '신답': (37.5649, 127.0576),
    '이대역': (37.5566, 126.9462),
    '이수': (37.4866, 126.9815),
    '사당': (37.4765, 126.9816),
    '방배': (37.4813, 126.9979),
    '서초': (37.4836, 127.0116),
    '교대': (37.4934, 127.0137),
    '고속터미널': (37.5051, 127.0047),
    '반포': (37.5043, 127.0062),
    '잠원': (37.5108, 127.0059),
    '신사': (37.5197, 127.0202),
    '압구정': (37.5274, 127.0283),
    '청담': (37.5203, 127.0530),
    '뚝섬': (37.5474, 127.0474),
    '성수': (37.5446, 127.0557),
    '신설동': (37.5741, 127.0233),
    '제기동': (37.5830, 127.0337),
    '청량리': (37.5896, 127.0472),
    '회기': (37.5897, 127.0583),
    '외대앞': (37.5894, 127.0653),
    '망우': (37.5988, 127.0938),
    '양원': (37.6054, 127.1200),
    '구리': (37.5960, 127.1421),
    '도농': (37.6012, 127.1653),
    '양정': (37.6029, 127.1850),
    '덕소': (37.6003, 127.2137),
    '인천': (37.4562, 126.7052),
    '부평': (37.4906, 126.7229),
    '주안': (37.4740, 126.6899),
    '부천': (37.5006, 126.7831),
}

def geocode_station(station_name):
    """카카오 API로 역 좌표 가져오기."""
    try:
        res = requests.get(
            'https://dapi.kakao.com/v2/local/search/keyword.json',
            headers={'Authorization': f'KakaoAK {KAKAO_API_KEY}'},
            params={'query': f'{station_name}역', 'category_group_code': 'SW8', 'size': 1}
        )
        docs = res.json().get('documents', [])
        if docs:
            return float(docs[0]['y']), float(docs[0]['x'])
    except:
        pass
    return None, None

def fetch_all_lockers():
    """물품보관함 전체 데이터 가져오기."""
    all_data = []
    page = 1
    while True:
        res = requests.get(
            'https://api.odcloud.kr/api/15044234/v1/uddi:cc464eaa-5335-4d28-9730-f4456d2a02bf',
            params={'page': page, 'perPage': 100, 'serviceKey': API_KEY}
        )
        data = res.json()
        items = data.get('data', [])
        all_data.extend(items)
        if len(all_data) >= data.get('totalCount', 0):
            break
        page += 1
    return all_data

def main():
    print("물품보관함 데이터 가져오는 중...")
    lockers = fetch_all_lockers()
    print(f"총 {len(lockers)}개 물품보관함 발견")

    # 역별로 그룹화
    stations = {}
    for locker in lockers:
        name = locker.get('보관함명', '')
        # 역 이름 추출 (예: '서울역1~22' -> '서울역')
        station = ''.join([c for c in name if not c.isdigit() and c not in '~-'])
        station = station.strip()
        if station not in stations:
            stations[station] = []
        stations[station].append(locker)

    # 좌표 추가
    result = []
    for station_name, items in stations.items():
        # 미리 정의된 좌표 사용, 없으면 카카오 검색
        lat, lng = STATION_COORDS.get(station_name, (None, None))
        if not lat:
            lat, lng = geocode_station(station_name)

        if lat and lng:
            result.append({
                'name': f'{station_name} 물품보관함',
                'station': station_name,
                'lat': lat,
                'lng': lng,
                'count': sum(len(i) for i in items),
                'details': items[0].get('상세위치', '') if items else '',
                'type': 'locker'
            })
            print(f"  ✅ {station_name} ({lat}, {lng})")
        else:
            print(f"  ❌ {station_name} (좌표 없음)")

    with open('lockers.json', 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f"\n🎉 완료! {len(result)}개 역 물품보관함 데이터 저장됨 → lockers.json")

if __name__ == '__main__':
    main()
