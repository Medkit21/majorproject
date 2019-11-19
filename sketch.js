// Strategy Game Concept
// Therrill Strongarm
// September 11, 2019
//
// Extra for Experts:
// Classes
// World Generation
// Arrays
// Vector2 Implementation
// Perlin Noise
// Grids


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
    this.manpower;
    this.buildLimit;
    this.currentDivision = null;

    // Defense Buildables
    this.landForts; // Land Forts (0 - 10) | These increase a Sector's Defense against land units(infantry, tanks, etc.)
    this.waterForts; // Water Forts/Coastal Forts (0 - 5) | These increase a Sector's Defense against Naval Invasions.
    this.antiAir; // Anti Air Guns(AA Guns) (0 - 5) | These increase your Air Superiority and decreases your enemy's (It also destroys enemy aircraft.)
    this.airbases; // Airbases/Airports (0 - 6) | Where planes are stored and deployed from.
    this.navalPorts; // Naval Ports (0 = 6) | Where Naval Units are stored and deployed from.
    this.navalDockyard; // Naval Dockyards (0 - Build Limit) | These are used to build Naval Units(Submarines, Convoys, Destroyers, Carriers, etc.)
    this.civFactories; // Civilian Factories (0 - Build Limit) | These are used to build buildings and manage trades. (Military Factories, Land Forts, etc.)
    this.milFactories; // Military Factories (0 - Build Limit) | These are used to produce equipment(Guns, Vehicles, Tanks, Artillery, Planes, etc.).

    this.landType = landType;
  }
  update()
  {
    this.render();
    if (this.currentDivision != null)
    {
      this.currentDivision.update();
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
    else if (this.landType === "arid") {
      fill(210, 180, 140);
    }
    else if (this.landType === "jungle") {
      fill(0, 100, 0);
    }
    else {
      fill(0, 0, 255);
    }
    rect(this.position.x + plusX, this.position. y, this.size, this.size);
  }
}

class Nation 
{
  constructor(name, isPuppet)
  {
    this.name = name;
    this.isPuppet = isPuppet;
    this.setGovernment;
    this.puppetMasterIdeology;

    // Ideology Percentages
    this.democracy;
    this.natPop;
    this.communism;
    this.monarchism;

    // Nation Stats
    this.politicalPower; // Politcal Power is used for decisions and national focuses
    this.stability;
    this.warSupport; // How much the population supports the war | Higher war support will generate higher manpower
    this.manpower; // Displays how much of the population is recruitable
    this.numOfFactories; // Displays the number of total factories you control
    this.fuel; // Displays how much fuel you have

    // Nation Resources
    this.ideology; // Converted into Fuel for the Nation
    this.aluminum; // Used for Aircraft and Support Equipment
    this.rubber; // Used for Aircraft, Motorized and Mechanized Vehicles, and Artillery
    this.tungsten; // Used for Artillery, Medium Tanks, Light and Medium SP Artillery, Tank Destroyers, Medium SP Anti-Air and Jet Aircraft
    this.steel; // Used for Infantry Weapons and Support Equipment, Artillery, Anti-air, Anti-tank, Ships, Tanks and Motorized/Mechanized Vehicles
    this.chromium; // Used for Heavy and Super Heavy Tanks, Large Ships and Level 4 Small Ships

    if(this.isPuppet) 
    {
      this.ideologyAssignment(puppetMasterIdeology);
    }
    else
    {
      this.ideologyAssignment("rand");
    }
  }
  ideologyAssignment(newIdeology) // This will only ever be called once at the beginning or the formation of new Nations
  {
    this.newIdeology = newIdeology;
    if (newIdeology === "rand") {
      this.ideology = floor(random(1, 101));
      if (this.ideology <= 25) {
        this.setGovernment = "democracy";
        this.democracy = floor(random(50, 61));
        this.natPop = floor(random(0 - this.democracy));
        this.communism = floor(random(0 - this.natPop));
        this.monarchism = floor(random(this.communism - 1));
      }
      else if (this.ideology <= 50) {
        this.setGovernment = "natpop";
        this.natPop = floor(random(50, 61));
        this.democracy = floor(random(0 - this.natPop));
        this.communism = floor(random(0 - this.democracy));
        this.monarchism = floor(random(this.communism - 1));
      }
      else if (this.ideology <= 75) {
        this.setGovernment = "communism";
        this.communism = floor(random(50, 61));
        this.democracy = floor(random(0 - this.communism));
        this.natPop = floor(random(0 - this.democracy));
        this.monarchism = floor(random(this.natPop - 1));
      }
      else {
        this.setGovernment = "monarchism";
        this.monarchism = floor(random(50, 61));
        this.democracy = floor(random(0 - this.monarchism));
        this.natPop = floor(random(0 - this.democracy));
        this.communism = floor(random(this.natPop - 1));
      }
    }
  }
  update()
  {
    this.render();
  }
  render()
  {

  }
}

