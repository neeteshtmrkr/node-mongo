const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper=require('./operations');

//starting connection to mongodb server
const url = 'mongodb://localhost:27017/';
const dbname='conFusion';

//accesing server
//connect method allows us to connect to mongoclient from mongo db server
MongoClient.connect(url,(err,client)=>{

    assert.equal(err,null);

    console.log('Connection successful to server');

    const db=client.db(dbname);
    
    dboper.insertDocument(db,{name: "Vadonut",description:"Test"},'dishes',(result)=>{

        console.log('Insert Document:\n',result.ops);

        dboper.findDocument(db,'dishes',(docs)=>{
            console.log('Found Documents:\n',docs);

            dboper.updateDocument(db,{name:'Vadonut'},{description:'Updated Test'},'dishes',(result)=>{

                console.log('Updated Document:\n',result.result);

                dboper.findDocument(db,'dishes',(docs)=>{
                    console.log('Found Documents:\n',docs);

                    db.dropCollection('dishes',(result)=>{
                        console.log('Dropeed Collection',result);

                        client.close();
                    });
                })
            })
        })
    });
});