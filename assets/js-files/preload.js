// Music
let warSong1, warSong2, warSong3, warFinale, menuSong;

// Unit Voice Lines
let gerSelect, gerAction, gerRetreat; // German Voices
let sovSelect, sovAction, sovRetreat; // Soviet/Russian Voices

// Battle Sounds
let ambienceAA, ambienceAT, ambienceRocket, ambienceFighter, ambienceGen, ambienceMG, ambienceMort, ambienceTank;

// Flags
let flagSoviet, flagUSA; // Allied Flags
let flagReich; // Axis Flags
let flagPoland, flagFrance; // Neutral Flags

// Unit Icons
let sovHelmet, gerHelmet, polHelmet, usaHelmet, ukHelmet, ukHelmetD;
let sovTruck, gerTruck, genTruck, polTruck;
let sovEngi, gerEngi, genEngi, polEngiT;
let sovMortI, gerMortI, genMortI;
let sovATI, gerATI, genATI;
let sovAPCI, gerAPCI, genAPCI;
let sovArmW, gerArmW, genArmW;
let sovBoat, gerBoat, genBoat, resBoat;

// Unit Portraits
let sovRifleW, sovSmgW, sovATW, sovMgW, sovSniperW, sovNKVDW, sovPartisanW, sovSupplyW, sovEngiW, sovMortW, sovATArtW, sovAPCW, sovTankW, sovFighterW, sovBomberW; // Soviet Winter
let usaRifleW, usaSmgW, usaATW, usaMgW, usaSniperW, usaRadopW, usaMedicW, usaSupplyW, usaEngiW, usaMortW, usaAPCW, usaATTW, usaTankW, usaFighterW, usaBomberW; // American Winter
let gerRifleW, gerSmgW, gerATW, gerMgW, gerSniperW, gerOfficerW, gerMedicW, gerSupplyW, gerEngiW, gerMortW, gerATArtW, gerAPCW, gerTankW, gerFighterW, gerBomberW; // German Winter
let polRifleW, polOfficerW, polSupplyW, polEngiW; // Polish Winter
let polRifle, polOfficer, polSupply, polEngi; // Polish
let fraRifleW, fraOfficerW, fraSupplyW, fraEngiW; // French Winter

// Defence Icons
let trench;

// Environment Icons
let tree, treeW, supplyDepot;

