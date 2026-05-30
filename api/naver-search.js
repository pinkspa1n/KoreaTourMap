export default async function handler(req, res) {
  const { query, lat, lng } = req.query;
  if (!query || !lat || !lng) {
    return res.status(400).json({ error: 'query, lat, lng required' });
  }

  // 키워드 한국어 변환
  let koreanQuery = query;
  try {
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 50,
        messages: [{
          role: 'user',
          content: `Convert this search keyword to Korean for local place search in Korea. Return ONLY the Korean keyword, nothing else. Keyword: "${query}"`
        }]
      })
    });
    const claudeData = await claudeRes.json();
    koreanQuery = claudeData.content?.[0]?.text?.trim() || query;
  } catch (e) {
    koreanQuery = query;
  }

  // 카테고리 코드 매핑
  const categoryMap = {
    '카페': 'CE7', '커피': 'CE7', '약국': 'PM9', '편의점': 'CS2',
    '병원': 'HP8', '주유소': 'OL7', '마트': 'MT1', '음식점': 'FD6',
    '식당': 'FD6', '레스토랑': 'FD6',
  };
  const categoryCode = categoryMap[koreanQuery];
  const url = categoryCode
    ? `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${categoryCode}&x=${lng}&y=${lat}&radius=5000&size=15&sort=distance`
    : `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(koreanQuery)}&x=${lng}&y=${lat}&radius=5000&size=15&sort=distance`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `KakaoAK ${process.env.KAKAO_API_KEY}`,
      }
    });
    const data = await response.json();
    data.documents = (data.documents || []).filter(place => 
  !place.category_name.includes('스터디카페') &&
  !place.category_name.includes('스터디룸') &&
  !place.category_name.includes('공간대여') &&
  (place.category_name.includes('카페') || place.category_name.includes('음식점'))
);
    const items = (data.documents || []).map(place => ({
      title: place.place_name,
      address: place.address_name,
      roadAddress: place.road_address_name,
      mapx: place.x,
      mapy: place.y,
      link: place.place_url,
      category: place.category_name,
    }));

    return res.status(200).json({ items });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}