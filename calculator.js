  window.numbers = (function(){

      let module = {};

      module.changeDisplay = function(id){
          let currentString = document.getElementById("display").innerText;
          if (currentString === "0") { currentString = ""; }
          let myString = currentString + id.toString();
          document.getElementById("display").innerText = myString;
          return Number(myString);
      }


      return module;
  })();

  window.operators = (function(){

      let module = {};

      module.clearDisplay = function(){
          document.getElementById("display").innerText = 0;
      }


      module.getBalance = function(){
          let myString =  window.calculator.getTotal().toString();
          alert (myString);
          document.getElementById("display").innerText = myString;
      }

      module.depositCash = function(){
          let myDeposit =  Number(document.getElementById("display").innerText);
          window.operators.clearDisplay();
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