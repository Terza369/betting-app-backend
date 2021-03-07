db.tournaments.insertMany([
    {
        name: 'FIFA World Cup',
        priority: NumberInt(1),
        sportId: ObjectId("603e78b2009948626a3defbf")
    },
    {
        name: 'UEFA Champions League',
        priority: NumberInt(2),
        sportId: ObjectId("603e78b2009948626a3defbf")
    },
    {
        name: 'FIBA Basketball World Cup',
        priority: NumberInt(1),
        sportId: ObjectId("603e78b2009948626a3defc0")
    },
    {
        name: 'NBA',
        priority: NumberInt(2),
        sportId: ObjectId("603e78b2009948626a3defc0")
    },
    {
        name: 'Wimbledon',
        priority: NumberInt(1),
        sportId: ObjectId("603e78b2009948626a3defc1")
    },
    {
        name: 'French Open',
        priority: NumberInt(2),
        sportId: ObjectId("603e78b2009948626a3defc1")
    },
])