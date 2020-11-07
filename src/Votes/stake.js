import React, { useState, useEffect } from "react";
// import Web3 from 'web3'
import { handleToastClose } from "../redux/layoutActions";
import {
  Grid,
  Card,
  Button,
  TextField,
  IconButton,
  withWidth,
  Snackbar,
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp, Close } from "@material-ui/icons";
import {
  onGetIsUnlock,
  onGetDaysLimit,
  onGetPhnxLimit,
  onGetInterestRate,
  onSetInterestRate,
  onSetInitial,
  onSetDays,
  onSetPhnx,
  onSetToken,
  onConfirmStake,
  onApprove,
} from "../redux/stakeActions";
import Web3 from "web3";
import { truncateValue } from "../Utils";
import { connect } from "react-redux";
import Arrow from "../assets/arrow.svg";
import DownArrow from "../assets/arrowDown.svg";
import spinner from "../assets/spinner-black.svg";
import { getBalance } from "redux/dashboardActions";
import ContractInit from "../config/contractsInit";
import { PHNX_ABI, PHNX_ADDRESS, DAO_ABI, DAO_ADDRESS } from "./constants";
import { ethereumNetwork } from '../const'
import {
  PHNX_STAKING_ABI,
  PHNX_STAKING_ADDRESS,
} from "../Contracts/phnxStaking";
import axios from "axios";
// import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { URL, stakes } from "../const";
import { createTrue } from "typescript";

import { CircularProgress } from "@material-ui/core";


let web3js, accounts, contractDAO, contractPHNX, hasVoted;
   
function Alert(props) {
  return <MuiAlert elevation={6} variant="standard" {...props} />;
}

