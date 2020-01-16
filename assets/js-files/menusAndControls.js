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
    stroke(1);
  }
  else {
    if (scene === 1)
    {
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
    
        if (currentUnitSelected != null) {
          if (sectors[x][y].currentDivision === null && sectors[x][y].currentNavy === null)
          {
            if (currentUnitSelected.divisionType !== undefined && sectors[x][y].landType !== 'water' || sectors[x][y].navalPorts != null) {
              print(currentUnitSelected.divisionType + " moved");
              currentUnitSelected.moveTo(x, y);
            }
          }
          currentUnitSelected = null;
        }
        else if (x >= 0 && y >= 0 && x < 95 && y <50) {
          currentSector = sectors[x][y];
          if (sectors[x][y].currentDivision) {
            currentUnitSelected = sectors[x][y].currentDivision;
            print(currentUnitSelected.divisionType + " selected");
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
          }
        }
      }
    }
  }

function keyPressed()
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