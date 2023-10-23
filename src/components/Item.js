"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Col_1 = require("react-bootstrap/Col");
var Card_1 = require("react-bootstrap/Card");
var Button_1 = require("react-bootstrap/Button");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var UserContext_1 = require("../contexts/UserContext");
function Item(_a) {
    var title = _a.title, image = _a.image, price = _a.price, id = _a.id, detailUrl = _a.detailUrl;
    var user = (0, UserContext_1.useUserContext)();
    var item = user.cart.get(id);
    return ((0, jsx_runtime_1.jsx)(Col_1.default, { xs: "12", lg: "3", md: "6", className: "mt-3", children: (0, jsx_runtime_1.jsxs)(Card_1.default, { children: [(0, jsx_runtime_1.jsx)(Card_1.default.Img, { className: "h-100", src: "".concat(image), style: { maxHeight: 120 } }), (0, jsx_runtime_1.jsxs)(Card_1.default.Body, { className: "text-center", children: [(0, jsx_runtime_1.jsx)(Card_1.default.Title, { children: title }), (0, jsx_runtime_1.jsx)(Card_1.default.Title, { children: price }), (0, jsx_runtime_1.jsx)(Card_1.default.Text, { children: (0, jsx_runtime_1.jsx)(Card_1.default.Link, { href: "".concat(detailUrl).concat(id), children: "Read more..." }) }), item ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Button_1.default, { onClick: user.cart.removeCart(id), size: "sm", variant: "dark", children: (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faMinus }) }), ' ', item.quantity, ' ', (0, jsx_runtime_1.jsx)(Button_1.default, { onClick: user.cart.addCart(id), size: "sm", variant: "dark", children: (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faPlus }) })] })) : ((0, jsx_runtime_1.jsxs)(Button_1.default, { onClick: user.cart.addCart(id), variant: "dark", children: [(0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCartPlus }), " Add to cart"] }))] })] }) }));
}
exports.default = Item;
