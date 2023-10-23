"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSearch = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var useSearch = function (fetchFunction) {
    var searchParams = (0, react_router_dom_1.useSearchParams)()[0];
    var q = searchParams.get('q') || '';
    var sort_by = searchParams.get('sort_by') || 'title.asc';
    var categories = searchParams.get('categories') || '';
    var search = new Search((0, react_1.useState)({
        page: 1,
        sort_by: sort_by,
        categories: categories,
        q: q
    }), fetchFunction);
    (0, react_1.useEffect)(function () {
        if (search.data.items === undefined) {
            search.newSearch();
        }
    });
    (0, react_1.useEffect)(function () {
        window.addEventListener('scroll', search.handleScroll.bind(search));
        return function () { return window.removeEventListener('scroll', search.handleScroll.bind(search)); };
    });
    return [search];
};
exports.useSearch = useSearch;
var Search = /** @class */ (function () {
    function Search(_a, fetchFunction) {
        var data = _a[0], setData = _a[1];
        this.data = data;
        this.setData = setData;
        this.fetchFunction = fetchFunction;
        this.isLoading = true;
    }
    Search.prototype.changeSorting = function (_a) {
        var value = _a.target.value;
        var params = new URLSearchParams(document.location.search);
        params.set('sort_by', value);
        document.location.replace("/?".concat(params));
    };
    Search.prototype.changeFilters = function (e) {
        var params = new URLSearchParams(document.location.search);
        if (!e.target.checked) {
            params.delete('categories');
            params.delete('children');
        }
        else {
            params.set('categories', e.target.value);
            params.set('children', e.target.getAttribute('childselector'));
        }
        document.location.replace("/?".concat(params));
    };
    Search.prototype.newSearch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 2, 3]);
                        return [4 /*yield*/, this.fetchFunction(this.data)];
                    case 1:
                        results = _a.sent();
                        this.data.items = results.results;
                        this.data.pages = results.pages;
                        this.setData(__assign({}, this.data));
                        return [3 /*break*/, 3];
                    case 2:
                        this.isLoading = false;
                        return [7 /*endfinally*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Search.prototype.addSearchPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 2, 3]);
                        this.isLoading = true;
                        this.data.page++;
                        return [4 /*yield*/, this.fetchFunction(this.data)];
                    case 1:
                        results = _a.sent();
                        this.data.items = __spreadArray(__spreadArray([], this.data.items, true), results.results, true);
                        this.setData(__assign({}, this.data));
                        return [3 /*break*/, 3];
                    case 2:
                        this.isLoading = false;
                        return [7 /*endfinally*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Search.prototype.handleScroll = function () {
        if (window.innerHeight + document.documentElement.scrollTop <
            document.documentElement.offsetHeight - 10 ||
            this.isLoading || this.data.page >= this.data.pages) {
            return;
        }
        this.addSearchPage();
    };
    Object.defineProperty(Search.prototype, "items", {
        get: function () {
            return this.data.items;
        },
        enumerable: false,
        configurable: true
    });
    return Search;
}());
