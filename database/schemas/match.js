db.createCollection('matches', { 
    validator: { 
        $jsonSchema: {
            bsonType: 'object',
            required:['startTime', 'odds', 'teams', 'sportId', 'tournamentId', 'duration'],
            properties: {
                startTime: {
                    bsonType: 'date'
                },
                odds: {
                    bsonType: 'number'
                },
                teams: {
                    bsonType: 'array',
                    minItems: 1,
                    uniqueItems: true,
                    items: {
                        bsonType: 'string'
                    }
                },
                sportId: {
                    bsonType: 'objectId',
                },
                tournamentId: {
                    bsonType: 'objectId',
                },
                duration: {
                    bsonType: 'int'
                }
            }
        }
    } 
})