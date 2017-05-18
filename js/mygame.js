function e(element) {
    return document.getElementById(element);
}


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
    this.attack = 1;
    this.defense = 1;
    
    this.gameSpeed = 1;
    this.gameStep = 0;
    this.gameEvent = 0; // Integer - random value from events array
    this.gameEventObject; // object EventOnRoad
    
    this.fuelConsumptionLevel = 1;
    this.fuelStorageLevel = 1;
    this.waterStorageLevel = 1;
    this.foodStorageLevel = 1;
    this.shieldLevel = 1;
    this.attackLevel = 1;
    this.defenseLevel = 1;

    this.gameEventStep = Math.floor(Math.random() * 4) +2;
    this.terrain = 0;
    this.terrains = [];
    this.TYPE = {
      PLACE: 0,
      FIGHT: 1,
      FOUND: 2,
      TERRAIN: 3,
      ENCOUNTER: 4
    };
    
    this.viciousDogsAttack = 2;
    this.smallRaidersAttack = 3;
    this.skulzAttack = 4;
    this.khansAttack = 5;
    this.immortanAttack = 6;
    
    this.events = [
        new EventOnRoad("You see a small village in a distance", 85, this.TYPE.PLACE),
        new EventOnRoad("You are attacked by a pack of vicious dogs", 85, this.TYPE.FIGHT),
        new EventOnRoad("You are attacked by a small group of bandits", 65, this.TYPE.FIGHT),
        new EventOnRoad("You are attacked by raiders: 'Skulz'.", 40, this.TYPE.FIGHT),
        new EventOnRoad("You are attacked by raiders: 'Khans'.", 40, this.TYPE.FIGHT),
        new EventOnRoad("Oh no! It's Immortan Joe gang!", 15, this.TYPE.FIGHT),
        new EventOnRoad("You drove on a solid ground.", 50, this.TYPE.TERRAIN),
        new EventOnRoad("You drove on a sandy path.", 60, this.TYPE.TERRAIN),
        new EventOnRoad("You drove on a muddy road.", 30, this.TYPE.TERRAIN),
        new EventOnRoad("You drove on a rocky path.", 40, this.TYPE.TERRAIN),
        new EventOnRoad("You found some fuel!", 60, this.TYPE.FOUND),
        new EventOnRoad("You found some water!", 60, this.TYPE.FOUND),
        new EventOnRoad("You found some food!", 60, this.TYPE.FOUND),
        new EventOnRoad("You found some scrap!", 65, this.TYPE.FOUND),
        new EventOnRoad("You see a Lone Wanderer.", 20, this.TYPE.ENCOUNTER),
        new EventOnRoad("You see a dog.", 20, this.TYPE.ENCOUNTER),
        new EventOnRoad("You see a corpse.", 25, this.TYPE.ENCOUNTER),
        new EventOnRoad("You see a dead body, half-rotten.", 25, this.TYPE.ENCOUNTER),
        new EventOnRoad("Is that a river nearby?", 20, this.TYPE.ENCOUNTER),
        new EventOnRoad("You see an old, damaged car.", 25, this.TYPE.ENCOUNTER),
        new EventOnRoad("What??? Skywalker Ranch???", 5, this.TYPE.ENCOUNTER),
        new EventOnRoad("You see group of followers of the Flying Spaghetti Monster.", 10, this.TYPE.ENCOUNTER),
        new EventOnRoad("You see two wanderers.", 20, this.TYPE.ENCOUNTER),
        new EventOnRoad("You see an abandoned shack.", 20, this.TYPE.ENCOUNTER),
        new EventOnRoad("You see a ruins of a village nearby.", 20, this.TYPE.ENCOUNTER),
        new EventOnRoad("You see a ruins of a big house nearby.", 20, this.TYPE.ENCOUNTER),
        new EventOnRoad("You see a ruined house", 30, this.TYPE.ENCOUNTER),
        new EventOnRoad("You see a ruins of old chapel.", 25, this.TYPE.ENCOUNTER),
        new EventOnRoad("You see a slave hunter who leads two slaves on chains.", 15, this.TYPE.ENCOUNTER),
        new EventOnRoad("You see a bandit camp.", 20, this.TYPE.ENCOUNTER)
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
        e("distance").innerHTML = this.distance.toFixed(2);
        e("step").innerHTML = (this.distanceStep).toFixed(2);
    };

    this.updateFood = function() {
        this.food -= 0.5;
        e("food").innerHTML = this.food.toFixed(2);
    };

    this.updateWater = function() {
        this.water -= 0.5;
        e("water").innerHTML = this.water.toFixed(2);
    };

    this.updateFuel = function() {
        this.fuel -= this.fuelusage;
        e("fuel").innerHTML = this.fuel.toFixed(2);
    };

    this.updateFuelUsage = function() {
        this.fuelusage = this.terrain.fuelConsumption - (this.fuelConsumptionLevel * 0.04);
        e("fuelusage").innerHTML = this.fuelusage.toFixed(2);
    };
    
    this.updateShield = function(dmg) {
        this.shield -= dmg;
        e("shield").innerHTML = this.shield;
    };
    
    this.updateScrap = function() {
        e("scrap").innerHTML = this.scrap;
    };

    this.setSpeed = function(speed) {
        this.gameSpeed = speed;
    };
    
      

    
    this.updateSpot = function() {
        this.gameEventStep--;
        if (this.gameEventStep <= 0) {
            
            this.gameEvent = (Math.floor(Math.random() * this.events.length));
            
            //this.gameEvent = 0; // HACK !!!
            
            var chance = (Math.floor(Math.random() * 100));
            if (chance <= this.events[this.gameEvent].chance) {
                
                this.gameEventObject = this.events[this.gameEvent];
                if (this.gameEvent > 0) e("spot").innerHTML += this.distanceOnSpot() +this.gameEventObject.name+"<br>";
                this.eventsOnTheRoad();
                this.gameEventStep = Math.floor(Math.random() * 4) + 2;
            }
        }
        e("spotdiv").scrollTop = e("spotdiv").scrollHeight;
    };

    this.distanceOnSpot = function() {
      return '<span style="color: burlywood;">'+this.distance.toFixed(2) +': </span>';
    };

    this.eventsOnTheRoad = function() {
        
        // LOCATIONS
        if (this.gameEventObject.type === this.TYPE.PLACE) {

            if (this.gameEvent === 0) {
                this.villageName = this.villages[Math.floor(Math.random() * this.villages.length)];
                e("villagebtn").style.display = "block";
                e("spot").innerHTML += this.distanceOnSpot() +this.events[this.gameEvent].name+": " +this.villageName+".<br>";
                this.pausegame();
            }
            
        } else {
            e("villagebtn").style.display = "none";
        }

        // FIGHTS
        if (this.gameEventObject.type === this.TYPE.FIGHT) {
            this.pausegame();
            e("fightfleebtn").style.display = "block";
        }
        
        // TERRAIN UPDATE
        if (this.gameEventObject.type === this.TYPE.TERRAIN) {

            if (this.gameEvent === 6) { // SOLID GROUND
                e("car").classList.remove('caranimSolid');
                e("car").classList.remove('caranimSand');
                e("car").classList.remove('caranimMud');
                e("car").classList.remove('caranimRocks');
                this.terrain = this.terrains[0];
                e("terrain").innerHTML = this.terrains[0].name;
                e("car").classList.add('caranimSolid');
            }
            
            if (this.gameEvent === 7) { // SAND
                e("car").classList.remove('caranimSolid');
                e("car").classList.remove('caranimSand');
                e("car").classList.remove('caranimMud');
                e("car").classList.remove('caranimRocks');
                this.terrain = this.terrains[1];
                e("terrain").innerHTML = this.terrains[1].name;
                e("car").classList.add('caranimSand');
            }
            
            if (this.gameEvent === 8) { // MUD
                e("car").classList.remove('caranimSolid');
                e("car").classList.remove('caranimSand');
                e("car").classList.remove('caranimMud');
                e("car").classList.remove('caranimRocks');
                this.terrain = this.terrains[2];
                e("terrain").innerHTML = this.terrains[2].name;
                e("car").classList.add('caranimMud');
            }
            
            if (this.gameEvent === 9) { // ROCKS
                e("car").classList.remove('caranimSolid');
                e("car").classList.remove('caranimSand');
                e("car").classList.remove('caranimMud');
                e("car").classList.remove('caranimRocks');
                this.terrain = this.terrains[3];
                e("terrain").innerHTML = this.terrains[3].name;
                e("car").classList.add('caranimRocks');
            }
        }


        // YOU FOUND ...
        if (this.gameEventObject.type === this.TYPE.FOUND) {
            
            if (this.gameEvent === 10) { // FUEL
                var foundFuel = (Math.floor((Math.random() * 15)+5));
                this.fuel += foundFuel;
                if (this.fuel > this.maxfuel) {
                    this.fuel = this.maxfuel;
                }
                e("fuel").innerHTML = this.fuel.toFixed(2) +" (+"+foundFuel+")";               
            }
            
            if (this.gameEvent === 11) { // WATER
                var foundWater = (Math.floor((Math.random() * 25)+5));
                this.water += foundWater;
                if (this.water > this.maxwater) {
                    this.water = this.maxwater;
                }
                e("water").innerHTML = this.water +" (+"+foundWater+")";              
            }
            
            if (this.gameEvent === 12) { // FOOD
                var foundFood = (Math.floor((Math.random() * 25)+5));
                this.food += foundFood;
                if (this.food > this.maxfood) {
                    this.food = this.maxfood;
                }
                e("food").innerHTML = this.food +" (+"+foundFood+")";            
            }
            
            if (this.gameEvent === 13) { // SCRAP
                var foundScrap = (Math.floor((Math.random() * 20)+5));
                this.scrap += foundScrap;
                e("scrap").innerHTML = this.scrap +" (+"+foundScrap+")";          
            }
        }
    };

    // THE VILLAGE
    this.enterTheVillage = function() {
        e("spot").innerHTML += this.distanceOnSpot()+ "Entering the village...<br>";
        e("villageName").innerHTML = this.villageName;
        e("yourscrap").innerHTML = this.scrap;
        e("yourfuel").innerHTML = this.fuel.toFixed(2);
        e("yourmaxfuel").innerHTML = this.maxfuel;
        e("yourattack").innerHTML = this.attack;
        e("yourdefense").innerHTML = this.defense;
        e("yourshield").innerHTML = this.shield;
        e("yourmaxshield").innerHTML = this.maxshield;
        e("yourfood").innerHTML = this.food.toFixed(2);
        e("yourmaxfood").innerHTML = this.maxfood;
        e("yourwater").innerHTML = this.water.toFixed(2);
        e("yourmaxwater").innerHTML = this.maxwater;
    };
    
    //SMITTY'S GARAGE
    this.repairCar = function() {
        if (this.shield < this.maxshield) {
            if (this.scrap >= 10) {
                this.scrap -= 10;
                this.shield += 25;
                if (this.shield > this.maxshield) {
                    this.shield = this.maxshield;
                }
                e("shield").innerHTML = this.shield;
                e("yourshield").innerHTML = this.shield;
                e("scrap").innerHTML = this.scrap;
                e('yourscrap').innerHTML = this.scrap;
                e("villageMessage").innerHTML = "Car repaired. (shields +25)"; 
            }
            else {
                e('villageMessage').innerHTML = "You don't have enough scrap!";
            }
        }
        else {
            e('villageMessage').innerHTML = 'Nothing to repair.';
        }
    };
    
    // PIMP MY RIDE UPGRADES   
    this.shieldUpgrade = function() {
        if (this.scrap >= this.shieldLevel * 10) {
            this.shield = Math.ceil((this.shield * (this.maxshield + 25)) / this.maxshield);
            this.maxshield += 25;
            this.scrap -= (this.shieldLevel * 10);
            this.shieldLevel++;
            e("scrap").innerHTML = this.scrap;
            e("maxshield").innerHTML = this.maxshield;
            e("shield").innerHTML = this.shield;
            e("shieldlevel").innerHTML = this.shieldLevel;
            e("villageMessage").innerHTML = "Shield upgrade +1";
            e('shieldsupgradecost').innerHTML = (this.shieldLevel * 10);
            e('shieldsupgradelevel').innerHTML = this.shieldLevel;
            e('yourscrap').innerHTML = this.scrap;
        }
        else {
            e("villageMessage").innerHTML = "No enough scrap!";
        }
    };

    this.fuelConsumptionUpgrade = function() {
        if (this.scrap >= this.fuelConsumptionLevel * 10) {
            this.scrap -= (this.fuelConsumptionLevel * 10);
            this.fuelConsumptionLevel++;
            e("scrap").innerHTML = this.scrap;
            e("fuelconsumptionlevel").innerHTML = this.fuelConsumptionLevel;
            e("villageMessage").innerHTML = "Fuel consumption upgrade +1";
            e('fuelconsumptionupgradecost').innerHTML = (this.fuelConsumptionLevel * 10);
            e('fuelconsumptionupgradelevel').innerHTML = this.fuelConsumptionLevel;
            e('yourscrap').innerHTML = this.scrap;
        }
        else {
            e("villageMessage").innerHTML = "No enough scrap!";
        }
    };
    
    this.attackUpgrade = function() {
        if (this.scrap >= this.attackLevel * 10) {
            this.scrap -= (this.attackLevel * 10);
            this.attackLevel++;
            e("scrap").innerHTML = this.scrap;
            e("attacklevel").innerHTML = this.attackLevel;
            e("villageMessage").innerHTML = "Attack upgrade +1";
            e('attackupgradecost').innerHTML = (this.attackLevel * 10);
            e('attackupgradelevel').innerHTML = this.attackLevel;
            e('yourscrap').innerHTML = this.scrap;
        }
        else {
            e("villageMessage").innerHTML = "No enough scrap!";
        }
    };
    
    this.defenseUpgrade = function() {
        if (this.scrap >= this.defenseLevel * 10) {
            this.scrap -= (this.defenseLevel * 10);
            this.defenseLevel++;
            e("scrap").innerHTML = this.scrap;
            e("defenselevel").innerHTML = this.defenseLevel;
            e("villageMessage").innerHTML = "Defense upgrade +1";
            e('defenseupgradecost').innerHTML = (this.defenseLevel * 10);
            e('defenseupgradelevel').innerHTML = this.defenseLevel;
            e('yourscrap').innerHTML = this.scrap;
        }
        else {
            e("villageMessage").innerHTML = "No enough scrap!";
        }
    };
 
    this.fuelStorageUpgrade = function() {
        if (this.scrap >= this.fuelStorageLevel * 10) {
            this.scrap -= (this.fuelStorageLevel * 10);
            this.fuelStorageLevel++;
            this.maxfuel += 15;
            e('maxfuel').innerHTML = this.maxfuel;
            e("scrap").innerHTML = this.scrap;
            e("fuelstoragelevel").innerHTML = this.fuelStorageLevel;
            e("villageMessage").innerHTML = "Fuel storage upgrade +1";
            e('fuelstorageupgradecost').innerHTML = (this.fuelStorageLevel * 10);
            e('fuelstorageupgradelevel').innerHTML = this.fuelStorageLevel;
            e('yourscrap').innerHTML = this.scrap;
        }
        else {
            e("villageMessage").innerHTML = "No enough scrap!";
        }
    };
    
    this.foodStorageUpgrade = function() {
        if (this.scrap >= this.foodStorageLevel * 10) {
            this.scrap -= (this.foodStorageLevel * 10);
            this.foodStorageLevel++;
            this.maxfood += 15;
            e('maxfood').innerHTML = this.maxfood;
            e("scrap").innerHTML = this.scrap;
            e("foodstoragelevel").innerHTML = this.foodStorageLevel;
            e("villageMessage").innerHTML = "Food storage upgrade +1";
            e('foodstorageupgradecost').innerHTML = (this.foodStorageLevel * 10);
            e('foodstorageupgradelevel').innerHTML = this.foodStorageLevel;
            e('yourscrap').innerHTML = this.scrap;
        }
        else {
            e("villageMessage").innerHTML = "No enough scrap!";
        }
    };
    
    this.waterStorageUpgrade = function() {
        if (this.scrap >= this.waterStorageLevel * 10) {
            this.scrap -= (this.waterStorageLevel * 10);
            this.waterStorageLevel++;
            this.maxwater += 15;
            e('maxwater').innerHTML = this.maxwater;
            e("scrap").innerHTML = this.scrap;
            e("waterstoragelevel").innerHTML = this.waterStorageLevel;
            e("villageMessage").innerHTML = "Water storage upgrade +1";
            e('waterstorageupgradecost').innerHTML = (this.waterStorageLevel * 10);
            e('waterstorageupgradelevel').innerHTML = this.waterStorageLevel;
            e('yourscrap').innerHTML = this.scrap;
        }
        else {
            e("villageMessage").innerHTML = "No enough scrap!";
        }
    };

    // CATCH-A-GAS STATION
    this.refuelCar = function() {
        if (this.fuel < this.maxfuel) {
            if (this.scrap >= 10) {
                this.scrap -= 10;
                this.fuel += 25;
                if (this.fuel > this.maxfuel) {
                    this.fuel = this.maxfuel;
                }
                e("fuel").innerHTML = this.fuel;
                e("scrap").innerHTML = this.scrap;
                e('yourscrap').innerHTML = this.scrap;
                e('yourfuel').innerHTML = this.fuel.toFixed(0);
                e("villageMessage").innerHTML = "Fuel added (fuel +25)"; 
            }
            else {
                e('villageMessage').innerHTML = "You don't have enough scrap!";
            }
        }
        else {
            e('villageMessage').innerHTML = 'Your car is fully refueled.';
        }
    };
    
    this.buyWater = function() {
        if (this.water < this.maxwater) {
            if (this.scrap >= 10) {
                this.scrap -= 10;
                this.water += 25;
                if (this.water > this.maxwater) {
                    this.water = this.maxwater;
                }
                e("water").innerHTML = this.water;
                e("scrap").innerHTML = this.scrap;
                e('yourscrap').innerHTML = this.scrap;
                e('yourwater').innerHTML = this.water;
                e("villageMessage").innerHTML = "Water added (+25)"; 
            }
            else {
                e('villageMessage').innerHTML = "You don't have enough scrap!";
            }
        }
        else {
            e('villageMessage').innerHTML = 'You water resources are full.';
        }
    };
    
    this.buyFood = function() {
        if (this.food < this.maxfood) {
            if (this.scrap >= 10) {
                this.scrap -= 10;
                this.food += 25;
                if (this.food > this.maxfood) {
                    this.food = this.maxfood;
                }
                e("food").innerHTML = this.food;
                e("scrap").innerHTML = this.scrap;
                e('yourscrap').innerHTML = this.scrap;
                e('yourfood').innerHTML = this.food;
                e("villageMessage").innerHTML = "Food added (+25)"; 
            }
            else {
                e('villageMessage').innerHTML = "You don't have enough scrap!";
            }
        }
        else {
            e('villageMessage').innerHTML = 'You food resources are full.';
        }
    };
    
    this.backToTheRoad = function() {
        e("village").style.display = "none";
        e("villagebtn").style.display = "none";
        e("spot").innerHTML += this.distanceOnSpot() + "Back on the fury road!<br>";
        e("spotdiv").scrollTop = e("spotdiv").scrollHeight;
        this.pausegame();
    };
    
    this.fight = function() {
        e("spot").innerHTML += this.distanceOnSpot()+ "You are facing the enemies!<br>";
        e("fightfleebtn").style.display = "none";
        
        if (this.gameEvent === 1) { // VICIOUS DOGS
            if (this.attack + (Math.round((Math.random() * this.viciousDogsAttack))) >= this.viciousDogsAttack) {
                var foundScrap = (Math.floor((Math.random() * 5)+5));
                e("spot").innerHTML += this.distanceOnSpot()+ "Dogs defeated, You win! You found some scrap: "+foundScrap+"<br>";
                this.scrap += foundScrap;
                e("scrap").innerHTML = this.scrap +" (+"+foundScrap+")";         
            }
            else {
                var tempDamage = Math.floor((Math.random() * (this.viciousDogsAttack * 2)+1));
                e("spot").innerHTML += this.distanceOnSpot()+ "Dogs, You loose... damage: "+tempDamage+"<br>";
                this.damage = tempDamage;
            }
        }
        
        if (this.gameEvent === 2) { // SMALL RAIDERS
            if (this.attack + (Math.round((Math.random() * this.smallRaidersAttack))) >= this.smallRaidersAttack) {
                var foundScrap = (Math.floor((Math.random() * 15)+5));
                e("spot").innerHTML += this.distanceOnSpot()+ "Small Raiders defeated, You win! You found some scrap: "+foundScrap+"<br>";
                this.scrap += foundScrap;
                e("scrap").innerHTML = this.scrap +" (+"+foundScrap+")";   
            }
            else {
                var tempDamage = Math.floor((Math.random() * (this.smallRaidersAttack * 2)+1));
                e("spot").innerHTML += this.distanceOnSpot()+ "Small Raiders, You loose... damage: "+tempDamage+"<br>";
                this.damage = tempDamage;
            }
        }
        
        if (this.gameEvent === 3) { // SKULZ RAIDERS
            if (this.attack + (Math.round((Math.random() * this.skulzAttack))) >= this.skulzAttack) {
                var foundScrap = (Math.floor((Math.random() * 20)+5));
                e("spot").innerHTML += this.distanceOnSpot()+ "Skulz Raiders defeated, You win! You found some scrap: "+foundScrap+"<br>";
                this.scrap += foundScrap;
                e("scrap").innerHTML = this.scrap +" (+"+foundScrap+")";   
            }
            else {
                var tempDamage = Math.floor((Math.random() * (this.skulzAttack * 2)+1));
                e("spot").innerHTML += this.distanceOnSpot()+ "Skulz Raiders, You loose... damage: "+tempDamage+"<br>";
                this.damage = tempDamage;
            }
        }
        
        if (this.gameEvent === 4) { // KHANS RAIDERS
            if (this.attack + (Math.round((Math.random() * this.khansAttack))) >= this.khansAttack) {
                var foundScrap = (Math.floor((Math.random() * 30)+5));
                e("spot").innerHTML += this.distanceOnSpot()+ "Khans Raiders defeated, You win! You found some scrap: "+foundScrap+"<br>";
                this.scrap += foundScrap;
                e("scrap").innerHTML = this.scrap +" (+"+foundScrap+")";   
            }
            else {
                var tempDamage = Math.floor((Math.random() * (this.khansAttack * 2)+1));
                e("spot").innerHTML += this.distanceOnSpot()+ "Khans Raiders, You loose... damage: "+tempDamage+"<br>";
                this.damage = tempDamage;
            }
        }
        
        if (this.gameEvent === 5) { // IMMORTAN JOE
            if (this.attack + (Math.round((Math.random() * this.immortanAttack))) >= this.immortanAttack) {
                var foundScrap = (Math.floor((Math.random() * 50)+5));
                e("spot").innerHTML += this.distanceOnSpot()+ "Immortan Joe defeated, You win! You found some scrap: "+foundScrap+"<br>";
                this.scrap += foundScrap;
                e("scrap").innerHTML = this.scrap +" (+"+foundScrap+")";
            }
            else {
                var tempDamage = Math.floor((Math.random() * (this.immortanAttack * 2)+1));
                e("spot").innerHTML += this.distanceOnSpot()+ "Immortan Joe, You loose... damage: "+tempDamage+".<br>";
                this.damage = tempDamage;
            }
        }
        
        e("spotdiv").scrollTop = e("spotdiv").scrollHeight;
    
        this.pausegame();
        
//        this.viciousDogsAttack = 1;
//        this.smallRaidersAttack = 2;
//        this.skulzAttack = 3;
//        this.khansAttack = 4;
//        this.immortanAttack = 5;
    };
    
    this.flee = function() {
        e("fightfleebtn").style.display = "none";
        e("spotdiv").scrollTop = e("spotdiv").scrollHeight;
        var tempDamage = 0;
        if (this.gameEvent === 1) tempDamage = (this.viciousDogsAttack * 2);
        else if (this.gameEvent === 2) tempDamage = (this.smallRaidersAttack * 2);
        else if (this.gameEvent === 3) tempDamage = (this.skulzAttack * 2);
        else if (this.gameEvent === 4) tempDamage = (this.khansAttack * 2);
        else if (this.gameEvent === 5) tempDamage = (this.immortanAttack * 2);
        e("spot").innerHTML += this.distanceOnSpot() +"You flee... damage: "+tempDamage+".<br>";
        this.damage = tempDamage;
        this.pausegame();
    };

    this.checkGameOver = function() {
        if (this.food <= 0 || this.water <= 0 || this.shield <= 0 || this.fuel <= 0) {
            this.running = false;
            e('game').style.display = 'none';
            e('gameoverpart').style.display = 'block';
            e('distancedriven').innerHTML = this.distance.toFixed(2);
            if (this.food <= 0) e('reasongameover').innerHTML = 'You died of starvation !';
            else if (this.water <= 0) e('reasongameover').innerHTML = 'You died of dehydration !';
            else if (this.shield <= 0) e('reasongameover').innerHTML = 'Your car has exploded !';
            else if (this.fuel <= 0) e('reasongameover').innerHTML = 'Your fuel has run out, and after a few days of wandering you have died of exhaustion.';
        }
    };

    // "GAME LOOP"
    this.gameLoop = function() {
        
        this.updateDistance();
        this.updateFuel();
        this.updateFuelUsage();
        this.updateFood();
        this.updateWater();
        this.updateScrap();
        this.updateShield(this.damage);
        this.updateSpot();
        this.checkGameOver();
        this.damage = 0;
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
        
        e('mainmenu').style.display = "none";
        e('game').style.display = "block";
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
