const express = require("express");
const path = require("path");
const cors = require("cors");

const { isProduction, API_URL } = require("./environment");
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  if (isProduction) {
    app.enable("trust proxy");
    app.use(function (request, response, next) {
      request.hostname.match("digitalocean") &&
        response.redirect(
          301,
          process.env.REACT_APP_PRODUCTION_APP_HOST_URL + request.path
        );
      !request.secure &&
        response.redirect("https://" + request.headers.host + request.url);
      next();
    });
  }
  const corsOptions = {
    origin: API_URL,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
    credentials: true,
  };
  app.options("*", cors(corsOptions));
  app.use(cors(corsOptions));

  app.use(
    "/api",
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
    })
  );
  if (isProduction) {
    app.use(express.static(path.join(__dirname, "/build")));
    app.get("*", (req, res, next) => {
      res.sendFile(path.join(__dirname + "/build/index.html"));
    });
  }
};
