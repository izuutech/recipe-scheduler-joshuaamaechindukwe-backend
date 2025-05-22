import fs from "fs/promises";
import path from "path";
import knex from "knex";
import db from "../src/config/database";
import app from "./app";

const PORT = process.env.PORT || 4000;

async function ensureDataDirectory() {
  const dataDir = path.resolve(__dirname, "../data");
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.chmod(dataDir, 0o777); // Full permissions
  } catch (err) {
    console.error("Could not create data directory:", err);
  }
}

async function initializeDatabase() {
  await ensureDataDirectory();

  try {
    await db.raw("SELECT 1"); // Test connection
    await db.migrate.latest();
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
}

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
