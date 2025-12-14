require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");

const PORT = process.env.PORT || 3000;

async function startServer() {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

if (require.main === module) {
  startServer();
}
