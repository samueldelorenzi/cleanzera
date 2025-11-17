import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const { Client } = pg;
const SALT_ROUNDS = 12;
const PEPPER = process.env.PASSWORD_PEPPER || 'default-pepper-change-in-production';

async function seedAdmin() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('Connected to database...');

    const email = 'admin@cleanzera.com';
    const password = 'admin123';
    
    const { rows } = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (rows.length > 0) {
      console.log('Admin user already exists');
      return;
    }

    const pepperedPassword = password + PEPPER;
    const hashedPassword = await bcrypt.hash(pepperedPassword, SALT_ROUNDS);

    await client.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, hashedPassword]
    );

    console.log('✓ Admin user created successfully!');
    console.log('  Email:', email);
    console.log('  Password:', password);
    console.log('\n⚠ CHANGE THE PASSWORD IN PRODUCTION!');

  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    await client.end();
  }
}

seedAdmin();
