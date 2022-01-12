'use strict'
let nums =  document.getElementById("numbers");
let spd = Number(document.getElementById("speed").value);

async function pause(){
    spd = Number(document.getElementById("speed").value);
    return new Promise(resolve => {
        setTimeout(() => { // Promise waits for setTimeout to complete 
            resolve();     // causeing a delay to the return statement
        }, 400/spd);          
    });
}

async function swap(arr,i,j){
    // swap arr
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    nums.children[i].innerText = arr[i];
    nums.children[i].style.height = `${arr[i]}px`;
    nums.children[j].innerText = arr[j];
    nums.children[j].style.height = `${arr[j]}px`;

}
async function greater(i,j){ 
    await pause();
    if(i>j)
        return true;
    return false;
}
async function bubble(arr){
    for(let i = 0; i < nums.children.length; i++){
        nums.children[i].setAttribute("class","element selected");
        for(let j = i + 1; j < nums.children.length; j++){
            nums.children[j].setAttribute("class","element selected");
            if(await greater(Number(arr[i]),Number(arr[j]))){
                await swap(arr, i, j);
            }
            nums.children[j].setAttribute("class","element");
        }
        nums.children[i].setAttribute("class","element sorted");
    }
}