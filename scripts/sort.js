'use strict'
let nums =  document.getElementById("numbers");
let spd = Number(document.getElementById("speed").value);

// ##### Helper Functions #####
// get speed from number text input
async function getSpeed(){
    spd = Number(document.getElementById("speed").value);
    if(spd < 1)
        spd = 20;
}

// this function causes a delay based on spd value chosen
// mainly used to show when a swap is being shown while sorting
async function pause(){
    return new Promise(resolve => {
        setTimeout(() => { // Promise waits for setTimeout to complete 
            resolve();     // causeing a delay to the return statement
        }, 4400/spd);          
    });
}

// swap elements at index i and j in array arr
async function swap(arr,i,j){
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
// ##### Bubble Sort #####
// two pointers i and j
// i is incremented when j reaches end of array
// if arr[i] > arr[j] swap elements
// repeat until i reaches end of array

// since j goes to the end of the array everytime
// by the time it reaches the end the smallest
// element should be swaped to index i
async function bubble(arr){
    await getSpeed();
    for(let i = 0; i < arr.length; i++){
        nums.children[i].setAttribute("class","element selected");
        for(let j = i + 1; j < arr.length; j++){
            nums.children[j].setAttribute("class","element selected");
            if(await greater(Number(arr[i]),Number(arr[j]))){
                await swap(arr, i, j);
            }
            nums.children[j].setAttribute("class","element");
        }
        nums.children[i].setAttribute("class","element sorted");
    }
}
// ##### Gnome Sort #####
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
    for(let gnome = 0; gnome < arr.length;){
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
    for(let gnome = 0; gnome < arr.length; gnome++) nums.children[gnome].setAttribute("class","element sorted");
}
// ##### Insertion Sort #####
//
async function insertion(arr){ 
    await getSpeed(); 
    for(let i = 0; i < arr.length - 1; i++){
        let j = i;
        await pause();
        while(j >= 0 && await greater(Number(arr[j]), Number(arr[j+1]))) {
            nums.children[j].setAttribute("class","element selected");
            nums.children[j+1].setAttribute("class","element selected");
            await pause();
            await swap(arr, j, j+1);
            await pause();
            nums.children[j].setAttribute("class","element");
            nums.children[j+1].setAttribute("class","element");
            j--;
        }
    }
    for(let i = 0; i < arr.length; i++) nums.children[i].setAttribute("class","element sorted");
}
// ##### Merge Sort #####
//
async function mergeSort(arr, start, end){
    await getSpeed();
    if(start >= end) return;
    let mid = Math.floor((end - start)/2) + start;
    await mergeSort(arr, start, mid);
    await mergeSort(arr, mid + 1, end);
    await merge(arr, start, mid, end);
}
async function merge(arr, start, mid, end){
    let temp = new Array();
    let indx1 = start;
    let indx2 = mid + 1;
    while(indx1 <= mid && indx2 <= end){
        let val1 = Number(arr[indx1]);
        let val2 = Number(arr[indx2]);
        if(val1>=val2){
            temp.push(val2);
            indx2++;
        }else{
            temp.push(val1);
            indx1++;
        }
    }
    while(indx1 <= mid) {
        temp.push(Number(arr[indx1]));
        ++indx1;
    }
    while(indx2 <= end) {
        temp.push(Number(arr[indx2]));
        ++indx2;
    }
    for(let i = start; i <= end; i++){
        nums.children[i].setAttribute("class","element selected");
    }
    for(let i = start, h = 0 ; i <= end && h < temp.length; ++i, ++h) {
        await pause();
        arr[i] = temp[h];
        nums.children[i].innerText = temp[h];
        nums.children[i].style.height = `${temp[h]}px`;
    }
    for(let i = start; i <= end; i++){
        nums.children[i].setAttribute("class", "element");
    }
    await pause();
}
// ##### Quick Sort #####
//
async function quick(arr, start, end){
    await getSpeed(); 
    if(start < end){ // needed to prevent segfault from edge cases
        let indexParition = await partition(arr, start, end); // move partition to correct index
        await quick(arr, start,indexParition-1); // sort elements before partition
        await pause();
        await quick(arr, indexParition+1,end); // sort elements after partition
        await pause();
    }
}
async function partition(arr, start, end){
    let pivot = Number(arr[end]);
    let i = start - 1;
    await pause();
    nums.children[end].setAttribute("class","element selected");
    await pause();
// look at all elements if value is smaller than pivot move it far left as possible
    for(let j = start; j < end; j++){ 
        let cur = Number(arr[j]);
        await pause();
        nums.children[j].setAttribute("class","element selected");
        await pause();
        if(cur < pivot) {
            i++;
            await pause();
            nums.children[i].setAttribute("class","element selected");
            await pause();
            await swap(arr, j, i);
            await pause();
            nums.children[i].setAttribute("class","element");
            await pause();
        }
        await pause();
        nums.children[j].setAttribute("class","element");
        await pause();
    }
// put pivot in position
    await swap(arr, ++i, end);
    await pause();
    nums.children[end].setAttribute("class","element");
    await pause();
    return i;
}
// ##### Radix Sort #####
//
async function radix(arr){
    await getSpeed();
    let lr = 15;
    if(spd < 20)
        lr = 8;
    let highest = await maximum(arr);
    for(let exp = 1; Math.floor(highest/exp) > 0; exp *= 10){
        for(let i = 0; i < lr; i++){
            await pause();
        }
        await countingSort(arr, exp);
    } 
    for(let i = 0; i < arr.length; i++) nums.children[i].setAttribute("class","element sorted");
    return;
}

async function countingSort(arr, exp){
    let results = new Array(arr.length);
    let counts = [0,0,0,0,0,0,0,0,0,0];
// count occounces of 0-9 at 10^expth place
    for(let i = 0; i < arr.length; i++) counts[Math.floor(arr[i]/exp)%10]++;
// get starting index of each value
    for(let i = 1; i < 10; i++) counts[i] += counts[i-1];
// create result array
    for(let i = arr.length - 1; i >=0; i--) results[--counts[Math.floor(arr[i]/exp)%10]] = Number(arr[i]);
// copy result to nums
    for(let i = 0; i < arr.length; i++){
        arr[i] = results[i];
        nums.children[i].setAttribute("class", "element");
        nums.children[i].innerText = results[i];
        nums.children[i].style.height = `${results[i]}px`;
    }
    return;
}
// find maximum value in array to
// know when radix sort is finished
async function maximum (arr){
    let max = 0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i] > max){
            max = Number(arr[i]);
        }
    }
    return max;
}
// ##### Selection Sort #####
async function selectionS(arr){
    for(let i = 0; i < arr.length - 1; i++){
        let min = i;
        for(let j = i + 1; j < arr.length; j++){
            nums.children[min].setAttribute("class","element selected");
            nums.children[j].setAttribute("class","element selected");
            if(await greater(Number(arr[min]),Number(arr[j]))){
                nums.children[min].setAttribute("class","element");
                min = j;
            }
            nums.children[j].setAttribute("class","element");
            nums.children[min].setAttribute("class","element selected");
        }
        await swap(arr, min, i);
        nums.children[min].setAttribute("class","element");
        nums.children[i].setAttribute("class","element sorted");
    }
    nums.children[arr.length-1].setAttribute("class","element sorted");
}

