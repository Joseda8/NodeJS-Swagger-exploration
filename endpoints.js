class SensorData {
    constructor (id, driver, temperature, speed, date, time) {
        this.id = id;
        this.driver = driver;
        this.temperature = temperature;
        this.speed = speed;
        this.date = date;
        this.time = time;
        this.efficiency;
    }
}

let sensor_data = []

module.exports = function (app) {
    app.get('/data/all', (req, res) => {
        /* 
            #swagger.tags = ['Data collector']
            #swagger.summary = 'Get all data'
            #swagger.description = 'Get all data from all sensor entries'

            #swagger.responses[200] = {
                schema: { $ref: '#/definitions/SensorDataArray' }
            }
        */
        res.send(sensor_data);
    })

    app.get('/data/id/:id', (req, res) => {
        /* 
            #swagger.tags = ['Data collector']
            #swagger.summary = 'Get data from registry'
            #swagger.description = 'Get data from a given by ID registry'

            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID for the sensor entry',
                required: true,
                type: 'integer'
            }

            #swagger.responses[200] = {
                schema: { $ref: '#/definitions/SensorData' }
            }
        */
        let id = req.params.id;
        let id_element = null;
        sensor_data.forEach(element => {
            if (element.id == id) {
                id_element = element;
            }
        });    
        if (id_element === null){
            res.sendStatus(404);
        } else {
            res.send(id_element);
        }
    })

    app.delete('/data/id/:id', (req, res) => {
        /* 
            #swagger.tags = ['Data collector']
            #swagger.summary = 'Delete given data'
            #swagger.description = 'Delete one data entry given by its ID'

            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID for the sensor entry',
                required: true,
                type: 'integer'
            }
        */
        let id = req.params.id;
        sensor_data.forEach((element, index, object) => {
            if (element.id == id) {
                object.splice(index, 1);
            }
        });
        res.sendStatus(200);
    })

    app.get('/data/driver/:driver', (req, res) => {
        /* 
            #swagger.tags = ['Data collector']
            #swagger.summary = 'Get all data for a given driver'
            #swagger.description = 'Get all data from all sensor entries for a given driver'

            #swagger.parameters['driver'] = {
                in: 'path',
                description: 'Driver name',
                required: true,
                type: 'string'
            }

            #swagger.responses[200] = {
                schema: { $ref: '#/definitions/SensorDataArray' }
            }
        */
        let driver = req.params.driver;
        let data = [];

        sensor_data.forEach(element => {
            if (element.driver === driver) {
                data.push(element);
            }
        });

        if (data.length === 0){
            res.sendStatus(404);
        } else {
            res.send(data);
        }
    })

    app.post('/data/add/one', (req, res) => {
        /* 
            #swagger.tags = ['Data collector']
            #swagger.summary = 'Add new entry'
            #swagger.description = 'Add a new sensor data entry'

            #swagger.parameters['driver'] = {
                in: 'query',
                description: 'Driver name',
                required: true,
                type: 'string'
            }

            #swagger.parameters['temperature'] = {
                in: 'query',
                description: 'Engine temperature',
                required: true,
                type: 'integer'
            }

            #swagger.parameters['speed'] = {
                in: 'query',
                description: 'Car speed',
                required: true,
                type: 'integer'
            }
        */
        var datetime = new Date();    
        var date = datetime.toISOString().slice(0,10);
        var time = datetime.toISOString().slice(11,19);
        var driver = req.query.driver;
        var temperature = parseInt(req.query.temperature);
        var speed = parseInt(req.query.speed);

        if (isNaN(temperature) || isNaN(speed)) {
            res.sendStatus(422);
            return;
        }

        var data_sensor = new SensorData(sensor_data.length, driver, temperature, speed, date, time);
        sensor_data.push(data_sensor);
        
        res.sendStatus(201);
    })

    app.post('/data/add/many', (req, res) => {
        /* 
            #swagger.tags = ['Data collector']
            #swagger.summary = 'Add many new entries'
            #swagger.description = 'Add an array of new sensor data entries'

            #swagger.parameters['entries'] = {
                in: 'body',
                description: 'Entries to add',
                required: true,
                schema: { $ref: '#/definitions/SensorDataArray' }
            }
        */
        var datetime = new Date();    
        var date = datetime.toISOString().slice(0,10);
        var time = datetime.toISOString().slice(11,19);
        var data = req.body;

        var driver = null;
        var temperature = null;

        data.forEach(element => {
            driver = element.driver;
            temperature = element.temperature;
            if (isNaN(temperature)) {
                res.sendStatus(422);
                return
            }
        
            var data_sensor = new SensorData(sensor_data.length, driver, temperature, date, time);
            sensor_data.push(data_sensor);
        });
        
        res.sendStatus(200);
    })

    app.put('/set/efficiency/id/:id', (req, res) => {
        /* 
            #swagger.tags = ['Efficiency']
            #swagger.summary = 'Set the efficiency value for a given entry'
            #swagger.description = 'Set the efficiency value for a given by ID entry'

            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID for the sensor entry',
                required: true,
                type: 'integer'
            }

            #swagger.parameters['efficiency'] = {
                in: 'query',
                description: 'Efficient value',
                required: true,
                type: 'boolean'
            }
        */
        let id = req.params.id;
        var efficiency = req.query.efficiency;
        let id_element = null;

        sensor_data.forEach(element => {
            if (element.id == id) {
                id_element = element;
            }
        });
        if (id_element === null){
            res.sendStatus(404);
        } else {
            id_element.efficiency = efficiency;
            res.sendStatus(200);
        }
    })
}
