"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var router = express_1.default.Router();
var posts = [
    {
        username: 'linh',
        title: 'Linh\'s post'
    }, {
        username: 'notLinh',
        title: 'Not Linh\'s post'
    }
];
router.get('/', authenticateToken, function (req, res) {
    res.json(posts.filter(function (p) { return p.username === req.body.username; }));
});
// create a middleware to authorize logged in user 
function authenticateToken(req, res, next) {
    var authHeader = req.headers['authorization'];
    // authHeader = Bearer Token -> get the second element of authHeader after split by a space
    // if there is an authHeader -> get the token | else -> return undefined 
    var token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN, function (err, user) {
        // The callback is called with the decoded payload 
        // if the signature is valid and optional expiration, audience, or issuer are valid. 
        // If not, it will be called with the error.
        // So if token sent but not valid -> return a 'forbidden' status
        if (err)
            return res.sendStatus(403);
        req.body = user;
        next();
    });
}
exports.default = router;
