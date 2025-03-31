// create a 16x16 grid of divs
let style = document.createElement('style');
document.head.appendChild(style);
const sheet = style.sheet; //js created style sheet so we can make grid the correct width
                           //we will added a class to set the width and height of each div in the grid

let containerEl = document.querySelector(".container"); //main container for divs
let maxRow = 16; //default row and column numbers of the initial grid (before user input)
let maxCol = 16;
const MAX_GRID_SIZE = 100; 
const GRID_WIDTH = 960; //px

let gridSizeBtn = document.createElement("button"); //add button to top of webpage
gridSizeBtn.textContent = "Change Size";
document.body.insertBefore(gridSizeBtn, containerEl);

function createGridCust(maxRow, maxCol) {
  gridDivCustClass(maxRow); //creates a css class that determines the divs sizes correctly
  for (let row=0; row<maxRow; row++) {
    for(let col=0; col<maxCol; col++) {
      let divEl = document.createElement("div");
      divEl.classList.add('grid-div-cust'); //this sizes the divs correctly
      containerEl.appendChild(divEl);
      divEl.addEventListener("mouseenter",randColorOnEnter);
      divEl.dataset.opacityVar = 0; //set opacity to zero
      divEl.dataset.colorFlag = false; //this flag lets us know we have not added a color to this div yet
    }
  }
}

// delete grid of divs
function removeGrid() {
  while(containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);
  }
  console.log(sheet);  
  sheet.removeRule(0); // removes the grid-div-cust class
}

// event handler to change color of div on mouseenter
function changeColorOnEnter(e) {
  e.target.style.backgroundColor = "#687dfb";
}

function randColorOnEnter(e) {
  if(e.target.dataset.colorFlag == 'false'){
    e.target.style.background = `rgb(${getRandColorValue()}, ${getRandColorValue()}, ${getRandColorValue()})`; 
    e.target.dataset.colorFlag = true; // this is so we do not change the rgb value of the current div the next time it is moused                                            over
    e.target.dataset.opacityVar = 0.1; //starting opacity value
    e.target.style.opacity = e.target.dataset.opacityVar; //actually set the opacity
  }

  else {
    e.target.dataset.opacityVar = +e.target.dataset.opacityVar + 0.1; //increment opacity by 10% of total so after 10 mouse enters
    e.target.style.opacity = e.target.dataset.opacityVar;             //the div will have opacity of 1 (i.e. 100%)
    //console.log('opacityVar = ' + e.target.dataset.opacityVar + '\nopacity = ' + e.target.style.opacity); 
  }
}

// returns a number between 0 and 255 (inclusive on both ends)
function getRandColorValue() {
  return Math.floor(Math.random() * 256);
}

// set up grid-div-cust css class style, the important part here is to correctly calculate the width and height and create the gridDivCustClass with that calculated width and height (the width and height are for each individual div square)
function gridDivCustClass(gridSize) { 
  let divWidth = GRID_WIDTH / gridSize;
  let divHeight = GRID_WIDTH / gridSize;
  const gridDivCustClass = `.grid-div-cust {font-size:1.5rem; text-align:center; width:${divWidth}px; height:${divHeight}px; padding:0; margin:0;}`;
  //console.log(sheet);
  sheet.insertRule(gridDivCustClass, sheet.cssRules.length); //length should always be 0 before this line
}

// event handler for when change size button is clicked
function btnAskNewGrid() {
  let gridSize = prompt("Please enter a new grid size (between 1 and 100): ");
  gridSize = +gridSize;
  //console.log("gridSize conversion = " + gridSize);
  if (gridSize <= 0 || gridSize > 100 || Number.isNaN(gridSize)) {
    return; //leave function do not change the gride at all
  }
  removeGrid();
  createGridCust(gridSize, gridSize);
}


// make webpage
createGridCust(maxRow, maxCol);
gridSizeBtn.addEventListener("click", btnAskNewGrid);


