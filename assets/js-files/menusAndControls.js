// Map Editor

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