const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper=require('./operations');

//starting connection to mongodb server
const url = 'mongodb://localhost:27017/';
const dbname='conFusion';

//accesing server
//connect method allows us to connect to mongoclient from mongo db server
MongoClient.connect(url).then((client)=>{
    console.log('Connection successful to server');
    const db=client.db(dbname);
    
    dboper.insertDocument(db,{name: "Vadonut",description:"Test"},'dishes')
    .then((result)=>{

        console.log('Insert Document:\n',result.ops);

        return dboper.findDocument(db,'dishes')
    })
    .then((docs)=>{
        console.log('Found Documents:\n',docs);

        return dboper.updateDocument(db,{name:'Vadonut'},{description:'Updated Test'},'dishes')
    })
    .then((result)=>{

        console.log('Updated Document:\n',result.result);

        return dboper.findDocument(db,'dishes')
    })
    .then((docs)=>{
        console.log('Found Documents:\n',docs);

        return db.dropCollection('dishes')
    })
    .then((result)=>{
        console.log('Dropeed Collection',result);

        client.close();
    })
    .catch((err)=>console.log(err));
                   
})
.catch((err)=>console.log(err));