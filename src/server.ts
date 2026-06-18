import app from "./app.js";
import config from "./config/config.js";
import connectDB from "./config/database.js";

// Bootstrap: connect to DB then start HTTP server
const startServer = async () => {
  await connectDB();

  app.listen(config.PORT, () => {
    console.log(`Server running on port: ${config.PORT}`);
  });
};

startServer();
