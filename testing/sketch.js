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
    this.LocManpower; // Local Manpower
    this.buildLimit;
    this.currentDivision = null;
    this.currentNavy = null;

    // Buildables
    this.landForts = null;; // Land Forts (0 - 10) | These increase a Sector's Defense against land units(infantry, tanks, etc.)
    this.waterForts; // Water Forts/Coastal Forts (0 - 5) | These increase a Sector's Defense against Naval Invasions.
    this.antiAir; // Anti Air Guns(AA Guns) (0 - 5) | These increase your Air Superiority and decreases your enemy's (It also destroys enemy aircraft.)
    this.airbases; // Airbases/Airports (0 - 6) | Where planes are stored and deployed from.
    this.navalPorts = null;
    this.navalDockyard; // Naval Dockyards (0 - Build Limit) | These are used to build Naval Units(Submarines, Convoys, Destroyers, Carriers, etc.)
    this.civFactories; // Civilian Factories (0 - Build Limit) | These are used to build buildings and manage trades. (Military Factories, Land Forts, etc.)
    this.milFactories; // Military Factories (0 - Build Limit) | These are used to produce equipment(Guns, Vehicles, Tanks, Artillery, Planes, etc.).

    this.landType = landType;
  }
  update()
  {
    this.render();
    if (this.navalPorts != null)
    {
      this.navalPorts.update();
    }
    if (this.landForts != null)
    {
      this.landForts.update();
    }
    if (this.currentDivision != null)
    {
      this.currentDivision.update();
    }
    if (this.currentNavy != null)
    {
      this.currentNavy.update();
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
    else if (this.landType === "jungle") {
      fill(0, 100, 0);
    }
    else {
      fill(0, 0, 255);
    }
    rect(this.position.x + plusX, this.position.y + plusY, this.size, this.size);
  }
}

class Group 
{
  constructor(name, color)
  {
    this.name = name;
    this.color = color;
    
    // Resources
    this.wood;
    this.stone;
    this.metal;
    this.food;
    this.gold;
  }
  update()
  {

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

class Navalcraft // Naval Units (U-Boats, Submarines, Destroyers, Cruisers, Convoys, etc)
{
  constructor(cellSize, size, index, navalcraftType)
  {
    this.cellSize = cellSize;
    //this.position = index.multiply(cellSize);
    this.size = size;
    this.attack;
    this.defense;
    this.index = index;
    this.navalcraftType = navalcraftType;
    this.era = era;

    if (sectors[index.x][index.y].landType === "water") {
      sectors[index.x][index.y].currentNavy = this;
    }
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
    fill(255,0,255)
    rect(this.index.x * this.cellSize + plusX + 4, this.index.y * this.cellSize + plusY + 4, this.size, this.size);
  }
  move(x, y)
  {
    if (this.index.x + x >= 0 && this.index.x + x < 111 && this.index.y + y >= 0 && this.index.y + y < 50 )
    {
      sectors[this.index.x][this.index.y].currentNavy = null;
      sectors[this.index.x][this.index.y].update();
      this.index.x += x;
      this.index.y += y;
      sectors[this.index.x][this.index.y].currentNavy = this;
      sectors[this.index.x][this.index.y].update();
    }
  }
  moveTo(x, y)
  {
    if (x >= 0 && x < 111 && y >= 0 && y < 50)
    {
      sectors[this.index.x][this.index.y].currentNavy = null;
      sectors[this.index.x][this.index.y].update();
      this.index.x = x;
      this.index.y = y;
      sectors[this.index.x][this.index.y].currentNavy = this;
      sectors[this.index.x][this.index.y].update();
    }
  }
}

class Building
{
  constructor(cellSize, size, index, buildingType, devastation, ammount)
  {
    this.cellSize = cellSize;
    this.size = size;
    this.index = index;
    this.buildingType = buildingType;
    this.devastation = devastation;
    this.ammount = ammount;

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
  }
  update()
  {
    this.render();
  }
  render()
  {
    if(this.buildingType === 'navalPort') {
      fill(0, 0, 255);
      ellipseMode(CORNER);
      ellipse(this.index.x * this.cellSize + (plusX * 2), this.index.y * this.cellSize + plusY + 4.5, this.size, this.size);
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
  }
}
let sectors;
let cellSize;
let currentSector;
let currentSectorHovered;
let currentUnitSelected;
let divisions = [];
let navies = [];
let buildings = [];

let era;

const randBuilding = ['navalPort', 'landFort'];

let gameStarted;
let menuScreen = "main";
let generationType = "";

let plusX;
let plusY;

// Menu and War Songs
let warSong1, menuSong;

// Entente Songs

// Third Internationale Songs

// Reichpakt Songs

// Symbols
let nationalFocus;

function preload() {
  nationalFocus = loadImage("assets/nationalFocus.png");
  
  //Preloading Music (Menu and War)
  menuSong = loadSound("assets/sound/music/menusong.ogg") // Main Menu Song
  warSong1 = loadSound('assets/sound/music/war/war1.ogg'); // 1812 Overture Finale
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
        sectorType = 'water';
      }
      else if (sectorVal < 0.4)
      {
        sectorType = 'beach';
      }
      else if (sectorVal < 0.55)
      {
        sectorType = 'plains';
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
    divisions.push(new Division(cellSize, cellSize / 2, 1000, new Vector2(floor(random(0, 111)), floor(random(0, 50))), "infantry"));
    navies.push(new Navalcraft(cellSize, cellSize / 2, new Vector2(floor(random(0, 111)), floor(random(0, 50))), "destroyer"));
  }
  for (let i = 0; i < 1000; i++)
  {
    buildings.push(new Building(cellSize, cellSize / 2, new Vector2(floor(random(0, 111)), floor(random(0, 50))), randBuilding[floor(random(0, randBuilding.length))], 0, 1));
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
        if (currentUnitSelected.divisionType !== undefined && sectors[x][y].landType !== 'water') {
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
      else if (sectors[x][y].currentNavy) {
        currentUnitSelected = sectors[x][y].currentNavy;
        print(currentUnitSelected.navalcraftType + " selected");
      }
    }
  }
}

function keyPressed() {

}