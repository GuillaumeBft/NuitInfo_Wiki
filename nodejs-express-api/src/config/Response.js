module.exports.errorResponse = function (message) {
    return { success: false, message: message, size: -1, data: [] };
}

module.exports.invalidApiKeyResponse = function (apiKey) {
    return { success: false, message: apiKey + " is not a valid API Key", size: -1, data: [] };
}

module.exports.pageNotFoundResponse = function () {
    return { success: false, message: "Page not found :(", size: -1, data: [] };
}