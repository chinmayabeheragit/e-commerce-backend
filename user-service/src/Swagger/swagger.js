
const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const serviceBasePath = `/user`;

module.exports = function (app) {
    const swaggerDefinition = {
        swagger: "2.0",
        info: {
            title: "E-commerce USER PANNEL",
            description: "RESTFUL API FOR E-commerce USER SERVICES",
            version: "1.0",
        },
        services: [
            {
                url: `http://${process.env.REMOTE_HOST}:${process.env.PORT}`,
            }
        ],
        produces: ["application/json"],
        host: process.env.HOST_NAME,
        basePath: serviceBasePath,
    };
    const controllerPaths = path.join(__dirname, "../controllers/*.js");
    const routePaths = path.join(__dirname, "../routers/*.js");
    const options = {
        swaggerDefinition: swaggerDefinition,
        explore: true,
        apis: [controllerPaths, routePaths],
    };
    let extraOptions = {
        explorer: true,
        swaggerOptions: {
          validatorUrl: null,
        },
        customSiteTitle: "Swagger - E-commerce USER",
      };
    const swaggerSpec = swaggerJSDoc(options);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec,extraOptions));
    app.get("/swagger.json", function (req, res) {
        res.setHeader("Content-Type", "application/json;charset=utf-8");
        res.send(swaggerSpec,extraOptions);
    });
};