import app from "./app.js"
import dotenv from "dotenv";
import { env } from "./config/env.js";
import { prisma } from "./config/prisma.js";


async function startServer() {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully");
        const port = env.PORT || 3000;

        app.listen(port, () => {
            console.log(`User Service is running on port ${port}`);
        })

    } catch (err) {
        console.error("Error starting server:", err);
        process.exit(1);
    }
}

startServer();