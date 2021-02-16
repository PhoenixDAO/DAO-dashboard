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
var Alert_1 = require("@material-ui/lab/Alert");
var react_1 = require("react");
var Modal_1 = require("Shared/Modal");
var style_module_scss_1 = require("./style.module.scss");
var Button_1 = require("Shared/Button");
var axios_1 = require("axios");
var react_redux_1 = require("react-redux");
// import Web3 from "web3";
var web3_1 = require("web3");
var const_1 = require("../../const");
var contractsInit_1 = require("../../config/contractsInit");
var Accordion_1 = require("@material-ui/core/Accordion");
var AccordionSummary_1 = require("@material-ui/core/AccordionSummary");
var AccordionDetails_1 = require("@material-ui/core/AccordionDetails");
var ExpandMore_1 = require("@material-ui/icons/ExpandMore");
var DeleteOutline_1 = require("@material-ui/icons/DeleteOutline");
var Tooltip_1 = require("@material-ui/core/Tooltip");
var styles_1 = require("@material-ui/core/styles");
var Check_1 = require("@material-ui/icons/Check");
var contentConstants_1 = require("../../api/countries/contentConstants");
var const_2 = require("../../const");
var core_1 = require("@material-ui/core");
var TextField_1 = require("@material-ui/core/TextField");
var styles_2 = require("@material-ui/core/styles");
var classnames_1 = require("classnames");
var Dialog_1 = require("@material-ui/core/Dialog");
var DialogActions_1 = require("@material-ui/core/DialogActions");
var DialogContent_1 = require("@material-ui/core/DialogContent");
var DialogContentText_1 = require("@material-ui/core/DialogContentText");
var DialogTitle_1 = require("@material-ui/core/DialogTitle");
var Slide_1 = require("@material-ui/core/Slide");
var InputLabel_1 = require("@material-ui/core/InputLabel");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var FormHelperText_1 = require("@material-ui/core/FormHelperText");
var Select_1 = require("@material-ui/core/Select");
// import ContractInit from "../config/contractsInit"
//var isGitUrl = require("is-git-url");
var Transition = react_1["default"].forwardRef(function Transition(props, ref) {
    return react_1["default"].createElement(Slide_1["default"], __assign({ direction: "up", ref: ref }, props));
});
var LightTooltip = styles_1.withStyles(function (theme) { return ({
    tooltip: {
        fontSize: 11
    }
}); })(Tooltip_1["default"]);
var useStyles = styles_2.makeStyles(function (theme) {
    var _a, _b, _c, _d, _e, _f;
    return styles_2.createStyles({
        formControl: {
            margin: theme.spacing(1)
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        },
        option: {
            fontSize: 15,
            "& > span": {
                marginRight: 10,
                fontSize: 18
            }
        },
        text: {
            padding: "15px",
            "& .MuiTypography-body2": { fontSize: "12px", width: "auto" },
            "& .MuiStepIcon-root.MuiStepIcon-active": {
                color: "#EA8604",
                width: "25px",
                height: "25px",
                fontSize: "10px"
            },
            "& .MuiStepIcon-text": {
                fontSize: "12px"
            },
            "& .MuiStepIcon-root": {
                color: "#EA8604",
                width: "25px",
                height: "25px",
                fontSize: "10px"
            }
        },
        submitText: (_a = {
                "& .MuiInputBase-root": {
                    fontSize: "12px",
                    width: "auto",
                    borderRadius: "7px"
                },
                "& .MuiFormLabel-root": {
                    fontFamily: ["ProximaNova", "sans-serif"],
                    fontSize: "12px"
                },
                "& .MuiFormHelperText-root": {
                    fontSize: "10px",
                    color: "#4C42FF"
                },
                "& .MuiInputBase-input": {
                    fontFamily: ["ProximaNova", "sans-serif"]
                },
                "& .MuiOutlinedInput-multiline": {
                    borderRadius: "10px"
                },
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                    // "-webkit-appearance": "none",
                    //  margin: 0,
                    color: "red",
                    backgroundColor: "blue",
                    height: "50px"
                }
            },
            _a[theme.breakpoints.down("xs")] = {
                marginTop: "10px"
            },
            _a),
        firstfields: (_b = {
                "& .MuiSelect-iconOutlined": {
                    right: "7px",
                    top: "5px",
                    fontSize: "41px",
                    color: "#4C42FF"
                },
                "& .MuiInputBase-input": {
                    fontFamily: ["ProximaNova", "sans-serif"]
                },
                "& .MuiInputBase-root": (_c = {
                        fontSize: "12px",
                        width: "auto",
                        borderRadius: "7px"
                    },
                    _c[theme.breakpoints.down("xs")] = {
                        marginRight: "0px !important"
                    },
                    _c),
                "& .MuiFormLabel-root": {
                    fontSize: "12px",
                    fontFamily: ["ProximaNova", "sans-serif"]
                },
                "& .MuiFormHelperText-root": {
                    fontSize: "10px"
                }
            },
            _b[theme.breakpoints.down("xl")] = {
                width: "490px"
            },
            _b[theme.breakpoints.up("lg")] = {
                width: "480px"
            },
            _b[theme.breakpoints.down("lg")] = {
                //   width: "223px",
                width: "370px"
            },
            _b[theme.breakpoints.down("md")] = {
                //    width: "167px",
                width: "263px"
            },
            _b[theme.breakpoints.down("xs")] = {
                //    width: "165px",
                marginRight: "0px",
                width: "100%",
                marginTop: "10px"
            },
            _b[theme.breakpoints.up("xs")] = {
                width: "160px"
            },
            _b),
        countryPicker: {
            "& .MuiInputBase-input": {
                width: "100px",
                fontSize: "12px"
            },
            "& .MuiFormLabel-root": {
                fontSize: "12px"
            },
            "& .MuiFormHelperText-root": {
                fontSize: "10px"
            }
        },
        root: {
            width: "100%"
        },
        button: {
            marginRight: theme.spacing(1)
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        },
        backButton: {
            marginRight: theme.spacing(1)
        },
        margin: {
            "& .MuiInputBase-root": {
                fontSize: "12px",
                width: "auto"
            },
            "& .MuiFormLabel-root": {
                fontSize: "12px",
                padding: "0px"
            }
        },
        withoutLabel: {
            marginTop: theme.spacing(3)
        },
        textField: {
            width: "25ch"
        },
        txt: {
            color: "#2680EB",
            fontSize: "14px",
            fontWeight: "bold",
            marginLeft: "3px"
        },
        descriptionTxt: {
            marginTop: "5px",
            color: "#818181",
            fontSize: "10px",
            textAlign: "start"
        },
        icon: {
            height: "20px",
            width: "20px",
            fontSize: "40px",
            color: "#2680EB"
        },
        milestone: {
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            textAlign: "center",
            alignItems: "center",
            padding: "10px 0"
        },
        root1: {
            width: "100%",
            border: "1px solid #E0E0E0",
            boxShadow: "0 0 6px #888888",
            "& .MuiSvgIcon-root": {
                fontSize: "20px",
                padding: "0px"
            },
            "& .MuiIconButton-root": {
                padding: "0px"
            },
            "& .MuiAccordionSummary-content": {
                justifyContent: "space-between",
                display: "flow-root"
            },
            justifyContent: "space-between",
            marginBottom: "7px"
        },
        txt1: (_d = {
                fontSize: "12px",
                fontWeight: "bold",
                display: "inline",
                overflowWrap: "anywhere"
            },
            _d[theme.breakpoints.down("xs")] = {
                fontSize: "10px"
            },
            _d),
        txt2: (_e = {
                fontSize: "12px",
                fontWeight: "bold",
                display: "inline",
                padding: "0px 20px"
            },
            _e[theme.breakpoints.down("xs")] = {
                padding: "0px 10px",
                textAlign: "center"
            },
            _e),
        heading: (_f = {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                fontSize: "10px"
            },
            _f[theme.breakpoints.down("xs")] = {
                display: "flex",
                alignItems: "center"
            },
            _f),
        deleteTxt: {
            cursor: "pointer",
            fontSize: "12px",
            display: "inline",
            height: "30%"
        },
        "delete": {
            fontSize: "23px",
            color: "lightgray",
            padding: "0px",
            textAlign: "right"
        },
        dialogueText: {
            "& .MuiTypography-h6": {
                fontSize: "16px"
            },
            "& .MuiDialogContentText-root": {
                fontSize: "15px",
                color: "black",
                marginTop: "20px",
                marginBottom: "20px"
            },
            "& .MuiDialogTitle-root": {
                flex: "0 0 auto",
                margin: "0 0 5px 0",
                padding: "12px 24px 8px 24px",
                backgroundColor: "#4C42FF",
                color: "#FFFFFF"
            },
            "& .MuiDialogActions-root": {
                marginTop: "20px",
                marginBottom: "20px",
                flex: "0 0 auto",
                display: "flex",
                padding: "8px 0 14px 0",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "column"
            },
            "& .MuiDialogContent-root": {
                overflowY: "auto",
                width: "85%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "6px",
                padding: "0",
                flex: "0 0 auto"
            },
            "& .MuiDialog-paperWidthSm": {
                maxWidth: "486px",
                maxHeight: "90vh"
            }
        },
        dialogueButton: {
            border: "1px solid",
            cursor: "pointer",
            height: "32px",
            display: "flex",
            padding: "0 20rem",
            position: "relative",
            fontSize: "12px",
            transition: "0.2s",
            alignItems: "center",
            fontWeight: "bold",
            userWelect: "none",
            borderRadius: "5rem",
            justifyContent: "center",
            minWidth: "100px"
        },
        stepperCircle: {
            marginRight: "5px",
            "& .MuiSvgIcon-root": {
                fontSize: "19px",
                fill: "white",
                height: "29px",
                width: "21px",
                marginLeft: "4px"
            },
            width: "30px",
            height: "30px",
            borderRadius: "60px",
            background: "rgb(82,73,255)"
        }
    });
});
var EditModal = function (props) {
    var _a = react_1.useState({
        firstName: props.user.first_name,
        lastName: props.user.last_name,
        name: "",
        country: "",
        email: props.user.email,
        description: "",
        githubLink: "",
        budget: "",
        purpose: "",
        importance: "",
        // fundsUsage: "",
        // personalExperience: "",
        experiencedYear: "",
        duration: "",
        collateral: "10",
        reward: "1",
        numioAddress: props.user.numioAddress,
        txHash: "0x93D731e1" +
            Math.random() +
            "0x93D731e1" +
            Math.random() +
            "974e2B5686B282DabF4ec5471eDD86D9" +
            Math.random(),
        milestone: [],
        userProfession: ""
    }), state = _a[0], setState = _a[1];
    var _b = react_1.useState({
        task: "",
        description: "",
        estimatedDays: "",
        numberOfDevelopers: "",
        milestoneCost: ""
    }), milestoneDetails = _b[0], setMilestoneDetails = _b[1];
    var _c = react_1.useState(""), country = _c[0], setCountry = _c[1];
    var _d = react_1.useState(false), addMilestones = _d[0], setAddMilestones = _d[1];
    var _e = react_1.useState([]), proposalValue = _e[0], setProposalValue = _e[1];
    var _f = react_1.useState([]), testValue = _f[0], setTestValue = _f[1];
    var _g = react_1.useState(false), fieldRequired = _g[0], setFieldRequired = _g[1];
    var _h = react_1.useState(false), linkValidation = _h[0], setLinkValidation = _h[1];
    var _j = react_1.useState(false), emailValid = _j[0], setEmailValid = _j[1];
    var _k = react_1.useState([{}]), proposalsFromApi = _k[0], setProposalsFromApi = _k[1];
    var _l = react_1.useState([1]), handleMilestones = _l[0], setHandleMilestones = _l[1];
    var _m = react_1.useState(0), stepperStep = _m[0], setStepperStep = _m[1];
    var _o = react_1.useState(1), milestoneCount = _o[0], setMilestoneCount = _o[1];
    var _p = react_1.useState(false), errorFlag = _p[0], setErrorFlag = _p[1];
    var _q = react_1.useState(false), proposalSubmittedFlag = _q[0], setproposalSubmittedFlag = _q[1];
    var _r = react_1.useState(false), showLoader = _r[0], setShowLoader = _r[1];
    var _s = react_1.useState(false), disabled = _s[0], setDisabled = _s[1];
    var _t = react_1.useState(false), apiFailFlag = _t[0], setApiFailFlag = _t[1];
    var _u = react_1.useState(false), disableInputs = _u[0], setDisableInputs = _u[1];
    var _v = react_1.useState(false), valueSmaller = _v[0], setValueSmaller = _v[1];
    var _w = react_1.useState(false), valueGreater = _w[0], setValueGreater = _w[1];
    var _x = react_1.useState(false), ethereumNetworkError = _x[0], setEthereumNetworkError = _x[1];
    var _y = react_1.useState(0), milestoneDaysTotal = _y[0], setMilestoneDaysTotal = _y[1];
    var _z = react_1.useState(0), phoenixPrice = _z[0], setPhoenixPrice = _z[1];
    var _0 = react_1.useState(0), amountInDollars = _0[0], setAmountInDollars = _0[1];
    var _1 = react_1.useState(""), deleteProposalId = _1[0], setDeleteProposalId = _1[1];
    var _2 = react_1.useState(0), txHashFromMetaMask = _2[0], setTxHashFromMetaMask = _2[1];
    var _3 = react_1.useState(false), openDialogueState = _3[0], setOpenDialogueState = _3[1];
    var _4 = react_1.useState([]), countriesName = _4[0], setCountriesName = _4[1];
    // const [totalMilestonesDays, setTotalMilestonesDays] = useState(0);
    // const [totalMilestoneCost, setTotalMilestoneCost] = useState(0);
    var openDialogue = function (e) {
        e.preventDefault();
        setOpenDialogueState(true);
    };
    var handleDialogue = function (result) {
        setOpenDialogueState(false);
        if (result) {
            handleSubmit();
        }
    };
    function Alert(props) {
        return react_1["default"].createElement(Alert_1["default"], __assign({ elevation: 6, variant: "standard" }, props));
    }
    var totalMilestonesDays = 0;
    var totalMilestoneCost = 0;
    var _5 = react_1.useState(0), j = _5[0], setJ = _5[1];
    var classes = useStyles();
    // Get PHNX pries and push into balances result
    var phnx = {};
    var getPHNXPrice = function () { return __awaiter(void 0, void 0, void 0, function () {
        var phnxResponse, phnxPrice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("hello");
                    return [4 /*yield*/, axios_1["default"].get("https://min-api.cryptocompare.com/data/price?fsym=PHNX&tsyms=USD", {
                            headers: {
                                authorization: "fa0d2d3f3cf441a5b5b2fa9f31e6638a996d72ad938c7c5f978cf9b1dba8a656"
                            }
                        })];
                case 1:
                    phnxResponse = _a.sent();
                    phnxPrice = phnxResponse.data.USD;
                    setPhoenixPrice(phnxPrice);
                    console.log("----->>", phnxPrice);
                    console.log("----->>", phnxResponse);
                    console.log("qwe", Number(milestoneDetails.milestoneCost));
                    return [2 /*return*/];
            }
        });
    }); };
    // console.log('PHNX :', phnxPrice);
    // phnx.name = 'Phnx';
    // phnx.usd = phnxPrice;
    // conversionRates.push(phnx);
    // const getCountriesInfo = () => {
    //   countries.map((country: any) => console.log(country.label));
    // };
    react_1.useEffect(function () {
        getPHNXPrice();
        //  getCountriesInfo();
        //console.log(countries);
    }, []);
    var restrictMinus = function (e, value) {
        console.log("Name", value);
        console.log("Name state", state);
        console.log("qwert e.which", e.which);
        var inputKeyCode = e.which;
        console.log("qwert key", e.key);
        console.log("input", inputKeyCode);
        var allowedKeyCodes = [46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
        var temp = state;
        // if (inputKeyCode == 46 && temp[value].split(".").length > 1) {
        //   e.preventDefault();
        // }
        if (!allowedKeyCodes.includes(inputKeyCode)) {
            e.preventDefault();
        }
    };
    var handleClickNext = function (e) {
        var http = state.githubLink.split("http://");
        var https = state.githubLink.split("https://");
        console.log("http", http, http.length);
        console.log("https", https, https.length);
        var link = "";
        if (http.length == 2) {
            link = http[1];
            console.log("match1", http[1], link);
        }
        else {
            link = https[1];
            console.log("match2", https[1], link);
        }
        console.log("check slack now", link);
        // setState({ ...state, ["githubLink"]: stat });
        // if (slicedHttps == "https://") {
        //   console.log("Slice the githubLink hhtps");
        //   const checkHttp = githubLink.substring(9);
        //   console.log("Http", checkHttp);
        //   setState({ ...state, ["githubLink"]: checkHttp });
        // }
        var firstName = state.firstName, lastName = state.lastName, name = state.name, country = state.country, email = state.email, githubLink = state.githubLink, 
        // fundsUsage,
        purpose = state.purpose, importance = state.importance, 
        // personalExperience,
        experiencedYear = state.experiencedYear, budget = state.budget, description = state.description, duration = state.duration, 
        // reward,
        collateral = state.collateral, userProfession = state.userProfession;
        if (j == 0 &&
            //  (!firstName || !lastName || !email || !name || !githubLink || !country)
            (!firstName ||
                !lastName ||
                !userProfession ||
                !email ||
                !githubLink ||
                !country)) {
            setFieldRequired(true);
            return;
        }
        else {
            var emailValid_1 = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            // let checkLink: any = githubLink.match(
            //   /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
            // );
            if (link == undefined) {
                link = state.githubLink;
            }
            var checkLink = link.split("github.com/").length > 1 &&
                link.split("github.com/")[0] === "";
            console.log("Link check", checkLink);
            // console.log("githubLink.split(github.com/)",githubLink.split("github.com/"),checkLink)
            // let checkLink = temp.length>1 && temp[0]=="";
            // let checkLink: any = githubLink.match(
            //   /github.com\/([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
            // );
            if (emailValid_1 == null) {
                setEmailValid(true);
                return;
            }
            else {
                setEmailValid(false);
            }
            if (!checkLink) {
                setLinkValidation(true);
                return;
            }
            else {
                setLinkValidation(false);
            }
        }
        if (j == 1 &&
            (!purpose ||
                !importance ||
                // !fundsUsage ||
                // !personalExperience ||
                // !budget ||
                !name ||
                !description ||
                !experiencedYear ||
                !collateral)) {
            setFieldRequired(true);
            return;
        }
        setFieldRequired(false);
        if (collateral == "0" ||
            // reward == "0" ||
            experiencedYear == "0"
        // || personalExperience == "0"
        ) {
            setValueSmaller(true);
            return;
        }
        else {
            setValueSmaller(false);
        }
        setStepperStep(function (prevActiveStep) { return Number(prevActiveStep) + 1; });
        if (showLoader) {
            return null;
        }
        else if (j < 3) {
            console.log("cehck this one now", j, state.milestone.length);
            if (j == 1 && state.milestone.length != 0) {
                setJ(j + 2);
            }
            else {
                setJ(j + 1);
            }
        }
        else {
            console.log("In Else");
        }
    };
    var AddMilestone = function () {
        var _a;
        setAmountInDollars(0);
        var task = milestoneDetails.task, numberOfDevelopers = milestoneDetails.numberOfDevelopers, estimatedDays = milestoneDetails.estimatedDays, description = milestoneDetails.description, milestoneCost = milestoneDetails.milestoneCost;
        if (!task ||
            !estimatedDays ||
            !description ||
            !milestoneCost ||
            !numberOfDevelopers) {
            setFieldRequired(true);
            return;
        }
        else {
            setFieldRequired(false);
        }
        if (milestoneDetails.estimatedDays == "0" ||
            milestoneDetails.numberOfDevelopers == "0") {
            setValueSmaller(true);
            return;
        }
        else {
            setValueSmaller(false);
        }
        var array = state.milestone;
        array.push(milestoneDetails);
        console.log("check array nowasdasdasdas", array);
        //console.log("Check array milestoneCost", array.milestoneCost);
        console.log("check state", state);
        array.map(function (item) {
            console.log(item.estimatedDays);
            var tempDays = Number(item.estimatedDays);
            var tempCost = Number(item.milestoneCost);
            totalMilestoneCost = totalMilestoneCost + tempCost;
            totalMilestonesDays = totalMilestonesDays + tempDays;
        });
        // setState({ ...state, ["duration"]: totalMilestonesDays });
        console.log("working");
        console.log("Check array", totalMilestonesDays);
        console.log("check array cost", totalMilestoneCost);
        totalMilestonesDays = totalMilestonesDays.toString();
        totalMilestoneCost = totalMilestoneCost.toString();
        setState(__assign(__assign({}, state), (_a = {}, _a["budget"] = totalMilestoneCost, _a["milestone"] = array, _a["duration"] = totalMilestonesDays, _a)));
        //console.log("check state", state);
        setMilestoneDaysTotal(totalMilestonesDays);
        setMilestoneDetails({
            task: "",
            description: "",
            estimatedDays: "",
            numberOfDevelopers: "",
            milestoneCost: ""
        });
        setAddMilestones(false);
        setJ(3);
    };
    var handleMilestoneBack = function () {
        console.log("Back Button Click", state.milestone);
        if (state.milestone.length != 0) {
            console.log("if");
            setJ(3);
        }
        else {
            console.log("else", j);
            setJ(1);
        }
    };
    var handleClickStep = function (e) {
        console.log("In if 1");
        setJ(0);
        // if(j== 3)
        // setJ(0);
    };
    var handleClickBack = function (e) {
        if (stepperStep > 0) {
            console.log("In if 1");
            setStepperStep(function (prevActiveStep) { return prevActiveStep - 1; });
        }
        if (showLoader) {
            console.log("In if 2");
            return null;
        }
        else if (j == 0) {
            console.log("In else if");
            console.log("Cannot go back");
        }
        else {
            console.log("In else");
            if (state.milestone.length != 0 && j == 3) {
                setJ(j - 2);
            }
            else {
                setJ(j - 1);
            }
        }
    };
    var inputValidation = function (e, value) {
        var inputKeyCode = e.which;
        console.log("qwert key", e.key);
        var allowedKeyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
        var temp = state;
        if (!allowedKeyCodes.includes(inputKeyCode)) {
            e.preventDefault();
        }
    };
    var submitProposalOnBlockchain = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var temp, onSubmit;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("state", state.milestone);
                    console.log("000000000000000000000000000000000000", id);
                    return [4 /*yield*/, contractsInit_1["default"].init()];
                case 1:
                    temp = _b.sent();
                    console.log("address sd", props.user.numioAddress);
                    return [4 /*yield*/, contractsInit_1["default"].phoenixProposalContract()];
                case 2: return [4 /*yield*/, ((_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.methods.submitProposal(web3_1["default"].utils.toWei(state.budget), milestoneDaysTotal * 86400, 
                    //36000,
                    web3_1["default"].utils.toWei(state.collateral), state.milestone.length, id).send({
                        // from: props.user.numioAddress,
                        from: temp.address
                    }).then(function (receipt) { return __awaiter(void 0, void 0, void 0, function () {
                        var body, get;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log("recepet", receipt);
                                    console.log("recept hash", receipt.transactionHash);
                                    setTxHashFromMetaMask(receipt.transactionHash);
                                    props.getTxHashFromMetaMask(receipt);
                                    body = {
                                        TxHash: receipt.transactionHash,
                                        type: "Proposal",
                                        numioAddress: props.user.numioAddress,
                                        Id: id
                                    };
                                    return [4 /*yield*/, axios_1["default"].post("" + const_1.URL + const_1.createTransaction, body, {
                                            headers: {
                                                Authorization: "Bearer " + props.user.token
                                            }
                                        })];
                                case 1:
                                    get = _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })["catch"](function (err) { return __awaiter(void 0, void 0, void 0, function () {
                        var get;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    setDisableInputs(false);
                                    console.log("err", err);
                                    console.log("in error block", err);
                                    return [4 /*yield*/, axios_1["default"]["delete"]("" + const_1.URL + const_1.DeleteProposal + id, {
                                            data: { numioAddress: props.user.numioAddress },
                                            headers: {
                                                Authorization: "Bearer " + props.user.token
                                            }
                                        })];
                                case 1:
                                    get = _a.sent();
                                    setDeleteProposalId("");
                                    setShowLoader(false);
                                    throw err;
                            }
                        });
                    }); }))];
                case 3:
                    onSubmit = _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var temp, totalDays_1, daysInNumber_1, timeInSeconds, get, err_1, temp_1, e_1, temp, get;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("submit", state);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 14]);
                    if (state.milestone.length == 0) {
                        setFieldRequired(true);
                        return [2 /*return*/];
                    }
                    else {
                        setFieldRequired(false);
                    }
                    return [4 /*yield*/, contractsInit_1["default"].init()];
                case 2:
                    temp = _a.sent();
                    console.log("123", temp.network);
                    // const networkResult: any = props.network;
                    // console.log("111111111111111 ", networkResult);
                    if (temp.network != const_2.ethereumNetwork) {
                        setEthereumNetworkError(true);
                        throw "Ethereum Network invalid !";
                    }
                    totalDays_1 = 0;
                    timeInSeconds = void 0;
                    if (!showLoader) return [3 /*break*/, 3];
                    return [2 /*return*/, null];
                case 3:
                    _a.trys.push([3, 6, , 8]);
                    console.log("Collateral --->", state.collateral);
                    handleMilestones.map(function (item) {
                        daysInNumber_1 = parseInt(item.days);
                        totalDays_1 = totalDays_1 + daysInNumber_1;
                    });
                    setStepperStep(function (prevActiveStep) { return Number(prevActiveStep) + 1; });
                    console.log("In Else ,Calling Api", state);
                    setDisableInputs(true);
                    setErrorFlag(false);
                    setApiFailFlag(false);
                    setEthereumNetworkError(false);
                    timeInSeconds = totalDays_1 * 86400;
                    console.log("Token from props", props.user.numioAddress);
                    setShowLoader(true);
                    setErrorFlag(false);
                    console.log("One 111", timeInSeconds);
                    state.numioAddress = props.user.numioAddress;
                    return [4 /*yield*/, axios_1["default"].post("" + const_1.URL + const_1.Proposal, state, {
                            headers: {
                                Authorization: "Bearer " + props.user.token
                            }
                        })];
                case 4:
                    get = _a.sent();
                    setDeleteProposalId(get.data.result._id);
                    console.log("check numio address now", get.data.result);
                    return [4 /*yield*/, submitProposalOnBlockchain(get.data.result._id)];
                case 5:
                    _a.sent();
                    setDisabled(!disabled);
                    totalDays_1 = 0;
                    setproposalSubmittedFlag(true);
                    setShowLoader(false);
                    setErrorFlag(false);
                    console.log("CLose --->");
                    props.close();
                    props.openDialogue();
                    return [3 /*break*/, 8];
                case 6:
                    err_1 = _a.sent();
                    return [4 /*yield*/, contractsInit_1["default"].init()];
                case 7:
                    temp_1 = _a.sent();
                    console.log("network", temp_1);
                    console.log("check error nowsdasdsdasdasdasdsda", err_1);
                    setShowLoader(false);
                    setApiFailFlag(true);
                    if (err_1.response && err_1.response.data && err_1.response.data.result) {
                        console.log("Failed", err_1.response.data.result);
                        props.openSnackbar(err_1.response.data.result.message, "error");
                    }
                    else {
                        //  props.openSnackbar("Oops! Something went wrong ", "error");
                        props.openSnackbar("Transaction failed", "error");
                    }
                    console.log(err_1.status);
                    console.log(err_1.message);
                    return [3 /*break*/, 8];
                case 8: return [3 /*break*/, 14];
                case 9:
                    e_1 = _a.sent();
                    return [4 /*yield*/, contractsInit_1["default"].init()];
                case 10:
                    temp = _a.sent();
                    console.log("network", temp);
                    console.log("check error nowsdasdsdasdasdasdsda", e_1);
                    setShowLoader(false);
                    setApiFailFlag(true);
                    // const get = await axios.delete(`${URL}${DeleteProposal}${deleteProposalId}`, {
                    //   data: { numioAddress: props.user.numioAddress },
                    //   headers: {
                    //     Authorization: `Bearer ${props.user.token}`,
                    //   },
                    // });
                    setDeleteProposalId("");
                    if (!(e_1.response && e_1.response.data && e_1.response.data.result)) return [3 /*break*/, 11];
                    console.log("Failed", e_1.response.data.result);
                    props.openSnackbar(e_1.response.data.result.message, "error");
                    return [3 /*break*/, 13];
                case 11: return [4 /*yield*/, axios_1["default"]["delete"]("" + const_1.URL + const_1.DeleteProposal + deleteProposalId, {
                        data: { numioAddress: props.user.numioAddress },
                        headers: {
                            Authorization: "Bearer " + props.user.token
                        }
                    })];
                case 12:
                    get = _a.sent();
                    setDeleteProposalId("");
                    setShowLoader(false);
                    props.openSnackbar("Oops! Something went wrong ", "error");
                    _a.label = 13;
                case 13:
                    console.log("======e", e_1);
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    }); };
    var _onChange = function (value, name) {
        var _a;
        console.log("Value", value);
        // console.log("check now", value);
        // const checkHttp = value.substring(7);
        // console.log("Check Http", checkHttp);
        // console.log("name", name);
        // const slicedHttp = value.slice(0, 4);
        // // console.log("check Http", slicedHttp);
        // if (slicedHttp == "http") {
        //   console.log("Slice the value http");
        //   const checkHttp = value.substring(7);
        //   console.log("Http", checkHttp);
        //   setState({ ...state, ["githubLink"]: checkHttp });
        // }
        // if (slicedHttp == "https") {
        //   console.log("Slice the value hhtps");
        //   const checkHttp = value.substring(9);
        //   console.log("Http", checkHttp);
        //   setState({ ...state, ["githubLink"]: checkHttp });
        // }
        if (name == "experiencedYear" ||
            name == "duration" ||
            name == "collateral" ||
            name == "budget") {
            var reg = new RegExp("^[0-9]+$");
            var test = reg.test(value);
            if (!test && value.length != 0)
                return;
            if (value < -1) {
                return;
            }
        }
        if (name == "experiencedYear" ||
            name == "numberOfDevelopers" ||
            name == "collateral" ||
            name == "budget") {
            if (value.toString().length > 2) {
                return;
            }
        }
        if ((name == "name" && value.length > 30) ||
            (name == "firstName" && value.length > 30) ||
            (name == "lastName" && value.length > 30)
        // ||
        // (name == "country" && value.length > 25)
        ) {
            return;
        }
        if ((name == "purpose" ||
            name == "fundsUsage" ||
            name == "importance" ||
            name == "description" ||
            name == "personalExperience") &&
            value.length > 300) {
            return;
        }
        setState(__assign(__assign({}, state), (_a = {}, _a[name] = value, _a)));
    };
    var _onChangeMilestoneValue = function (value, name, e) {
        var _a;
        console.log("In on change milestone value", value, name);
        if (name == "milestoneCost" &&
            (value <= -1 || value.toString().length > 6)) {
            return;
        }
        if (name == "estimatedDays" || name == "numberOfDevelopers") {
            var inputKeyCode = e.which;
            console.log("check input code now", inputKeyCode);
            var reg = new RegExp("^[0-9]+$");
            var test = reg.test(value);
            console.log("regex test now", test);
            if (!test && value.length != 0)
                return;
            if (name == "estimatedDays") {
                if (value < -1 || value.toString().length > 3) {
                    return;
                }
            }
            if (name == "numberOfDevelopers" &&
                (value < -1 || value.toString().length > 2)) {
                return;
            }
        }
        console.log("check value now", value, name, value.length);
        if ((name == "task" && value.length > 30) ||
            (name == "description" && value.length > 300)) {
            return;
        }
        console.log("setting value");
        setMilestoneDetails(__assign(__assign({}, milestoneDetails), (_a = {}, _a[name] = value, _a)));
        if (name == "milestoneCost") {
            var tempValue = (value * phoenixPrice).toFixed(4);
            console.log(tempValue);
            setAmountInDollars(tempValue);
        }
    };
    var OnAddMilestone = function () {
        if (showLoader) {
            console.log("In if 2");
            return null;
        }
        setJ(2);
    };
    var deleteMilestone = function (index) {
        var _a;
        console.log("In delete ");
        if (showLoader) {
            console.log("In if 2");
            return null;
        }
        var array = state.milestone;
        totalMilestoneCost = state.budget;
        totalMilestonesDays = state.duration;
        array.map(function (item, i) {
            console.log(item.estimatedDays);
            var tempDays = Number(item.estimatedDays);
            var tempCost = Number(item.milestoneCost);
            if (i == index) {
                totalMilestoneCost = totalMilestoneCost - tempCost;
                totalMilestonesDays = totalMilestonesDays - tempDays;
            }
        });
        console.log("working");
        console.log("Check array", totalMilestonesDays);
        console.log("check array cost", totalMilestoneCost);
        totalMilestonesDays = totalMilestonesDays.toString();
        totalMilestoneCost = totalMilestoneCost.toString();
        array.splice(index, 1);
        console.log("check new array", array);
        setState(__assign(__assign({}, state), (_a = {}, _a["budget"] = totalMilestoneCost, _a["milestone"] = array, _a["duration"] = totalMilestonesDays, _a)));
        // setState({ ...state, ["milestone"]: array });
        if (array.length == 0) {
            setJ(1);
        }
        console.log("State here", state);
    };
    var array = ["hello1", "hello2"];
    var a = 0;
    var ProjectName = function () {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: style_module_scss_1["default"].inputDiv },
                react_1["default"].createElement("div", { style: {
                        margin: "10px 0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }, className: style_module_scss_1["default"].rowDiv },
                    react_1["default"].createElement(LightTooltip, { title: "First name", placement: "bottom", arrow: true },
                        react_1["default"].createElement(TextField_1["default"], { error: state.firstName.length == 0 && fieldRequired, label: "First Name", style: { marginRight: "5px" }, 
                            // onChange={(e) => _onChange(e.target.value, "firstName")}
                            className: classes.firstfields, id: "outlined-error-helper-text", value: state.firstName, variant: "outlined", helperText: state.firstName.length == 0 && fieldRequired
                                ? "First Name is required."
                                : false, InputProps: {
                                readOnly: true
                            } })),
                    react_1["default"].createElement(LightTooltip, { title: "Last name", placement: "bottom", arrow: true },
                        react_1["default"].createElement(TextField_1["default"], { error: state.lastName.length == 0 && fieldRequired, label: "Last Name", 
                            // onChange={(e) => _onChange(e.target.value, "lastName")}
                            id: "outlined-error-helper-text", className: classes.firstfields, variant: "outlined", value: state.lastName, helperText: state.lastName.length == 0 && fieldRequired
                                ? "Last Name is required."
                                : false, InputProps: {
                                readOnly: true
                            } }))),
                react_1["default"].createElement("div", { style: {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center"
                    } },
                    react_1["default"].createElement(core_1.FormControl, { error: true, fullWidth: true, className: classes.margin, variant: "outlined" },
                        react_1["default"].createElement(LightTooltip, { title: "Email address", placement: "bottom", arrow: true },
                            react_1["default"].createElement(TextField_1["default"], { error: (state.email.length == 0 && fieldRequired) || emailValid, label: "Email", value: state.email, 
                                // onChange={(e) => _onChange(e.target.value, "email")}
                                id: "outlined-error-helper-text", helperText: state.email.length == 0 && fieldRequired
                                    ? "Email is required."
                                    : emailValid
                                        ? "Email is not valid."
                                        : false, className: classes.submitText, variant: "outlined", InputProps: {
                                    readOnly: true
                                } })))),
                react_1["default"].createElement("div", { style: {
                        display: "flex",
                        margin: "10px 0px",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }, className: style_module_scss_1["default"].rowDiv },
                    react_1["default"].createElement(core_1.FormControl
                    //error
                    , { 
                        //error
                        variant: "outlined", className: classes.firstfields },
                        react_1["default"].createElement(InputLabel_1["default"], { id: state.userProfession.length == 0 && fieldRequired
                                ? "demo-simple-select-error-label"
                                : "demo-simple-select-outlined-label" }, state.userProfession.length == 0 && fieldRequired ? (react_1["default"].createElement("div", { style: { color: "red" } }, "Profession")) : (react_1["default"].createElement("div", null, "Profession"))),
                        react_1["default"].createElement(Select_1["default"], { error: state.userProfession.length == 0 && fieldRequired, labelId: "demo-simple-select-outlined-label", id: "demo-simple-select-outlined", value: state.userProfession, onChange: function (e) { return _onChange(e.target.value, "userProfession"); }, label: "Profession", style: { marginRight: "5px" } },
                            react_1["default"].createElement(MenuItem_1["default"], { style: { fontSize: "12px" }, value: "Engineer" }, "Engineer"),
                            react_1["default"].createElement(MenuItem_1["default"], { style: { fontSize: "12px" }, value: "Developer" }, "Developer"),
                            react_1["default"].createElement(MenuItem_1["default"], { style: { fontSize: "12px" }, value: "Project Manager" }, "Project Manager"),
                            react_1["default"].createElement(MenuItem_1["default"], { style: { fontSize: "12px" }, value: "Other" }, "Other")),
                        react_1["default"].createElement(FormHelperText_1["default"], { style: { color: "red" } }, state.userProfession.length == 0 && fieldRequired
                            ? "Profession is required"
                            : null)),
                    react_1["default"].createElement(core_1.FormControl, { error: true, variant: "outlined", className: classes.firstfields },
                        react_1["default"].createElement(InputLabel_1["default"], { id: state.country.length == 0 && fieldRequired
                                ? "demo-simple-select-error-label"
                                : "demo-simple-select-outlined-label" }, state.country.length == 0 && fieldRequired ? (react_1["default"].createElement("div", { style: { color: "red" } }, "Country")) : (react_1["default"].createElement("div", { style: { color: "#838383" } }, "Country"))),
                        react_1["default"].createElement(Select_1["default"], { error: state.country.length == 0 && fieldRequired, labelId: "demo-simple-select-outlined-label", id: "demo-simple-select-outlined", value: state.country, onChange: function (e) { return _onChange(e.target.value, "country"); }, label: "Country" }, contentConstants_1.countries.map(function (_a, index, country) {
                            var label = _a.label;
                            return (react_1["default"].createElement(MenuItem_1["default"], { style: { fontSize: "12px" }, key: index, value: label }, label));
                        })),
                        react_1["default"].createElement(FormHelperText_1["default"], null, state.country.length == 0 && fieldRequired
                            ? "Country is required"
                            : null))),
                react_1["default"].createElement("div", { className: style_module_scss_1["default"].columnDiv },
                    react_1["default"].createElement(core_1.FormControl, { error: true, fullWidth: true, className: classes.margin, variant: "outlined" },
                        react_1["default"].createElement(LightTooltip, { title: "github.com/", placement: "bottom", arrow: true },
                            react_1["default"].createElement(TextField_1["default"], { error: (state.githubLink.length == 0 && fieldRequired) ||
                                    linkValidation, label: "Github link", value: state.githubLink, onChange: function (e) { return _onChange(e.target.value, "githubLink"); }, id: "outlined-error-helper-text", style: { color: "red" }, helperText: react_1["default"].createElement("div", { style: { color: "red" } }, state.githubLink.length == 0 && fieldRequired
                                    ? "Github\n                      link is required."
                                    : linkValidation
                                        ? "Github link is not valid."
                                        : false), 
                                // InputProps={{
                                //   startAdornment: <InputAdornment position="start"></InputAdornment>,
                                // }}
                                // style={{fontSize:"16px"}}
                                className: classes.submitText, variant: "outlined" })))))));
    };
    var ProjectDetails = function () {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: style_module_scss_1["default"].inputDiv },
                react_1["default"].createElement("div", { className: style_module_scss_1["default"].columnDiv },
                    react_1["default"].createElement(core_1.FormControl, { error: true, fullWidth: true, className: classes.margin, variant: "outlined" },
                        react_1["default"].createElement(LightTooltip, { title: "Project name", placement: "bottom", arrow: true },
                            react_1["default"].createElement(TextField_1["default"], { id: "outlined-error-helper-text", label: "Project Name", style: { marginRight: "5px", borderRadius: "10px" }, error: state.name.length == 0 && fieldRequired, onChange: function (e) { return _onChange(e.target.value, "name"); }, className: classes.submitText, value: state.name, helperText: state.name.length == 0 && fieldRequired ? (react_1["default"].createElement("p", { style: { color: "#f44336" } }, "Project name is required")) : (false), variant: "outlined" })))),
                react_1["default"].createElement("div", { className: style_module_scss_1["default"].columnDiv },
                    react_1["default"].createElement(core_1.FormControl, { error: true, fullWidth: true, className: classes.margin, variant: "outlined" },
                        react_1["default"].createElement(LightTooltip, { title: "Why are you proposing to request PhoenixDAO funds?", placement: "bottom", arrow: true },
                            react_1["default"].createElement(TextField_1["default"], { multiline: true, rows: 7, error: state.purpose.length == 0 && fieldRequired, label: "Purpose to use PhoenixDAO funds", value: state.purpose, onChange: function (e) { return _onChange(e.target.value, "purpose"); }, id: "outlined-error-helper-text", helperText: state.purpose.length == 0 && fieldRequired ? (react_1["default"].createElement("p", { style: { color: "#f44336" } }, "Purpose is required")) : (false), className: classes.submitText, variant: "outlined" })))),
                react_1["default"].createElement("div", { className: style_module_scss_1["default"].columnDiv },
                    react_1["default"].createElement(core_1.FormControl, { error: true, fullWidth: true, className: classes.margin, variant: "outlined" },
                        react_1["default"].createElement(LightTooltip, { title: "Why is your proposal important for the PhoenixDAO ecosystem and what problem does your proposal solve?", placement: "bottom", arrow: true },
                            react_1["default"].createElement(TextField_1["default"], { multiline: true, rows: 7, error: state.importance.length == 0 && fieldRequired, label: "Importance of Proposal", value: state.importance, onChange: function (e) { return _onChange(e.target.value, "importance"); }, id: "outlined-error-helper-text", helperText: state.importance.length == 0 && fieldRequired ? (react_1["default"].createElement("p", { style: { color: "#f44336" } }, "Importance of proposal is required.")) : (false), className: classes.submitText, variant: "outlined" })))),
                react_1["default"].createElement("div", { style: {
                        margin: "10px 0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }, className: style_module_scss_1["default"].rowDiv },
                    react_1["default"].createElement(LightTooltip, { title: "How many years of experience do you have in this field?", placement: "bottom", arrow: true },
                        react_1["default"].createElement(TextField_1["default"], { error: (state.experiencedYear.length == 0 && fieldRequired) ||
                                (valueSmaller && state.experiencedYear == "0"), inputProps: { inputmode: "numeric", pattern: "[0-9]*" }, label: (fieldRequired && state.experiencedYear.length == 0) ||
                                (valueSmaller && state.experiencedYear == "0")
                                ? false
                                : "Experience in years", type: "number", onChange: function (e) { return _onChange(e.target.value, "experiencedYear"); }, className: classes.firstfields, style: { marginRight: "5px" }, id: "outlined-error-helper-text", value: state.experiencedYear, variant: "outlined", helperText: state.experiencedYear.length == 0 && fieldRequired
                                ? "Experienced is required."
                                : valueSmaller && state.experiencedYear == "0"
                                    ? "Value must be greater than 0"
                                    : false, onKeyPress: function (e) { return inputValidation(e, "experiencedYear"); } })),
                    react_1["default"].createElement(LightTooltip, { title: "The amount of PHNX required to submit the proposal.", placement: "bottom", arrow: true },
                        react_1["default"].createElement(TextField_1["default"], { error: (state.collateral.length == 0 && fieldRequired) ||
                                (valueSmaller && state.collateral == "0"), label: (fieldRequired && state.collateral.length == 0) ||
                                (valueSmaller && state.collateral == "0")
                                ? false
                                : "Collateral", 
                            //  onChange={(e) => _onChange(e.target.value, "collateral")}
                            className: classes.firstfields, id: "outlined-error-helper-text", value: state.collateral, variant: "outlined", helperText: state.collateral.length == 0 && fieldRequired
                                ? "Collateral is required."
                                : valueSmaller && state.collateral == "0"
                                    ? "Value must be greater than 0"
                                    : false, InputProps: {
                                readOnly: true
                            } }))),
                react_1["default"].createElement("div", { className: style_module_scss_1["default"].columnDiv },
                    react_1["default"].createElement(core_1.FormControl, { error: true, fullWidth: true, className: classes.margin, variant: "outlined" },
                        react_1["default"].createElement(LightTooltip, { title: "Briefly describe your proposal.", placement: "bottom", arrow: true },
                            react_1["default"].createElement(TextField_1["default"], { multiline: true, rows: 7, error: state.description.length == 0 && fieldRequired, label: "Description", value: state.description, onChange: function (e) { return _onChange(e.target.value, "description"); }, id: "outlined-error-helper-text", helperText: state.description.length == 0 && fieldRequired ? (react_1["default"].createElement("p", { style: { color: "#f44336" } }, "Description is required.")) : ("Maximum up to 300 characters!"), className: classes.submitText, variant: "outlined" })))),
                react_1["default"].createElement("div", { style: {
                        margin: "10px 0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    } },
                    react_1["default"].createElement(core_1.FormControl, { error: true, fullWidth: true, className: classes.margin, variant: "outlined" })))));
    };
    var MilestonesDescription = function () {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: style_module_scss_1["default"].inputDiv },
                react_1["default"].createElement("div", { style: {
                        margin: "10px 0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }, className: style_module_scss_1["default"].rowDiv },
                    react_1["default"].createElement(LightTooltip, { title: "Title of milestone", placement: "bottom", arrow: true },
                        react_1["default"].createElement(TextField_1["default"], { id: "outlined-error-helper-text", error: milestoneDetails.task.length == 0 && fieldRequired, style: { marginRight: "5px" }, onChange: function (e) {
                                return _onChangeMilestoneValue(e.target.value, "task", e);
                            }, 
                            // InputProps={{
                            //   maxLength: 30,
                            // }}
                            helperText: milestoneDetails.task.length == 0 &&
                                fieldRequired &&
                                "Title is required.", label: "Title", className: classes.firstfields, variant: "outlined", inputProps: { maxLength: 30 } })),
                    react_1["default"].createElement(LightTooltip, { title: "Estimated days required for completion of milestone", placement: "bottom", arrow: true },
                        react_1["default"].createElement(TextField_1["default"]
                        //    id="outlined-basic"
                        , { 
                            //    id="outlined-basic"
                            error: (milestoneDetails.estimatedDays.length == 0 &&
                                fieldRequired) ||
                                (valueSmaller && milestoneDetails.estimatedDays == "0"), label: (fieldRequired &&
                                milestoneDetails.estimatedDays.length == 0) ||
                                (valueSmaller && milestoneDetails.estimatedDays == "0")
                                ? false
                                : "Estimated Days", onChange: function (e) {
                                return _onChangeMilestoneValue(e.target.value, "estimatedDays", e);
                            }, 
                            // autoFocus={true}
                            // id="filled-error"
                            id: "outlined-error-helper-text", className: classes.firstfields, value: milestoneDetails.estimatedDays, variant: "outlined", helperText: milestoneDetails.estimatedDays.length == 0 && fieldRequired
                                ? "EstimatedDays are required."
                                : valueSmaller && milestoneDetails.estimatedDays == "0"
                                    ? "Value must be greater than 0"
                                    : false, onKeyPress: function (e) { return inputValidation(e, "estimatedDays"); }, type: "number" }))),
                react_1["default"].createElement("div", { style: {
                        display: "flex",
                        margin: "10px 0px",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }, className: style_module_scss_1["default"].rowDiv },
                    react_1["default"].createElement(LightTooltip, { title: "Number of developers working on milestone", placement: "bottom", arrow: true },
                        react_1["default"].createElement(TextField_1["default"], { id: "outlined-basic", error: (milestoneDetails.numberOfDevelopers.length == 0 &&
                                fieldRequired) ||
                                (valueSmaller && milestoneDetails.numberOfDevelopers == "0"), label: (fieldRequired &&
                                milestoneDetails.numberOfDevelopers.length == 0) ||
                                (valueSmaller && milestoneDetails.numberOfDevelopers == "0")
                                ? false
                                : "Developers Working", onChange: function (e) {
                                return _onChangeMilestoneValue(e.target.value, "numberOfDevelopers", e);
                            }, className: classes.firstfields, style: { marginRight: "5px" }, value: milestoneDetails.numberOfDevelopers, helperText: milestoneDetails.numberOfDevelopers.length == 0 &&
                                fieldRequired
                                ? "Developers working are required."
                                : valueSmaller && milestoneDetails.numberOfDevelopers == "0"
                                    ? "Value must be greater than 0"
                                    : false, onKeyPress: function (e) { return inputValidation(e, "numberOfDevelopers"); }, type: "number", variant: "outlined" })),
                    react_1["default"].createElement(LightTooltip, { title: "Cost of milestone", placement: "bottom", arrow: true },
                        react_1["default"].createElement(TextField_1["default"], { id: "outlined-basic", error: (milestoneDetails.milestoneCost.length == 0 &&
                                fieldRequired) ||
                                (valueSmaller && milestoneDetails.milestoneCost == "0"), label: (fieldRequired &&
                                milestoneDetails.milestoneCost.length == 0) ||
                                (valueSmaller && milestoneDetails.milestoneCost == "0")
                                ? false
                                : "PHNX grant request " + amountInDollars + "$", value: milestoneDetails.milestoneCost, onChange: function (e) {
                                return _onChangeMilestoneValue(e.target.value, "milestoneCost", e);
                            }, type: "number", className: classes.firstfields, variant: "outlined", helperText: milestoneDetails.milestoneCost.length == 0 && fieldRequired
                                ? "PHNX grant request is required."
                                : null, onKeyPress: function (e) { return restrictMinus(e, "milestoneCost"); } }))),
                react_1["default"].createElement("div", { className: style_module_scss_1["default"].columnDiv },
                    react_1["default"].createElement(core_1.FormControl, { error: true, fullWidth: true, className: classes.margin, variant: "outlined" },
                        react_1["default"].createElement(LightTooltip, { title: "Briefly describe the milestone.", placement: "bottom", arrow: true },
                            react_1["default"].createElement(TextField_1["default"], { multiline: true, rows: 7, error: milestoneDetails.description.length == 0 && fieldRequired, label: "Description", value: milestoneDetails.description, onChange: function (e) {
                                    return _onChangeMilestoneValue(e.target.value, "description", e);
                                }, id: "outlined-error-helper-text", helperText: milestoneDetails.description.length == 0 &&
                                    fieldRequired ? (react_1["default"].createElement("p", { style: { color: "#f44336" } }, "Description is required.")) : ("Maximum up to 300 characters!"), style: { borderRadius: "10px" }, className: classes.submitText, variant: "outlined" })))))));
    };
    var projectMilestones = function () {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: style_module_scss_1["default"].inputMilestoneDiv }, state.milestone.length != 0 &&
                state.milestone.map(function (item, index) {
                    return (react_1["default"].createElement("div", { className: classes.root1 },
                        react_1["default"].createElement(Accordion_1["default"], null,
                            react_1["default"].createElement(AccordionSummary_1["default"], { expandIcon: react_1["default"].createElement(ExpandMore_1["default"], null), "aria-controls": "panel1a-content", id: "panel1a-header" },
                                react_1["default"].createElement("div", { className: classes.heading },
                                    react_1["default"].createElement("div", { className: classes.txt1 }, item.task),
                                    react_1["default"].createElement("div", { className: style_module_scss_1["default"].daysDiv },
                                        react_1["default"].createElement("div", { className: classes.txt2 },
                                            item.estimatedDays,
                                            " (days)"),
                                        react_1["default"].createElement("div", { onClick: function (e) { return deleteMilestone(index); }, className: classes.deleteTxt },
                                            react_1["default"].createElement(DeleteOutline_1["default"], { className: classes["delete"] }))))),
                            react_1["default"].createElement(AccordionDetails_1["default"], null,
                                react_1["default"].createElement(core_1.Typography, { className: classes.descriptionTxt }, item.description)))));
                }))));
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Dialog_1["default"], { open: openDialogueState, TransitionComponent: Transition, keepMounted: true, onClose: function () { return handleDialogue(false); }, "aria-labelledby": "alert-dialog-slide-title", "aria-describedby": "alert-dialog-slide-description", className: classes.dialogueText },
            react_1["default"].createElement(DialogTitle_1["default"], { className: classes.dialogueText, id: "alert-dialog-slide-title" }, "Are you sure?"),
            react_1["default"].createElement(DialogContent_1["default"], { className: classes.dialogueText },
                react_1["default"].createElement(DialogContentText_1["default"], { className: classes.dialogueText, id: "alert-dialog-slide-description" }, "Submitting the proposal will send the approval request to the admin.")),
            react_1["default"].createElement(DialogActions_1["default"], { className: classes.dialogueText },
                react_1["default"].createElement(Button_1["default"], { className: classes.dialogueButton, onClick: function () { return handleDialogue(false); }, color: "primary", style: {
                        color: "#4C42FF",
                        width: "85%",
                        marginBottom: "9px",
                        borderRadius: "6px"
                    } }, "Disagree"),
                react_1["default"].createElement(Button_1["default"], { className: classes.dialogueButton, onClick: function () { return handleDialogue(true); }, color: "primary", style: {
                        color: "white",
                        backgroundColor: "#4C42FF",
                        width: "85%",
                        marginLeft: "0px",
                        borderRadius: "6px"
                    } }, "Agree"))),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(Modal_1["default"], { title: "Submit a proposal", styleFlag: "proposalModal", className: style_module_scss_1["default"].modal, activeSteps: j, showStepper: true, stepper: react_1["default"].createElement("span", { style: { display: "flex" } }, j == 1 ? (react_1["default"].createElement("div", { className: classes.stepperCircle, onClick: function (e) { return handleClickBack(e); } },
                        react_1["default"].createElement(Check_1["default"], null))) : j == 2 ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement("div", { className: classes.stepperCircle, onClick: function (e) { return handleClickStep(e); } },
                            react_1["default"].createElement(Check_1["default"], null)),
                        react_1["default"].createElement("div", { className: classes.stepperCircle, onClick: function (e) { return handleClickBack(e); } },
                            react_1["default"].createElement(Check_1["default"], null)))) : j == 3 ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement("div", { className: classes.stepperCircle, onClick: function (e) { return setJ(0); } },
                            react_1["default"].createElement(Check_1["default"], null)),
                        react_1["default"].createElement("div", { className: classes.stepperCircle, onClick: function (e) { return setJ(1); } },
                            react_1["default"].createElement(Check_1["default"], null)),
                        react_1["default"].createElement("div", { className: classes.stepperCircle, onClick: function (e) { return handleClickBack(e); } },
                            react_1["default"].createElement(Check_1["default"], null)))) : null), actions: react_1["default"].createElement("div", null,
                        react_1["default"].createElement("div", { style: { display: "block" } }, j == 2 ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(Button_1["default"], { className: style_module_scss_1["default"].nextButton, disabled: disableInputs, 
                                //  primary
                                style: {
                                    marginTop: "10px",
                                    background: "#4C42FF",
                                    color: "white",
                                    borderRadius: "7px",
                                    height: "37px"
                                }, onClick: AddMilestone }, "Add Milestone"),
                            react_1["default"].createElement("div", { className: style_module_scss_1["default"].backText },
                                react_1["default"].createElement("i", { onClick: disableInputs ? undefined : handleMilestoneBack, style: { color: "#4C42FF" }, className: classnames_1["default"](style_module_scss_1["default"].testing, "fas fa-arrow-left fa-2x") }),
                                react_1["default"].createElement("h4", { onClick: disableInputs ? undefined : handleMilestoneBack, className: style_module_scss_1["default"].testing }, "Back")))) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                            j < 2 ? (react_1["default"].createElement(Button_1["default"], { disabled: disableInputs, 
                                //  primary
                                className: style_module_scss_1["default"].nextButton, style: {
                                    background: "#4C42FF",
                                    color: "white",
                                    borderRadius: "7px",
                                    height: "37px"
                                }, onClick: function (e) { return handleClickNext(e); } },
                                react_1["default"].createElement("p", { style: { textAlign: "center" } }, "Next "),
                                react_1["default"].createElement("i", { className: "fas fa-arrow-right fa-1x", style: {
                                        paddingLeft: "8px",
                                        fontSize: "13px",
                                        paddingTop: "3px"
                                    } }))) : (react_1["default"].createElement("div", null,
                                react_1["default"].createElement(Button_1["default"], { onClick: OnAddMilestone, style: {
                                        borderRadius: "7px",
                                        height: "37px",
                                        marginBottom: "5px",
                                        fontSize: "20rem",
                                        borderColor: "#4C42FF"
                                    }, className: style_module_scss_1["default"].testing }, "Add Milestone"),
                                react_1["default"].createElement(Button_1["default"], { style: {
                                        background: "#4C42FF",
                                        color: "white",
                                        borderRadius: "7px",
                                        height: "37px",
                                        fontSize: "20rem"
                                    }, className: style_module_scss_1["default"].testing, 
                                    // disabled={showLoader}
                                    onClick: function (e) { return (!showLoader ? openDialogue(e) : null); } }, showLoader ? (react_1["default"].createElement(core_1.CircularProgress, { size: 12, style: { color: "white" } })) : (react_1["default"].createElement("p", null, "Submit"))))
                            //     <Button
                            //       disabled={disableInputs}
                            //       primary
                            //       style={{ borderRadius: "7px", height: "66rem" }}
                            //       onClick={(e: any) => handleClickNext(e)}
                            //       class
                            //     >
                            //       Next <i className="fas fa-arrow-right fa-1x" style={{ paddingLeft: "10px" }}></i>
                            //     </Button>
                            //   </div>
                            ),
                            j != 0 ? (react_1["default"].createElement("div", { className: style_module_scss_1["default"].backText },
                                react_1["default"].createElement("i", { onClick: disableInputs ? undefined : handleClickBack, style: { color: "#4C42FF" }, className: classnames_1["default"](style_module_scss_1["default"].testing, "fas fa-arrow-left fa-2x") }),
                                react_1["default"].createElement("h4", { onClick: disableInputs ? undefined : handleClickBack, className: style_module_scss_1["default"].testing, style: {
                                        fontSize: "18px",
                                        color: "#4C42FF",
                                        paddingLeft: "12px"
                                    } }, "Back"))) : null)))), close: props.close }, addMilestones ? (MilestonesDescription()) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                    j == 0 && ProjectName(),
                    j == 1 && ProjectDetails(),
                    j == 2 && MilestonesDescription(),
                    j == 3 && projectMilestones())))))));
};
var mapStateToProps = function (state) { return ({
    user: state.userDetails.user,
    network: state.layoutReducer.network
}); };
exports["default"] = react_redux_1.connect(mapStateToProps)(EditModal);
