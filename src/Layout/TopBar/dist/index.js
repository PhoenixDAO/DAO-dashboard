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
        while (_) try {
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
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var ProfileModal_1 = require("User/ProfileModal");
var routes_1 = require("routes");
var logo_png_1 = require("assets/images/logo.png");
var style_module_scss_1 = require("./style.module.scss");
var styles_1 = require("@material-ui/core/styles");
var MoreVert_1 = require("@material-ui/icons/MoreVert");
var react_redux_1 = require("react-redux");
var IconButton_1 = require("@material-ui/core/IconButton");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var Menu_1 = require("@material-ui/core/Menu");
var DAOAttributesActions_1 = require("../../redux/DAOAttributesActions");
var contractsInit_1 = require("../../config/contractsInit");
var authActions_1 = require("redux/authActions");
var useStyles = styles_1.makeStyles(function (theme) {
    var _a, _b, _c;
    return styles_1.createStyles({
        sectionMobile: (_a = {
                display: "flex"
            },
            _a[theme.breakpoints.up("sm")] = {
                display: "none"
            },
            _a["& .MuiSvgIcon-root"] = (_b = {
                    fontSize: "25px"
                },
                _b[theme.breakpoints.down("xs")] = {
                    fontSize: "22px"
                },
                _b),
            _a["& .MuiIconButton-root"] = (_c = {},
                _c[theme.breakpoints.down("xs")] = {
                    paddingLeft: "5px !important",
                    paddingRight: "7px !important"
                },
                _c),
            _a),
        inputRoot: {
            color: "inherit"
        },
        moreButton: {
            "& .MuiSvgIcon-root": {
                fontSize: "18px"
            }
        }
    });
});
// import ContractInit from '../../config/contractsInit'
// import { checkWeb3 } from "../../redux/layoutActions";
// type Props = {
//   isAdmin: boolean;
// };
// export default ({ isAdmin }: Props) => {
//   const [modalOpen, setModalOpen] = React.useState(false);
// return (
//   <>
var TopBar = function (props) {
    var _a = react_1["default"].useState(false), modalOpen = _a[0], setModalOpen = _a[1];
    var classes = useStyles();
    var _b = react_1["default"].useState(null), anchorEl = _b[0], setAnchorEl = _b[1];
    var _c = react_1["default"].useState(null), mobileMoreAnchorEl = _c[0], setMobileMoreAnchorEl = _c[1];
    var mobileMenuId = "primary-search-account-menu-mobile";
    var isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    var handleMobileMenuOpen = function (event) {
        setMobileMoreAnchorEl(event.currentTarget);
        console.log(event.currentTarget);
    };
    var handleMobileMenuClose = function () {
        setMobileMoreAnchorEl(null);
    };
    var handleProfileMenuOpen = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var _d = react_1["default"].useState(props.DAOAttributes), DAOAttributes = _d[0], setDAOAttributes = _d[1];
    react_1.useEffect(function () {
        setDAOAttributes(props.DAOAttributes);
    }, [props.DAOAttributes]);
    // const listenWalletEvent = useCallback(async(props:any)=>{
    //   },[props])
    // useEffect(()=>{
    // setInterval(()=>{
    // window.ethereum.on("accountChanged",()=>{
    // })
    // },1000)
    // },[])
    var _window = window;
    var matchAddressWithAccount = function () { return __awaiter(void 0, void 0, void 0, function () {
        var temp;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, contractsInit_1["default"].init()];
                case 1:
                    temp = _b.sent();
                    console.log("address is", temp.address, " and numioAddress is ", (_a = props.user) === null || _a === void 0 ? void 0 : _a.numioAddress);
                    if (!(!temp.address ||
                        (props.user &&
                            temp.address.toLowerCase() != props.user.numioAddress.toLowerCase()))) return [3 /*break*/, 3];
                    console.log("logging out");
                    return [4 /*yield*/, props.logout()];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        function listenMMAccount() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (typeof _window.ethereum !== "undefined") {
                        _window.ethereum.on("accountsChanged", function (accounts) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log("Xord", accounts);
                                            if (!!accounts[0]) return [3 /*break*/, 2];
                                            return [4 /*yield*/, props.logout()];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 4];
                                        case 2:
                                            if (!(props.user &&
                                                props.user.numioAddress.toLowerCase() != accounts[0].toLowerCase())) return [3 /*break*/, 4];
                                            return [4 /*yield*/, props.logout()];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            });
                        });
                    }
                    return [2 /*return*/];
                });
            });
        }
        matchAddressWithAccount();
        listenMMAccount();
    }, []);
    var renderMobileMenu = (react_1["default"].createElement(Menu_1["default"], { className: classes.moreButton, anchorEl: mobileMoreAnchorEl, anchorOrigin: { vertical: "top", horizontal: "right" }, id: mobileMenuId, keepMounted: true, transformOrigin: { vertical: "top", horizontal: "right" }, open: isMobileMenuOpen, onClose: handleMobileMenuClose },
        react_1["default"].createElement(MenuItem_1["default"], null,
            react_1["default"].createElement("p", { style: { fontWeight: "bold", fontSize: "14px" } },
                " ",
                react_1["default"].createElement("span", null, "DAO contract balance: "),
                react_1["default"].createElement("span", null, DAOAttributes === null || DAOAttributes === void 0 ? void 0 :
                    DAOAttributes.monthlyBudget,
                    " PHNX")))));
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        modalOpen && react_1["default"].createElement(ProfileModal_1["default"], { close: function () { return setModalOpen(false); } }),
        react_1["default"].createElement("div", { className: style_module_scss_1["default"].topBar },
            react_1["default"].createElement("div", { className: style_module_scss_1["default"].topleft },
                react_1["default"].createElement(react_router_dom_1.Link, { className: style_module_scss_1["default"].logo, to: routes_1["default"].root },
                    react_1["default"].createElement("img", { src: logo_png_1["default"], alt: "logo" })),
                props.user && props.user.isAdmin && (react_1["default"].createElement("ul", { className: style_module_scss_1["default"].customlist },
                    react_1["default"].createElement(react_router_dom_1.Link, { style: { textDecoration: "none", backgroundColor: "none" }, to: routes_1["default"].admin },
                        react_1["default"].createElement("li", null, "Admin"))))),
            props.user && props.user.isAdmin ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("div", { className: style_module_scss_1["default"].balance_detail },
                    react_1["default"].createElement("span", null, "DAO contract balance"),
                    react_1["default"].createElement("span", null, DAOAttributes === null || DAOAttributes === void 0 ? void 0 :
                        DAOAttributes.monthlyBudget,
                        " PHNX")),
                react_1["default"].createElement("div", { className: style_module_scss_1["default"].user, onClick: function () { return setModalOpen(true); } },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("div", { className: style_module_scss_1["default"].name },
                            props.user.first_name,
                            " ",
                            props.user.last_name),
                        react_1["default"].createElement("div", { className: style_module_scss_1["default"].email }, props.user.email)),
                    react_1["default"].createElement("div", { className: style_module_scss_1["default"].avatar })),
                react_1["default"].createElement("div", { className: classes.sectionMobile },
                    react_1["default"].createElement(IconButton_1["default"], { "aria-label": "show more", "aria-controls": mobileMenuId, "aria-haspopup": "true", onClick: handleMobileMenuOpen, color: "inherit" },
                        react_1["default"].createElement(MoreVert_1["default"], { className: "moreButton" }))),
                renderMobileMenu)) : props.user ? (react_1["default"].createElement("div", { className: style_module_scss_1["default"].user, onClick: function () { return setModalOpen(true); } },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("div", { className: style_module_scss_1["default"].name },
                        props.user.first_name,
                        " ",
                        props.user.last_name),
                    react_1["default"].createElement("div", { className: style_module_scss_1["default"].email }, props.user.email)),
                react_1["default"].createElement("div", { className: style_module_scss_1["default"].avatar }))) : (""))));
};
var mapStateToProps = function (state) { return ({
    token: state.userDetails.token,
    user: state.userDetails.user,
    balance: state.dashboardReducer.balance,
    address: state.layoutReducer.address,
    DAOAttributes: state.DAOAttributesReducer.DAOAttributes,
    rerender: state.DAOAttributesReducer.rerender
}); };
var mapDispatchToProps = function (dispatch) {
    return {
        getDAOAttributes: function (body) { return dispatch(DAOAttributesActions_1.getDAOAttributes(body)); },
        logout: function () { return dispatch(authActions_1.logout()); }
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(TopBar);
