'use strict'
let arr = new Array();
const lower = 1;
const upper = 500;
let count = 10;

// create randomly generated array on start up
window.onload = function(){
    // set algorithm
    let algo;
    algo = localStorage.getItem("sort");
    if(algo == null)
        algo = "bubble"
    document.getElementsByClassName("current")[0].classList.remove("current");
    document.getElementById(algo).classList.add("current");
    // randomly create array and fill
    for (let counter  = 0; counter < count; counter++){
        let randomNum = Math.floor(Math.random()*(upper - lower + 1) + lower);
        arr.push(parseInt(randomNum));
    }
    let nums =  document.getElementById("numbers");
    arr.forEach((item)=>{
        let div = document.createElement("div");
        div.setAttribute("class","element");
        div.innerText = item;
        div.style.height =`${item}px`;
        nums.appendChild(div);
    })
}


async function sort(){
    let algo = Number(document.querySelector(".current").getAttribute("algo"));
    if(algo == 1)
        bubble(arr);
    if(algo == 2)
        gnome(arr);
    if(algo == 3)
        insertion(arr);
    if(algo == 4){
        await mergeSort(arr, 0, arr.length-1);
        let nums =  document.getElementById("numbers");
        for(let i = 0; i < nums.children.length; i++) nums.children[i].setAttribute("class","element sorted");
    }
    if(algo == 5){
        await quick(arr, 0, arr.length-1);
        let nums =  document.getElementById("numbers");
        for(let i = 0; i < nums.children.length; i++) nums.children[i].setAttribute("class","element sorted");
    }
    if(algo == 6)
        radix(arr);
    if(algo == 7)
        selectionS(arr);
}

async function generate(){
    let ct = Number(document.getElementById("count").value);
    if(ct < 1)
        ct = 10;
    if(ct > 40)
        ct = 40;
    arr.length = ct;
    // generate new values
    for (let counter  = 0; counter < ct; counter++){
        let randomNum = Math.floor(Math.random()*(upper - lower + 1) + lower);
        arr[counter] = parseInt(randomNum);
    }
    let nums =  document.getElementById("numbers");
    // create/delete divs to get same amount as count
    while(nums.children.length < ct){
        let div = document.createElement("div")
        nums.appendChild(div);
    }
    while(nums.children.length > ct){
        nums.removeChild(nums.firstChild);
    }
    // update values
    for(let i = 0; i < arr.length; i++){
        nums.children[i].setAttribute("class", "element");
        nums.children[i].innerText = arr[i];
        nums.children[i].style.height = `${arr[i]}px`;
    }
}

async function setCurrent(id){   
    localStorage.setItem("sort", id);
    location.reload();
}