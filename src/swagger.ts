import { Options } from "express-jsdoc-swagger";

const options: Options = {
  info: {
    title: "App Corrida - API",
    version: "1.0.0",
    description: "Web API for a Racing Application.",
  },
  security: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
    },
  },
  baseDir: __dirname,
  filesPattern: ["./**/*.ts", "./**/*.js"],
  swaggerUIPath: "/api-docs",
  exposeSwaggerUI: true,
  exposeApiDocs: false,
  servers: [
    {
      url: "http://localhost:8080/v1",
      description: "Url para test",
    },
    {
      url: "https://api-app-corrida.onrender.com",
      description: "Url para produção",
    },
  ],
};

export default options;
