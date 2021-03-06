"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// this file handles both signing in and signing up operations 
var express_1 = __importDefault(require("express"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var User_1 = __importDefault(require("./../models/User"));
// ENVIRONMENT VARIABLES
dotenv_1.default.config({ path: '../.env' });
var router = express_1.default.Router();
// this stores the refreshToken of many users
var refreshTokens = [];
router.post('/token', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken;
    return __generator(this, function (_a) {
        refreshToken = req.body.refreshToken;
        if (refreshToken == null)
            return [2 /*return*/, res.sendStatus(401)];
        if (!refreshTokens.includes(refreshToken))
            return [2 /*return*/, res.sendStatus(403)];
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN, function (err, user) {
            if (err)
                return res.sendStatus(403);
            var accessToken = generateAccessToken({ name: user.username });
            res.json({ accessToken: accessToken });
        });
        return [2 /*return*/];
    });
}); });
// LOGOUT
router.delete('/logout', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // delete the refresh token of this user 
        // TODO: user have to send their refreshToken to this route
        refreshTokens = refreshTokens.filter(function (token) { return token !== req.body.token; });
        res.sendStatus(204);
        return [2 /*return*/];
    });
}); });
// SIGN UP
router.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var salt, hashedPassword, user, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('register');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 2:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, salt)];
            case 3:
                hashedPassword = _a.sent();
                return [4 /*yield*/, new User_1.default({
                        username: req.body.username,
                        email: req.body.email,
                        password: hashedPassword
                    }).save()];
            case 4:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json(user)];
            case 5:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// LOGIN 
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, accessToken, refreshToken, result, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('login');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.default.findOne({ username: req.body.username }).exec()];
            case 2:
                user = _a.sent();
                accessToken = generateAccessToken(user);
                refreshToken = generateRefreshToken(user);
                // TODO: store the refresh token -> should be in a database
                refreshTokens.push(refreshToken);
                return [4 /*yield*/, bcrypt_1.default.compare(req.body.password, user.password)];
            case 3:
                result = _a.sent();
                if (result) {
                    console.log('Correct!');
                    res.json({ accessToken: accessToken, refreshToken: refreshToken });
                }
                else {
                    res.send('Wrong credentials');
                }
                return [3 /*break*/, 5];
            case 4:
                e_2 = _a.sent();
                console.log(e_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign(user.toJSON(), process.env.SECRET_TOKEN, { expiresIn: '30m' });
}
function generateRefreshToken(user) {
    return jsonwebtoken_1.default.sign(user.toJSON(), process.env.REFRESH_TOKEN);
}
exports.default = router;
