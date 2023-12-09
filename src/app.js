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


// curl -i -X GET http://localhost:5000/data/all
// curl -i -X POST 'http://localhost:5000/data/add/one?driver=Paul&temperature=18&speed=50'
// curl -i -X GET http://localhost:5000/data/id/0
// curl -i -X POST http://localhost:5000/data/add/many -H "Content-Type: application/json" -d '[{"driver": "Paul", "temperature": 18, "speed": 50}, {"driver": "John", "temperature": 20, "speed": 80}]'
// curl -i -X PUT http://localhost:5000/data/id/0?efficiency=true
// curl -i -X GET http://localhost:5000/data/driver/John
// curl -i -X DELETE http://localhost:5000/data/id/0
