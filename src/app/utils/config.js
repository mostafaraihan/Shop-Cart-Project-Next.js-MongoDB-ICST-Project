export const getMongoUri = () => {
    return process.env.MONGODB_URI || "mongodb://localhost:27017/products";
};

export const getBaseUrl = () => {
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL;
    return "http://localhost:3000";
};
