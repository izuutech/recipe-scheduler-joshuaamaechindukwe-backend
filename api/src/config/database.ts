import config from "./knexfile";
import { knex } from "knex";

// Initialize Knex instance
const db = knex(config);

export default db;
