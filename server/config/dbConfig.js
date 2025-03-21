const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect(process.env.mongo_url)

const connection = mongoose.connection;

connection.once('connected', () => {
    console.log('MongoDB connection established successfully');
});
connection.on('error', (err) => {
    console.log('MongoDB connection failed ');
   
}
);