const container = document.getElementById('container');
const calculatorScreen = document.getElementById('calculator-screen');
const div0 = document.getElementById('div0');
const div1 = document.getElementById('div1');
const div2 = document.getElementById('div2');
const div3 = document.getElementById('div3');
const div4 = document.getElementById('div4');
const div5 = document.getElementById('div5');
const div6 = document.getElementById('div6');
const div7 = document.getElementById('div7');
const div8 = document.getElementById('div8');
const div9 = document.getElementById('div9');
const divideBtn = document.getElementById('divide');
const multiplyBtn = document.getElementById('multiply');
const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const equalsBtn = document.getElementById('equals');
const decimalBtn = document.getElementById('decimal');
const clear = document.getElementById('clear');
const backspace = document.getElementById('backspace');
const longForm = document.getElementById('long-form');

const add = (a,b) => {
    return Number(a)+Number(b);
  }
  
const subtract = (a,b) => {
    return Number(a)-Number(b);
  }
  
const multiply = (a,b) => {
    return Number(a)*Number(b);
  }
  
const divide = (a,b) => {
    return Number(a)/Number(b);
  }
  
const equals = () => {
    if (operation === 'add') {
      total = add(numX, numY);
    }
    if (operation === 'minus') {
      total = subtract(numX, numY);
    }
    if (operation === 'multiply') {
      total = multiply(numX, numY);
    }
    if (operation === 'divide') {
      total = divide(numX, numY);
    }
    if (equalsBtnPressed === true) {
      longForm.innerHTML += total;
    }
    if (total.toString().length > 13) {
      console.log('total = '+ total)

      total = Number(total.toString().slice(0, 17));
    }
    calculatorScreen.innerHTML = total;
      numY = total;
      total = '';
      numX = total;
  }
  
  
  let numX ='0';
  let numY = '';
  let longFormNum ='';
  let total = '';
  let operation = '';
  let lastOperation ='';
  let equalsBtnPressed = false;
  longForm.innerHTML ='';
  
  const clearScreen = () => {
    calculatorScreen.innerHTML = '';
  }
  
  const operBtnSequence = (op) => {
    if (operation === '') {
      operation = op;
      lastOperation = op;
    } else {
      operation = lastOperation;
      lastOperation = op;
    };
    if (numY === '') {
      numY = numX;
      numX = '';
    } else if (numY == 0 && op === 'divide') {
      clearScreen();
      return alert('You can\'t divide by zero!');
    } else {
      equals();
    }
  }
  
  const displayNums = (i) => {
    if (calculatorScreen.innerHTML === '0') {
      numX = i.toString();
      longFormNum = numX;
    } else {
      numX = numX.concat(i);
      longFormNum = i.toString();
    }
    longForm.innerHTML += longFormNum;
    calculatorScreen.innerHTML = numX;
  }
  
  const displayDecimal = () => {
    if (numX.includes('.') === true) {
      return -1;
    }
    longForm.innerHTML += '.';
    if (numX === '') {
      numX = '0';
    }
    numX = numX.concat('.');
    calculatorScreen.innerHTML = numX;
  }
  
  const clearAll = () => {
    numX ='';
    numY ='';
    total ='';
    operation ='';
    calculatorScreen.innerHTML = '0';
    longForm.innerHTML ='';
    longFormNum = '';
    equalsBtnPressed = false;
    calculatorScreen.style.fontSize = '58px';
  }
  
  const backspacePress = () => {
    console.clear()
    console.log(longForm.innerHTML);
    console.log(`numX ${numX}`);
    console.log(numX.toString.length)
    if (numX) {
      numX = numX.toString().slice(0, numX.toString().length-1);
      longForm.innerHTML = longForm.innerHTML.slice(0, longForm.innerHTML.length-1);
      calculatorScreen.innerHTML = numX;
    }
  }
  
  const addNumListeners = () => {
    for (let i = 0; i < 10; i++) {
      document.getElementById(`div${i}`).addEventListener('click', (e) => {
        displayNums(i);
      })
    }
  }
  addNumListeners();
  
  let keys = []
  
  const keysReleased = (e) => {
  
    keys[e.keyCode] = false;
  }
  
  const keysPressed = (e) => {

    keys[e.keyCode] = true;
      console.log(e.keyCode)
      if (keys[16] && keys[56]) {
        longForm.innerHTML += ' x ';
        operBtnSequence('multiply');
        keys[56] = false;
      }
      for (let i = 0; i < 10; i++) {
        if (keys[48+i]) {
          displayNums(i);
        }
      }
      if (keys[187] && keys[16]) {
        longForm.innerHTML += ' + ';
        operBtnSequence('add');
        keys[187] = false
      }
      if (keys[189]) {
        longForm.innerHTML += ' - ';
        operBtnSequence('minus');
      }
      if (keys[88]) { 
        longForm.innerHTML += ' x ';
        operBtnSequence('multiply');
      }
      if (keys[191]) { 
        longForm.innerHTML += ' / ';
        operBtnSequence('divide');
      }
      if (keys[190]) {
        displayDecimal();
        console.log('the decimal key was pressed')
      }
      if (keys[13] || keys[187])  {
        equalsBtnPressed = true;
        longForm.innerHTML += ' = ';
        operBtnSequence(lastOperation);
      }
      if (keys[67]) {
        clearAll();
      }
      if (keys[8]) {
        backspacePress()
      }
    }
  
  window.addEventListener('keydown', keysPressed, false);
  window.addEventListener('keyup', keysReleased, false);
  
  decimalBtn.addEventListener('click', (e) => {
     displayDecimal();
  })
  
  clear.addEventListener('click', (e) => {
     clearAll();
  });
  
  backspace.addEventListener('click', (e) => {
    backspacePress()
  })
  
  plusBtn.addEventListener('click', (e) => {
    longForm.innerHTML += ' + ';
    operBtnSequence('add');
  });
  
  minusBtn.addEventListener('click', (e) => {
    longForm.innerHTML += ' - ';
    operBtnSequence('minus');
  });
  
  multiplyBtn.addEventListener('click', (e) => {
    longForm.innerHTML += ' x ';
    operBtnSequence('multiply');
  });
  
  divideBtn.addEventListener('click', (e) => {
    longForm.innerHTML += ' / ';
    operBtnSequence('divide');
  });
  
  equalsBtn.addEventListener('click', (e) => {
    equalsBtnPressed = true;
    longForm.innerHTML += ' = ';
    operBtnSequence(lastOperation);
  })