const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const baseUrl = (process.env.ROVNA_UI_STORYBOOK_URL || 'http://localhost:3001').replace(/\/$/, '');
const reportPath = path.join(repoRoot, 'tmp', 'f20-container-runtime-check.json');

async function get(pathname, json = false) {
  const url = `${baseUrl}${pathname}`;
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });

  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }

  return json ? response.json() : response.text();
}

async function main() {
  await get('/');
  await get('/healthz');
  const index = await get('/index.json', true);
  await get('/iframe.html');
  await get('/project.json');

  const entries = Object.values(index.entries || {});
  const stories = entries.filter(entry => entry.type === 'story');
  const docs = entries.filter(entry => entry.type === 'docs');

  if (stories.length !== 938 || docs.length !== 215) {
    throw new Error(
      `Unexpected Storybook index: ${stories.length} stories, ${docs.length} docs`,
    );
  }

  const firstStory = stories[0];
  await get(`/iframe.html?id=${encodeURIComponent(firstStory.id)}&viewMode=story`);

  const report = {
    status: 'passed',
    baseUrl,
    stories: stories.length,
    docs: docs.length,
    totalEntries: entries.length,
    firstStory: firstStory.id,
  };

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
