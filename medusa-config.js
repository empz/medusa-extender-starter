const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  default:
    ENV_FILE_NAME = ".env";
    break;
}

dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });

const DATABASE_URL = process.env.DATABASE_URL;
const REDIS_URL = process.env.REDIS_URL || "";
const PORT = process.env.PORT || 3000;
const ADMIN_CORS = process.env.ADMIN_CORS || "";
const STORE_CORS = process.env.STORE_CORS || "";

const plugins = [`medusa-fulfillment-manual`, `medusa-payment-manual`];

module.exports = {
  serverConfig: {
    port: PORT,
  },
  projectConfig: {
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,

    database_type: "postgres",
    database_url: DATABASE_URL,
    redis_url: REDIS_URL,

    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,

    cli_migration_dirs: ["dist/**/*.migration.js"],
  },
  monitoring: {
    uriPath: "/monitoring",
  },
  plugins,
};
