import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("events", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("user_id").notNullable();
    table.string("title").notNullable();
    table.datetime("event_time").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("devices", (table) => {
    table.uuid("id").primary();
    table.string("user_id").notNullable().unique();
    table.string("push_token").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("events");
  await knex.schema.dropTable("devices");
}
