//Developer : Godwin

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://alloygodwin:mobileking1@ds147440.mlab.com:47440/godwin', function (err, client) {
  if (err) throw err;
  var db = client.db('godwin');

  db.collection('category').insertOne(
    {
      title: 'MongoDB',
      text: ' Works Fine'
    },
    function (err, res) {
      if (err) {
        client.close();
        return console.log(err);
      }
	  else
	  {
		  console.log("Inserted Successfully");
	  }
      client.close();
    }
  );
});
