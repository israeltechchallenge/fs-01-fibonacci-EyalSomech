window.onload = () => {
  let elmButton = document.getElementById("is");
  elmButton.addEventListener("click", oncalc);
};

function spinnerOn() {
  let sButton = document.getElementById("loader");
  sButton.classList.remove("d-none");
}

function spinnerOff() {
  let sButton = document.getElementById("loader");
  sButton.classList.add("d-none");
}

function fibonacci_remote(index) {
  spinnerOn();
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
      spinnerOff();
      clearErr();
    })
    .catch((error) => {
      displyError(error);
      spinnerOff();
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