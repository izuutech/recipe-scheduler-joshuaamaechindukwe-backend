import type { Knex } from "knex";
import knexStringcase from "knex-stringcase";

const config: Knex.Config & Record<string, any> = {
  client: "sqlite3",
  connection: {
    filename: "./data/db.sqlite3",
  },
  useNullAsDefault: true,
  migrations: {
    tableName: "migrations",
    directory: "./migrations",
  },
};

// Type assertion to handle the knex-stringcase expectation
export default knexStringcase(config as Parameters<typeof knexStringcase>[0]);
