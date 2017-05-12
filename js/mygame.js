
function MyGame() {

    this.running = true;
    this.distance = 0;
    this.distanceStep = 0;
    this.fuel = 50;
    this.maxfuel = 50;
    this.fuelusage = 0;
    this.food = 50;
    this.maxfood = 50;
    this.water = 50;
    this.maxwater = 50;
    this.shield = 100;
    this.maxshield = 100;
    this.scrap = 0;
    this.spareparts = 0;
    this.gameSpeed = 1;
    this.gameStep = 0;
    this.spot = 0;
    
    this.fuelConsumptionLevel = 1;
    this.fuelStorageLevel = 1;
    this.waterStorageLevel = 1;
    this.foodStorageLevel = 1;
    this.shieldLevel = 1;

    this.terrain = 0;
    this.terrainPeriod = 0;
    this.terrainCount = 0;
    this.terrains = [];
    this.events = [
        "A pack of vicious dogs! Get off my lawn!",
        "Small group of raiders! Piece of cake!",
        "A large group of tough raiders! Not so easy to fight.",
        "Immortan Joe! He never gives up!",
        "You drove on a solid ground.",
        "You drove on a sandy path.",
        "You drove on a muddy road.",
        "You drove on a rocky path.",
        "You found some fuel!",
        "You found some water!",
        "You found some food!",
        "You found some scrap!",
        "You found some spare parts!",
        "You see a small village. Would you enter?"
    ];
    this.villages = [
      "Hub", "Klamath", "Nora", "Bunker Hill", "Shady Sands", "Redding", "Junktown", "Modoc", "Den", "Abbey"  
    ];
    this.villageName = "";

    this.updateDistance = function() {
        this.distanceStep = (4 - (this.terrain.value / 5));
        this.distance += this.distanceStep;
        document.getElementById("distance").innerHTML = this.distance.toFixed(2);
        document.getElementById("step").innerHTML = (this.distanceStep).toFixed(2);
    };

    this.updateFood = function() {
        this.food--;
        document.getElementById("food").innerHTML = this.food;
    };

    this.updateWater = function() {
        this.water--;
        document.getElementById("water").innerHTML = this.water;
    };

    this.updateFuel = function() {
        this.fuel -= this.fuelusage;
        document.getElementById("fuel").innerHTML = this.fuel.toFixed(2);
    };

    this.updateFuelUsage = function() {
        this.fuelusage = this.terrain.fuelConsumption - (this.fuelConsumptionLevel * 0.04);
        document.getElementById("fuelusage").innerHTML = this.fuelusage.toFixed(2);
    };
    
    this.updateShield = function(dmg) {
        this.shield -= dmg;
        document.getElementById("shield").innerHTML = this.shield;
    };

    this.updateSpareParts = function() {
        if (this.spareparts >= 10 && this.shield < this.maxshield) {
            document.getElementById("repairbtn").style.visibility = "visible";
        }
        else {
            document.getElementById("repairbtn").style.visibility = "hidden";
        }
        document.getElementById("spareparts").innerHTML = this.spareparts;
    };
    
    this.updateScrap = function() {
        document.getElementById("scrap").innerHTML = this.scrap;
    };

    this.setSpeed = function(speed) {
        this.gameSpeed = speed;
    };
    
    this.repair = function() {
        if (this.spareparts >= 10 && this.shield < this.maxshield) {
            this.spareparts -= 10;
            this.shield += 10;
            if (this.shield > this.maxshield) {
                this.shield = this.maxshield;
            }
            if (this.shield === this.maxshield || this.spareparts <= 0) {
                document.getElementById("repairbtn").style.visibility = "hidden";
            }
            document.getElementById("shield").innerHTML = this.shield;
            document.getElementById("spareparts").innerHTML = this.spareparts;
        }
    };


    // UPGRADES
    this.fuelStorageUpgrade = function() {
        if (this.spareparts >= this.fuelStorageLevel * 10) {
            this.maxfuel += 10;
            this.spareparts -= (this.fuelStorageLevel * 10);
            this.fuelStorageLevel++;
            document.getElementById("fuelstoragelevelsp").innerHTML = "("+(this.fuelStorageLevel * 10)+" sp)";
            document.getElementById("spareparts").innerHTML = this.spareparts;
            document.getElementById("maxfuel").innerHTML = this.maxfuel;
            document.getElementById("fuelstoragelevel").innerHTML = this.fuelStorageLevel;
            this.checkAvailableUpgrades();
        } 
    };
    
    this.shieldUpgrade = function() {
        if (this.spareparts >= this.shieldLevel * 10) {
            this.shield = Math.ceil((this.shield * (this.maxshield + 25)) / this.maxshield);
            this.maxshield += 25;
            this.spareparts -= (this.shieldLevel * 10);
            this.shieldLevel++;
            document.getElementById("shieldlevelsp").innerHTML = "("+(this.shieldLevel * 10)+" sp)";
            document.getElementById("spareparts").innerHTML = this.spareparts;
            document.getElementById("maxshield").innerHTML = this.maxshield;
            document.getElementById("shield").innerHTML = this.shield;
            document.getElementById("shieldlevel").innerHTML = this.shieldLevel;
            this.checkAvailableUpgrades();
        }
    };
    
    this.foodStorageUpgrade = function() {
        if (this.spareparts >= this.foodStorageLevel * 10) {
            this.maxfood += 10;
            this.spareparts -= (this.foodStorageLevel * 10);
            this.foodStorageLevel++;
            document.getElementById("foodstoragelevelsp").innerHTML = "("+(this.foodStorageLevel * 10)+" sp)";
            document.getElementById("spareparts").innerHTML = this.spareparts;
            document.getElementById("maxfood").innerHTML = this.maxfood;
            document.getElementById("foodstoragelevel").innerHTML = this.foodStorageLevel;
            this.checkAvailableUpgrades();
        }
    };
    
    this.waterStorageUpgrade = function() {
        if (this.spareparts >= this.waterStorageLevel * 10) {
            this.maxwater += 10;
            this.spareparts -= (this.waterStorageLevel * 10);
            this.waterStorageLevel++;
            document.getElementById("waterstoragelevelsp").innerHTML = "("+(this.waterStorageLevel * 10)+" sp)";
            document.getElementById("spareparts").innerHTML = this.spareparts;
            document.getElementById("maxwater").innerHTML = this.maxwater;
            document.getElementById("waterstoragelevel").innerHTML = this.waterStorageLevel;
            this.checkAvailableUpgrades();
        }
    };
    
    this.fuelConsumptionUpgrade = function() {
        if (this.spareparts >= this.fuelConsumptionLevel * 10) {
            this.spareparts -= (this.fuelConsumptionLevel * 10);
            this.fuelConsumptionLevel++;
            document.getElementById("fuelconsumptionlevelsp").innerHTML = "("+(this.fuelConsumptionLevel * 10)+" sp)";
            document.getElementById("spareparts").innerHTML = this.spareparts;
            document.getElementById("fuelconsumptionlevel").innerHTML = this.fuelConsumptionLevel;
            this.checkAvailableUpgrades();
        }
    };

    this.checkAvailableUpgrades = function() {
        if (this.spareparts >= this.fuelStorageLevel * 10) {
            document.getElementById("fuelstorageupgrade").style.visibility = "visible";
        }
        else {
            document.getElementById("fuelstorageupgrade").style.visibility = "hidden";
        }
        if (this.spareparts >= this.shieldLevel * 10) {
            document.getElementById("shieldupgrade").style.visibility = "visible";
        }
        else {
            document.getElementById("shieldupgrade").style.visibility = "hidden";
        }
        if (this.spareparts >= this.waterStorageLevel * 10) {
            document.getElementById("waterstorageupgrade").style.visibility = "visible";
        }
        else {
            document.getElementById("waterstorageupgrade").style.visibility = "hidden";
        }
        if (this.spareparts >= this.foodStorageLevel * 10) {
            document.getElementById("foodstorageupgrade").style.visibility = "visible";
        }
        else {
            document.getElementById("foodstorageupgrade").style.visibility = "hidden";
        }
        if (this.spareparts >= this.fuelConsumptionLevel * 10) {
            document.getElementById("fuelconsumptionupgrade").style.visibility = "visible";
        }
        else {
            document.getElementById("fuelconsumptionupgrade").style.visibility = "hidden";
        }
    };
    
    this.updateSpot = function() {
        this.spot = (Math.floor((Math.random() * this.events.length) * 3));
        if (this.spot < this.events.length) {
            document.getElementById("spot").innerHTML += this.events[this.spot]+"<br>";
        }
        //document.getElementById("spotdiv").scrollTop = (Math.floor(this.distance) * 2);
        var objDiv = document.getElementById("spotdiv");
        objDiv.scrollTop = objDiv.scrollHeight;
        this.eventsOnTheRoad();
    };

    this.eventsOnTheRoad = function() {
        // FIGHTS
        if (this.spot < 4) {
            if (this.spot === 0) {
                this.damage = 2;
            }
            if (this.spot === 1) {
                this.damage = 4;
            }
            if (this.spot === 2) {
                this.damage = 6;
            }
            if (this.spot === 3) {
                this.damage = 8;
            }
        }
        else {
            this.damage = 0;
            
            // TERRAINS
            if (this.spot === 4) { // SOLID GROUND
                //var randomTerrain = (Math.floor((Math.random() * this.terrains.length)));
                this.terrain = this.terrains[0];
                document.getElementById("terrain").innerHTML = this.terrains[0].name;
            }
            
            if (this.spot === 5) { // SAND
                //var randomTerrain = (Math.floor((Math.random() * this.terrains.length)));
                this.terrain = this.terrains[1];
                document.getElementById("terrain").innerHTML = this.terrains[1].name;
            }
            
            if (this.spot === 6) { // MUD
                //var randomTerrain = (Math.floor((Math.random() * this.terrains.length)));
                this.terrain = this.terrains[2];
                document.getElementById("terrain").innerHTML = this.terrains[2].name;
            }
            
            if (this.spot === 7) { // ROCKS
                //var randomTerrain = (Math.floor((Math.random() * this.terrains.length)));
                this.terrain = this.terrains[3];
                document.getElementById("terrain").innerHTML = this.terrains[3].name;
            }
            
            // FOUND SOME FUEL
            if (this.spot === 8) {
                var foundFuel = (Math.floor((Math.random() * 10)+1));
                this.fuel += foundFuel;
                if (this.fuel > this.maxfuel) {
                    this.fuel = this.maxfuel;
                }
                document.getElementById("fuel").innerHTML = this.fuel.toFixed(2) +" (+"+foundFuel+")";
            }
            
            // FOUND SOME WATER
            if (this.spot === 9) {
                var foundWater = (Math.floor((Math.random() * 8)+1));
                this.water += foundWater;
                if (this.water > this.maxwater) {
                    this.water = this.maxwater;
                }
                document.getElementById("water").innerHTML = this.water +" (+"+foundWater+")";
            }
            
            // FOUND SOME FOOD
            if (this.spot === 10) {
                var foundFood = (Math.floor((Math.random() * 8)+1));
                this.food += foundFood;
                if (this.food > this.maxfood) {
                    this.food = this.maxfood;
                }
                document.getElementById("food").innerHTML = this.food +" (+"+foundFood+")";
            }
            
            // FOUND SOME SCRAP
            if (this.spot === 11) {
                var foundScrap = (Math.floor((Math.random() * 16)+1));
                this.scrap += foundScrap;
                document.getElementById("scrap").innerHTML = this.scrap +" (+"+foundScrap+")";
            }
            
            // FOUND SOME SPARE PARTS
            if (this.spot === 12) {
                var foundSpareParts = (Math.floor((Math.random() * 25)+1));
                this.spareparts += foundSpareParts;
                if (this.spareparts >= 10 && this.shield < this.maxshield) {
                    document.getElementById("repairbtn").style.visibility = "visible";
                }
                document.getElementById("spareparts").innerHTML = this.spareparts +" (+"+foundSpareParts+")";
            }
            
            // A SMALL VILLAGE
            if (this.spot === 13) {
                this.villageName = this.villages[Math.floor(Math.random() * this.villages.length)];
                //document.getElementById("entervillagebtn").style.visibility = "visible";
            }
            else {
                //document.getElementById("entervillagebtn").style.visibility = "hidden";
            }
        }
    };

    // THE VILLAGE
    this.enterTheVillage = function() {
        this.pausegame();
        document.getElementById("villageName").innerHTML = this.villageName;
        document.getElementById("yourscrap").innerHTML = this.scrap;
    };
    
    this.repairCar = function() {
        document.getElementById("villageMessage").innerHTML = "Car repaired.";
    };
    
    this.buySpareParts = function() {
        document.getElementById("villageMessage").innerHTML = "You bought 10 spare parts.";
    };
    
    this.refuelCar = function() {
        document.getElementById("villageMessage").innerHTML = "Car refueled.";
    };
    
    this.buyWater = function() {
        document.getElementById("villageMessage").innerHTML = "You bought 10 water.";
    };
    
    this.buyFood = function() {
        document.getElementById("villageMessage").innerHTML = "You bought 10 food.";
    };
    
    this.backToTheRoad = function() {
        this.pausegame();
        
    };

    // "GAME LOOP"
    this.gameLoop = function() {
        this.updateSpot();
        this.updateDistance();
        this.updateFuel();
        this.updateFuelUsage();
        this.updateFood();
        this.updateWater();
        this.updateSpareParts();
        this.updateScrap();
        this.updateShield(this.damage);
        this.checkAvailableUpgrades();
    };

    this.pausegame = function() {
        if (this.running === true) {
            this.running = false;
            document.getElementById("startstop").innerHTML = "START";
            document.getElementById("startstop").style.color = "gray";
        }
        else {
            this.running = true;
            document.getElementById("startstop").innerHTML = "PAUSE";
            document.getElementById("startstop").style.color = "#99ccff";
        }
    };

    this.startGame = function() {
        this.terrains = [
            new Terrain("Solid ground", 0, 0.6),
            new Terrain("Sand", 1, 0.85),
            new Terrain("Mud", 2, 1.15),
            new Terrain("Rocks", 3, 1.3)
        ];
        this.terrain = this.terrains[0];
        var instance = this;
        setInterval(function() {

            instance.gameStep++;
            if (instance.running) {
                if (instance.gameStep > (8 - (instance.gameSpeed * 2))) {
                    instance.gameLoop();
                    instance.gameStep = 0;
                }
            }
        }, 500);
    };
}