const Stake = (props) => {
 
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        width: "auto",

        "& .MuiAlert-message": {
          fontSize: "12px",
          display: "flex",
          alignItem: "center",
        },
        "& .MuiSnackbarContent-root": { fontSize: "12px" },
        "& .makeStyles-root-11": { width: "auto" },
        "& .MuiAlert-action": { display: "none" },
        "& .MuiButtonBase-root": {backgroundColor: 'red' },
        "& .MuiIconButton-root": {background: 'red', color: 'red', fontSize:'50px', backgroundColor: 'black'}
        
      },
      "& .MuiIconButton-root": {background: 'black',  color: 'red', fontSize:'50px'}
    })
  );
  const classes = useStyles();
  const [myLoading, setMyLoading] = useState(false);
  const [allInputFields, setAllInputFields] = useState(false)
  const [durationDaysInput, setDurationDays] = useState(0);
  const [amountPhnxInput, setAmountPHNX] = useState("");
  const [amountFocus, setAmountFocus] = useState(false);
  const [daysFocus, setDaysFocus] = useState(false);
  const [approval, setApproval] = useState(false);
  const [amountEntered, setAmountEntered] = useState(false)
  const [zeroAmountEntered, setZeroAmountEntered]= useState(false)
  const [showDisplayInterest, setShowDisplayInterest] = useState(false)
  const [testInput1, setTestInput1] = useState(false)
  const [testInput2, setTestInput2] = useState(false)
  const [interest, setInterest] = useState()
  const [inputValueZeroError, setInputValueZeroError] = useState(false)
  const [disableMaxButton, setDisableMaxButton] = useState(false)
  const [ethereumNetworkError, setEthereumNetworkError]= useState(false)
  const [sameAccountError, setSameAccountError] = useState(false)
  const [connectMetaMask, setConnectMetaMask] = useState(false)
  const [installMetaMaskError, setInstallMetaMaskError] = useState(false)
  const [interestRatio, setInterestRatio] = useState(0)
  const [approvalLoader, setApprovalLoader] = useState(false)

  console.log("1 Duration Days: ",durationDaysInput)
  console.log("1 Amount phnx : ",amountPhnxInput)

  const getRatio =async () => {
    const value = await (await ContractInit.initPhnxStakingContract()).methods
    .ratio()
    .call();
    let interestRate = Web3.utils.fromWei(value);
    // const interestRate = value/1000000000000000000;
    console.log('Type of value returened.',typeof(interestRate))
  
    // console.log('Check value ', value)
    console.log("check interest rate now",interestRate)
    setInterestRatio(interestRate)
    console.log('Int',interestRate)
  }
  
  

  // let approval=0
  var openSnackbar = false;
  const handleCloseSnackbar = () => {
    openSnackbar = false;
  };
  if (props.toastState === true && openSnackbar === true) {
    openSnackbar = false;
  } else if (props.toastState === true) {
    openSnackbar = true;
  }

  const checkTheBalance = async  (e) => {  
    // let account = await web3js.eth.getAccounts()
    // let result = await contractPHNX.methods
    //   .balanceOf(account[0])
    //   .call();
    // result = result / 1000000000000000;
    // theBalance = parseFloat(result).toFixed(4);
    // theBalance = parseFloat(result)

   
    //let account = await web3js.eth.getAccounts()
    let result = await contractPHNX.methods
      .balanceOf(accounts)
      .call();
      let obj = await contractPHNX.methods

      console.log('Contract object ----> ',obj)

      result = await web3js.utils.fromWei(result.toString());
      theBalance = parseFloat(result).toFixed(4);
    console.log('The balanece Balance  ->-',theBalance)
    console.log('The balance eeee',e)


  
    // let userValue = parseFloat(e)
    let userValue =  Number(e)
   
   
    if( e == theBalance ){
      setTestInput1(true); 
      setTestInput2(true)
      setShowDisplayInterest(true)

    }
    if( e <= 0) {  
      setZeroAmountEntered(true); 
      setAllInputFields(false)
      setAmountEntered(false)
    }

      else if(Number(e) > Number(theBalance) ) {
        setAmountEntered(true)
        
        setZeroAmountEntered(false)
        setAllInputFields(false)
      return true
      }  
      
      else  {
        setAmountEntered(false)
       setZeroAmountEntered(false)
        return false}
    }

    const onChangeAmount = (e) => {
      checkTheBalance(e.target.value)
      if (props.stakeLoading !== true) {
  
        if (
          (e.target.value.match(/^(\d+\.?\d{0,4}|\.\d{1,4})$/) &&
            e.target.value <= 20000) ||
          e.target.value == ""
        ) {
          if (e.max) {
            var test = parseFloat(props.balance).toFixed(4);
         
            setAmountPHNX(test);
            props.onSetPhnx(String(Math.floor(props.balance * 10000) / 10000));
          
  
            const rate =
              Number(Math.floor(props.balance * 10000) / 10000) *
              Number(durationDaysInput) *
              props.unitRate;
            props.onSetInterestRate(rate);
          } else {
            setAmountPHNX(e.target.value);
            console.log('Amount',e.target.value)
            props.onSetPhnx(e.target.value);
            const rate =
              Number(e.target.value) * Number(durationDaysInput) * props.unitRate;
        
            props.onSetInterestRate(rate);
            let value = (e.target.value * durationDaysInput * 0.25) / 365
            console.log('value Latest',value)
          }
        }
      }
    };
  
  const onChangeDurationDays = (e) => {
    console.log('Amount',e.target.value)
   
    if( e.target.value <= 0) {  
      console.log('if')
      setZeroAmountEntered(true); 
      setAllInputFields(false)
      setAmountEntered(false)
    }
    if (props.stakeLoading !== true) {
      var reg = new RegExp("^\\d+$");
      if (
        (reg.test(e.target.value) || e.target.value == "") &&
        Number(e.target.value) <= props.daysLimit
      ) {
        setDurationDays(e.target.value);
        props.onSetDays(e.target.value);
        const rate =
          Number(e.target.value) * Number(amountPhnxInput) * props.unitRate;
        props.onSetInterestRate(rate);
      }
    }
    //calculateSpotInterest()
      let value = (e.target.value * amountPhnxInput * 0.25) / 365
      console.log('value',value)
  };

  const calculateSpotInterest = () => {
    console.log(1,amountPhnxInput, durationDaysInput)
    const spotInterest = (amountPhnxInput * durationDaysInput * 0.25) / 365
    console.log('Spot', spotInterest)
  }

  useEffect(() => {
    console.log('props',props.address)
    temp(); 
    setDisableMaxButton(false)
    setAmountPHNX(0)
    setDurationDays(0)
    calculateSpotInterest()
    getRatio()
    if(!durationDaysInput || !amountPhnxInput){setZeroAmountEntered(false)}
  }, []);
  const temp = async () => {
  await checkWeb3();

    if (accounts.length !== 0) {
      let _approval = await checkApproval();
      setApproval(_approval);
    } 

    web3js = new Web3(window.web3.currentProvider);
    let network = await web3js.eth.net.getNetworkType();
    //get selected account on metamask
    
    let init = await ContractInit.init()
   // accounts = init.address
    //accounts = await window.ethereum.selectedAddress
   // accounts = await web3js.eth.getAccounts();
    
    window.ethereum.enable();
    // Use Mist/MetaMask's provideronC.
   
    //get network which metamask is connected too
 
    console.log('Hello',network)
    console.log('hello', accounts.length)

   
    // else {
    //   // alert("please connect to metamask (Locked)");
    //  // setInstallMetaMaskError(true)
    // }
  };
  const checkWeb3 = async () => {
    // Use Mist/MetaMask's provideronC. 
    web3js = new Web3(window.web3.currentProvider);
    //get selected account on metamask
    // let init = await ContractInit.init()
    // accounts = init.address
    //accounts = await window.ethereum.selectedAddress
    //accounts = await web3js.eth.getAccounts();
    //get network which metamask is connected too
    //let network = await web3js.eth.net.getNetworkType();
    let temp = await ContractInit.init()
    console.log('Network',props.address)
    accounts = temp.address
    console.log('123',temp)
    if(accounts == null){setConnectMetaMask(true)}
      
    else if(temp.network != ethereumNetwork){setEthereumNetworkError(true); setConnectMetaMask(false)}
    else if(temp.address !== props.address){ setSameAccountError(true); setConnectMetaMask(false)}
    if (typeof window.web3 !== "undefined") {
     
      window.ethereum.enable();
      
     // console.log('Network',network,accounts[0])
     // if(network != 'rinkeby') {alert('Incorrent network');setEthereumNetworkError(true)}
     // if(accounts[0] !== props.address){console.log("Account not same")}
      
      await initContract();
      //setConnectMetaMask(false)
    } else {
      //setConnectMetaMask(true)
      setInstallMetaMaskError(true)
      /*** meta mask is not installed ***/
      alert('Metamask is not installed')
    }
  };
  const initContract = async () => {
    contractDAO = await new web3js.eth.Contract(DAO_ABI, DAO_ADDRESS);
  
    /*** CONTRACT ADDRESS ***/
    contractPHNX = await new web3js.eth.Contract(PHNX_ABI, PHNX_ADDRESS);
    /*** CONTRACT ADDRESS ***/

    //contractStake = await new web3js.eth.Contract

  };
  useEffect(() => {
    if (props.address) props.getBalance(props.address);
  }, [props.address]);
  useEffect(() => {

    props.onGetPhnxLimit();
    props.onGetDaysLimit();
    if (props.address) {
      props.onGetIsUnlock();
    }
  }, [props.address, props.balance]);
  const sendApproval = async () => {
    setApprovalLoader(true)
    //  if(!durationDaysInput || !amountPhnxInput){setAllInputFields(true)}

    let balance = await contractPHNX.methods.totalSupply().call();
    let result = await contractPHNX?.methods
      .approve(PHNX_STAKING_ADDRESS, balance)
      .send({ from: accounts /*** selected account from metamask ***/ }) // contract.methods.methodName(parameters).send({from:selected account})
      .on("transactionHash", (hash) => {
      
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        if (confirmationNumber === 1) {
          setApproval(true)
          setApprovalLoader(false)
          props.openSnackbar('You have successfully approved.', 'success')
        }

      })
      .on('error', function(err){
        props.close()
        
      })
      
  };
  const checkApproval = async () => {
    let result = await contractPHNX.methods
      .allowance(accounts, PHNX_STAKING_ADDRESS)
      .call({ from: accounts });
    if (result == "0") {
      return false;
    }
    return true;
    // return result;
  };
  ;
  let theBalance
  useEffect(() => {
    
    //setAmountPHNX(String(Math.floor(props.phnxAmount * 10000) / 10000));
    // setAmountPHNX(parseFloat(props.phnxAmount).toFixed(4));
    //setDurationDays(props.days);
    props.onGetInterestRate(props.phnxAmount, props.days);
    
    
  }, [props.phnxAmount, props.days]);
  // let displayInterest =
  //   props.interestRate.toString().indexOf(".") > 3
  //     ? Number(props.interestRate).toFixed(2)
  //     : props.interestRate.toString().indexOf(".") > 2
  //     ? Number(props.interestRate).toFixed(3)
  //     : Number(props.interestRate).toFixed(4);
  

  
  let displayInterest;  
  useEffect(()=>{
    displayInterest = 0;
  },[])
  
  displayInterest = (amountPhnxInput * durationDaysInput * interestRatio);
  displayInterest = displayInterest.toFixed(4)
  //displayInterest = (( amount))


