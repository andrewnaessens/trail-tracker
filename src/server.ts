import Hapi, { Server } from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie";
import Handlebars from "handlebars";

import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import * as jwt from "hapi-auth-jwt2";
import HapiSwagger from "hapi-swagger";
import { fileURLToPath } from "url";
import { webRoutes } from "./web-routes.js";
import { connectDb } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { validate } from "./api/jwt-utils.js";
import { apiRoutes } from "./api-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function importEnvs() {
  const result = dotenv.config();
  if (result.error) {
    console.log(result.error.message);
    // process.exit(1);
  }
}

const swaggerOptions = {
  info: {
    title: "TrailTracker API",
    version: "0.2",
  },
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      name: "Authorization",
      in: "header"
    }
  },
  security: [{ jwt: [] }]
};

async function initPlugins(server: Server) {
  await server.register(Cookie);
  await server.register(jwt);

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
    ]);

  server.validator(Joi);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
    // Font Awesome key from .env
    context: {
      fa: process.env.fa
    },
  });
};

function initSecurityStrategies(server: Server) {
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
  });
  server.auth.default("session");
}

async function init() {
  importEnvs();
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    host: 'localhost',
    routes: { cors: true },
  });
  await initPlugins(server);
  initSecurityStrategies(server);
  connectDb("mongo");
  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

await init();