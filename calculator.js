  window.numbers = (function(){

      let module = {};

      module.changeDisplay = function(id){
          if (operators.getNewNumberState() === true ){
            operators.clearDisplay();
            operators.changeNumberState(false);
          }
          let currentString = document.getElementById("display").innerText;
          if (currentString === "0") { currentString = ""; }
          let myString = currentString + id.toString();
          document.getElementById("display").innerText = myString;
      }

      module.formatNumber = function(myNumberString){
        let dotIndex = myNumberString.indexOf(".")
        let strLen = myNumberString.length;
        let whereDotShouldBe = strLen -3;
        console.log("Dot: " + dotIndex);
        console.log("String length is " + strLen);
        let myString = "";
        if (dotIndex === -1){
          return myNumberString + ".00";
        } else if (dotIndex !== whereDotShouldBe){
          myDec = myNumberString.split(".");
          let myNewDec = 0;
          let evalNum = Number(myDec[1].charAt(1));
          if (evalNum >= 5 && evalNum < 9) {
            myNewDec = String(Number(myDec[1].charAt(1))+1);
          } else if (evalNum === 9){
            myNewDec = "0";
          } else {
            myNewDec = String(evalNum);
          }
          return myDec[0] + "."  + myDec[1].charAt(0) + myNewDec;
        } else {
          return myNumberString;
        }
      }

      return module;
  })();

  window.operators = (function(){

      const disp = document.getElementById("display");

      let cashBalance = 0;
      let operand = "";
      let newNumberState = true;
      let tempMemoryValue = 0;
      let module = {};

      module.changeNumberState = function(bool){
        newNumberState = bool;
      }

      module.getNewNumberState = function(){
        return newNumberState;
      }

      module.getCashBalance = function(num){
        return cashBalance;
      }

      module.storeCashBalance = function(n){
        cashBalance  = n;
      }

      module.changeOperand = function(y){
        operand = y;
      }

      module.getOperand = function(){
        return operand;
      }

      module.clearDisplay = function(){
          document.getElementById("display").innerText = 0;
      }

      module.getBalance = function(){
          let myString = String(operators.getCashBalance());
          document.getElementById("display").innerText = numbers.formatNumber(myString);
          operators.changeNumberState(true);
      }

      module.depositCash = function(){
          let myDeposit =  Number(document.getElementById("display").innerText) + operators.getCashBalance();
          operators.storeCashBalance(myDeposit);
          operators.clearDisplay();
      }

      module.withdrawCash = function(){
          let myWithdrawal = operators.getCashBalance() - Number(document.getElementById("display").innerText);
          operators.storeCashBalance(myWithdrawal);
          operators.clearDisplay();
      }

      module.math = function(id){
        calculator.load(Number(document.getElementById("display").innerText));
        operators.changeOperand(id);
        operators.changeNumberState(true);
      }

      module.equals = function(){
        let currVal = Number(document.getElementById("display").innerText);
        let newVAl = "";
        console.log(currVal);
        switch (operators.getOperand()) {
          case "add":
            newVal = numbers.formatNumber(String(calculator.add(currVal)));
            document.getElementById("display").innerText = newVal;
            break;
          case "subtract":
            document.getElementById("display").innerText = calculator.subtract(currVal);
            break;
          case "multiply":
            document.getElementById("display").innerText = calculator.multiply(currVal);
            break;
          case "divide":
            document.getElementById("display").innerText = calculator.divide(currVal);
            break;
          default:
            document.getElementById("display").innerText = currVal;
        }
        calculator.load(0);
        operators.changeOperand("");
        operators.changeNumberState(true);
      }

      return module;
  })();

 window.calculator = (function(){

    let memory = 0;
    let total = 0;

     function validate (x) {
        if (typeof x !== 'number') {
            throw new Error('Not a number!');
          }
     }

     let load = function (x) {
        validate(x);
        total = x;
        return total;
     }

     let getTotal = function () {
        return total;
     }

     let add = function (x) {
        validate(x);
        total += x;
        return total;
     }

     let subtract = function (x) {
        validate(x);
        total -= x;
        return total;
     }

     let multiply = function (x) {
        validate(x);
        total = total * x;
        return total;
     }

     let divide = function (x) {
        validate(x);
        total = total / x;
        return total;
     }

     let recallMemory = function () {
        return memory;
     }

     let saveMemory = function () {
        memory = total;
     }

     let clearMemory = function () {
        memory = 0;
     }

     return  {
      load: load,
      getTotal: getTotal,
      add: add,
      subtract: subtract,
      multiply: multiply,
      divide: divide,
      recallMemory: recallMemory,
      saveMemory: saveMemory,
      clearMemory: clearMemory
     }
})();