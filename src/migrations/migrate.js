import { sequelize } from '../config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
  try {
    const files = fs.readdirSync(__dirname)
      .filter(file => file.endsWith('.js') && file !== 'migrate.js')
      .sort();

    for (const file of files) {
      console.log(`Running migration: ${file}`);
      const fileUrl = new URL(file, import.meta.url).href;
      const migration = await import(fileUrl);
      await migration.up(sequelize.getQueryInterface(), sequelize.Sequelize);
      console.log(`Completed migration: ${file}`);
    }

    console.log('All migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();