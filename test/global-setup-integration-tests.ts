import { config } from 'dotenv';
// Load .env.integration-test file
config({ path: '.env.integration-test' });

// Changed to default export for Jest global setup
export default async function globalSetup() {}
