const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./dbConnect");
const { config } = require("dotenv");
const eventRoute = require("./routes/eventRoute");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc"); // Import swagger-jsdoc

app.use(cors());
app.use(express.json());

config();
dbConnect();

// Routes
app.use("/api/events", eventRoute);

// Define Swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EventZing - Event Management App",
      version: "1.0.0",
      description: "API Documentation for Event Management.",
    },
    servers: [
      {
        url: "http://13.60.80.168:5000",
        description: "AWS server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API routes files
};

// Initialize Swagger specs
const swaggerSpecs = swaggerJsdoc(options);

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;