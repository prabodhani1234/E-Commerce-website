const mongoose =require('mongoose');

const connectDatabase = () => {
    mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: true
            
        })
        .then(console.log("Connected to MongoDB."))
        .catch((err) => console.log(err));
}
module. exports = connectDatabase