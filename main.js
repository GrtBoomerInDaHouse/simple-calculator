const btn = document.querySelectorAll("button");

const input = document.querySelector(".h1-input");

const output = document.querySelector(".h1-output");


const footer = document.querySelector('.footer');

let a = new Date().getFullYear()
console.log(a)

footer.innerHTML = ` <p>smallNumbers &copy; </p>  <strong>${a}</strong> `

let storedNumber = "";
currNumber = "";
currResult = 0;
operator = "";

listenAll("click", ".digit", (e) => {
  currNumber += e.target.textContent;

  if (storedNumber === "") {
    input.textContent = currNumber;
  } else {
    input.textContent = storedNumber + currNumber;
  }
  prevOverFlow();
});

listenAll("click", ".dot", (e) => {
  if (currNumber.includes(".")) {
    return;
  } else {
    currNumber += e.target.textContent;
    input.textContent = storedNumber + currNumber;
  }
});

listenAll("click", ".operator", (e) => {
  if (currNumber === "") {
    return;
  } else {
    currOperator = e.target.textContent;
    storedNumber += currNumber + currOperator;
    input.textContent = storedNumber;

    operator = currOperator;

    currNumber = "";
    currResult = "";
    output.textContent = currResult;
  }
});

listenAll("click", ".clear", (e) => {
  currNumber = "";
  currResult = "";
  storedNumber = "";
  input.textContent = "0";
  output.textContent = "";
  operator = "";
});

listenAll("click", ".delete", (e) => {
  if (storedNumber !== "" && currNumber === "") {
    storedNumber = storedNumber.slice(0, storedNumber.length - 1);
    input.textContent = storedNumber + currNumber;
  } else {
    currNumber = currNumber.slice(0, currNumber.length - 1);
    input.textContent = storedNumber + currNumber;
  }
});

listenAll("click", ".equal", (e) => {
  storedNumber += currNumber;
  let l = storedNumber.length;
  let op = "-x/+";

  if (storedNumber.length < 2) {
    currResult = currNumber;
  } else if (op.indexOf(storedNumber[l - 1]) !== -1) {
    let prepResult = storedNumber.slice(0, l - 1);

    currResult = result(prepResult);
    clearPostEq()
   
  } else {
    currResult = result(storedNumber);
    clearPostEq ()
  }
  output.textContent = currResult;
});




listenAll("click", ".r", (e) => {
  let i = 0;
  let arr = [];

  while (i < 1200) {
    let random = Math.floor(Math.random() * 10);

    setTimeout(
      () =>
        document
          .getElementById(`${random}`)
          .setAttribute("style", "background:skyblue"),
      0 + i
    );
    arr.push(`${random}`);

    btn.forEach((elem) => {
      setTimeout(() => {
        elem.removeAttribute("style", "background:red");
      }, 300 + i);
    });

    i += 300;

    if (i >= 1200) {
      setTimeout(() => {
        currNumber = arr[arr.length - 1];
        input.textContent = currNumber;
      }, i);
    }
  }
});

function listenAll(event, target, callback) {
  document.addEventListener(event, (e) => {
    if (e.target.matches(target)) callback(e);
  });
}

function prevOverFlow() {
  let inLength = input.textContent.length;
  let outLength = output.textContent.length;

  if (inLength > 10 || outLength > 10) {
    input.setAttribute("style", "font-size:18px");
    output.setAttribute("style", "font-size:20px");
  } else {
    input.removeAttribute("style");
    output.removeAttribute("style");
  }
}



function clearPostEq () {

  currNumber = "";
  storedNumber = ""; 
  input.textContent = "";
}

function result(string) {
  let operators = string.replace(/[\d.]/g, "").split("");

  let operands = string
    .replace(/[-x/+]/g, " ")
    .split(" ")
    .map(parseFloat);

  while (operators.includes("x")) {
    let indexOp = operators.indexOf("x");

    operands.splice(indexOp, 2, operands[indexOp] * operands[indexOp + 1]);

    operators.splice(indexOp, 1);
  }

  while (operators.includes("/")) {
    let indexOp = operators.indexOf("/");
    operands.splice(indexOp, 2, operands[indexOp] / operands[indexOp + 1]);
    operators.splice(indexOp, 1);
  }

  let result = operands[0];
  for (i = 0; i < operators.length; i++) {
    operators[i] === "+"
      ? (result += operands[i + 1])
      : (result -= operands[i + 1]);
  }

  return Math.floor(result * 100) / 100;
}
