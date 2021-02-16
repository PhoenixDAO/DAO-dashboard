"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
require("./index.css");
var Router_1 = require("Router");
var configureStore_1 = require("redux/configureStore");
var appPassword = prompt("App password");
console.log("========>", appPassword);
if (appPassword == process.env.REACT_APP_PASSWORD) {
    react_dom_1["default"].render(react_1["default"].createElement(react_1["default"].StrictMode, null,
        react_1["default"].createElement(Router_1["default"], { store: configureStore_1.store })), document.getElementById("root"));
}
else {
    console.log("Wrong password");
}
