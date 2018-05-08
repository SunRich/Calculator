var calc = new Vue({
  el: "#app",
  data: {
    memory: "",
    current: "",
    result: "0"
  },
  computed: {
    calculation:function(){
      if(this.current.length > 0) {
        return this.memory + this.current.match(/(\d+[.]\d+)|\d+/g).join("");
      }

      return this.memory;
    }
  }
});

$(document).ready(function() {

  function calculate(num1,num2, opr){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch(opr){
      case "+":
        return num1 + num2
        break;
      case "-":
        return num1 - num2
        break;
      case "x":
        return num1 * num2
        break;
      case "/":
        if(num2 === 0) { return 0 }
        return num1 / num2
        break;
      default:
        console.log("default");
        return num1 + num2
    }
  }

  $("button").on("click",function(){
    var bVal = $(this).text();

    // When AC button has been pressed
    if(bVal == "AC"){
      calc.memory = "";
      calc.current = "";
      calc.result = 0;
    } else

    // When CE button has been pressed
    if(bVal == "CE"){
      calc.current = "";
    } else

    // When number buttons have been pressed
    if(!isNaN(bVal)){
      calc.current += bVal;
    } else

    // When dot button has been pressed
    if(bVal == "."){
      if(!calc.current){ calc.current += 0; }
      calc.current += ".";
    } else

    if(bVal == "="){

      var firstNumb = (calc.calculation.split(""))[0];

      var numbers = calc.calculation.match(/(\d+[.]\d+)|\d+/g),
        operation = calc.calculation.match(/[+]|[-]|[x]|[/]/g),
        result;

      if(firstNumb >= 0) {
        operation = ["+"].concat(operation);
      } else
      if(firstNumb === "-"){
        numbers[0] = -numbers[0];
      }

      console.log(numbers);
      console.log(firstNumb);
      console.log(operation);

      result = numbers.reduce(function(prev, curr, idx){
        console.log(calculate(prev,curr,operation[idx]));
        return calculate(prev,curr,operation[idx]);
      });

      console.log("result:"+result);

      calc.result = result;
      calc.memory = result;
      calc.current = "";

    }

    else {
      if(!calc.current){
        calc.memory += bVal;
      } else {
        calc.memory += calc.current + bVal;
      }
      calc.current = "";
    }
  });

});
