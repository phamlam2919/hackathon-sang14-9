const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const server = express();

//
const usersRoutes = require("./routes/users.routes");
//

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(morgan("dev"));
server.use(cors());
server.use("/api/v1/users", usersRoutes);

server.listen(3000, () => {
    console.log("server is running on http://localhost:3000/");
});
