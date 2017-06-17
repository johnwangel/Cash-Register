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