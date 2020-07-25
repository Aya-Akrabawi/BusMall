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
var prevClicksArray = []
var pushedClicks = []
var pushedViews = []


var productsName = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']
function Product(name, path) {
    this.name = name;
    this.path = path;
    this.clicks = 0;
    this.viewed = 0;
}
for (let index = 0; index < productsName.length; index++) {

    var productObject = new Product(productsName[index], `images/${productsName[index]}.jpg`)
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
    for (let index = 0; index < prevClicksArray.length; index++) {
        if (leftindex === prevClicksArray[index]) {
            leftindex = randomNumber()
            while (leftindex === midindex || leftindex === rightindex) {
                leftindex = randomNumber();
            }
            while (rightindex === leftindex || rightindex === midindex) {
                rightindex = randomNumber();
            }
        }
        if (midindex === prevClicksArray[index]) {
            midindex = randomNumber()
            while (leftindex === midindex || leftindex === rightindex) {
                leftindex = randomNumber();
            }
            while (rightindex === leftindex || rightindex === midindex) {
                rightindex = randomNumber();
            }
        }
        if (rightindex === prevClicksArray[index]) {
            rightindex = randomNumber()
            while (leftindex === midindex || leftindex === rightindex) {
                leftindex = randomNumber();
            }
            while (rightindex === leftindex || rightindex === midindex) {
                rightindex = randomNumber();
            }
        }

    }

    prevClicksArray[0] = leftindex
    prevClicksArray[1] = midindex
    prevClicksArray[2] = rightindex


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
        storeProducts()
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

function clicksAndViewsForChartsFunc (){
    for (let index = 0; index < collections.length; index++) {
     pushedClicks.push(collections[index].clicks)
     pushedViews.push(collections[index].viewed) 

}}
function storeProducts(){
    //in order to save our array of objects into the localstorage we
     //will need to formate our json object in json string
    var jsonStringProducts = JSON.stringify(collections);
    // creare a new property in our localstorage 
    localStorage.setItem('savedProducts',jsonStringProducts);
  }
  console.log('before updatig');
  console.table(collections);
  parseLocalStorage();
  console.log('after updating');
  console.table(collections);
  // this function is responsible for parsing the json string to json object 
  function parseLocalStorage(){
    var previousProductsArr =JSON.parse(localStorage.getItem('savedProducts'))
    //console.log(previousProductsArr);
    // this funtcion will update the newly created objects with the old literation values
    update(previousProductsArr);
  
  }

  function update(previousProductsArr){
    for (let index = 0; index < collections.length; index++) {
      collections[index].clicks = previousProductsArr[index].clicks;
      
      collections[index].viewed = previousProductsArr[index].viewed;
      
    }
    //console.log(previousProductsArr)
     // console.table(collections)
  }



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
