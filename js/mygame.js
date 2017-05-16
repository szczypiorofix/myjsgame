
function MyGame() {

    this.running = true;
    this.distance = 0;
    this.distanceStep = 0;
    this.damage = 0;
    this.fuel = 100;
    this.maxfuel = 100;
    this.fuelusage = 0;
    this.food = 100;
    this.maxfood = 100;
    this.water = 100;
    this.maxwater = 100;
    this.shield = 100;
    this.maxshield = 100;
    this.scrap = 0;
    this.spareparts = 0;
    this.gameSpeed = 1;
    this.gameStep = 0;
    this.gameEvent = 0; // Integer - random value from events array
    
    this.fuelConsumptionLevel = 1;
    this.fuelStorageLevel = 1;
    this.waterStorageLevel = 1;
    this.foodStorageLevel = 1;
    this.shieldLevel = 1;

    this.gameEventStep = Math.floor(Math.random() * 4) +2;
    this.terrain = 0;
    this.terrains = [];
    
    this.events = [
        new EventOnRoad("A pack of vicious dogs", 85),
        new EventOnRoad("Small group of bandits", 65),
        new EventOnRoad("Raiders: 'Skullz'.", 45),
        new EventOnRoad("Raiders: 'Khans'.", 45),
        new EventOnRoad("Immortan Joe gang!", 20),
        new EventOnRoad("You drove on a solid ground.", 50),
        new EventOnRoad("You drove on a sandy path.", 60),
        new EventOnRoad("You drove on a muddy road.", 30),
        new EventOnRoad("You drove on a rocky path.", 40),
        new EventOnRoad("You found some fuel!", 60),
        new EventOnRoad("You found some water!", 60),
        new EventOnRoad("You found some food!", 60),
        new EventOnRoad("You found some scrap!", 50),
        new EventOnRoad("You found some spare parts!", 50),
        new EventOnRoad("You see a Lone Wanderer.", 20),
        new EventOnRoad("You see a dog.", 20),
        new EventOnRoad("You see a corpse.", 25),
        new EventOnRoad("You see a dead body, half-rotten.", 25),
        new EventOnRoad("Is that a river nearby?", 20),
        new EventOnRoad("Spain Inquisition?", 10),
        new EventOnRoad("Skywalker Ranch", 5),
        new EventOnRoad("A small village", 65)
    ];
    
    this.terrains = [
            new Terrain("Solid ground", 0, 0.6),
            new Terrain("Sand", 1, 0.85),
            new Terrain("Mud", 2, 1.15),
            new Terrain("Rocks", 3, 1.3)
        ];
    
    this.villages = [
      "Hub", "Klamath", "Nora", "Bunker Hill", "Shady Sands", "Redding", 
      "Junktown", "Modoc", "Den", "Abbey", "New Reno", "Broken Hills", "Goodsprings",
      "Bitter Springs"
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
            this.shield += 25;
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
        this.gameEventStep--;
        if (this.gameEventStep <= 0) {
            this.gameEvent = (Math.floor(Math.random() * this.events.length));
            
            var chance = (Math.floor(Math.random() * 100));
            if (chance <= this.events[this.gameEvent].chance) {
                document.getElementById("spot").innerHTML += this.distanceOnSpot() +this.events[this.gameEvent].name+"<br>";
                var objDiv = document.getElementById("spotdiv");
                objDiv.scrollTop = objDiv.scrollHeight;
                console.log("Event: "+this.events[this.gameEvent].name+" ("+this.events[this.gameEvent].chance+"/100) succeed! Roll: "+chance+" / 100");
                //this.eventsOnTheRoad();
                this.gameEventStep = Math.floor(Math.random() * 4) + 2;
            }
            else {
                console.log("Event: "+this.events[this.gameEvent].name+" ("+this.events[this.gameEvent].chance+"/100) failed. Roll: "+chance+" / 100");
            }
        }
    };

    this.distanceOnSpot = function() {
      return '<span style="color: burlywood;">'+this.distance.toFixed(2) +': </span>';
    };

    this.eventsOnTheRoad = function() {
        // FIGHTS
        if (this.gameEvent < 4) {
            if (this.gameEvent === 0) {
                this.damage = 2;
            }
            if (this.gameEvent === 1) {
                this.damage = 4;
            }
            if (this.gameEvent === 2) {
                this.damage = 6;
            }
            if (this.gameEvent === 3) {
                this.damage = 8;
            }
            this.pausegame();
            document.getElementById("fightfleebtn").style.display = "block";
        }
        else {
            this.damage = 0;
            
            // TERRAINS
            if (this.gameEvent === 4) { // SOLID GROUND
                document.getElementById("car").classList.remove('caranimSolid');
                document.getElementById("car").classList.remove('caranimSand');
                document.getElementById("car").classList.remove('caranimMud');
                document.getElementById("car").classList.remove('caranimRocks');
                this.terrain = this.terrains[0];
                document.getElementById("terrain").innerHTML = this.terrains[0].name;
                document.getElementById("car").classList.add('caranimSolid');
            }
            
            if (this.gameEvent === 5) { // SAND
                document.getElementById("car").classList.remove('caranimSolid');
                document.getElementById("car").classList.remove('caranimSand');
                document.getElementById("car").classList.remove('caranimMud');
                document.getElementById("car").classList.remove('caranimRocks');
                this.terrain = this.terrains[1];
                document.getElementById("terrain").innerHTML = this.terrains[1].name;
                document.getElementById("car").classList.add('caranimSand');
            }
            
            if (this.gameEvent === 6) { // MUD
                document.getElementById("car").classList.remove('caranimSolid');
                document.getElementById("car").classList.remove('caranimSand');
                document.getElementById("car").classList.remove('caranimMud');
                document.getElementById("car").classList.remove('caranimRocks');
                this.terrain = this.terrains[2];
                document.getElementById("terrain").innerHTML = this.terrains[2].name;
                document.getElementById("car").classList.add('caranimMud');
            }
            
            if (this.gameEvent === 7) { // ROCKS
                document.getElementById("car").classList.remove('caranimSolid');
                document.getElementById("car").classList.remove('caranimSand');
                document.getElementById("car").classList.remove('caranimMud');
                document.getElementById("car").classList.remove('caranimRocks');
                this.terrain = this.terrains[3];
                document.getElementById("terrain").innerHTML = this.terrains[3].name;
                document.getElementById("car").classList.add('caranimRocks');
            }
            
            // FOUND SOME FUEL
            if (this.gameEvent === 8) {
                var foundFuel = (Math.floor((Math.random() * 10)+1));
                this.fuel += foundFuel;
                if (this.fuel > this.maxfuel) {
                    this.fuel = this.maxfuel;
                }
                document.getElementById("fuel").innerHTML = this.fuel.toFixed(2) +" (+"+foundFuel+")";
            }
            
            // FOUND SOME WATER
            if (this.gameEvent === 9) {
                var foundWater = (Math.floor((Math.random() * 25)+1));
                this.water += foundWater;
                if (this.water > this.maxwater) {
                    this.water = this.maxwater;
                }
                document.getElementById("water").innerHTML = this.water +" (+"+foundWater+")";
            }
            
            // FOUND SOME FOOD
            if (this.gameEvent === 10) {
                var foundFood = (Math.floor((Math.random() * 25)+1));
                this.food += foundFood;
                if (this.food > this.maxfood) {
                    this.food = this.maxfood;
                }
                document.getElementById("food").innerHTML = this.food +" (+"+foundFood+")";
            }
            
            // FOUND SOME SCRAP
            if (this.gameEvent === 11) {
                var foundScrap = (Math.floor((Math.random() * 20)+1));
                this.scrap += foundScrap;
                document.getElementById("scrap").innerHTML = this.scrap +" (+"+foundScrap+")";
            }
            
            // FOUND SOME SPARE PARTS
            if (this.gameEvent === 12) {
                var foundSpareParts = (Math.floor((Math.random() * 25)+1));
                this.spareparts += foundSpareParts;
                if (this.spareparts >= 10 && this.shield < this.maxshield) {
                    document.getElementById("repairbtn").style.visibility = "visible";
                }
                document.getElementById("spareparts").innerHTML = this.spareparts +" (+"+foundSpareParts+")";
            }
            
            // A SMALL VILLAGE
            if (this.gameEvent === 13) {
                this.villageName = this.villages[Math.floor(Math.random() * this.villages.length)];
                document.getElementById("villagebtn").style.display = "block";
                document.getElementById("spot").innerHTML += this.distanceOnSpot() +this.events[this.spot].getName()+this.villageName+"<br>";
                var objDiv = document.getElementById("spotdiv");
                objDiv.scrollTop = objDiv.scrollHeight;
                this.pausegame();
            }
            else {
                document.getElementById("villagebtn").style.display = "none";
            }
        }
    };

    // THE VILLAGE
    this.enterTheVillage = function() {
        document.getElementById("spot").innerHTML += this.distanceOnSpot()+ "Entering the village...<br>";
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
        document.getElementById("village").style.display = "none";
        document.getElementById("villagebtn").style.display = "none";
        document.getElementById("spot").innerHTML += this.distanceOnSpot() + "Back on the fury road!<br>";
        var objDiv = document.getElementById("spotdiv");
        objDiv.scrollTop = objDiv.scrollHeight;
        this.pausegame();
    };
    
    this.fight = function() {
        document.getElementById("spot").innerHTML += this.distanceOnSpot()+ "You are facing the enemies!<br>";
        document.getElementById("fightfleebtn").style.display = "none";
        
        var objDiv = document.getElementById("spotdiv");
        objDiv.scrollTop = objDiv.scrollHeight;
        this.pausegame();
        this.damage = 0;
    };
    
    this.flee = function() {
        document.getElementById("spot").innerHTML += this.distanceOnSpot() +"You flee...<br>";
        document.getElementById("fightfleebtn").style.display = "none";
        var objDiv = document.getElementById("spotdiv");
        objDiv.scrollTop = objDiv.scrollHeight;
        this.pausegame();
        this.damage = 0;
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
        }
        else {
            this.running = true;
        }
    };

    this.startGame = function() {
        
        document.getElementById('mainmenu').style.display = "none";
        document.getElementById('game').style.display = "block";
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
