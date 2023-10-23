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
var jsx_runtime_1 = require("react/jsx-runtime");
var ListGroup_1 = require("react-bootstrap/ListGroup");
var react_1 = require("react");
function Filter(_a) {
    var _this = this;
    var clickHandler = _a.clickHandler, fetchFunction = _a.fetchFunction, title = _a.title, values = _a.values;
    var _b = (0, react_1.useState)([]), filter = _b[0], setFilter = _b[1];
    var params = new URLSearchParams(document.location.search);
    var categories = params.get('categories');
    var children = (params.get('children') || '').split(',');
    (0, react_1.useEffect)(function () {
        ;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchFunction()];
                    case 1:
                        results = _a.sent();
                        setFilter(results);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [fetchFunction]);
    function listClick(e) {
        if (e.target.children.length) {
            e.target.children[0].click();
        }
    }
    return ((0, jsx_runtime_1.jsxs)(ListGroup_1.default, { as: "ul", className: "d-flex flex-nowrap", children: [(0, jsx_runtime_1.jsx)(ListGroup_1.default.Item, { variant: "dark", as: "li", active: true, children: title }), filter.length ? (filter.map(function (f, i) {
                return categories && children.includes(f.id.toString()) ? ((0, jsx_runtime_1.jsxs)(ListGroup_1.default.Item, { as: "li", onClick: listClick, active: children[0] === "".concat(f.id), className: children[0] === "".concat(f.id) ? 'order-1' : 'order-2', children: [(0, jsx_runtime_1.jsx)("input", { id: f.name, type: "checkbox", value: f.category_sequence || f.id, defaultChecked: children[0] === "".concat(f.id), childselector: f.children, position: i, onChange: clickHandler, className: "me-2" }), (0, jsx_runtime_1.jsx)("label", { htmlFor: f.name, children: f.name })] }, i)) : !categories && !f.parent_category ? ((0, jsx_runtime_1.jsxs)(ListGroup_1.default.Item, { as: "li", onClick: listClick, children: [(0, jsx_runtime_1.jsx)("input", { id: f.name, type: "checkbox", value: f.category_sequence || f.id, childselector: f.children, defaultChecked: false, position: i, onChange: clickHandler, className: "me-2" }), (0, jsx_runtime_1.jsx)("label", { htmlFor: f.name, children: f.name })] }, i)) : null;
            })) : ((0, jsx_runtime_1.jsx)("p", { children: "Loading..." }))] }));
}
exports.default = Filter;
