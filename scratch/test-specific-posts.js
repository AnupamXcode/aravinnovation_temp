const fs = require('fs');
const https = require('https');

const content = fs.readFileSync('./data/wordpress-posts.ts', 'utf8');

// Parse objects
const posts = [];
const blocks = content.split('  {\n    "slug":');
for (let b of blocks) {
  if (!b.includes('"title":')) continue;
  const slugMatch = b.match(/^\s*"([^"]+)"/);
  const titleMatch = b.match(/"title":\s*"([^"]+)"/);
  const imgMatch = b.match(/"featuredImageUrl":\s*"([^"]+)"/);
  if (titleMatch) {
    posts.push({
      slug: slugMatch ? slugMatch[1] : '',
      title: titleMatch[1],
      featuredImageUrl: imgMatch ? imgMatch[1] : null
    });
  }
}

console.log('Parsed posts count:', posts.length);

const targets = [
  "Benefits of Using Chatbots on Your Website",
  "5 Email Marketing Hacks to Boost Your SEO Efforts",
  "Which Google Ads Smart Bidding Strategy Is Right for Your Campaign?"
];

targets.forEach(t => {
  const p = posts.find(x => x.title === t);
  console.log(t, '=>', p ? p.featuredImageUrl : 'NO IMAGE');
  if (p && p.featuredImageUrl) {
    const req = https.request(p.featuredImageUrl, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      console.log('HEAD status for', p.featuredImageUrl, '=>', res.statusCode);
    });
    req.on('error', err => console.log('HEAD ERROR:', err.message));
    req.end();
  }
});
