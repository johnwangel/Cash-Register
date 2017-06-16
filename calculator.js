  window.numbers = (function(){

      let module = {};

      module.changeDisplay = function(id){
          let op = operators.getOperand();
          if (op === "new" ){
            operators.clearDisplay();
            operators.changeOperand("continue");
          } else if (op !== "continue") {
            operators.clearDisplay();
          }
          let currentString = document.getElementById("display").innerText;
          if (currentString === "0") { currentString = ""; }
          let myString = currentString + id.toString();
          document.getElementById("display").innerText = myString;
      }

      return module;
  })();

  window.operators = (function(){

      const disp = document.getElementById("display");

      let operand = "continue";
      let tempMemoryValue = 0;
      let displayNumber = 0;

      let module = {};

      module.getTempMemVal = function(num){
        return tempMemoryValue;
      }

      module.storeDisplayNumber = function(n){
        displayNumber  = n;
      }

      module.getDisplayNumber = function(){
        return displayNumber;
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
          let myString =  window.calculator.getTotal().toString();
          alert("Current balance: " + myString);
          //document.getElementById("display").innerText);
      }

      module.depositCash = function(){
          let myDeposit =  Number(document.getElementById("display").innerText) + window.calculator.getTotal();
          window.calculator.load(myDeposit);
          window.operators.clearDisplay();
      }

      module.withdrawCash = function(){
          let myWithdrawal = window.calculator.getTotal() - Number(document.getElementById("display").innerText);
          window.calculator.load(myWithdrawal);
          window.operators.clearDisplay();
      }

      module.math = function(id){
        calculator.load(Number(document.getElementById("display").innerText));
        operators.changeOperand(id);
      }

      module.equals = function(){
        let prevVal = calculator.getTotal();
        let currVal = Number(document.getElementById("display").innerText);
        switch (operators.getOperand()) {
          case "add":
            document.getElementById("display").innerText = calculator.add(prevVal, currVal);
            break;
          case "subtract":
            document.getElementById("display").innerText = calculator.subtract(prevVal, currVal);
            break;
          case "multiply":
            document.getElementById("display").innerText = calculator.multiply(prevVal, currVal);
            break;
          case "divide":
            document.getElementById("display").innerText = calculator.divide(prevVal, currVal);
            break;
          default:
            document.getElementById("display").innerText = currVal;
        }
        calculator.load(0);
        operators.changeOperand("new");
      }

      return module;
  })();

 window.calculator = (function(){

    let memory = 0;
    let total = 0;

    /**
     * Validation
     */
     function validate (x) {
        if (typeof x !== 'number') {
            throw new Error('Not a number!');
          }
     }

      /**
       * sets the `total` to the number passed in
       * @param  { Number } x
       * @return { Number }    current total
       */
       let load = function (x) {
          validate(x);
          total = x;
          return total;
       }

      /**
       * Return the value of `total`
       * @return { Number }
       */
       let getTotal = function () {
          return total;
       }

      /**
       * Sums the value passed in with `total`
       * @param { Number } x
       */
       let add = function (x) {
          validate(x);
          total += x;
          return total;
       }

      /**
       * Subtracts the value passed in from `total`
       * @param  { Number } x
       */
       let subtract = function (x) {
          validate(x);
          total -= x;
          return total;
       }

      /**
       * Multiplies the value by `total`
       * @param  { Number } x
       */
       let multiply = function (x) {
          validate(x);
          total = total * x;
          return total;
       }

      /**
       * Divides the value passing in by `total`
       * @param  { Number } x
       */
       let divide = function (x) {
          validate(x);
          total = total / x;
          return total;
       }

      /**
       * Return the value stored at `memory`
       * @return { Number }
       */
       let recallMemory = function () {
          return memory;
       }

      /**
       * Stores the value of `total` to `memory`
       */
       let saveMemory = function () {
          memory = total;
       }

      /**
       * Clear the value stored at `memory`
       */
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