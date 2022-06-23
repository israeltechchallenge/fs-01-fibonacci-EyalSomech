window.onload = () => {
    
    let index = 8;
    let r = fibonacci(index);  

    let elmSequence =  document.getElementById('sequence');
    let elmIndex = document.getElementById('index');

    elmSequence.innerHTML = r;  
    elmIndex.innerHTML = index;

    
}

function fibonacci(index) {
    if (index < 2) return index;

    let sequence = 1;
    let prev = 0;
    for (let i = 2; i <= index; i++) {

        let temp = prev;
        prev = sequence;
        sequence = sequence + temp;

    }
    

    return sequence;

}
