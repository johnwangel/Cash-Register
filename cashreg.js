  /*jshint esversion: 6 */
  window.numbers = (function(){

      let module = {};

      module.changeDisplay = function(){
          return function(e){
            let id = e.currentTarget.id;
            if (operators.getNewNumberState() === true ){
              operators.clearFromFunction();
              operators.changeNumberState(false);
            }
            let currentString = disp.innerText;
            if (currentString === "0.00" || currentString === "0") { currentString = ""; }
            let myString = currentString + id.toString();
            disp.innerText = myString;
        };
      };

      module.formatNumber = function(myNumberString){
        let dotIndex = myNumberString.indexOf(".");
        let strLen = myNumberString.length;
        let whereDotShouldBe = strLen -3;
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
      };

      return module;
  })();

  window.operators = (function(){

      let cashBalance = 0;
      let operand = "";
      let newNumberState = true;
      let tempMemoryValue = 0;
      let module = {};
      let chainedNumber = false;

      module.changeNumberState = function(bool){
        newNumberState = bool;
      };

      module.getNewNumberState = function(){
        return newNumberState;
      };

      module.updateChainedNumber = function(bool){
        chainedNumber = bool;
      };

      module.getChainedNumber = function(){
        return chainedNumber;
      };

      module.getCashBalance = function(num){
        return cashBalance;
      };

      module.storeCashBalance = function(n){
        cashBalance  = n;
      };

      module.changeOperand = function(y){
        operand = y;
      };

      module.getOperand = function(){
        return operand;
      };

      module.clearDisplay = function(){
        return function(){
            disp.innerText = "0.00";
          };
      };

      module.clearFromFunction = function(){
        disp.innerText = "0.00";
      };

      module.getBalance = function(){
          return function(){
            let myString = String(operators.getCashBalance());
            disp.innerText = numbers.formatNumber(myString);
            operators.changeNumberState(true);
          };
      };

      module.depositCash = function(){
        return function(){
            let myDeposit =  Number(disp.innerText) + operators.getCashBalance();
            operators.storeCashBalance(myDeposit);
            operators.clearFromFunction();
          };
      };

      module.withdrawCash = function(){
        return function(){
          let myWithdrawal = operators.getCashBalance() - Number(disp.innerText);
          operators.storeCashBalance(myWithdrawal);
          operators.clearFromFunction();
        };
      };

      module.math = function(op){
          return function(e){
            let id = e.currentTarget.id;
            let op = (operators.getOperand());
            if (op !== ""){
                operators.updateChainedNumber(true);
                operators.equals(id);
            }
            calculator.load(Number(disp.innerText));
            operators.changeOperand(id);
            operators.changeNumberState(true);
        };
      };

      module.equals = function(){
        let currVal = Number(disp.innerText);
        let newVal = "";

        switch (operators.getOperand()) {
          case "add":
            newVal = numbers.formatNumber(String(calculator.add(currVal)));
            disp.innerText = newVal;
            break;
          case "subtract":
            newVal = numbers.formatNumber(String(calculator.subtract(currVal)));
            disp.innerText = newVal;
            break;
          case "multiply":
            newVal = numbers.formatNumber(String(calculator.multiply(currVal)));
            disp.innerText = newVal;
            break;
          case "divide":
            newVal = numbers.formatNumber(String(calculator.divide(currVal)));
            disp.innerText = newVal;
            break;
          default:
            disp.innerText = currVal;
        }
        calculator.load(0);
        if (operators.getChainedNumber === true ){ operators.updateChainedNumber(false); }
        else { operators.changeOperand(""); }
        operators.changeNumberState(true);
      };

      return module;
  })();

const disp = document.getElementById("display");

const plus = document.getElementById("add");
plus.addEventListener("click", operators.math());

const minus = document.getElementById("subtract");
minus.addEventListener("click", operators.math("subtract"));

const times = document.getElementById("multiply");
times.addEventListener("click", operators.math("multiply"));

const divBy = document.getElementById("divide");
divBy.addEventListener("click", operators.math("divide"));

const one = document.getElementById("1");
one.addEventListener("click", numbers.changeDisplay());

const two = document.getElementById("2");
two.addEventListener("click", numbers.changeDisplay());

const three = document.getElementById("3");
three.addEventListener("click", numbers.changeDisplay());

const four = document.getElementById("4");
four.addEventListener("click", numbers.changeDisplay());

const five = document.getElementById("5");
five.addEventListener("click", numbers.changeDisplay());

const six = document.getElementById("6");
six.addEventListener("click", numbers.changeDisplay());

const seven = document.getElementById("7");
seven.addEventListener("click", numbers.changeDisplay());

const eight = document.getElementById("8");
eight.addEventListener("click", numbers.changeDisplay());

const nine = document.getElementById("9");
nine.addEventListener("click", numbers.changeDisplay());

const zero = document.getElementById("0");
zero.addEventListener("click", numbers.changeDisplay());

const zero2 = document.getElementById("00");
zero2.addEventListener("click", numbers.changeDisplay());

const dot = document.getElementById(".");
dot.addEventListener("click", numbers.changeDisplay());

const clear = document.getElementById("clear");
clear.addEventListener("click", operators.clearDisplay());

const balance = document.getElementById("get_balance");
balance.addEventListener("click", operators.getBalance());

const deposit = document.getElementById("deposit");
deposit.addEventListener("click", operators.depositCash());

const withdraw = document.getElementById("withdraw");
withdraw.addEventListener("click", operators.withdrawCash());