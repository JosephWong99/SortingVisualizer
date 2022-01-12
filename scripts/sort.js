'use strict'
let nums =  document.getElementById("numbers");
let spd = Number(document.getElementById("speed").value);
async function getSpeed(){
    spd = Number(document.getElementById("speed").value);
    if(spd < 1)
        spd = 10;
}
async function pause(){
    return new Promise(resolve => {
        setTimeout(() => { // Promise waits for setTimeout to complete 
            resolve();     // causeing a delay to the return statement
        }, 4400/spd);          
    });
}

async function swap(arr,i,j){
    // swap arr
    await pause();
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
// two pointers i and j
// i is incremented when j reaches end of array
// if arr[i] > arr[j] swap elements
// repeat until i reaches end of array

// since j goes to the end of the array everytime
// by the time it reaches the end the smallest
// element should be swaped to index i
async function bubble(arr){
    await getSpeed();
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
// one pointer gnome
// if gnome is at the beginning move forward
// if gnomes element is smaller than previous, swap
//    and move backwards one
// if gnome element is bigger move forward
// repeat until gnome reaches end

// everytime the gnome finds a smaller value
// it will keep moving back until it finds
// a position where the current element greater than the one behind 
async function gnome(arr){
    await getSpeed();
    for(let gnome = 0; gnome < nums.children.length;){
        nums.children[gnome].setAttribute("class","element selected");
        if(gnome == 0){
            nums.children[gnome].setAttribute("class","element");
            gnome++;
        }else if (await greater(Number(arr[gnome - 1]), Number(arr[gnome]))){
            nums.children[gnome-1].setAttribute("class","element selected");
            await swap(arr, gnome, gnome - 1);
            nums.children[gnome].setAttribute("class","element");
            nums.children[gnome-1].setAttribute("class","element");
            gnome--;
        }else{
            nums.children[gnome].setAttribute("class","element");
            gnome++;
        }
    }
    for(let gnome = 0; gnome < nums.children.length; gnome++) nums.children[gnome].setAttribute("class","element sorted");
}

//
async function radix(arr){
    let highest = await maximum(arr);
    for(let exp = 1; Math.floor(highest/exp) > 0; exp *= 10){
        await countingSort(arr, exp);
        await pause();
    } 
    for(let i = 0; i < nums.children.length; i++) nums.children[i].setAttribute("class","element sorted");
    return;
}

async function countingSort(arr, exp){
    let results = new Array(nums.children.length);
    let counts = [0,0,0,0,0,0,0,0,0,0];
// count occounces of 0-9 at 10^exp
    for(let i = 0; i < nums.children.length; i++) counts[Math.floor(arr[i]/exp)%10]++;
// get starting index of each value
    for(let i = 1; i < 10; i++) counts[i] += counts[i-1];
// create result array
    for(let i = nums.children.length - 1; i >=0; i--) results[--counts[Math.floor(arr[i]/exp)%10]] = Number(arr[i]);
// copy result to nums
    for(let i = 0; i < nums.children.length; i++){
        pause();
        arr[i] = results[i];
        nums.children[i].setAttribute("class", "element");
        nums.children[i].innerText = results[i];
        nums.children[i].style.height = `${results[i]}px`;
    }
    return;
}
async function maximum (arr){
    let max = 0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i] > max){
            max = Number(arr[i]);
        }
    }
    return max;
}