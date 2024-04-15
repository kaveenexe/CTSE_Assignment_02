const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./dbConnect");
const { config } = require("dotenv");
const eventRoute = require("./routes/eventRoute");

app.use(cors());
app.use(express.json());

config();
dbConnect();

// Routes
app.use("/api/events", eventRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
