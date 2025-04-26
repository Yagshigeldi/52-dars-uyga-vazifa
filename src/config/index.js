export const config = {
    api: {
        port: process.env.PORT || 5000
    },
    db: {
        mongoUri: process.env.MONGO_URI
    },
    nodeEnv: process.env.NODE_ENV,
    jwt: {
        access: {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        },
        refresh: {
            secret: process.env.REFRESH_TOKEN_SECRET,
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        }
    }
}