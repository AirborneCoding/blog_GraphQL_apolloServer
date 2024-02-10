const { createClient } = require("redis");


const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

const DEFAULT_EXPIRATION = 3600

// const getDataFromRedisOrAPI = async (cacheKey, apiEndpoint, req, res) => {
//     try {
//         const cachedData = await client.get(cacheKey);

//         if (cachedData !== null) {
//             // res.status(200).json(JSON.parse(cachedData));
//             return JSON.parse(cachedData)
//         } else {
//             const { data } = await axios.get(apiEndpoint);
//             client.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(data));
//             // res.status(200).json(data);
//             return data
//         }
//     } catch (error) {
//         // res.status(500).json({ error: "Internal Server Error" });
//         return { error: "Internal Server Error" }
//     }
// };

const getDataFromRedisOrAPI = async (cacheKey, cb) => {
    try {
        const cachedData = await client.get(cacheKey);

        if (cachedData !== null) {
            // console.log(JSON.parse(cachedData));
            return JSON.parse(cachedData);
        } else {
            const data = await cb();
            client.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(data));
            return data;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data from Redis or API");
    }
};

module.exports = {
    client,
    getDataFromRedisOrAPI
}