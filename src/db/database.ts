import Database from 'better-sqlite3';

const db = new Database('data.bd');

db.exec(`
    CREATE TABLE IF NOT EXISTS servers (
        server_id TEXT PRIMARY KEY,
        channel_id TEXT,
        platforms TEXT,
        genres TEXT,
        language TEXT DEFAULT 'en',
        daily_enabled INTEGER DEFAULT 1
    )
`);

export default db;