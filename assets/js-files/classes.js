// Classes

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
  constructor(position, size, landType, envObject)
  {
    this.position = position;
    this.size = size;
    this.infrastructure;
    this.defense;
    this.buildLimit;
    this.envObject = envObject;
    this.currentEnvObject = null;
    this.currentDivision = null;

    // if (this.landType === 'forest')
    // {
    //   envObjects.push(new EnvObject(cellSize, cellSize, (this.x, this.y), 'tree'));
    // }

    
    // Buildables
    this.currentBuilding = null;
    
    this.landType = landType;
  }
  update()
  {
    this.render();
    if (this.currentEnvObject != null)
    {
      this.currentEnvObject.update();
    }
    if (this.currentBuilding != null)
    {
      this.currentBuilding.update();
    }
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
    else if (this.landType === "water") {
      fill(0, 0, 255);
    }
    rect(this.position.x, this.position.y, this.size, this.size);
  }
}

class Division // Land Units (Infantry, Cavalry, Tanks, etc)
{
  constructor(cellSize, size, mp, index, divisionType, side)
  {
    this.cellSize = cellSize;
    //this.position = index.multiply(cellSize);
    this.size = size;
    this.mp = mp;
    this.organization;
    this.health;
    this.lvl = 1;
    this.xp = 0;
    this.damage;
    this.isArmored;
    this.armor;
    this.unitCost;
    this.index = index;
    this.divisionType = divisionType;
    this.side = side;

    this.moveCounter = 0;

    this.goalX = this.index.x;
    this.goalY = this.index.y;

    if (sectors[index.x][index.y].landType !== "water") {
      sectors[index.x][index.y].currentDivision = this;
    }

    if (this.divisionType === "infantry" || this.divisionType === "smg" || this.divisionType === "at" || this.divisionType === "mg" || this.divisionType === "sniper" ||
    this.divisionType === "cannon" || this.divisionType === "mortar" || this.divisionType === "apc" || this.divisionType === "tank" || this.divisionType === "truck" ||
     this.divisionType === "engineer")
     {
       if (this.divisionType === "infantry")
       {
         this.health = 50 + (25*this.lvl);
         this.damage = 5*this.lvl;
         this.isArmored = false;
         this.unitCost = 25;
       }
       else if (this.divisionType === "smg")
       {
         this.health = 50 + (25*this.lvl);
         this.damage = 7*this.lvl;
         this.isArmored = false;
         this.unitCost = 45;
       }
       else if (this.divisionType === "at")
       {
         this.health = 50 + (25*this.lvl);
         this.damage = 3*this.lvl;
         this.isArmored = false;
         this.unitCost = 50;
       }
       else if (this.divisionType === "mg")
       {
         this.health = 50 + (25*this.lvl);
         this.damage = 10*this.lvl;
         this.isArmored = false;
         this.unitCost = 50;
       }
       else if (this.divisionType === "sniper")
       {
         this.health = 50 + (25*this.lvl);
         this.damage = 10*this.lvl;
         this.isArmored = false;
         this.unitCost = 75;
       }
       else if (this.divisionType === "cannon")
       {
         this.health = 100 + (25*this.lvl);
         this.damage = 20*this.lvl;
         this.isArmored = true;
         this.unitCost = 100;
       }
       else if (this.divisionType === "mortar")
       {
         this.health = 50 + (25*this.lvl);
         this.damage = 15*this.lvl;
         this.isArmored = false;
         this.unitCost = 90;
       }
       else if (this.divisionType === "apc")
       {
         this.health = 125 + (25*this.lvl);
         this.damage = 25*this.lvl;
         this.armor = 5;
         this.isArmored = true;
         this.unitCost = 150;
       }
       else if (this.divisionType === "tank")
       {
         this.health = 200 + (25*this.lvl);
         this.damage = 40*this.lvl;
         this.armor = 10;
         this.isArmored = true;
         this.unitCost = 200;
       }
       else if (this.divisionType === "truck")
       {
         this.health = 50 + (25*this.lvl);
         this.damage = 0;
         this.isArmored = false;
         this.unitCost = 40;
       }
       else if (this.divisionType === "engineer")
       {
         this.health = 50 + (25*this.lvl);
         this.damage = 0;
         this.isArmored = false;
         this.unitCost = 25;
       }
     }
    else
    {
      if (this.side === "soviet")
      {
        if (this.divisionType === "nkvd")
        {
          this.health = 50 + (25*this.lvl);
          this.damage = 7*this.lvl;
          this.isArmored = false;
          this.unitCost = 60;
        }
        if (this.divisionType === "partisan")
        {
          this.health = 15 + (25*this.lvl);
          this.damage = 3*this.lvl;
          this.isArmored = false;
          this.unitCost = 10;
        }
      }
      if (this.side === "german")
      {
        if (this.divisionType === "officer")
        {
          this.health = 50 + (25*this.lvl);
          this.damage = 7*this.lvl;
          this.isArmored = false;
          this.unitCost = 60;
        }
        if (this.divisionType === "medic")
        {
          this.health = 60 + (25*this.lvl);
          this.damage = 2*this.lvl;
          this.isArmored = false;
          this.unitCost = 75;
        }
      }
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
  render()
  {
    if (this.side === 'soviet')
    {
      if (sectors[this.index.x][this.index.y].landType === "water" || sectors[this.index.x][this.index.y].landType === "ice")
      {
        image(sovBoat, this.index.x * this.cellSize, this.index.y * this.cellSize, this.size, this.size);
      }
      else{
        if (this.divisionType === "infantry")
        {
          image(sovHelmet, this.index.x * this.cellSize, this.index.y * this.cellSize, this.size, this.size);
        }
        else if (this.divisionType === "truck")
        {
          image(sovTruck, this.index.x * this.cellSize, this.index.y * this.cellSize, this.size, this.size);
        }
        else if (this.divisionType === "tank")
        {
          image(sovArmW, this.index.x * this.cellSize, this.index.y * this.cellSize, this.size, this.size);
        }
        else if (this.divisionType === "engineer")
        {
          image(sovEngi, this.index.x * this.cellSize, this.index.y * this.cellSize, this.size, this.size);
        }
      }
    }
    else if (this.side === 'german')
    {
      if (sectors[this.index.x][this.index.y].landType === "water" || sectors[this.index.x][this.index.y].landType === "ice")
      {
        image(gerBoat, this.index.x * this.cellSize, this.index.y * this.cellSize, this.size, this.size);
      }
      else if (this.divisionType === "truck")
      {
        image(gerTruck, this.index.x * this.cellSize, this.index.y * this.cellSize, this.size, this.size);
      }
      else
      {
        image(gerHelmet, this.index.x * this.cellSize, this.index.y * this.cellSize, this.size, this.size);
      }
    }
    else
    {
      if (sectors[this.index.x][this.index.y].landType === "water" || sectors[this.index.x][this.index.y].landType === "ice")
      {
        image(resBoat, this.index.x * this.cellSize, this.index.y * this.cellSize, this.size, this.size);
      }
      else if (this.divisionType === "truck")
      {
        image(polTruck, this.index.x * this.cellSize, this.index.y * this.cellSize, this.size, this.size);
      }
      else
      {
        image(polHelmet, this.index.x * this.cellSize, this.index.y * this.cellSize, this.size, this.size);
      }
    }
  }
  checkLevel()
  {
    if (this.xp === 250)
    {
      this.xp = 0;
      this.lvl = this.lvl + 1;
      updateStats();
    }
  }
  createBuild(building)
  {
    buildings.push(new Building(cellSize, cellSize, new Vector2(this.index.x, this.index.y), building, this.side));
  }
  updateStats()
  {
    if (this.divisionType === "infantry" || this.divisionType === "smg" || this.divisionType === "at" || this.divisionType === "mg" || this.divisionType === "sniper" ||
    this.divisionType === "cannon" || this.divisionType === "mortar" || this.divisionType === "apc" || this.divisionType === "tank" || this.divisionType === "truck" ||
     this.divisionType === "engineer")
     {
       if (this.divisionType === "infantry")
       {
         this.health = 50 + (25*this.lvl);
         this.damage = 5*this.lvl;
         this.isArmored = false;
         this.unitCost = 25;
       }
       else if (this.divisionType === "smg")
       {
         this.health = 50 + (25*this.lvl);
         this.damage = 7*this.lvl;
         this.isArmored = false;
         this.unitCost = 45;
       }
       else if (this.divisionType === "at")
       {
         this.health = 50 + (25*this.lvl);
         this.damage = 3*this.lvl;
         this.isArmored = false;
         this.unitCost = 50;
       }
       else if (this.divisionType === "mg")
       {
         this.health = 50 + (25*this.lvl);
         this.damage = 10*this.lvl;
         this.isArmored = false;
         this.unitCost = 50;
       }
       else if (this.divisionType === "sniper")
       {
         this.health = 50 + (25*this.lvl);
         this.damage = 10*this.lvl;
         this.isArmored = false;
         this.unitCost = 75;
       }
       else if (this.divisionType === "cannon")
       {
         this.health = 100 + (25*this.lvl);
         this.damage = 20*this.lvl;
         this.isArmored = true;
         this.unitCost = 100;
       }
       else if (this.divisionType === "mortar")
       {
         this.health = 50 + (25*this.lvl);
         this.damage = 15*this.lvl;
         this.isArmored = false;
         this.unitCost = 90;
       }
       else if (this.divisionType === "apc")
       {
         this.health = 125 + (25*this.lvl);
         this.damage = 25*this.lvl;
         this.armor = 5;
         this.isArmored = true;
         this.unitCost = 150;
       }
       else if (this.divisionType === "tank")
       {
         this.health = 200 + (25*this.lvl);
         this.damage = 40*this.lvl;
         this.armor = 10;
         this.isArmored = true;
         this.unitCost = 200;
       }
       else if (this.divisionType === "truck")
       {
         this.health = 50 + (25*this.lvl);
         this.damage = 0;
         this.isArmored = false;
         this.unitCost = 40;
       }
       else if (this.divisionType === "engineer")
       {
         this.health = 50 + (25*this.lvl);
         this.damage = 0;
         this.isArmored = false;
         this.unitCost = 25;
       }
     }
    else
    {
      if (this.side === "soviet")
      {
        if (this.divisionType === "nkvd")
        {
          this.health = 50 + (25*this.lvl);
          this.damage = 7*this.lvl;
          this.isArmored = false;
          this.unitCost = 60;
        }
        if (this.divisionType === "partisan")
        {
          this.health = 15 + (25*this.lvl);
          this.damage = 3*this.lvl;
          this.isArmored = false;
          this.unitCost = 10;
        }
      }
      if (this.side === "german")
      {
        if (this.divisionType === "officer")
        {
          this.health = 50 + (25*this.lvl);
          this.damage = 7*this.lvl;
          this.isArmored = false;
          this.unitCost = 60;
        }
        if (this.divisionType === "medic")
        {
          this.health = 60 + (25*this.lvl);
          this.damage = 2*this.lvl;
          this.isArmored = false;
          this.unitCost = 75;
        }
      }
    }
  }
  checkHealth()
  {
    if (this.health <= 0)
    {
      sectors[this.index.x][this.index.y].currentDivision = null;
    }
  }
  move(x, y)
  {
    if (this.index.x + x >= 0 && this.index.x + x < 95 && this.index.y + y >= 0 && this.index.y + y < 50 )
    {
      sectors[this.index.x][this.index.y].currentDivision = null;
      sectors[this.index.x][this.index.y].update();
      this.index.x += x;
      this.index.y += y;
      sectors[this.index.x][this.index.y].currentDivision = this;
      sectors[this.index.x][this.index.y].update();
    }
  }
  teleportTo(x, y)
  {
    if (x >= 0 && x < 95 && y >= 0 && y < 50)
    {
      sectors[this.index.x][this.index.y].currentDivision = null;
      sectors[this.index.x][this.index.y].update();
      this.index.x = x;
      this.index.y = y;
      sectors[this.index.x][this.index.y].currentDivision = this;
      sectors[this.index.x][this.index.y].update();
    }
  }
  advance()
  {
    if (sectors[this.index.x][this.index.y].landType === 'water' || sectors[this.index.x][this.index.y].landType === 'ice' || this.divisionType === "tank")
    {
      this.moveCounter = this.moveCounter + 1;
      if(this.moveCounter >= 3)
      {
        this.move(Math.sign(this.goalX - this.index.x), Math.sign(this.goalY - this.index.y));
        this.moveCounter = 0;
      }
    }
    else if (this.divisionType === "truck" || "engineer")
    {
      this.move(Math.sign(this.goalX - this.index.x), Math.sign(this.goalY - this.index.y));
    }
    else
    {
      this.moveCounter = this.moveCounter + 1;
      if(this.moveCounter >= 2)
      {
        this.move(Math.sign(this.goalX - this.index.x), Math.sign(this.goalY - this.index.y));
        this.moveCounter = 0;
      }
    }
  }
  moveTo(x,y)
  {
    this.goalX = x;
    this.goalY = y;
  }
}

class Building // Buildings creatable by players and AI
{
  constructor(cellSize, size, index, buildingType, side)
  {
    this.cellSize = cellSize;
    this.size = size;
    this.index = index;
    this.buildingType = buildingType;
    this.side = side;

    sectors[index.x][index.y].currentBuilding = this;
  }
  update()
  {
    this.render();
  }
  render()
  {
    if (this.buildingType === 'base') 
    {
      if (this.side === "soviet")
      {
        image(flagSoviet, this.index.x * this.cellSize, this.index.y * this.cellSize, this.size, this.size)
      }
      else {
        image(flagReich, this.index.x * this.cellSize, this.index.y * this.cellSize, this.size, this.size)
      }
    }
    else if (this.buildingType === 'trench') 
    {
      image(trench, this.index.x * this.cellSize, this.index.y * this.cellSize, this.size, this.size)
    }
  }
  createUnit(unit)
  {
    divisions.push(new Division(cellSize, cellSize, 1000, new Vector2(this.index.x + 1, this.index.y), unit, this.side));
  }
}

class EnvObject // Environment objects (Such as houses, factories, bridges, supply depots, boulders, trees, wrecks, etc.)
{
  constructor(cellSize, size, index, objectType)
  {
    this.cellSize = cellSize;
    this.size = size;
    this.index = index;
    this.objectType = objectType;
  
    // Object Booleans
    this.isBreakble; // determines if the object can be destroyed by units
    this.isCapturable; // determines whether units can capture the building or not (eg. factories or bridges)
    this.isGarrisonable; // determines if Units can garrison the object (eg. houses and buildings)
    this.isResource; // whether it is a source of income or not (eg. supply depots or vehicle wrecks)
    this.canConvert; // whether or not the object can be converted to something else (eg. tree -> sawmill or  boulders -> quarry)
    this.requireSupplyTruck; // whether or not the object requires a supply truck to acquire resources
  
    this.hp;
    this.resourceAmount;
    this.output;
    this.side;

    sectors[this.index.x][this.index.y].currentEnvObject = this;
      
    if (this.objectType === 'tree')
    {          
      this.isBreakble = true;
        this.isResource = true;
        this.canConvert = true;
        this.hp = 50;
        this.resourceAmount = floor(random(15, 21));
    }
  }
  convert()
  {
      if (this.objectType === 'tree')
      {
          
      }
  }
  update()
  {
    this.render();
  }
  render()
  {
    if (this.objectType === 'tree')
    {
      image(treeW, this.index.x * this.cellSize, this.index.y * this.cellSize, cellSize, cellSize);
    }
  }
}
