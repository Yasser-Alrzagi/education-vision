import serverless from 'serverless-http';
import { app } from '../src/server/app.js';
import { db } from '../src/server/db.js';

let initialized = false;
const handler = serverless(app);

export default async function (req: any, res: any) {
  if (!initialized) {
    try {
      await db.ensureInitialized();
      initialized = true;
    } catch (err) {
      console.warn('DB initialization warning on Vercel cold start:', err);
    }
  }
  return handler(req, res);
}
