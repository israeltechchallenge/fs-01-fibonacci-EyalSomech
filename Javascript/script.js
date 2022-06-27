let history = [];
let sort = 0;

window.onload = () => {
  let elmButton = document.getElementById("is");
  elmButton.addEventListener("click", oncalc);
  
  let elmSort = document.getElementById("sort");
  elmSort.addEventListener("change", onSort);

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
      displayResult(data["result"]);
      spinnerOff("loader");
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
  let index = parseInt(elmIndex.value);
  if (index > 50) {
    displayValidation("Can't be larger than 50");
    return;
  }

  clearValidation();
  clearErr();

  let elmCheck = document.getElementById("savebox");
  if (elmCheck.checked) {
    fibonacci_remote(index);
  } 
  else {
   let sequence = fibonacciR(index);
   if (sequence >= 0) displayResult(sequence);
  }

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
  
  sortHistory();
  
  let displayHistory = document.getElementById("display-history");
  displayHistory.innerHTML = "";
  for (let result of history){
    let elm = document.createElement("div");
    let date = new Date(result.createdDate);
    elm.innerHTML =`<span><u> The Fibonacci of <strong>${result.number}</strong> Is <strong>${result.result}</strong>. Caculated at: ${date} </u> </span>`;  
    displayHistory.appendChild(elm);
  }

  spinnerOff("loader-result");
}


function fibonacciR(index , prev = 0 , sequence = 1) {
  if (index < 0) {
    displyError("Cannot be negative number");
    return -1;
  }
  if (index == 0) return prev;
  if (index == 1) return sequence;
  return fibonacciR(index - 1 , sequence , sequence + prev);
}

function displayResult(sequence){

  document.getElementById("sequence").innerHTML = sequence;
  
  clearErr();

}

function onSort(event){
  sort = parseInt(this.value);
  renderHistory();

}

function sortHistory(){
 
  switch (sort) {
    case 1:  
      history = history.sort((a, b) => a.createdDate - b.createdDate);
      break; 
    case 2:
      history =  history.sort((a, b) => b.createdDate - a.createdDate);
      break;
    case 3:
      history =  history.sort((a, b) => a.number - b.number);
      break;
    case 4:
      history =  history.sort((a, b) => b.number - a.number);
          break; 
  }
  debugger;
  


}






