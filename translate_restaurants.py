import json
import requests
import time
import os
from dotenv import load_dotenv
load_dotenv()
ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')


def translate_to_english(name, address):
    prompt = f"""Translate the following Korean restaurant name and address to English.
Return ONLY a JSON object with keys "nameEn" and "addressEn". No explanation.

Name: {name}
Address: {address}

Example output:
{{"nameEn": "Myeongdong Kyoja", "addressEn": "29 Myeongdong 10-gil, Jung-gu, Seoul"}}"""

    try:
        res = requests.post(
            'https://api.anthropic.com/v1/messages',
            headers={
                'Content-Type': 'application/json',
                'x-api-key': ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
            },
            json={
                'model': 'claude-haiku-4-5-20251001',
                'max_tokens': 200,
                'messages': [{'role': 'user', 'content': prompt}]
            },
            timeout=30
        )
        text = res.json()['content'][0]['text'].strip()
        # JSON 파싱
        import re
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            data = json.loads(match.group())
            return data.get('nameEn', name), data.get('addressEn', address)
    except Exception as e:
        print(f'  Error: {e}')
    return name, address

with open('restaurants.json', 'r', encoding='utf-8') as f:
    restaurants = json.load(f)

updated = 0
for r in restaurants:
    # nameEn이 한국어와 같거나 한글 포함된 경우만 번역
    name = r.get('name', '')
    nameEn = r.get('nameEn', '')
    address = r.get('address', '')
    
    # 한글 포함 여부 체크
    has_korean_name = any('\uAC00' <= c <= '\uD7A3' for c in nameEn)
    has_korean_addr = any('\uAC00' <= c <= '\uD7A3' for c in address)
    
    if not has_korean_name and not has_korean_addr:
        continue
    
    print(f'Translating: {name}')
    new_name_en, new_addr_en = translate_to_english(name, address)
    
    if has_korean_name:
        r['nameEn'] = new_name_en
    if has_korean_addr:
        r['address'] = new_addr_en
    
    updated += 1
    print(f'  → {new_name_en} | {new_addr_en}')
    time.sleep(0.3)

with open('restaurants.json', 'w', encoding='utf-8') as f:
    json.dump(restaurants, f, ensure_ascii=False, indent=2)

print(f'\nDone. Updated {updated} restaurants.')
