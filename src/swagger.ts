import { Options } from "express-jsdoc-swagger"

const options: Options = {
    info: {
        title: 'App Corrida - API',
        version: "1.0.0",
        description: "Web API for a Racing Application."
    },
    baseDir: __dirname,
    filesPattern: "./**/*.ts",
    swaggerUIPath: "/api-docs",
    exposeSwaggerUI: true,
    exposeApiDocs: false,
    servers: [
        {
            url: "http://localhost:8080/v1",
            description: "Url para test"
        }
    ]
}



export default options;