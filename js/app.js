'use strict'
var votes = document.getElementById('votes')
var resultsWordDisplay = document.createElement('strong')
votes.appendChild(resultsWordDisplay)
resultsWordDisplay.textContent = 'Results: '

//constructor:
var collections = []
var productsName = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']
function Product(name, path) {
    this.name = name
    this.path = path

    this.numberOfClicks = 0;
    this.numberOfTimesShown = 0;
}

for (let index = 0; index < productsName.length; index++) {

    var productObject = new Product(productsName[index], `/images/${productsName[index]}.jpg`)
    collections.push(productObject)

}

function oneRandomNo() {
    //random number from zero to 20 (length of collection)
    var randomNo = Math.floor(Math.random() * collections.length)
    return randomNo

}
var leftIndex = oneRandomNo()
var midIndex = oneRandomNo()
var rightIndex = oneRandomNo()

function oneRandomPath() {
    //random number from zero to 20 (length of collection)
    var randomNo = Math.floor(Math.random() * collections.length)
    //random path
    return collections[randomNo].path

}

function randomImg() {
    
        var leftImgsrc = oneRandomPath()
        var midImgsrc = oneRandomPath()
        var rightImgsrc = oneRandomPath()

    


    while (leftImgsrc === midImgsrc || leftImgsrc === rightImgsrc || midImgsrc === rightImgsrc || leftImgsrc === midImgsrc === rightImg) {
        leftImgsrc = oneRandomPath()
        midImgsrc = oneRandomPath()
        rightImgsrc = oneRandomPath()
    }
    //images section rendering:
    var leftImg = document.getElementById('leftImg')
    var midImg = document.getElementById('midImg')
    var rightImg = document.getElementById('rightImg')
    while (leftIndex === midIndex || leftIndex === rightIndex || midIndex === rightIndex || leftIndex === midIndex === rightIndex) {
        leftIndex = oneRandomPath()
        midIndex = oneRandomPath()
        rightIndex = oneRandomPath()
    }

    // count the number of times these were shown
    collections[leftIndex].numberOfTimesShown += 1;
    collections[midIndex].numberOfTimesShown += 1;
    collections[rightIndex].numberOfTimesShown += 1;

    leftImg.setAttribute('src', leftImgsrc)
    midImg.setAttribute('src', midImgsrc)
    rightImg.setAttribute('src', rightImgsrc)
}
randomImg()

var imgSection = document.getElementById('imgSec')
imgSection.addEventListener('click', clickFnc);


var totalClicks = 0
function clickFnc() {
    if (totalClicks < 25) {

        var clickedElement = event.target;
        var clickedElementId = clickedElement.id;

        if (clickedElementId === 'leftImg' || clickedElementId === 'midImg' || clickedElementId === 'rightImg') {
            totalClicks += 1;
        }

            if (clickedElementId === 'leftImg') {
                collections[leftIndex].numberOfClicks += 1;
            }
            if (clickedElementId === 'midtImg') {
                collections[midIndex].numberOfClicks += 1;
            }

            if (clickedElementId === 'rightImg') {
                collections[rightIndex].numberOfClicks += 1;
                console.log(collections[rightIndex].numberOfClicks += 1)
            }

            randomImg();
        } else {
            generateUserMessage();
            imgSection.removeEventListener('click', clickFnc);
        }
    }

function generateUserMessage() {
    for (let index = 0; index < collections.length; index++) {
        var list = document.createElement('li')
        votes.appendChild(list)

        list.textContent = collections[index].name + ' had ' + collections[index].numberOfClicks + ' votes and was shown ' + collections[index].numberOfTimesShown + ' times '
    }


} 
//comment