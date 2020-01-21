// Mouse and Keyboard Controls and Menus and the code for the map editor

function displayMenu()
{
  if (gameStarted)
  {
    guiWidth = width-(cellSize*95);
    guiHeight = height-(cellSize*50);

    noStroke();
    fill(100, 100, 100);
    rect((cellSize*95), 0, guiWidth, height);
    rect(0, (cellSize*50), width, guiHeight);
    fill(255);
    textSize(20);
    textAlign(LEFT);
    text("Money: " + playerCurrency, 10, (cellSize*50) + 30);


    if (currentUnitIcon === "infantry")
    {
      image(sovRifleW, (cellSize*95) + 10, 50, guiWidth - 20, guiWidth - 20)
    }
    if (currentUnitIcon === "truck")
    {
      image(sovSupplyW, (cellSize*95) + 10, 50, guiWidth - 20, guiWidth - 20)
    }
    if (currentUnitIcon === "tank")
    {
      image(sovTankW, (cellSize*95) + 10, 50, guiWidth - 20, guiWidth - 20)
    }
    if (currentUnitIcon === "engineer")
    {
      image(sovEngiW, (cellSize*95) + 10, 50, guiWidth - 20, guiWidth - 20)
      fill(15);
      text("B - Base (Cost: 500)", (cellSize*95) + 10, 50 + 200);
      text("T - Trench (Cost: 10)", (cellSize*95) + 10, 50 + 220);
    }
    if (currentUnitSelected !== undefined)
    {
      if (currentUnitSelected.buildingType === "base")
      {
        fill(255);
        textSize(15);
        textAlign(LEFT);
        text("E - Engineer (Cost: 25)", (cellSize*95) + 10, 50);
        text("I - Infantry (Cost: 25)", (cellSize*95) + 10, 65);
        text("T - Tank (Cost: 100)", (cellSize*95) + 10, 80);
        text("S - Supply Truck (Cost: 40)", (cellSize*95) + 10, 95);
      }
    }
    stroke(1);
  }
  else {
    if (scene === 1)
    {
      fill(255);
      textAlign(CENTER);
      textSize(30)
      text("When loading a map make sure you get the map from 'assets/maps/Volkhov.json'", windowWidth/2, 100);
      text("You are the Soviets/Red Team", windowWidth/2, 140);

      rectMode(CENTER);
      fill(100, 100, 100);
      rect(windowWidth/2, windowHeight/2 - 100, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("Singleplayer", windowWidth/2, windowHeight/2 - 90)
      rectMode(CORNER);

      rectMode(CENTER);
      fill(100, 100, 100);
      rect(windowWidth/2, windowHeight/2 + 200 - 100, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("Map Editor", windowWidth/2, windowHeight/2 + 120)
      rectMode(CORNER);
    }
  }
}


function mousePressed() {
    if (gameStarted) {
      if (mode !== 'editor')
      {
        let x = floor((mouseX) / cellSize);
        let y = floor((mouseY) / cellSize);
        print("x: " + x + " y: " + y);

        if (currentUnitSelected !== undefined) {
          {
            if (currentUnitSelected.divisionType !== undefined) {
              if (currentUnitSelected.divisionType !== undefined && sectors[x][y].landType !== 'water') {
                print(currentUnitSelected.divisionType + " moved");
                currentUnitSelected.moveTo(x, y);
              }
              currentUnitSelected = undefined;
              currentUnitIcon = undefined;
            }
          }
        }
        else if (x >= 0 && y >= 0 && x < 95 && y <50) {
          currentSector = sectors[x][y];

          if (sectors[x][y].currentDivision)
          {
            if (sectors[x][y].currentDivision.side === playerSide) {
              currentUnitSelected = sectors[x][y].currentDivision;
              currentUnitIcon = sectors[x][y].currentDivision.divisionType;
              print(currentUnitSelected.divisionType + " selected");
            }
          }
          else if (sectors[x][y].currentBuilding)
          {
            if (sectors[x][y].currentBuilding.side === playerSide || sectors[x][y].currentBuilding === "base") {
              currentUnitSelected = sectors[x][y].currentBuilding;
              print(currentUnitSelected.buildingType + " selected");
            }
          }
        }
      }
      else
      {
        let x = floor((mouseX) / cellSize);
        let y = floor((mouseY) / cellSize);
        print("x: " + x + " y: " + y);

        if (mousePressed)
        {
          sectors[x][y].landType = terrainType;
          loadSectors();
        }
      }
    }
    else
    {
      if (scene === 1)
      {
        if (mouseIsPressed) {
          if (mouseX > width/2 - 200 && mouseX < width/2 + 200 && mouseY > height/2 - 100 - 75 && mouseY < height/2 - 100 + 75) {
            mode = 'singeplayer';
            startGame();
            document.getElementById("Json-file").style.display = 'inline';
          }
          if (mouseX > width/2 - 200 && mouseX < width/2 + 200 && mouseY > height/2 + 100 - 75 && mouseY < height/2 + 100 + 75) {
            mode = 'editor';
            editorMode = 'terrain';
            startGame();
            document.getElementById("Json-file").style.display = 'inline';
          }
        }
      }
    }
  }

function keyPressed()
{
  if (mode === "editor")
  {
    if (editorMode === 'terrain')
    {
      if (key === 'p')
      {
        terrainType = 'plains';
      }
      if (key === 'i')
      {
        terrainType = 'ice';
      }
      if (key === 'w')
      {
        terrainType = 'water';
      }
      if (key === 'f')
      {
        terrainType = 'forest';
      }
      if (key === 'c')
      {
        terrainType = 'concrete';
      }
      if (key === 's')
      {
        terrainType = 'snow';
      }
      if (key === 'b')
      {
        terrainType = 'beach';
      }
      if (key === 'l')
      {
        mapData.arr = getTwoDArray(95,50);
        for(let i = 0; i < 95; i++)
        {
          for(let j = 0; j < 50; j++)
          {
            let obj = {
              landtype: sectors[i][j].landType,
              unit: sectors[i][j].currentDivision.divisionType
            };
            mapData.arr[i][j] = obj;
            print(obj);
          }
        }
        saveJSON(mapData, 'mapData.json');
      }
      if (key === 'm')
      {
        switchEditorMode();
        terrainType = '';
      }
    }
    else if(editorMode === 'object')
    {
      if (key === 'm')
      {
        switchEditorMode();
        terrainType = 'snow';
      }
    }
  }
  else
  {
    if (currentUnitSelected.buildingType !== undefined)
    {
      if (currentUnitSelected.buildingType === "base")
      {
        if (key === 'e')
        {
          playerCurrency = playerCurrency - 25;
          currentUnitSelected.createUnit("engineer");
          currentUnitSelected = undefined;
        }
        if (key === 'i')
        {
          playerCurrency = playerCurrency - 25;
          currentUnitSelected.createUnit("infantry");
          currentUnitSelected = undefined;
        }
        if (key === 't')
        {
          playerCurrency = playerCurrency - 25;
          currentUnitSelected.createUnit("tank");
          currentUnitSelected = undefined;
        }
        if (key === 's')
        {
          playerCurrency = playerCurrency - 25;
          currentUnitSelected.createUnit("truck");
          currentUnitSelected = undefined;
        }
      }
    }
    if (currentUnitSelected.divisionType !== undefined)
    {
      if (currentUnitSelected.divisionType === "engineer")
      {
        if (key === 'b')
        {
          playerCurrency = playerCurrency - 500;
          currentUnitSelected.createBuild("base");
          currentUnitSelected = undefined;
        }
        if (key === 't')
        {
          playerCurrency = playerCurrency - 10;
          currentUnitSelected.createBuild("trench");
          currentUnitSelected = undefined;
        }
      }
    }
  }
}

function switchEditorMode()
{
  if (editorMode === 'terrain')
  {
    editorMode = 'object';
  }
  else
  {
    editorMode = 'terrain';
  }
}