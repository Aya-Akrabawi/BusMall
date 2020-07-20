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
var productsName = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']
function Product (name, path) {
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
  var leftsrc = collections[leftindex].path;
  console.log(leftsrc)
  var midsrc = collections[midindex].path;
  var rightsrc = collections[rightindex].path;
  collections[leftindex].viewed += 1;
  collections[midindex].viewed += 1;
  collections[rightindex].viewed += 1;
  leftImg.setAttribute('src', leftsrc);
  midImg.setAttribute('src', midsrc);
  rightImg.setAttribute('src', rightsrc);
}
console.log(collections[midindex].path    )
imageSec.addEventListener('click', clicksNumber);
function clicksNumber() {
  if (O < 25) {
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

console.table(collections)