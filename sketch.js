// Major Project
// Therrill Strongarm
// September 11, 2019
//
// Extra for Experts:
// Classes
// World Generation
// Vector2 Implementation
// Perlin Noise

class Vector2
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }

  add(vector)
  {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  magnitude()
  {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }

  normalized()
  {
    let mag = this.magnitude();
    return new Vector2(this.x / mag, this.y / mag);
  }
  multiply(scale)
  {
    return new Vector2(this.x * scale, this.y * scale);
  }
}

class Sector // Template for a Sector
{
  constructor(position, size, landType)
  {
    this.position = position;
    this.size = size;
    this.infrastructure;
    this.defense;
    this.buildLimit;
    this.currentDivision = null;
    this.currentNavy = null;
    this.currentSettlement = null;

    // Buildables
    this.landForts = null;
    this.navalPorts = null;

    this.landType = landType;
  }
  update()
  {

    this.render();
    if (this.landForts != null)
    {
      this.landForts.update();
    }
    if (this.currentDivision != null)
    {
      this.currentDivision.update();
    }
    if (this.currentSettlement != null)
    {
      this.currentSettlement.update();
    }
  }
  render()
  {
    if (this.landType === "plains") {
      fill(0, 200, 0);
    }
    else if (this.landType === "forest") {
      fill(34,139,34);
    }
    else if (this.landType === "beach") {
      fill(210, 180, 140);
    }
    else if (this.landType === "snow") {
      fill(230, 230, 230);
    }
    else if (this.landType === "concrete") {
      fill(100, 100, 100);
    }
    else if (this.landType === "jungle") {
      fill(0, 100, 0);
    }
    else if (this.landType === "ice") {
      fill(150, 150, 255);
    }
    else {
      fill(0, 0, 255);
    }
    rect(this.position.x + plusX, this.position.y + plusY, this.size, this.size);
  }
}

class Division // Land Units (Infantry, Cavalry, Tanks, etc)
{
  constructor(cellSize, size, mp, index, divisionType)
  {
    this.cellSize = cellSize;
    //this.position = index.multiply(cellSize);
    this.size = size;
    this.mp = mp;
    this.organization;
    this.attack;
    this.defense;
    this.index = index;
    this.divisionType = divisionType;

    if (sectors[index.x][index.y].landType !== "water") {
      sectors[index.x][index.y].currentDivision = this;
    }
  }
  shouldAdd()
  {
    return sectors[this.index.x][this.index.y].currentDivision === this;
  }
  update()
  {
    this.render();
  }
  action(direction)
  {
    if (direction === "up") {
      this.move(0, -1);
      this.render();
    }
    else if (direction === "down") {
      this.move(0, 1);
      this.render();
    }
    else if (direction === "left") {
      this.move(-1, 0);
      this.render();
    }
    else if (direction === "right") {
      this.move(1, 0);
      this.render();
    }
  }
  render()
  {
    if(!sectors[this.index.x][this.index.y].landForts)
    {
      fill(0, 255, 0)
      rect(this.index.x * this.cellSize + plusX + 4, this.index.y * this.cellSize + plusY + 4, this.size, this.size);
    }
  }
  move(x, y)
  {
    if (this.index.x + x >= 0 && this.index.x + x < 111 && this.index.y + y >= 0 && this.index.y + y < 50 )
    {
      sectors[this.index.x][this.index.y].currentDivision = null;
      sectors[this.index.x][this.index.y].update();
      this.index.x += x;
      this.index.y += y;
      sectors[this.index.x][this.index.y].currentDivision = this;
      sectors[this.index.x][this.index.y].update();
    }
  }
  moveTo(x, y)
  {
    if (x >= 0 && x < 111 && y >= 0 && y < 50)
    {
      sectors[this.index.x][this.index.y].currentDivision = null;
      sectors[this.index.x][this.index.y].update();
      this.index.x = x;
      this.index.y = y;
      sectors[this.index.x][this.index.y].currentDivision = this;
      sectors[this.index.x][this.index.y].update();
    }
  }
}

