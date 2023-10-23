"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProvider = exports.useUserContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var UserHook_1 = require("../hooks/UserHook");
var UserContext = (0, react_1.createContext)(null);
var useUserContext = function () {
    return (0, react_1.useContext)(UserContext);
};
exports.useUserContext = useUserContext;
function UserProvider(_a) {
    var children = _a.children;
    var user = (0, UserHook_1.useUser)()[0];
    return ((0, jsx_runtime_1.jsx)(UserContext.Provider, { value: user, children: children }));
}
exports.UserProvider = UserProvider;
