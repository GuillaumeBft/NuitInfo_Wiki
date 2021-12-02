module.exports.checkApiKey = function(apiKey) {
    const validKey = process.env.API_KEY;
    return apiKey === validKey;
}