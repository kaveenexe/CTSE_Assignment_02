const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dbConnect = () => {
  const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.connect(process.env.MONGO_URL, connectionParams);

  // Listens to the MongoDB event "connected"
  mongoose.connection.on("connected", () => {
    console.log("Connected to database successfully");
  });

  // Listens to the MongoDB event "error"
  mongoose.connection.on("error", (err) => {
    console.log("Error while connecting to database:" + err);
  });

  // Listens to the MongoDB event "disconnected"
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection disconnected");
  });
};

module.exports = dbConnect;