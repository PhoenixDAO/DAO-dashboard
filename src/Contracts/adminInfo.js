exports.updateStatus = async () => {
  try {
    let count = await web3.eth.getTransactionCount(
      "0x51a73C48c8A9Ef78323ae8dc0bc1908A1C49b6c6",
      "pending"
    );
    let gasPrices = await exports.getCurrentGasPrices();
    console.log(gasPrices);
    let rawTransaction = {
      from: "0x51a73C48c8A9Ef78323ae8dc0bc1908A1C49b6c6",
      to: contract_address,
      data: contract.methods.pause().encodeABI(),
      gasPrice: gasPrices.high * 1000000000,
      nonce: count,
      gasLimit: web3.utils.toHex(2000000),
    };
    let pr_key =
      "0x8cfa9ee015b9ce2b8bfe81c90eccc92a0724cdfdfbeabefba4cf350ea2fd77c5";
    let signed = await web3.eth.accounts.signTransaction(
      rawTransaction,
      pr_key
    );
    await web3.eth
      .sendSignedTransaction(signed.rawTransaction)
      .on("confirmation", (confirmationNumber, receipt) => {
        if (confirmationNumber === 1) {
          console.log("Confirm Receipt --> ", receipt);
          console.log("contract is paused");
        }
      })
      .on("error", (error) => {
        console.log(error);
      })
      .on("transactionHash", async (hash) => {
        console.log("transaction has -->", hash);
      });
  } catch (Err) {
    console.log(Err);
  }
};
