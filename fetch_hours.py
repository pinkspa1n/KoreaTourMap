import json
import urllib.request
import urllib.parse

KAKAO_KEY = 'def086eeac769c86e668156a7cda3803'
GOOGLE_KEY = 'AIzaSyBWW7QomVK3QkhZcNVCxz2LKJdTVUyq5x8'

DAYS_KO = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일']

def to_ampm(time_str):
    h = int(time_str[:2])
    m = time_str[2:]
    if h == 0:
        return '오전 12:' + m
    elif h < 12:
        return '오전 ' + str(h) + ':' + m
    elif h == 12:
        return '오후 12:' + m
    else:
        return '오후 ' + str(h - 12) + ':' + m

def format_hours(periods):
    day_map = {0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5}
    schedule = {}
    for p in periods:
        day = day_map[p['open']['day']]
        open_fmt = to_ampm(p['open']['time'])
        if 'close' in p:
            close_fmt = to_ampm(p['close']['time'])
            schedule[day] = open_fmt + ' ~ ' + close_fmt
        else:
            schedule[day] = '24시간'
    result = []
    for i, day in enumerate(DAYS_KO):
        if i in schedule:
            result.append(day + ': ' + schedule[i])
        else:
            result.append(day + ': 휴무')
    return ' | '.join(result)

def get_hours_google(name, lat, lng):
    try:
        search_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
        for radius in [100, 500]:
            params = urllib.parse.urlencode({
                'location': str(lat) + ',' + str(lng),
                'radius': radius,
                'keyword': name,
                'language': 'ko',
                'key': GOOGLE_KEY
            })
            req = urllib.request.Request(search_url + params)
            res = json.loads(urllib.request.urlopen(req).read())
            if res.get('results'):
                break
        if not res.get('results'):
            return None
        place_id = res['results'][0]['place_id']
        detail_url = 'https://maps.googleapis.com/maps/api/place/details/json?'
        params3 = urllib.parse.urlencode({
            'place_id': place_id,
            'fields': 'opening_hours',
            'language': 'ko',
            'key': GOOGLE_KEY
        })
        req3 = urllib.request.Request(detail_url + params3)
        res3 = json.loads(urllib.request.urlopen(req3).read())
        periods = res3.get('result', {}).get('opening_hours', {}).get('periods', [])
        if periods:
            return format_hours(periods)
        return None
    except Exception as e:
        print('  Google error: ' + str(e))
        return None

with open('restaurants.json', 'r', encoding='utf-8') as f:
    restaurants = json.load(f)

updated = 0
for r in restaurants:
    if r.get('hours') or not r.get('videoTag'):
        continue
    name = r['name']
    lat = r['lat']
    lng = r['lng']
    print('Processing: ' + name)
    hours = get_hours_google(name, lat, lng)
    if hours:
        r['hours'] = hours
        updated += 1
        print('  OK: ' + hours[:60])
    else:
        print('  No hours found')

with open('restaurants.json', 'w', encoding='utf-8') as f:
    json.dump(restaurants, f, ensure_ascii=False, indent=2)

print('\nDone. Updated ' + str(updated) + ' places.')
