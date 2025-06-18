const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "";

mongoose
    .connect(MONGO_URI, {})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("Connection error:", err));

const jobSchema = new mongoose.Schema({}, { strict: false });

const Job = mongoose.model("Job", jobSchema);

module.exports = { Job };
