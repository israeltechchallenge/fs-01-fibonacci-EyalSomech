let history = [];


window.onload = () => {
  let elmButton = document.getElementById("is");
  elmButton.addEventListener("click", oncalc);
  resultHistory();
};

function spinnerOn(id) {
  let sButton = document.getElementById(id);
  sButton.classList.remove("d-none");
}

function spinnerOff(id) {
  let sButton = document.getElementById(id);
  sButton.classList.add("d-none");
}

function fibonacci_remote(index) {
  spinnerOn("loader");
  fetch("http://localhost:5050/fibonacci/" + index)
    .then((response) => {
      if (response.ok) return response.json();
      else {
        return response.text().then((responseText) => {
          throw new Error(responseText);
        });
      }
    })
    .then((data) => {
      document.getElementById("sequence").innerHTML = data["result"];
      spinnerOff("loader");
      clearErr();
      resultHistory();
    })
    .catch((error) => {
      displyError(error);
      spinnerOff("loader");
    });
}

function displyError(badText) {
  let displyErr = document.getElementById("err");
  displyErr.innerHTML = badText;
  displyErr.classList.remove("d-none");
  clearSequance();
  clearValidation();
}

function clearErr() {
  let displyErr = document.getElementById("err");
  displyErr.innerHTML = "";
  displyErr.classList.add("d-none");
}

function oncalc() {
  let elmIndex = document.getElementById("index");
  let index = elmIndex.value;
  if (index > 50) {
    displayValidation("Can't be larger than 50");
    return;
  }

  clearValidation();
  clearErr();

  fibonacci_remote(parseInt(elmIndex.value));
}

function displayValidation(badText) {
  let displayVal = document.getElementById("validation");
  displayVal.innerHTML = badText;

  let displayIndex = document.getElementById("index");
  displayIndex.classList.add("is-invalid");
  clearErr();
  clearSequance();
}

function clearValidation() {
  let displayVal = document.getElementById("validation");
  displayVal.innerHTML = "";

  let displayIndex = document.getElementById("index");
  displayIndex.classList.remove("is-invalid");
}

function clearSequance() {
  let clear = document.getElementById("sequence");
  clear.innerHTML = "";

}

function resultHistory() {
  spinnerOn("loader-result");
  fetch("http://localhost:5050/getFibonacciResults")
    .then(response =>  response.json()) 
    .then(data => {
    history = data.results;
    renderHistory();
   });

}

function renderHistory() {
  let displayHistory = document.getElementById("display-history");
  for (let result of history){
    let elm = document.createElement("div");
    let date = new Date(result.createdDate);
    debugger;
    elm.innerHTML =`<span><u> The Fibonacci of <strong>${result.number}</strong> Is <strong>${result.result}</strong>. Caculated at: ${date} </u> </span>`;  
    displayHistory.appendChild(elm);
  }

  spinnerOff("loader-result");
}








