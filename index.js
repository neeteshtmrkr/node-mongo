const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//starting connection to mongodb server
const url = 'mongodb://localhost:27017/';
const dbname='conFusion';

//accesing server
//connect method allows us to connect to mongoclient from mongo db server
MongoClient.connect(url,(err,client)=>{

    assert.equal(err,null);

    console.log('Connection successful to server');

    const db=client.db(dbname);
    const collection=db.collection('dishes');

    collection.insertOne({"name":"Uthappizza","description":"test"},(err,result)=>{
        assert.equal(err,null);

        console.log('After Insert:\n');
        console.log(result.ops);

        collection.find({}).toArray((err,docs)=>{
            assert.equal(err,null);

            console.log('Found:\n');
            console.log(docs);
            //will return all the documents that match

            db.dropCollection('dishes',(err,result)=>{
                assert.equal(err,null);

                client.close();
            });
        })
    });
});