function preload() {
  // Allied Flags
  flagSoviet = loadImage("assets/icons/flags/allied/flagSoviet.png");
  flagUSA = loadImage("assets/icons/flags/allied/flagUSA.png");
  // Axis Flags
  flagReich = loadImage("assets/icons/flags/axis/flagReich.png");
  // Neutral Flags
  flagPoland = loadImage("assets/icons/flags/neutral/flagPoland.png");
  flagFrance = loadImage("assets/icons/flags/neutral/flagFrance.png");

  // Music
  warSong1 = loadSound("assets/sound/music/war/war1.ogg");
  warSong2 = loadSound("assets/sound/music/war/war2.ogg");
  warSong3 = loadSound("assets/sound/music/war/war3.ogg");
  warFinale = loadSound("assets/sound/music/war/warFinale.ogg"); // War song that only plays when a side is about to win
  menuSong = loadSound("assets/sound/music/menuSong.ogg");

  // Soviet Voice Lines
  sovSelect = loadSound("assets/sound/voice/sovSelected.wav");
  sovAction = loadSound("assets/sound/voice/sovAction.wav");
  sovRetreat = loadSound("assets/sound/voice/sovRetreat.wav");

  // Soviet Voice Lines
  gerSelect = loadSound("assets/sound/voice/gerSelected.wav");
  gerAction = loadSound("assets/sound/voice/gerAction.wav");
  gerRetreat = loadSound("assets/sound/voice/gerRetreat.wav");

  // Infantry Icons
  sovHelmet = loadImage("assets/icons/units/infantrySov.png");
  gerHelmet = loadImage("assets/icons/units/infantryGer.png");
  polHelmet = loadImage("assets/icons/units/infantryPol.png");
  usaHelmet = loadImage("assets/icons/units/infantryGeneric.png");
  ukHelmet = loadImage("assets/icons/units/infantryUK.png");
  ukHelmetD = loadImage("assets/icons/units/infantryUKD.png");

  // Mortar Icons
  sovMortI = loadImage("assets/icons/units/mortSov.png");
  gerMortI = loadImage("assets/icons/units/mortGer.png");
  genMortI = loadImage("assets/icons/units/mortGen.png");

  // AT Artillery Icons
  sovATI = loadImage("assets/icons/units/atSov.png");
  gerATI = loadImage("assets/icons/units/atGer.png");
  genATI = loadImage("assets/icons/units/atGen.png");

  // Truck Icons
  sovTruck = loadImage("assets/icons/units/truckSov.png");
  gerTruck = loadImage("assets/icons/units/truckGer.png");
  polTruck = loadImage("assets/icons/units/truckPol.png");
  genTruck = loadImage("assets/icons/units/truckGen.png");
  
  // Engineer Icons
  sovEngi = loadImage("assets/icons/units/engiSov.png");
  gerEngi = loadImage("assets/icons/units/engiGer.png");
  polEngiT = loadImage("assets/icons/units/engiPol.png");
  genEngi = loadImage("assets/icons/units/engiGen.png");
  
  // Half-Track Icons
  sovAPCI = loadImage("assets/icons/units/apcSov.png");
  gerAPCI = loadImage("assets/icons/units/apcGer.png");
  genAPCI = loadImage("assets/icons/units/apcGen.png");
  
  // Tank Icons
  sovArmW = loadImage("assets/icons/units/tankWSov.png");
  gerArmW = loadImage("assets/icons/units/tankWGer.png");
  genArmW = loadImage("assets/icons/units/tankWMil.png");
  
  // Tank Icons
  sovBoat = loadImage("assets/icons/units/boatSov.png");
  gerBoat = loadImage("assets/icons/units/boatGer.png");
  genBoat = loadImage("assets/icons/units/boatGen.png");
  resBoat = loadImage("assets/icons/units/boatMilitia.png");

  // Soviet Portraits - Winter
  sovRifleW = loadImage("assets/icons/unitsPortraits/sovW/sovRifleman.png");
  sovSmgW = loadImage("assets/icons/unitsPortraits/sovW/sovSMG.png");
  sovATW = loadImage("assets/icons/unitsPortraits/sovW/sovAT.png");
  sovMgW = loadImage("assets/icons/unitsPortraits/sovW/sovMG.png");
  sovSniperW = loadImage("assets/icons/unitsPortraits/sovW/sovSniper.png");
  sovNKVDW = loadImage("assets/icons/unitsPortraits/sovW/sovNKVD.png");
  sovPartisanW = loadImage("assets/icons/unitsPortraits/sovW/sovPartisan.png");
  sovSupplyW = loadImage("assets/icons/unitsPortraits/sovW/sovSupply.png");
  sovEngiW = loadImage("assets/icons/unitsPortraits/sovW/sovEngi.png");
  sovMortW = loadImage("assets/icons/unitsPortraits/sovW/sovMortar.png");
  sovATArtW = loadImage("assets/icons/unitsPortraits/sovW/sovATArt.png");
  sovAPCW = loadImage("assets/icons/unitsPortraits/sovW/sovAPC.png");
  sovTankW = loadImage("assets/icons/unitsPortraits/sovW/sovTank.png");
  sovFighterW = loadImage("assets/icons/unitsPortraits/sovW/sovFighter.png");
  sovBomberW = loadImage("assets/icons/unitsPortraits/sovW/sovBomber.png");

  // American Portraits - Winter
  usaRifleW = loadImage("assets/icons/unitsPortraits/usaW/usaRifleman.png");
  usaSmgW = loadImage("assets/icons/unitsPortraits/usaW/usaSMG.png");
  usaATW = loadImage("assets/icons/unitsPortraits/usaW/usaAT.png");
  usaMgW = loadImage("assets/icons/unitsPortraits/usaW/usaMG.png");
  usaSniperW = loadImage("assets/icons/unitsPortraits/usaW/usaSniper.png");
  usaMedicW = loadImage("assets/icons/unitsPortraits/usaW/usaMedic.png");
  usaRadioW = loadImage("assets/icons/unitsPortraits/usaW/usaRadioman.png");
  usaSupplyW = loadImage("assets/icons/unitsPortraits/usaW/usaSupplyTruck.png");
  usaEngiW = loadImage("assets/icons/unitsPortraits/usaW/usaEngi.png");
  usaMortW = loadImage("assets/icons/unitsPortraits/usaW/usaMortar.png");
  usaAPC = loadImage("assets/icons/unitsPortraits/usaW/usaAPC.png");
  usaATTW = loadImage("assets/icons/unitsPortraits/usaW/usaAPC2.png");
  usaTankW = loadImage("assets/icons/unitsPortraits/usaW/usaTank.png");
  usaFighterW = loadImage("assets/icons/unitsPortraits/usaW/usaFighter.png");
  usaBomberW = loadImage("assets/icons/unitsPortraits/usaW/usaBomber.png");

  // Soviet Portraits - Winter
  gerRifleW = loadImage("assets/icons/unitsPortraits/gerW/gerRifleman.png");
  gerSmgW = loadImage("assets/icons/unitsPortraits/gerW/gerSMG.png");
  gerATW = loadImage("assets/icons/unitsPortraits/gerW/gerAT.png");
  gerMgW = loadImage("assets/icons/unitsPortraits/gerW/gerMG.png");
  gerSniperW = loadImage("assets/icons/unitsPortraits/gerW/gerSniper.png");
  gerOfficerW = loadImage("assets/icons/unitsPortraits/gerW/gerOfficer.png");
  gerMedicW = loadImage("assets/icons/unitsPortraits/gerW/gerMedic.png");
  gerSupplyW = loadImage("assets/icons/unitsPortraits/gerW/gerSupply.png");
  gerEngiW = loadImage("assets/icons/unitsPortraits/gerW/gerEngi.png");
  gerMortW = loadImage("assets/icons/unitsPortraits/gerW/gerMortar.png");
  gerATArtW = loadImage("assets/icons/unitsPortraits/gerW/gerATArt.png");
  gerAPCW = loadImage("assets/icons/unitsPortraits/gerW/gerAPC.png");
  gerTankW = loadImage("assets/icons/unitsPortraits/gerW/gerTank.png");
  gerFighterW = loadImage("assets/icons/unitsPortraits/gerW/gerFighter.png");
  gerBomberW = loadImage("assets/icons/unitsPortraits/gerW/gerBomber.png");

  // Polish Portraits - Winter
  polRifleW = loadImage("assets/icons/unitsPortraits/polW/polSoldier.png");
  polOfficerW = loadImage("assets/icons/unitsPortraits/polW/polCaptain.png");
  polSupplyW = loadImage("assets/icons/unitsPortraits/polW/polSupply.png");
  polEngiW = loadImage("assets/icons/unitsPortraits/polW/polEngi.png");
  
  // Polish Portraits
  polRifle = loadImage("assets/icons/unitsPortraits/pol/polSoldier.png");
  polOfficer = loadImage("assets/icons/unitsPortraits/pol/polOfficer.png");
  polSupply = loadImage("assets/icons/unitsPortraits/pol/polSupply.png");
  polEngi = loadImage("assets/icons/unitsPortraits/pol/polEngi.png");

  // French Portraits - Winter
  fraRifleW = loadImage("assets/icons/unitsPortraits/fraW/fraSoldier.png");
  fraOfficerW = loadImage("assets/icons/unitsPortraits/fraW/fraOfficer.png");
  fraSupplyW = loadImage("assets/icons/unitsPortraits/fraW/fraSupply.png");
  fraEngiW = loadImage("assets/icons/unitsPortraits/fraW/fraEngi.png");

  // Defences
  trench = loadImage("assets/icons/buildings/defense/trench/trench4way.png")

  // Environment Objects
  tree = loadImage("assets/icons/environment/tree.png");
  treeW = loadImage("assets/icons/environment/treeSnow.png");
  supplyDepot = loadImage("assets/icons/environment/supplyDepot.png");
}