import express from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();

  // Use body-parser middleware to parse JSON and URL-encoded bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Use your API routes
  app.all('/api/*', (req, res) => {
    return nextHandler(req, res);
  });

  // Handle all other routes with Next.js
  app.get('*', (req, res) => {
    return nextHandler(req, res);
  });

  // Start the Express server
  const port = process.env.PORT || 3000;
  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  });
});
