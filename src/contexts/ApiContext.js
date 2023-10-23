"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiProvider = exports.useApiContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var ApiHelper_1 = require("../api/ApiHelper");
var Modal_1 = require("react-bootstrap/Modal");
var Spinner_1 = require("react-bootstrap/Spinner");
var ApiContext = (0, react_1.createContext)(null);
var useApiContext = function () {
    return (0, react_1.useContext)(ApiContext);
};
exports.useApiContext = useApiContext;
function ApiProvider(_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(false), isLoading = _b[0], setIsLoading = _b[1];
    var apiHelper = new ApiHelper_1.ApiHelper(setIsLoading);
    return ((0, jsx_runtime_1.jsxs)(ApiContext.Provider, { value: apiHelper, children: [children, (0, jsx_runtime_1.jsx)(Modal_1.default, { show: isLoading, centered: true, contentClassName: "bg-transparent border-0", className: "d-flex", children: (0, jsx_runtime_1.jsx)(Spinner_1.default, { className: "" }) })] }));
}
exports.ApiProvider = ApiProvider;
