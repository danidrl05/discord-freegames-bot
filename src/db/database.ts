import Database from 'better-sqlite3';

const db = new Database('data.bd');

db.exec(`
    CREATE TABLE IF NOT EXISTS servers (
        server_id TEXT PRIMARY KEY,
        channel_id TEXT,
        platforms Text,
        genres Text,
        language TEXT DEFAULT 'en'
    )
`);

export default db;