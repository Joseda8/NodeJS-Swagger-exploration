#!/bin/bash

# Function to prompt user to press Enter
press_enter() {
    echo "Press Enter to continue..."
    read -r
}

# Get all data
curl -i -X GET http://localhost:5000/data/all
press_enter

# Add one data entry
curl -i -X POST 'http://localhost:5000/data/add/one?driver=Paul&temperature=18&speed=50'
press_enter

# Get data by ID
curl -i -X GET http://localhost:5000/data/id/0
press_enter

# Add multiple data entries
curl -i -X POST http://localhost:5000/data/add/many -H "Content-Type: application/json" -d '[{"driver": "Paul", "temperature": 18, "speed": 50}, {"driver": "John", "temperature": 20, "speed": 80}]'
press_enter

# Update data by ID
curl -i -X PUT http://localhost:5000/data/id/0?efficiency=true
press_enter

# Get data by driver
curl -i -X GET http://localhost:5000/data/driver/John
press_enter

# Delete data by ID
curl -i -X DELETE http://localhost:5000/data/id/0
press_enter
