import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { app } from './src/server/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  // Ensure the app binds to port 3000 (nginx / control-plane-api proxies to port 3000)
  const port = process.env.APP_PORT || (process.env.PORT && process.env.PORT !== '8080' ? process.env.PORT : 3000);
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    // Development mode: intercept stale production hashed assets requested by cached browsers
    // and dynamically mount the live /src/main.tsx entry point without 404 or reload loops
    app.get('/assets/index-*.js', (_req, res) => {
      res.set({
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      });
      res.send(`
        console.info("[DevServer] Connecting live entry point /src/main.tsx...");
        import('/@vite/client');
        import('/src/main.tsx');
      `);
    });

    app.get('/assets/index-*.css', (_req, res) => {
      res.set({
        'Content-Type': 'text/css; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      });
      res.send('/* live tailwind styles loaded by vite */');
    });

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Explicit fallback for all HTML/SPA requests (e.g. /admin, /admin/)
    app.use('*', async (req, res, next) => {
      // Ignore API routes so they don't get swallowed
      if (req.originalUrl.startsWith('/api')) {
        return next();
      }
      try {
        const url = req.originalUrl;
        const indexPath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
