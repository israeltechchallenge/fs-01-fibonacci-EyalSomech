window.onload = () => {
    

    let elmButton =  document.getElementById('is');
    elmButton.addEventListener('click' , oncalc);
  
    
}

function fibonacci_remote(index) {

    fetch('http://localhost:5050/fibonacci/' + index)
        .then(response => response.json())


        .then(data => document.getElementById('sequence').innerHTML = data['result']);

        
    

}


function oncalc () {
    
    let elmIndex = document.getElementById('index');

    // let r = 
    fibonacci_remote(parseInt(elmIndex.value));  

    // let elmSequence =  document.getElementById('sequence');

    // // elmSequence.innerHTML = r;  

    
}
