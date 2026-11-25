import app from "./app.js"
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { prisma } from "./config/prisma.js";


async function startServer() {
    try {
        await prisma.$connect();
        logger.info("Connected to the database successfully");
        const port = env.PORT || 3000;

        app.listen(port, () => {
            logger.info("User Service is running", { port });
        })

    } catch (err) {
        logger.error("Error starting server", {
            error: err instanceof Error ? err.message : String(err),
            ...(err instanceof Error && err.stack ? { stack: err.stack } : {}),
        });
        process.exit(1);
    }
}

startServer();