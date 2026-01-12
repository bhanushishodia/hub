// import { Pool } from 'pg';

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'anantya_db',
//   password: '09876', // Aapka bataya hua password
//   port: 5432,
// });

// export default pool;
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Render live database ke liye ye zaroori hai
  },
  connectionTimeoutMillis: 10000, 
});

export default pool;