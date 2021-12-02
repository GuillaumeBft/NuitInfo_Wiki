const http = require("http");
const dotenv = require("dotenv");
dotenv.config();

//Database functions
const { connectDatabase } = require("./config/Database");
//App configuration
const app = require("./config/App");

const server = http.createServer(app);
const port = process.env.port || 3000;

connectDatabase();

server.listen(port);
console.log("API Server listenning on port " + port);