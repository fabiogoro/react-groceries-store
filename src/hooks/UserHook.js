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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUser = void 0;
var react_1 = require("react");
var CartHook_1 = require("../hooks/CartHook");
var ApiContext_1 = require("../contexts/ApiContext");
var UserApi_1 = require("../api/UserApi");
var useUser = function () {
    var user = new User((0, react_1.useState)(undefined), (0, ApiContext_1.useApiContext)());
    (0, react_1.useEffect)(function () {
        if (!user.data) {
            user.loadUser();
        }
    });
    return [user];
};
exports.useUser = useUser;
var User = /** @class */ (function () {
    function User(_a, api) {
        var data = _a[0], setData = _a[1];
        this.data = data;
        this.setData = setData;
        this.cart = new CartHook_1.Cart(this, api);
        this.api = api;
        this.loaded = false;
    }
    User.prototype.loadUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.setData;
                        return [4 /*yield*/, UserApi_1.fetchUser.bind(this.api)()];
                    case 1:
                        _a.apply(this, [(_b.sent())]);
                        this.loaded = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            var _a;
            return (_a = this.data) === null || _a === void 0 ? void 0 : _a.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "isLoggedIn", {
        get: function () {
            return (this.data === undefined || this.name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "isAdmin", {
        get: function () {
            return (this.data === undefined || this.data.is_admin);
        },
        enumerable: false,
        configurable: true
    });
    User.prototype.logoff = function () {
        var _this = this;
        return function () {
            UserApi_1.postLogoff.bind(_this.api)();
            window.location.replace('/');
        };
    };
    return User;
}());
