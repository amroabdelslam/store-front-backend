import app from '../src/app';
import { env } from 'process';
import dotenv from 'dotenv';

dotenv.config();

const port = env.PORT || 80;
// Main route can be accessed without a token
const address = `http://localhost:${port}`;
app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});
