import { Pool } from 'pg';

const pool = new Pool({
  
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false // Live database ke liye ye zaroori hai
  }
});

export default pool;