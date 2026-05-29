const mogoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mogoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // अगर डेटाबेस कनेक्ट नहीं हुआ, तो सर्वर को बंद कर दो
  }
};
module.exports = connectDB;
