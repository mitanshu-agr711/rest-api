const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
    .then(() => {
        console.log("Connection successful");
    })
    .catch(err => {
        console.error("Error connecting to the database:", err);
    });
