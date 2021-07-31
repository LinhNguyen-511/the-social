"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var posts_1 = __importDefault(require("./routes/posts"));
var auth_1 = __importDefault(require("./routes/auth"));
// ENVIRONMENT VARIABLES
dotenv_1.default.config({ path: '../.env' });
var MongoURL = process.env.MONGO_URL;
// EXPRESS: create   
var app = express_1.default();
var port = 4000;
//MONGOOSE
mongoose_1.default.connect(MongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, function () {
    console.log('Connected to Mongo');
});
// MIDDLEWARE
// enable ALL cors request
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// set HTTPS headers
app.use(helmet_1.default());
// print out the res of req
app.use(morgan_1.default("common"));
// ROUTES
app.use('/posts', posts_1.default);
app.use('/api/auth', auth_1.default);
try {
    app.listen(port, function () {
        console.log("Connected successfully on port " + port);
    });
}
catch (error) {
    console.error("Error occured: " + error.message);
}
