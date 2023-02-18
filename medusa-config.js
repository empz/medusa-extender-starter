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
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000";
const STORE_CORS = process.env.STORE_CORS || "http://localhost:3000";
const BACKEND_URL = "https://i4hs7o-3000.preview.csb.app";

const Auth0ClientId = process.env.AUTH0_CLIENT_ID || "";
const Auth0ClientSecret = process.env.AUTH0_CLIENT_SECRET || "";
const Auth0Domain = process.env.AUTH0_DOMAIN || "";

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: "medusa-plugin-auth",
    options: {
      auth0: {
        clientID: Auth0ClientId,
        clientSecret: Auth0ClientSecret,
        auth0Domain: Auth0Domain,

        admin: {
          callbackUrl: `${BACKEND_URL}/admin/auth/auth0/cb`,
          failureRedirect: `https://www.google.com/`,

          // The success redirect can be overriden from the client by adding a query param `?redirectTo=your_url`
          // This query param will have the priority over this configuration
          successRedirect: `https://www.google.com/`,

          // authPath: '/admin/auth/auth0',
          // authCallbackPath: '/admin/auth/auth0/cb',
          // expiresIn: 24 * 60 * 60 * 1000,
          // verifyCallback: (container, req, accessToken, refreshToken, extraParams, profile) => {
          // implement your custom verify callback here if you need it
          //    // console.log(container, req, accessToken, refreshToken, extraParams, profile)
          // }
        },

        store: {
          callbackUrl: `${BACKEND_URL}/store/auth/auth0/cb`,
          failureRedirect: `https://www.google.com/`,

          // The success redirect can be overriden from the client by adding a query param `?redirectTo=your_url`
          // This query param will have the priority over this configuration
          successRedirect: `https://www.google.com/`,

          // authPath: '/store/auth/auth0',
          // authCallbackPath: '/store/auth/auth0/cb',
          // expiresIn: 24 * 60 * 60 * 1000,
        },
      },
    },
  },
];

module.exports = {
  serverConfig: {
    port: PORT,
  },
  projectConfig: {
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,

    database_type: "postgres",
    database_url: DATABASE_URL,
    //redis_url: REDIS_URL,

    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,

    cli_migration_dirs: ["dist/**/*.migration.js"],
  },
  monitoring: {
    uriPath: "/monitoring",
  },
  plugins,
};
