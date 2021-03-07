db.createCollection('sports', { 
    validator: { 
        $jsonSchema: {
            bsonType: 'object',
            required:['name'],
            properties: {
                name: {
                    bsonType: 'string'
                },
                priority: {
                    bsonType: 'int'
                }
            }
        }
    } 
})