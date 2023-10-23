"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Col_1 = require("react-bootstrap/Col");
var Form_1 = require("react-bootstrap/Form");
function SortSelector(_a) {
    var onChange = _a.onChange, value = _a.value;
    return ((0, jsx_runtime_1.jsxs)(Col_1.default, { xs: "12", lg: "2", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "sort", className: "text-light", children: "Sort by:" }), (0, jsx_runtime_1.jsxs)(Form_1.default.Select, { value: value, onChange: onChange, id: "sort", "aria-label": "Sort by", children: [(0, jsx_runtime_1.jsx)("option", { value: "title.asc", children: "Alphabetical (A-Z)" }), (0, jsx_runtime_1.jsx)("option", { value: "title.desc", children: "Alphabetical (Z-A)" }), (0, jsx_runtime_1.jsx)("option", { value: "price.asc", children: "Price (Low-High)" }), (0, jsx_runtime_1.jsx)("option", { value: "price.desc", children: "Price (High-Low)" })] })] }));
}
exports.default = SortSelector;