class Building
{
  constructor(cellSize, size, index, buildingType, devastation, ammount, team)
  {
    this.cellSize = cellSize;
    this.size = size;
    this.index = index;
    this.buildingType = buildingType;
    this.devastation = devastation;
    this.ammount = ammount;
    this.team = team;

    if (this.buildingType === 'navalPort') {
      if (sectors[index.x][index.y].landType === "beach") {
        sectors[index.x][index.y].navalPorts = this;
      }
    }
    if (this.buildingType === 'landFort') {
      if (sectors[index.x][index.y].landType !== "beach" && sectors[index.x][index.y].landType !== "water") {
        sectors[index.x][index.y].landForts = this;
      }
    }
    if (this.buildingType === 'settlement') {
      if (sectors[index.x][index.y].landType !== "beach" && sectors[index.x][index.y].landType !== "water") {
        sectors[index.x][index.y].currentSettlement = this;
      }
      
    }
  }
  shouldAdd()
  {
    return sectors[this.index.x][this.index.y].currentSettlement === this;
  }
  update()
  {
    this.render();
  }
  render()
  {
    if(this.buildingType === 'navalPort') {
      if (sectors[this.index.x][this.index.y].currentNavy === null)
      {
        fill(0, 0, 255);
        ellipseMode(CORNER);
        ellipse(this.index.x * this.cellSize + (plusX * 2), this.index.y * this.cellSize + plusY + 4.5, this.size, this.size);
      }
      else
      {
        fill(255,0,255);
        ellipseMode(CORNER);
        ellipse(this.index.x * this.cellSize + (plusX * 2), this.index.y * this.cellSize + plusY + 4.5, this.size, this.size);
      }
    }
    else if(this.buildingType === 'landFort') {
      if (sectors[this.index.x][this.index.y].currentDivision === null)
      {
        fill(255);
        ellipseMode(CORNER);
        ellipse(this.index.x * this.cellSize + (plusX * 2), this.index.y * this.cellSize + plusY + 4.5, this.size, this.size);
      }
      else
      {
        fill(0, 255, 0);
        ellipseMode(CORNER);
        ellipse(this.index.x * this.cellSize + (plusX * 2), this.index.y * this.cellSize + plusY + 4.5, this.size, this.size);
      } 
    }
    else if (this.buildingType === 'settlement') {
      fill(this.team);
      ellipseMode(CORNER);
      ellipse(this.index.x * this.cellSize + (plusX * 2), this.index.y * this.cellSize + plusY + 4.5, this.size, this.size);
    }
  }
}

class Faction
{
  constructor(nation, number, side, isPlayer, isNeutral)
  {
    this.nation = nation;
    this.number = number;
    this.side = side;

    this.isPlayer = isPlayer;
    this.isNeutral = isNeutral;


  }
}

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

const randBuilding = ['navalPort', 'landFort'];

let gameStarted;
let menuScreen = 1;
let generationType = "";

let plusX;
let plusY;

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

  gameStarted = true;
  generationType = "normal"
  startGame();
}

function draw() {
  drawGUI();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0, 200, 200);
  loadSectors();
}

// Draws the GUI
function drawGUI() {

}

// Loads the Sectors on the Screen
function loadSectors() {
  for (let x = 0; x < 111; x++) {
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
    cellSize = width/100;
  }
  plusY = cellSize * 4.8;
  plusX = cellSize / 4;
  for (let x = 0; x < 111; x++) {
    for (let y = 0; y < 50; y++) {
      let sectorVal = noise(x / 7 + xoffset, y / 7 + yoffset);
      let sectorType;
      if (sectorVal < 0.35)
      {
        sectorType = 'ice';
      }
      else if (sectorVal < 0.4)
      {
        sectorType = 'beach';
      }
      else if (sectorVal < 0.55)
      {
        sectorType = 'snow';
      }
      else
      {
        sectorType = 'forest';
      }
      sectors[x][y] = new Sector(new Vector2(x * cellSize, y * cellSize), cellSize, sectorType, random());
    }
  }
  for (let i = 0; i < 100; i++)
  {
    let div = new Division(cellSize, cellSize / 2, 1000, new Vector2(floor(random(0, 111)), floor(random(0, 50))), "infantry")
    if (div.shouldAdd())
    {
      divisions.push(div);
    }
  }
  for (let i = 0; i < 1000; i++)
  {
    buildings.push(new Building(cellSize, cellSize / 2, new Vector2(floor(random(0, 111)), floor(random(0, 50))), randBuilding[floor(random(0, randBuilding.length))], 0, 1, (0, 0, 0)));
  }
  while(settlementCount < 8)
  {
    let settlement = new Building(cellSize, cellSize / 2, new Vector2(floor(random(0, 111)), floor(random(0, 50))), 'settlement', 0, 1, (0, 0, 0));
    if (settlement.shouldAdd())
    {
      buildings.push(settlement);
      settlementCount++;
    }
  }
}

function startGame () {
  sectors = getTwoDArray(111, 50);
  generateWorld();

  background(0, 200, 200);
  loadSectors();

  gameStarted = true;
}

function nextTurn() {

}

function mousePressed() {
  if (gameStarted) {
    let x = floor((mouseX - plusX) / cellSize);
    let y = floor((mouseY - plusY) / cellSize);
    print("x: " + x + " y: " + y);

    if (currentUnitSelected != null) {
      if (sectors[x][y].currentDivision === null && sectors[x][y].currentNavy === null)
      {
        if (currentUnitSelected.divisionType !== undefined && sectors[x][y].landType !== 'water' || sectors[x][y].navalPorts != null) {
          print(currentUnitSelected.divisionType + " moved");
          currentUnitSelected.moveTo(x, y);
        }
        else if(currentUnitSelected.navalcraftType !== undefined && sectors[x][y].landType === 'water') {
          print(currentUnitSelected.navalcraftType + " moved");
          currentUnitSelected.moveTo(x, y);
        }
      }
      currentUnitSelected = null;
    }
    else if (x >= 0 && y >= 0 && x < 111 && y <50) {
      currentSector = sectors[x][y];
      if (sectors[x][y].currentDivision) {
        currentUnitSelected = sectors[x][y].currentDivision;
        print(currentUnitSelected.divisionType + " selected");
      }
    }
  }
}