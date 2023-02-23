const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'Rezultati';

let main = async () => {


    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    let usersData = [
        {"_id":"ObjectId('63e57dfeff348adbcc3c20f8')", "username": "Ivo123","email":"ivo1@gmail.com","name": "Ivo","password":"5A2EC9C73C7CFC5F7D5166A9BE2E6D7873959D2DAE13B144D460F1C96553629D7F6FE2219FCC5945A61B1BDC8B9723253617C661370085A404E14E9647F63F56"
        },
    ];

    let sportData = [
        { "_id":"ObejctId('63ea82aca7cbdcec49c4fbb0')","name": "Nogomet", "userId":"63e57dfeff348adbcc3c20f8"
        },

    ];

    let leagueData=[
        {
           " _id":"63e63c8673af4636ecaae55e","name":"Premier League","country":"England", "sportId":"63ea82aca7cbdcec49c4fbb0"
        }
    ];

    let clubData=[
        {
            "_id":"63e63fa9fe2eaad44cda1bb3", "name":"FC Chealsea", "leagueId":"63e63c8673af4636ecaae55e", "location":"London"
        },

        {
            "_id":"63e63fa9fe2eaad44cda1bb5", "name":"FC Liverpool", "leagueId":"63e63c8673af4636ecaae55e", "location":"Liverpool"
        }
    ];

    let resultData=[
        {
            "_id": "63ead899fbc845c5d23a9e6e","clubA": "63e63fa9fe2eaad44cda1bb3","clubB": "63e63fa9fe2eaad44cda1bb5","scoreA":1,"scoreB":3,"leagueId":"63e63c8673af4636ecaae55e"
        },
        {
            "_id": "63ead899fbc845c5d23a9e6e","clubA": "63e63fa9fe2eaad44cda1bb5","clubB": "63e63fa9fe2eaad44cda1bb3","scoreA":4,"scoreB":2,"leagueId":"63e63c8673af4636ecaae55e"
        }
    ]



    await db.collection('users').deleteMany({});
    await db.collection('users').insertMany(usersData);
    await db.collection('sports').deleteMany({});
    await db.collection('sports').insertMany(sportData);
    await db.collection('leagues').deleteMany({});
    await db.collection('leagues').insertMany(leaguesData);
    await db.collection('clubs').deleteMany({});
    await db.collection('clubs').insertMany(clubData);
    await db.collection('results').deleteMany({});
    await db.collection('results').insertMany(resultData);




}


main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
