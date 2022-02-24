'use strict'
///global variables///

let votesAllowed = 25//decrement to end voting
let ctx = document.getElementById('my-chart').getContext('2d')///canvas element
////local storage
let retrievedProducts = localStorage.getItem('products');///pull outta local storage
let parsedProducts = JSON.parse(retrievedProducts);//parse the data so it can be read



let allProducts = []

let myContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-1');
let imgTwo = document.getElementById('img-2');
let imgThree = document.getElementById('img-3');

let resultsBtn = document.getElementById('results-btn');
// let showResults = document.getElementById('results-list');


function product(name, fileExtension = 'jpg') {
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  this.src = `img/${name}.${fileExtension}`;

  allProducts.push(this);//pushes objects into the allProducts array
}

///local storage
if(retrievedProducts){
  allProducts = parsedProducts;///if there is local storage, use it
} else{///if no local storage, instantiate new objects

  //for png ('name', 'png')
  new product('bag')///call all the 'new products'
  new product('banana');
  new product('bathroom');
  new product('boots');
  new product('breakfast');
  new product('bubblegum');
  new product('chair');
  new product('cthulhu');
  new product('dog-duck');
  new product('dragon');
  new product('pen');
  new product('pet-sweep');
  new product('scissors');
  new product('shark');
  new product('sweep', 'png');
  new product('tauntaun');
  new product('unicorn');
  new product('water-can');
  new product('wine-glass');

}


console.log(allProducts)//checks the array on line 6

//executable code//

//render images//
//need a random number between 0 and the length of the array -1//
function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length)
}


let shownProducts = [];//holds our '6' nums//

function renderImgs() {

  while (shownProducts.length < 6) {//as long as //set this to 6 numbers also
    let randomnums = getRandomIndex();
    while (!shownProducts.includes(randomnums)) { //if the number is not present '!' 
      shownProducts.push(randomnums);
    }
  }
  

  //[1,2,3,4,5,6]

  let productOneIndex = shownProducts.shift();//switch to .shift
  let productTwoIndex = shownProducts.shift();
  let productThreeIndex = shownProducts.shift();

  imgOne.src = allProducts[productOneIndex].src
  imgOne.alt = allProducts[productOneIndex].name
  allProducts[productOneIndex].views++

  imgTwo.src = allProducts[productTwoIndex].src
  imgTwo.alt = allProducts[productTwoIndex].name
  allProducts[productTwoIndex].views++

  imgThree.src = allProducts[productThreeIndex].src
  imgThree.alt = allProducts[productThreeIndex].name
  allProducts[productThreeIndex].views++

  console.log(allProducts)
}

renderImgs();


///Event Listener//

//listener one click//
function handleClick(event) {
  votesAllowed--;//decrement votes
  let imgclicked = event.target.alt

  for (let i = 0; i < allProducts.length; i++) {///increments individual votes
    if (imgclicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }

  renderImgs()//re renders without refreshing

  if (votesAllowed === 0) {
    myContainer.removeEventListener('click', handleClick);
    renderChart();
    ///local storage///
    let stringies = JSON.stringify(allProducts);///first stringify 
    localStorage.setItem('products', stringies);
  }
}




//grab what we want to listen to//
myContainer.addEventListener('click', handleClick)
// resultsBtn.addEventListener('click', handleShowResults)

///////Chart
function renderChart() {
  //array of all product names for chart
  let productNames = []
  let productClicks = []
  let productViews = []
  //shiftulates product arrays
  
  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productClicks.push(allProducts[i].clicks);
    productViews.push(allProducts[i].views);
  }
  console.log(productNames, 'this is product names');
  console.log(productClicks, 'this is product clicks');
  console.log(productViews, 'this is product views')


  let chartObject = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Clicks',
        data: productClicks,//********** data here*/
        backgroundColor: [
          '#718355'
        ],
        borderColor: [
          '#fefae0'
        ],
        borderWidth: 2
      },

      {
        label: '# of Views',
        data: productViews,//********** data here*/
        backgroundColor: [
          '#fefae0'
        ],
        borderColor: [
          '#718355'
        ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  const myChart = new Chart(ctx, chartObject)
}

