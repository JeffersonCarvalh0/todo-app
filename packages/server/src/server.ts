import 'reflect-metadata';
import 'dotenv/config';

import start from './app';

(async () => {
  const port = process.env.PORT || 8000;
  const app = await start();
  app.listen(port);
  console.info(`Listening to http://localhost:${port} 🚀`);
})();
