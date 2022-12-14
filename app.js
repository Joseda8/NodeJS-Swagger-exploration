const app = require('express')()
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

http.createServer(app).listen(5000)
console.log("Listening at:// port:%s (HTTP)", 5000)

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

require('./endpoints')(app)

// curl -i -X GET http://localhost:5000/data/all
// curl -i -X POST 'http://localhost:5000/data/add/one?driver=Paul&temperature=18&speed=50'
// curl -i -X GET http://localhost:5000/data/id/0
// curl -i -X POST http://localhost:5000/data/add/many -H "Content-Type: application/json" -d '[{"driver": "Paul", "temperature": 18, "speed": 50}, {"driver": "John", "temperature": 20, "speed": 80}]'
// curl -i -X PUT http://localhost:5000/data/id/0?efficiency=true
// curl -i -X GET http://localhost:5000/data/driver/John
// curl -i -X DELETE http://localhost:5000/data/id/0