class Division // Land Units (Infantry, Cavalry, Tanks, etc)
{
  constructor(cellSize, size, mp, index)
  {
    this.cellSize = cellSize;
    //this.position = index.multiply(cellSize);
    this.size = size;
    this.mp = mp;
    this.organization;
    this.attack;
    this.defense;
    this.index = index;

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
    fill(0, 255, 255)
    rect(this.index.x * this.cellSize + plusX + 4, this.index.y * this.cellSize + 4, this.size, this.size);
  }
  move(x, y)
  {
    if (this.index.x + x >= 0 && this.index.x + x < 50 && this.index.y + y >= 0 && this.index.y + y < 50 )
    {
      sectors[this.index.x][this.index.y].currentDivision = null;
      sectors[this.index.x][this.index.y].update();
      this.index.x += x;
      this.index.y += y;
      sectors[this.index.x][this.index.y].currentDivision = this;
      sectors[this.index.x][this.index.y].update();
    }
  }
}

class General // Generals
{
  constructor(lvl, attack, defense, strategy, supply, isFieldMarshal)
  {
    this.lvl = lvl; // Their Level overall (0-10) | Field Marshall's Max Level is 15
    this.attack = attack; // Their Attack Level (0-5) | Field Marshall (0-7)
    this.defense = defense; // Their Defense Level (0-5) | Field Marshall (0-7)
    this.strategy = strategy; // Their Strategy (0-5) | Field Marshall (0-7)
    this.supply = supply; // Their Fuel Management (0-5) | Field Marshall (0-7)
    this.isFieldMarshal = isFieldMarshal; // Determines whether it's a Field Marshal or a General
  }
  update()
  {
    this.render();
  }
  render()
  {
    // Nothing here yet!
  }
}

class Aircraft // Air Units (Fighters, Bombers, CAS, Naval Bombers, Transports, etc)
{
  constructor(hp)
  {
    this.hp = hp;
  }
  update()
  {
    this.render();
  }
  render()
  {
    // Nothing here yet!
  }
}

class Navalcraft // Naval Units (U-Boats, Submarines, Destroyers, Cruisers, Convoys, etc)
{
  constructor(hp)
  {
    this.hp = hp;
  }
  update()
  {
    this.render();
  }
  render()
  {
    // Nothing here yet!
  }
}

let sectors;
let plusX;
let cellSize;
let currentSector;
let divisions = [];

let gameStarted;
let menuScreen = "main";
let generationType = "";

// Songs
let ausSong1, ausSong2, ausSong3, ausSong4, ausSong5, csaSong1, csaSong2, csaSong3, csaSong4, csaSong5, usaSong1, usaSong2, usaSong3, usaSong4, usaSong5;
let warSong1, warSong2, menuSong;

// Symbols
let nationalFocus;

