const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Tingyu:FDTh3EDG9w5De21f@cluster0.k51rb.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true  });

client.connect((function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { time: "Company Inc", user: "kevin", type: 'Modified', id : 9922233, name: '標準', location:'' };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
  }));
