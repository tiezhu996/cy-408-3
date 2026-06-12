import path from 'node:path';
import Database from 'better-sqlite3';
import { app } from 'electron';

let db: Database.Database | null = null;

export function getDatabase() {
  if (db) return db;
  const dbPath = path.join(app.getPath('userData'), 'referral-network.db');
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      company TEXT,
      position TEXT,
      email TEXT,
      phone TEXT,
      wechat TEXT,
      relationType TEXT,
      tags TEXT,
      avatar TEXT,
      notes TEXT,
      lastContactAt TEXT
    );
    CREATE TABLE IF NOT EXISTS referrals (
      id TEXT PRIMARY KEY,
      contactId TEXT NOT NULL,
      targetCompany TEXT,
      targetPosition TEXT,
      status TEXT,
      requestDate TEXT,
      resumePath TEXT,
      feedback TEXT
    );
    CREATE TABLE IF NOT EXISTS graph_nodes (
      id TEXT PRIMARY KEY,
      contactId TEXT NOT NULL,
      relatedContactIds TEXT,
      strength INTEGER,
      notes TEXT
    );
    CREATE TABLE IF NOT EXISTS reminders (
      id TEXT PRIMARY KEY,
      contactId TEXT NOT NULL,
      content TEXT,
      remindAt TEXT,
      status TEXT
    );
  `);
  return db;
}
