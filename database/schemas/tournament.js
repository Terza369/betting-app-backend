db.createCollection('tournaments', { 
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
                },
                sportId: {
                    bsonType: 'objectId'
                }
            }
        }
    } 
})