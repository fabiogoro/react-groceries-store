"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Container_1 = require("react-bootstrap/Container");
var Row_1 = require("react-bootstrap/Row");
var Col_1 = require("react-bootstrap/Col");
var Button_1 = require("react-bootstrap/Button");
var Filter_1 = require("../components/Filter");
var SortSelector_1 = require("../components/SortSelector");
var Offcanvas_1 = require("react-bootstrap/Offcanvas");
var SearchHook_1 = require("../hooks/SearchHook");
function ItemList(_a) {
    var title = _a.title, fetchFunction = _a.fetchFunction, fetchCategories = _a.fetchCategories, itemsFunction = _a.itemsFunction;
    var _b = (0, react_1.useState)(false), show = _b[0], setShow = _b[1];
    var search = (0, SearchHook_1.useSearch)(fetchFunction)[0];
    var handleShow = function () { return setShow(true); };
    return ((0, jsx_runtime_1.jsxs)(Container_1.default, { className: "min-vh-100 avoid-footer", fluid: true, children: [(0, jsx_runtime_1.jsxs)(Row_1.default, { className: "text-center m-3", children: [(0, jsx_runtime_1.jsx)(Col_1.default, { xs: { span: 8, offset: 2 }, children: (0, jsx_runtime_1.jsx)("h1", { className: "title", children: title }) }), (0, jsx_runtime_1.jsx)(Col_1.default, { xs: "12", className: "d-lg-none", children: (0, jsx_runtime_1.jsx)(Button_1.default, { variant: "dark", className: "w-100", onClick: handleShow, children: "Filters" }) }), (0, jsx_runtime_1.jsx)(SortSelector_1.default, { onChange: search.changeSorting, value: search.data.sort_by })] }), (0, jsx_runtime_1.jsxs)(Row_1.default, { children: [(0, jsx_runtime_1.jsx)(Col_1.default, { lg: "2", className: "d-none d-lg-block", children: (0, jsx_runtime_1.jsx)(Filter_1.default, { clickHandler: search.changeFilters, fetchFunction: fetchCategories, values: search.data.categories, title: "Categories" }) }), (0, jsx_runtime_1.jsx)(Col_1.default, { lg: "10", children: (0, jsx_runtime_1.jsx)(Row_1.default, { children: search.items !== undefined ? search.items.length > 0 ? search.items.map(itemsFunction) : (0, jsx_runtime_1.jsx)(Col_1.default, { children: "No results! Try another query." }) : (0, jsx_runtime_1.jsx)(Col_1.default, { children: "Loading..." }) }) })] }), (0, jsx_runtime_1.jsxs)(Offcanvas_1.default, { show: show, children: [(0, jsx_runtime_1.jsx)(Offcanvas_1.default.Header, { closeButton: true, children: (0, jsx_runtime_1.jsx)(Offcanvas_1.default.Title, { children: "Filters" }) }), (0, jsx_runtime_1.jsx)(Offcanvas_1.default.Body, { children: (0, jsx_runtime_1.jsx)(Filter_1.default, { clickHandler: search.changeFilters, fetchFunction: fetchCategories, values: search.data.categories, title: "Categories" }) })] })] }));
}
exports.default = ItemList;
