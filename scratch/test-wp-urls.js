const fs = require('fs');
const https = require('https');

const content = fs.readFileSync('./data/wordpress-posts.ts', 'utf8');
const urls = [];
const matches = content.matchAll(/"featuredImageUrl":\s*"([^"]+)"/g);
for (const match of matches) {
  urls.push(match[1]);
}

console.log('Total extracted image URLs:', urls.length);

async function testAll() {
  let okCount = 0;
  let failCount = 0;
  for (let url of urls) {
    const httpsUrl = url.replace('http://blog.aravinnovations.com', 'https://blog.aravinnovations.com');
    await new Promise((resolve) => {
      const req = https.request(httpsUrl, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
        if (res.statusCode === 200) {
          okCount++;
        } else {
          console.log('FAILED URL:', httpsUrl, 'Status:', res.statusCode);
          failCount++;
        }
        resolve();
      });
      req.on('error', err => {
        console.log('ERROR URL:', httpsUrl, err.message);
        failCount++;
        resolve();
      });
      req.end();
    });
  }
  console.log(`SUMMARY: 200 OK: ${okCount}, Failed: ${failCount} out of ${urls.length}`);
}

testAll();
