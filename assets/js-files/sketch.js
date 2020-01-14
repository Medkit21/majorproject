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
let settlements = [];
let settlementCount = 0;
let playerFaction = [];
let enemyFaction = [];
let neutralFaction = [];
let terrainType = '';
let editorMode;

const randBuilding = ['navalPort', 'landFort'];

let gameStarted;
let guiWidth, guiHeight;
let scene = 1;
let mode = '';

// Menu and War Songs
let warSong1, menuSong;

// Flags
let flagSoviet, flagUK, flagUSA;
let flagReich, flagItaly, flagJapan;
let flagPoland, flagFrance, flagChina;

function preload() {
  // Allied Flags
  flagSoviet = loadImage("assets/icons/flags/allied/flagSoviet.png");
  flagUK = loadImage("assets/icons/flags/allied/flagUK.png");
  flagUSA = loadImage("assets/icons/flags/allied/flagUSA.png");
  // Axis Flags
  flagReich = loadImage("assets/icons/flags/axis/flagReich.png");
  flagItaly = loadImage("assets/icons/flags/axis/flagItaly.png");
  flagJapan = loadImage("assets/icons/flags/axis/flagJapan.png");
  // Neutral Flags
  flagPoland = loadImage("assets/icons/flags/neutral/flagPoland.png");
  flagFrance = loadImage("assets/icons/flags/neutral/flagFrance.png");
  flagChina = loadImage("assets/icons/flags/neutral/flagChina.png");
}

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
  background(0, 200, 200);

  editorMode = 'terrain';
  mode = 'editor';
  startGame();
}

function draw() {
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0, 200, 200);
  displayMenu();
  loadSectors();
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
function generateWorld() {
  // let xoffset = random(-1000, 1000);
  // let yoffset = random(-1000, 1000);
  let xoffset = -104659;
  let yoffset = 104659;
  console.log(xoffset, yoffset);
  if (width >= height) {
    cellSize = height/55;
  }
  else if (height > width) {
    cellSize = width/95;
  }
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
      sectors[x][y] = new Sector(new Vector2(x * cellSize, y * cellSize), cellSize, sectorType, random());
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