const onMaxClick = () => {
  checkTheBalance()
  onChangeDurationDays({
    target: { value: 365 },
  });
  // setDurationDays(365);
  if (props.balance > 20000) {
    onChangeAmount({
      target: { value: "20000" },
    });
  } else {
    onChangeAmount({
      target: { value: parseFloat(props.balance).toFixed(4) },
      max: true,
      // target: {
      //   value: String(Math.floor(props.balance * 10000) / 10000),
      // },
    });
  }
};


  const submitProposalOnBlockchain = async () => {   
    let txHash;
    let txReward
  
   const onSubmit = await  ( await ContractInit.initPhnxStakingContract()).methods.stakeALT(web3js.utils.toWei(amountPhnxInput),durationDaysInput).send({from: props.address}) 
  .on('transactionHash', (hash) => {
    console.log('Xord')
    txHash = hash
    
      console.log(hash)
      
  }).on('confirmation', function (confirmationNumber, receipt) {
      if (confirmationNumber == 1) {
        console.log('Xord')
        console.log('confirmed',receipt)
      }
 }) .on("error", async function () {
   console.log('Xord')
   //setTransactionRejected(true)
   props.close()
   props.handleTransactionRejectedError(true)
 
}
);
console.log('onSubmit', onSubmit)

  return txHash
}

  const addStake = async (input) => {
    if(!durationDaysInput || !amountPhnxInput){setAllInputFields(false)}
    else{
     
      
     const answer = await submitProposalOnBlockchain()
      console.log('hash ///',answer)


    const stakeOnProposal = await axios
      .post(
        // `http://localhost:4000/stake/${props.proposal._id}`,
        `${URL}${stakes}${props.proposal._id}`,
        {
          user: {
            _id: props.user._id,
            numioAddress: props.user.numioAddress,
            email: props.user.email,
          },
          amount: amountPhnxInput,
          days: durationDaysInput,
          TxHash: answer,
          reward: displayInterest,
        },
        {
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        }
      )
       //await submitProposalOnBlockchain()
        console.log('Reward',displayInterest, answer)
      // .then(async () => {
      //   console.log('Xord')
   
      // })
      // .catch((err) => {
      //   console.log(1)
      // })
    }
      console.log('Working 2')

  };

  const onStake = async () => {
   
    
    setMyLoading(true);
   
    // let answer = await props.onConfirmStake(
    //   props.address,
    //   props.balance,
    //   String(props.phnxAmount),
    //   props.interestRate,
    //   props.days,
    //   props.isUnlock,
    //   props.minimumStake
    // );
    // if (answer.status) {
    //  await addStake(answer);
    await addStake()
      props.renderAgain();
      setMyLoading(false);
     props.close();
     let x = props.close()
      props.handleStakedSnackBar();
    //}
    setMyLoading(false);
  };
  const checkVoted = () => {
    let hasVoted = props.proposal.stake.find(
      (obj) => obj.email === props.user.email
    );
    if (hasVoted) return true;
    return false;
  };

  return (
    <Card
      style={{
        height: "80%",
        padding: "0px",
        borderRadius: "0px",
        boxShadow: "none",
      }}
    >
      {/* <>
        <Snackbar
          className={classes.root}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={props.toastState}
          autoHideDuration={6000}
          onClose={props.onToastClose}
          // message={props.toastMessage}
          // action={
          //   <React.Fragment>
          //     <IconButton
          //       size="small"
          //       aria-label="close"
          //       color="inherit"
          //       onClick={props.onToastClose}
          //     >
          //       <Close fontSize="small" />
          //     </IconButton>
          //   </React.Fragment>
          // }
        >
          <Alert
            className={classes.root}
            onClose={props.onToastClose}
            severity={props.severity}
          >
            {props.toastMessage}
          </Alert>
        </Snackbar>
      </> */}
      <Grid
        style={{ height: "100%" }}
        direction="column"
        justify="space-between"
        container
      >
        <Grid container item justify="space-between">
          <Grid item>
            <span style={{ fontSize: "24px" }}> Staking</span> <br />
            
            <span style={{ color: "#828282", fontSize: "12px" }}>
              Add the amount of PHNX you will like to stake
            </span>
          </Grid>
          <Grid item>
            <Button
            disabled={disableMaxButton}
              variant="outlined"
              style={{
                border: "1px solid orange",
                fontSize: "10px",
                padding: "5px",
              }}
              onClick={() => onMaxClick()}
            >
              Max
            </Button>
          </Grid>
        </Grid>
        <Grid
          style={{ marginTop: "12px" }}
          container
          item
          justify="space-between"
        >
          <Grid style={{ position: "relative" }} xs={12} sm={3} item>

            <span style={{ color: "#828282", marginLeft: "16px" }}>
              Quantity in PHNX
            </span>
            <br />
            <input
              type="text"
              style={{
                background: "#F8F8FB",
                borderRadius: "23px",
                border: "inherit",
                height: "80px",
                width: "100%",
                fontSize: "24px",
                outline: "none",
                paddingLeft: 25,
              }}
              disabled={ sameAccountError == true ? true : !props.stakeLoading ? (myLoading ? true : false) : true}
              value={amountPhnxInput}
              //value={amountEntered}
              onChange={onChangeAmount}
              // placeholder="0.0"
              placeholder = "0"
            />
          </Grid>
          <Grid xs={12} sm={1} style={{ display: "flex" }} item>
          
          </Grid>
          <Grid style={{ position: "relative" }} xs={12} sm={3} item>
           
           
            <span style={{ color: "#828282", marginLeft: "16px" }}>
              Duration (days)
            </span>
            <br />
            <input
              type="text"
              style={{
                background: "#F8F8FB",
                borderRadius: "23px",
                border: "inherit",
                height: "80px",
                width: "100%",
                fontSize: "24px",
                outline: "none",
                paddingLeft: 25,
              }}
              disabled={ connectMetaMask   || ethereumNetworkError ||sameAccountError == true ? true : !props.stakeLoading ? (myLoading ? true : false) : true}
              onChange={onChangeDurationDays}
               value={durationDaysInput}
             // value = {'hello'}
              placeholder="0"
            />
          </Grid>
          <Grid xs={12} sm={1} style={{ display: "flex" }} item>
           
          </Grid>
            
              
          <Grid xs={12} sm={3} item>
            <span style={{ color: "#828282", marginLeft: "16px" }}>
              Spot Interest
            </span>{" "}
            <br />
         {/* {displayInterest = 888} */}
            <input
              type="text"
              style={{
                background: "#F8F8FB",
                borderRadius: "23px",
                border: "inherit",
                height: "80px",
                width: "100%",
                fontSize: "24px",
                outline: "none",
                paddingLeft: 25,
              }}
              
             // value={ testInput1 && testInput2 ? displayInterest :null}
              //value={testInput1 && testInput2  ? displayInterest : null}
              value={ displayInterest}
           //  value={showDisplayInterest ? displayInterest : 0}
             //value={displayInterest}
              disabled="true"
              placeholder="0.0"
            />
          </Grid>
        </Grid>
        <Grid
          style={
            props.width === "xs" ? { marginTop: "12px" } : { marginTop: "20px" }
          }
        >
          {!checkVoted() && (
            <Button
              variant="contained"
              size="large"
              style={{
                background: "#EA8604",
                color: "white",
                height: "60px",
                borderRadius: "16px",
                fontSize: "10px",
                padding: "10px",
                fontFamily: "ProximaNova, sans-serif",
                textAlign: "right",
              }}
              onClick={() =>
                props.stakeLoading
                  ? null
                  : // : props.isUnlock
                  approval
                  ? onStake()
                  : sendApproval()
              }
            // disabled={ amountEntered == true || zeroAmountEntered || !amountEntered  ? true :  !props.stakeLoading ? (myLoading ? true : false) : true }
            disabled={ connectMetaMask == true || ethereumNetworkError == true || sameAccountError == true || amountEntered == true || zeroAmountEntered == true || !durationDaysInput || !amountPhnxInput  ? true :  !props.stakeLoading ? (myLoading ? true : false) : true }
            >
              {(props.stakeLoading || myLoading) && <img src={spinner} />}
              <span style={{ textTransform: "none" }}>
                { approvalLoader ? <img src={spinner}/>  : approval ? "Confirm Stake" : "Approve PHNX"}
              </span>
            </Button>
          )}
        </Grid>
      </Grid>
      {checkVoted() && (
        <Alert severity="success" style={{ fontSize: "10px" }}>
          <p> You have already staked on this proposal! </p>
        </Alert>
      )}
        <Snackbar
              open={amountEntered}
              autoHideDuration={2000}
              // message={props.toastMessage}
              // onClose={() => handleNetworkErrorSnackBar()}
            >
              <Alert style={{ fontSize: "12px" }} severity="error">
                Your current balance is less than the transaction requirement.
              </Alert>
            </Snackbar>
            <Snackbar
              open={zeroAmountEntered   }
              autoHideDuration={2000}
              // message={props.toastMessage}
              //
              // onClose={() => handleZeroAmountEntered()}
            >
              <Alert style={{ fontSize: "12px" }} severity="error">
                Input must be greater than zero.
              </Alert>
            </Snackbar>

            <Snackbar
              open={ethereumNetworkError}
              autoHideDuration={2000}
              // message={props.toastMessage}
              //
              // onClose={() => handleZeroAmountEntered()}
            >
              <Alert style={{ fontSize: "12px" }} severity="error">
                Ethereum network must be Rinkeby .
              </Alert>
            </Snackbar>

            <Snackbar
              open={sameAccountError}
              autoHideDuration={2000}
              // message={props.toastMessage}
              //
              // onClose={() => handleZeroAmountEntered()}
            >
              <Alert style={{ fontSize: "12px" }} severity="error">
                Metamask account must be same
              </Alert>
            </Snackbar>

           
            <Snackbar
              open={connectMetaMask}
              autoHideDuration={2000}
              // message={props.toastMessage}
              //
              // onClose={() => handleZeroAmountEntered()}
            >
              <Alert style={{ fontSize: "12px" }} severity="error">
                  Metamask is not connected.
              </Alert>
            </Snackbar>

            <Snackbar
              open={installMetaMaskError   }
              autoHideDuration={2000}
              // message={props.toastMessage}
              //
              // onClose={() => handleZeroAmountEntered()}
            >
              <Alert style={{ fontSize: "12px" }} severity="error">
               Please install Metamask
              </Alert>
            </Snackbar>

            {/* <Snackbar
            //  open={allInputFields}
              open={!durationDaysInput || !amountPhnxInput}
              autoHideDuration={2000}
              // message={props.toastMessage}
              // onClose={() => handleAllInputFields()}
            >
              <Alert style={{ fontSize: "12px" }} severity="error">
                All fields must be filled !
              </Alert>
            </Snackbar> */}
    </Card>
  );
};
const mapStateToProps = (state) => {
  return {
    severity: state.layoutReducer.severity,
    toastMessage: state.layoutReducer.toastMessage,
    toastState: state.layoutReducer.toastState,
    days: state.stakeReducer.days,
    token: state.stakeReducer.token,
    initial: state.stakeReducer.initial,
    address: state.layoutReducer.address,
    unitRate: state.stakeReducer.initialRate,
    phnxLimit: state.stakeReducer.phnxLimit,
    phnxAmount: state.stakeReducer.phnxAmount,
    daysLimit: state.stakeReducer.daysLimit,
    balance: state.dashboardReducer.balance,
    tokensList: state.stakeReducer.tokenList,
    stakeLoading: state.layoutReducer.stakeLoading,
    interestRate: state.stakeReducer.interestRate,
    stakedPhnx: state.dashboardReducer.stakedPhnx,
    interest: state.dashboardReducer.interest,
    isUnlock: state.stakeReducer.isUnlock,
    minimumStake: state.stakeReducer.minimumStake,
    user: state.userDetails.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onToastClose: () => dispatch(handleToastClose()),
    onSetPhnx: (phnx) => dispatch(onSetPhnx(phnx)),
    onSetInitial: () => dispatch(onSetInitial()),
    onGetPhnxLimit: () => dispatch(onGetPhnxLimit()),
    onSetDays: (days) => dispatch(onSetDays(days)),
    onGetDaysLimit: () => dispatch(onGetDaysLimit()),
    onSetToken: (token) => dispatch(onSetToken(token)),
    getBalance: (address) => dispatch(getBalance(address)),
    onGetIsUnlock: (address) => dispatch(onGetIsUnlock(address)),
    onSetInterestRate: (interest) => dispatch(onSetInterestRate(interest)),
    onGetInterestRate: (initial, phnx, days, token, setInitial) =>
      dispatch(onGetInterestRate(initial, phnx, days, token, setInitial)),
    // onGetMinInterestRate: () => dispatch(onGetMinInterestRate()),
    onConfirmStake: (
      address,
      balance,
      stakeAmount,
      interestRate,
      stakeDuration,
      isUnlock,
      minimumStake
    ) =>
      dispatch(
        onConfirmStake(
          address,
          balance,
          stakeAmount,
          interestRate,
          stakeDuration,
          isUnlock,
          minimumStake
        )
      ),
    approve: (isUnlock, address) => dispatch(onApprove(isUnlock, address)),
  };
};
export default withWidth()(connect(mapStateToProps, mapDispatchToProps)(Stake));