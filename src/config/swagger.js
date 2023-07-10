const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const swaggerDocument = YAML.load(
    path.join(__dirname, "../config/swagger.yaml")
);

const options = {
    swaggerDefinition: {
        info: {
            title: "My API",
            version: "1.0.0",
        },
    },
    apis: ["../routes/*.js"], // Path to the API routes file(s)
};


module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