function preload() {
  nationalFocus = loadImage("assets/nationalFocus.png");
  menuSong = loadSound("assets/sound/music/menusong.ogg") // Main Menu Song

  //Preloading Music (War)
  warSong1 = loadSound('assets/sound/music/war/war1.ogg'); // Amazing Grace
  warSong2 = loadSound('assets/sound/music/war/war2.ogg'); // 1812 Overture Finale
  
  //Preloading Music (2ACW)
  ausSong1 = loadSound('assets/sound/music/2ACW/aus1.ogg'); // 71st Regiment (American Union State)
  ausSong2 = loadSound('assets/sound/music/2ACW/aus2.ogg'); // American Salute
  ausSong3 = loadSound('assets/sound/music/2ACW/aus3.ogg'); // Sound off
  ausSong4 = loadSound('assets/sound/music/2ACW/aus4.ogg'); // Southern Melody
  ausSong5 = loadSound('assets/sound/music/2ACW/aus5.ogg'); // Yellow Rose of Texas
  csaSong1 = loadSound('assets/sound/music/2ACW/csa1.ogg'); // Banks of Marble (Combined Syndicates of America)
  csaSong2 = loadSound('assets/sound/music/2ACW/csa2.ogg'); // Bread and Roses
  csaSong3 = loadSound('assets/sound/music/2ACW/csa3.ogg'); // Solidarity Forever
  csaSong4 = loadSound('assets/sound/music/2ACW/csa4.ogg'); // Two Good Men
  csaSong5 = loadSound('assets/sound/music/2ACW/csa5.ogg'); // Which side are you on
  usaSong1 = loadSound('assets/sound/music/2ACW/usa1.ogg'); // A dime from every dollar (United States of America)
  usaSong2 = loadSound("assets/sound/music/2ACW/usa2.ogg"); // Marching Through Georgia
  usaSong3 = loadSound("assets/sound/music/2ACW/usa3.ogg"); // Maryland March
  usaSong4 = loadSound("assets/sound/music/2ACW/usa4.ogg"); // Praise the lord and pass the ammunition
  usaSong5 = loadSound("assets/sound/music/2ACW/usa5.ogg"); // Yankee Doodle
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
  menuSong.play();
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
  // Left side of the GUI
  fill(0, 200, 200);
  noStroke();
  rect(0, 0, plusX - 1, windowHeight)
  stroke(1);
  fill(0);
  textSize(20);
  textAlign(LEFT);
  fill(105,105,105);
  rect(width - 355, 25, 325, 75);
  imageMode(LEFT);
  image(nationalFocus, width - 350, 35, 50, 50)
  fill(255);
  text("NO NATIONAL", width - 280, 60);
  text("FOCUS SELECTED", width - 280, 80);
}

// Loads the Sectors on the Screen
function loadSectors() {
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      sectors[x][y].update();
    }
  }
}


// Generates the World
function generateWorld() {
  // let xoffset = random(-1000, 1000);
  // let yoffset = random(-1000, 1000);
  let xoffset = -457.95569479042;
  let yoffset = 146.06481880215802;
  // noiseSeed(1); // Knock off Europe
  noiseSeed(29);
  console.log(xoffset, yoffset);
  if (width >= height) {
    cellSize = height/50;
  }
  else if (height > width) {
    cellSize = width/50;
  }
  plusX = cellSize * 25;
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      let sectorVal = noise(x / 7 + xoffset, y / 7 + yoffset);
      let sectorType;
      if (sectorVal < 0.35)
      {
        sectorType = 'water';
      }
      else if (sectorVal < 0.4)
      {
        sectorType = 'arid';
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
    divisions.push(new Division(cellSize, cellSize / 2, 1000, new Vector2(floor(random(0, 50)), floor(random(0, 50)))));
  }
}

// for every single sectors (IF ANYONE IS SEEING THIS IGNORE THIS)
//   if sectors.x > half - a little || sectors.x < half + a little
//     sectors.height -= 1 / (sectors.x - half) 

function startGame () {
  sectors = getTwoDArray(50, 50);
  generateWorld();

  background(0, 200, 200);
  loadSectors();

  gameStarted = true;
}

function mousePressed() {
  if (gameStarted) {
    let x = floor((mouseX - plusX) / cellSize);
    let y = floor(mouseY / cellSize);
    print("x: " + x + " y: " + y);

    if (x >= 0 && y >= 0 && x < 50 && y <50) {
      currentSector = sectors[x][y];
      if (sectors[x][y].landType === "plains") {
        print("This is a plains sector");
      }
      else if (sectors[x][y].landType === "forest") {
        print("This is a forest sector");
      }
      else if (sectors[x][y].landType === "arid") {
        print("This is a beach sector");
      }
      else if (sectors[x][y].landType === "jungle") {
        print("This is a jungle sector");
      }
      else {
        print("this is not land");
      }
    }
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    for (let i = 0; i < divisions.length; i++)
    {
      divisions[i].action("right");
    }
  }
  else if (keyCode === LEFT_ARROW) {
    for (let i = 0; i < divisions.length; i++)
    {
      divisions[i].action("left");
    }
  }
  else if (keyCode === UP_ARROW) {
    for (let i = 0; i < divisions.length; i++)
    {
      divisions[i].action("up");
    }
  }
  else if (keyCode === DOWN_ARROW) {
    for (let i = 0; i < divisions.length; i++)
    {
      divisions[i].action("down");
    }
  }
}