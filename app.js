require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const route = require("./route/route");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node Js API project using mongodb",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:4000/",
      },
    ],
  },
  apis: ["./route/route.js"],
};
const swaggerSpec = swaggerJsDoc(options);

// Middleware
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /check:
 *   get:
 *     summary: Returns a status message
 *     responses:
 *       200:
 *         description: Server running successfully
 */
app.get("/check", (req, res) => {
  res.status(200).json({
    status: "Success",
    code: 200,
    message: "Server running successfully",
  });
});

app.use("", route);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
