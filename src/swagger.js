const swaggerAutogen = require("swagger-autogen")()

const outputFile = "./swagger_output.json"
const endpointsFiles = ["./src/endpoints.js"]

const doc = {
    info: {
      title: "Sensor data collector API",
      description: "API to gather information for several sensors in a car",
    },
    host: "localhost:5000",
    schemes: ["http"],

    definitions: {
        SensorDataAdd: {
          driver: "Paul",
          temperature: 90,
          speed: 50
        },
        SensorDataAddArray: [{ $ref: "#/definitions/SensorDataAdd" }],

        SensorData: {
            id: 0,
            driver: "Paul",
            temperature: 90,
            speed: 50,
            date: "2022-08-22",
            time: "14:58:40",
            efficient: false,
        },
        SensorDataArray: [{ $ref: "#/definitions/SensorData" }]
      }
  };

swaggerAutogen(outputFile, endpointsFiles, doc)
