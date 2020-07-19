'use strict'

/*<section id="votes">
<strong id "resultsWordDisplay">Results:</strong>
<li id "list "><p id 'imageWordDisplay'>Image 1: </p><em></em><p id ' votesWordDisplay'> Votes</p></li> 
</section>
*/
var votes = document.getElementById('votes')
var resultsWordDisplay = document.createElement ('strong')
votes.appendChild (resultsWordDisplay)
resultsWordDisplay.textContent = 'Results: '

var list = document.createElement('li')
votes.appendChild(list)

var imageWordDisplay = document.createElement('p')
list.appendChild(imageWordDisplay)
imageWordDisplay.textContent = 'Image 1: '

var clicksNoDisplay = document.createElement('em')
list.appendChild(clicksNoDisplay)
clicksNoDisplay.textContent = '5'

var votesWordDisplay = document.createElement('p')
list.appendChild(votesWordDisplay)
votesWordDisplay.textContent = " Votes"