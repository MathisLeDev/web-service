// data-source.ts
import { DataSource } from "typeorm";

export const WebServiceDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: "public",
  logging: false,
  synchronize: true,
  entities: ["src/entities//*.ts", "src/entities//*.js"],
  migrations: ["src/migration//.ts", "src/migration//.js"],
  subscribers: ["src/subscriber/**/.ts", "src/subscriber/**/.js"],
});
