window.onload = () => {
    

    let elmButton =  document.getElementById('is');
    elmButton.addEventListener('click' , oncalc);
  
    
}
// Loop Function //
// function fibonacci(index) {
//     if (index < 2) return index;

//     let sequence = 1;
//     let prev = 0;
//     for (let i = 2; i <= index; i++) {

//         let temp = prev;
//         prev = sequence;
//         sequence = sequence + temp;

//     }
    

//     return sequence;

// }


function oncalc () {
    
    let elmIndex = document.getElementById('index');

    let r = fibonacciR(parseInt(elmIndex.value));  

    let elmSequence =  document.getElementById('sequence');

    elmSequence.innerHTML = r;  

    
}

// recursive function

function fibonacciR(index , prev = 0 , sequence = 1) {
    if (index == 0) return prev;
    if (index == 1) return sequence;
    return fibonacciR(index - 1 , sequence , sequence + prev);



}