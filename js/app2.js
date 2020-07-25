'use strict';
var votes = document.getElementById('votes')
var resultsWordDisplay = document.createElement('strong')
votes.appendChild(resultsWordDisplay)
resultsWordDisplay.textContent = 'Results: '


var imageSec = document.getElementById('imgSec');
var collections = [];
var O = 0;
var rightindex;
var leftindex;
var midindex;
var leftClicksArray = []
var midClicksArray = []
var rightClicksArray = []
var pushedClicks 
var pushedViews 


var productsName = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']
function Product(name, path) {
    this.name = name;
    this.path = path;
    this.clicks = 0;
    this.viewed = 0;
}
for (let index = 0; index < productsName.length; index++) {

    var productObject = new Product(productsName[index], `/images/${productsName[index]}.jpg`)
    collections.push(productObject)
}


function randomNumber() {
    var number = Math.floor(Math.random() * collections.length);
    return number;
}
randomImageFunc();
function randomImageFunc() {
    var leftImg = document.getElementById('leftImg');
    var midImg = document.getElementById('midImg');
    var rightImg = document.getElementById('rightImg');
    leftindex = randomNumber();
    midindex = randomNumber();
    rightindex = randomNumber();
    while (leftindex === midindex || leftindex === rightindex) {
        leftindex = randomNumber();
    }
    while (rightindex === leftindex || rightindex === midindex) {
        rightindex = randomNumber();
    }
    leftClicksArray.push(leftindex)
    midClicksArray.push(midindex)
    rightClicksArray.push(rightindex)


    for (let index = 1; index < rightClicksArray.length; index++) {
        while (leftClicksArray[index] === midClicksArray[index - 1] || leftClicksArray[index] === rightClicksArray[index - 1] || leftClicksArray[index] === leftClicksArray[index - 1]) {
            leftClicksArray[index] = randomNumber();
        }

        for (let index = 1; index < rightClicksArray.length; index++) {
            while (rightClicksArray[index] === leftClicksArray[index - 1] || rightClicksArray[index] === midClicksArray[index - 1] || rightClicksArray[index] === rightClicksArray[index - 1]) {
                rightClicksArray[index] = randomNumber();
            }
        }
        for (let index = 1; index < rightClicksArray.length; index++) {
            while (midClicksArray[index] === midClicksArray[index - 1] || midClicksArray[index] === rightClicksArray[index - 1] || midClicksArray[index] === leftClicksArray[index - 1]) {
                midClicksArray[index] = randomNumber();
            }
        }
    }
  /*  var check = []
for (let index = 1; index < rightClicksArray.length; index++) {
   var check1 = leftClicksArray[index] - leftClicksArray[index-1]
   var check2 = leftClicksArray[index] - midClicksArray[index-1]
   var check3 = leftClicksArray[index] - rightClicksArray[index-1]
   
   var check4 = midClicksArray[index] - leftClicksArray[index-1]
   var check5 = midClicksArray[index] - midClicksArray[index-1]
   var check6 = midClicksArray[index] - rightClicksArray[index-1]

   var check7 = rightClicksArray[index] - leftClicksArray[index-1]
   var check8 = rightClicksArray[index] - midClicksArray[index-1]
   var check9 = rightClicksArray[index] - rightClicksArray[index-1]
   check.push(check1)
   check.push(check2)
   check.push(check3)
   check.push(check4)
   check.push(check5)
   check.push(check6)
   check.push(check7)
   check.push(check8)
   check.push(check9)

   //console.log(check)
}
if (check != 0) {
    console.log('great coding')
}
*/

    var leftsrc = collections[leftindex].path;
    var midsrc = collections[midindex].path;
    var rightsrc = collections[rightindex].path;
    collections[leftindex].viewed += 1;
    collections[midindex].viewed += 1;
    collections[rightindex].viewed += 1;
    leftImg.setAttribute('src', leftsrc);
    midImg.setAttribute('src', midsrc);
    rightImg.setAttribute('src', rightsrc);
}
imageSec.addEventListener('click', clicksNumber);
function clicksNumber() {
    if (O < 24) {
        var clickedProduct = event.target;
        var clickedProductId = clickedProduct.id;
        if (clickedProductId === 'leftImg' || clickedProductId === 'midImg' || clickedProductId === 'rightImg') {
            O += 1;
        }
        if (clickedProductId === 'leftImg') {
            collections[leftindex].clicks += 1;
        }
        if (clickedProductId === 'midImg') {
            collections[midindex].clicks += 1;
        }
        if (clickedProductId === 'rightImg') {
            collections[rightindex].clicks += 1;
        }
        randomImageFunc();
       
    }
    else {
        finalMassege();
        clicksAndViewsForChartsFunc();
        chartFunc();
        imageSec.removeEventListener('click', clicksNumber);
    }
}

function finalMassege() {
    for (let index = 0; index < collections.length; index++) {
        var list = document.createElement('li')
        votes.appendChild(list)

        list.textContent = collections[index].name + ' had ' + collections[index].clicks + ' votes and was shown ' + collections[index].viewed + ' times '
    
    }

}


/*function clicksAndViewsForChartsFunc (){
    pushedClicks = []
         pushedViews = []
    for (let index = 0; index < collections.length; index++) {
     pushedClicks.push(collections[index].clicks)
     pushedViews.push(collections[index].viewed) 
     console.log(pushedClicks)

}}*/

function chartFunc() {


    var ctx = document.getElementById('myChart').getContext('2d')
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productsName,
            datasets: [{
                label: '# of clicks for each product',
                 data: pushedClicks,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }, 
            {
                label: '# of views for each product',
                 data: pushedViews,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

//here
console.table(collections)