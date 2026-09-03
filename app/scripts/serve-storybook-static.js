const fs = require('fs');
const http = require('http');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const staticRoot = path.join(appRoot, 'storybook-static');
const fallbackRoot = path.join(appRoot, 'storybook-static-previous');
const portArgument = process.argv.find(argument => argument.startsWith('--port='));
const port = portArgument ? Number(portArgument.slice('--port='.length)) : 3000;

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`Invalid port: ${port}`);
}
if (!fs.existsSync(path.join(staticRoot, 'index.html'))) {
  throw new Error('Static Storybook is missing. Run node scripts/build-storybook-local.js first.');
}

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer((request, response) => {
  const requestPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const relativePath = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '');
  const requestedFile = path.resolve(staticRoot, relativePath);

  if (!requestedFile.startsWith(`${staticRoot}${path.sep}`)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  const candidates = [
    { generation: 'current', root: staticRoot },
    { generation: 'fallback', root: fallbackRoot },
  ];
  let resolved = null;

  for (const candidate of candidates) {
    const candidatePath = path.resolve(candidate.root, relativePath);
    if (
      candidatePath.startsWith(`${candidate.root}${path.sep}`) &&
      fs.existsSync(candidatePath) &&
      !fs.statSync(candidatePath).isDirectory()
    ) {
      resolved = { ...candidate, filePath: candidatePath };
      break;
    }
  }

  if (!resolved && !path.extname(relativePath)) {
    resolved = {
      generation: 'current',
      root: staticRoot,
      filePath: path.join(staticRoot, 'index.html'),
    };
  }

  if (!resolved) {
    response.writeHead(404, {
      'cache-control': 'no-store',
      'content-type': 'text/plain; charset=utf-8',
    });
    response.end('Not found');
    return;
  }

  response.writeHead(200, {
    'cache-control': 'no-store',
    'content-type':
      mimeTypes[path.extname(resolved.filePath).toLowerCase()] || 'application/octet-stream',
    'x-storybook-static-generation': resolved.generation,
  });
  fs.createReadStream(resolved.filePath).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Static Storybook: http://127.0.0.1:${port}/`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
