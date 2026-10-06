import serverless from 'serverless-http';
import { app } from '../../src/server/app.js';
import { db } from '../../src/server/db.js';

const serverlessHandler = serverless(app);

export const handler = async (event: any, context: any) => {
  // Ensure database is initialized from Netlify Blobs / persistent store on cold start
  try {
    await db.ensureInitialized();
  } catch (err) {
    console.error('Failed to initialize DB store in Netlify Function:', err);
  }

  return serverlessHandler(event, context);
};
