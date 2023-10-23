"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Item_1 = require("../components/Item");
var ItemList_1 = require("../components/ItemList");
var ApiContext_1 = require("../contexts/ApiContext");
var GroceryApi_1 = require("../api/GroceryApi");
var CategoryApi_1 = require("../api/CategoryApi");
function Groceries() {
    var api = (0, ApiContext_1.useApiContext)();
    function itemsFunction(item, i) {
        return (0, jsx_runtime_1.jsx)(Item_1.default, { title: item.title, image: item.thumbnail, price: item.price, id: item.id, detailUrl: '/grocery/' }, i);
    }
    return ((0, jsx_runtime_1.jsx)(ItemList_1.default, { title: "Groceries", fetchFunction: GroceryApi_1.fetchGroceries.bind(api), fetchCategories: CategoryApi_1.fetchCategories.bind(api), itemsFunction: itemsFunction }));
}
exports.default = Groceries;
