const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const app = express();
const PORT = 5000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Serve Swagger documentation
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Routes setup
require("./endpoints")(app);

// Server setup and start
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} (HTTP)`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
