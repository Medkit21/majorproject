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
    this.currentDivision = null;

    // Buildables
    this.landForts = null;

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
      rect(this.index.x * this.cellSize + 4, this.index.y * this.cellSize + 4, this.size, this.size);
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
  constructor(cellSize, size, index, buildingType, damage, side)
  {
    this.cellSize = cellSize;
    this.size = size;
    this.index = index;
    this.buildingType = buildingType;
    this.damage = damage;
    this.side = side;

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
    if(this.buildingType === 'landFort') {
      if (sectors[this.index.x][this.index.y].currentDivision === null)
      {
        fill(255);
        ellipseMode(CORNER);
        ellipse(this.index.x * this.cellSize, this.index.y * this.cellSize + 4.5, this.size, this.size);
      }
      else
      {
        fill(0, 255, 0);
        ellipseMode(CORNER);
        ellipse(this.index.x * this.cellSize, this.index.y * this.cellSize + 4.5, this.size, this.size);
      } 
    }
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
        if (objectType === 'tree')
        {
            
        }
    }
}