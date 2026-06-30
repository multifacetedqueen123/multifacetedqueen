import fs from 'fs';
import https from 'https';

const url = 'https://unsplash.com/napi/search/photos?query=sewing&per_page=10';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      const urls = json.results.map(r => r.urls.regular);
      console.log(urls.slice(0, 3).join('\n'));
    } catch (e) {
      console.error('Error parsing JSON:', e.message);
    }
  });
}).on('error', err => console.error(err));
