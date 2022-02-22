'use strict'
///global variables///

let votesAllowed = 5//decrement to end voting

let allProducts = []

  let myContainer = document.getElementById('img-container');
  let imgOne = document.getElementById('img-1');
  let imgTwo = document.getElementById('img-2');
  let imgThree = document.getElementById('img-3');

  let resultsBtn = document.getElementById('results-btn');
  let showResults = document.getElementById('results-list');


  function product(name,fileExtension = 'jpg'){
    this.name = name;
    this.views = 0;
    this.clicks = 0;
    this.src = `img/${name}.${fileExtension}`;
    
    allProducts.push(this);//pushes objects into the allProducts array
  }
  //for png ('name', 'png')
  new product('bag')///call all the 'new products'
  new product('banana')
  new product('bathroom')
  new product('boots')
  new product('breakfast')
  new product('bubblegum')
  new product('chair')
  new product('cthulhu')
  new product('dog-duck')
  new product('dragon')
  new product('pen')
  new product('pet-sweep')
  new product('scissors')
  new product('shark')
  new product('sweep', 'png')
  new product('tauntaun')
  new product('unicorn')
  new product('water-can')
  new product('wine-glass')
  

  console.log(allProducts)//checks the array on line 6

  //executable code//

  //render images//
  //need a random number between 0 and the length of the array -1//
  function getRandomIndex(){
    return Math.floor(Math.random()* allProducts.length)
  }

  
  function renderImgs(){
    
    
    let shownProducts = [];//holds our 3 nums
    while(shownProducts.length < 3){//as long as 
      let randomnums = getRandomIndex();
      while(!shownProducts.includes(randomnums)){ //if the number is not present '!' 
        shownProducts.push(randomnums);
      }
    }
    console.log(shownProducts)
    
    let productOneIndex = shownProducts.pop();
    let productTwoIndex = shownProducts.pop();
    let productThreeIndex = shownProducts.pop();

    imgOne.src = allProducts[productOneIndex].src
    imgOne.alt = allProducts[productOneIndex].name
    allProducts[productOneIndex].views++

    imgTwo.src = allProducts[productTwoIndex].src
    imgTwo.alt = allProducts[productTwoIndex].name
    allProducts[productTwoIndex].views++

    imgThree.src = allProducts[productThreeIndex].src
    imgThree.alt = allProducts[productThreeIndex].name
    allProducts[productThreeIndex].views++
  }

  renderImgs();


  ///Event Listener//

  //listener one click//
function handleClick(event){
  votesAllowed--;//decrement votes
  let imgclicked = event.target.alt

  for(let i = 0; i < allProducts.length; i++){///increments individual votes
    if(imgclicked === allProducts[i].name){
      allProducts[i].clicks++;
    }
  }

  renderImgs()//re renders without refreshing
  
  if(votesAllowed === 0){
    myContainer.removeEventListener('click', handleClick);
  }
} 

//btn to show all results
function handleShowResults(event){
 if(votesAllowed === 0){
   for(let i = 0; i < allProducts.length; i++){
   let li = document.createElement('li');
   li.textContent = `${allProducts[i].name} was viewed ${allProducts[i].views} times, and was voted for ${allProducts[i].clicks} times.`
   showResults.appendChild(li);
  }
  }
}

  
//grab what we want to listen to//
  myContainer.addEventListener('click', handleClick)
  resultsBtn.addEventListener('click', handleShowResults)
