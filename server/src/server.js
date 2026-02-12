import chalk from "chalk";
import app from "./app.js"
import connectDB from "./lib/db.js";
import ENV from "./lib/env.js"

async function startServer() {
  try {
    await connectDB(); 

    app.listen(ENV.PORT, () => {
      console.log(chalk.bgCyan(`Server running on port ${ENV.PORT}`));
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
