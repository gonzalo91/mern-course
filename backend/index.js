import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv';

dotenv.config();

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

import RestaurantsDAO from './api/dao/restaruantsDAO.js'
import ReviewsDAO from './api/dao/reviewsDAO.js';

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        poolSize: 50,
        wtimeout: 250,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then( async client => {
    await RestaurantsDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)
    app.listen(port, ()=>{
        console.log('Listening on port ' + port)
    })
})