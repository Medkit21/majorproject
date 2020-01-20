// Major Project
// Therrill Strongarm
// September 11, 2019
//
// Extra for Experts:
// Classes
// World Generation
// Vector2 Implementation
// Perlin Noise

let sectors;
let cellSize;
let currentSector;
let currentSectorHovered;
let currentUnitSelected;
let divisions = [];
let buildings = [];
let envObjects = [];
let settlements = [];
let settlementCount = 0;
let terrainType = '';
let editorMode;
let playerCurrency;
let enemyCurrency;
const randBuilding = ['navalPort', 'landFort'];
var mapData = {}
const reader = new FileReader();
let lastAdvance;

let gameStarted;
let guiWidth, guiHeight;
let scene = 1;
let mode = '';

function getTwoDArray(x, y)
{
  let arr = new Array(x);
  for (let i = 0; i < x; i++)
  {
    arr[i] = new Array(y);
  }
  return arr;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50, 50, 50);

  displayMenu();
  lastAdvance = millis();

  // editorMode = 'terrain';
  // mode = 'editor';
  // startGame();
}

function draw() {
  if (millis() > lastAdvance+500)
  {
    lastAdvance = millis();
    print("something");
    for (let i = 0; i < divisions.length; i++)
    {
      divisions[i].advance();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(50, 50, 50);
  displayMenu();
  if (gameStarted)
  {
    loadSectors();
  }
}

// Loads the Sectors on the Screen
function loadSectors() {
  for (let x = 0; x < 95; x++) {
    for (let y = 0; y < 50; y++) {
      sectors[x][y].update();
    }
  }
}

// Generates the World
function generateWorld(json) {
  // let xoffset = random(-1000, 1000);
  // let yoffset = random(-1000, 1000);
  let xoffset = -104659;
  let yoffset = 104659;
  cellSize = height/55;
  if (json === undefined)
  {
    for (let x = 0; x < 95; x++) {
      for (let y = 0; y < 50; y++) {
        // let sectorVal = noise(x / 7 + xoffset, y / 7 + yoffset);
        let sectorType;
        // if (sectorVal < 0.35)
        // {
        //   sectorType = 'water';
        // }
        // else if (sectorVal < 0.4)
        // {
        //   sectorType = 'beach';
        // }
        // else if (sectorVal < 0.55)
        // {
        //   sectorType = 'plains';
        // }
        // else
        // {
        //   sectorType = 'forest';
        // }
        sectorType = 'snow'
        sectors[x][y] = new Sector(new Vector2(x * cellSize, y * cellSize), cellSize, sectorType, '');
        // envObjects.push(new EnvObject(cellSize, cellSize, new Vector2(x,y), 'tree'));
      }
    }
  }
  else
  {
    for (let x = 0; x < 95; x++) {
      for (let y = 0; y < 50; y++) {
        sectors[x][y] = new Sector(new Vector2(x * cellSize, y * cellSize), cellSize, json.arr[x][y].landtype, '');
        if (json.arr[x][y].landtype === 'forest')
        {
          envObjects.push(new EnvObject(cellSize, cellSize, new Vector2(x,y), 'tree'));
        }
      }
    }
    loadSectors();
    if (mode !== 'editor')
    {
      document.getElementById("Json-file").style.display = 'none';
    }
  }
}

function startGame () {
  sectors = getTwoDArray(95, 50);
  generateWorld();
  
  gameStarted = true;
  background(0, 200, 200);
  displayMenu()
  loadSectors();
}

function calledFromHTML() {
  jsonF = document.getElementById("Json-file").files[0];
  reader.readAsText(jsonF)
  reader.onloadend = function () {
    generateWorld(JSON.parse(reader.result));
    //console.log(reader.result)
  }
}