import { app } from './app.js';

import { config } from './config/index.js';
import { connectDB } from './db/index.js';

async function startServer() {
    try {
        await connectDB();
        app.listen(config.api.port, () => {
            console.log(`Server is running on port ${config.api.port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
}

startServer();