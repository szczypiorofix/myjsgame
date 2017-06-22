function e(element) {
    return document.getElementById(element);
}


function MyGame() {

    var player = new Player();  
    
    this.music = true;
    this.audio = new Audio('music/highwayman.mp3');
    this.audio.loop = true;
    this.musicVolume = 1;
    this.musicOn = 1;
    this.savedMusicVolume = [this.musicOn, this.musicVolume];
    
    // localStorage.setItem("musicvolume", JSON.stringify(null)); //  - CLEAR LOCAL STORAGE "musicvolume"
    
    if (typeof(window.localStorage) !== "undefined") {
        
        this.savedMusicVolume = JSON.parse(localStorage.getItem("musicvolume"));
        if (this.savedMusicVolume === null) {
            this.savedMusicVolume = [this.musicOn, this.musicVolume];
        }
        this.musicOn = this.savedMusicVolume[0];
        this.musicVolume = this.savedMusicVolume[1];
    }
    else {
        console.log('Warning! Local storage not supported!');
        this.savedMusicVolume = [this.musicOn, this.musicVolume];
    }
    this.music = true;
    
    if (this.musicOn) {
        e('musicbtn').src = "images/musicon.png";
        e('musicvolumeslider').value = this.musicVolume * 100;
        this.music = true;
    }
    else {
        e('musicbtn').src = "images/musicoff.png";
        e('musicvolumeslider').value = 0;
        this.music = false;
        this.musicVolume = 0;
    }
    
    this.audio.play();
    this.audio.volume = this.musicVolume;
    
    this.running = true;
    this.gameSpeed = 1;
    this.gameStep = 0;
    this.gameEvent = 0; // Integer - random value from events array
    this.gameEventObject = 0; // object EventOnRoad

    this.gameEventStep = Math.floor(Math.random() * 4) +2;
    this.terrain = 0;
    this.terrains = [];
    this.TYPE = {
      VILLAGE: 0,
      FIGHT: 1,
      FOUND: 2,
      TERRAIN: 3,
      ENCOUNTER: 4
    };
    
    this.events = [
        new EventOnRoad("You see a small village in a distance", 95, this.TYPE.VILLAGE, "Enter the village", "Keep moving", 0),
        new EventOnRoad("You are attacked by a pack of vicious dogs", 85, this.TYPE.FIGHT, "Attack dogs", "Flee", 1),
        new EventOnRoad("You are attacked by a small group of bandits", 65, this.TYPE.FIGHT, "Attack bandits", "Flee", 2),
        new EventOnRoad("You are attacked by raiders: 'Skulz'.", 40, this.TYPE.FIGHT, "Attack Skulz", "Flee", 3),
        new EventOnRoad("You are attacked by raiders: 'Khans'.", 40, this.TYPE.FIGHT, "Attack Khans", "Flee", 4),
        new EventOnRoad("Oh no! It's Immortan Joe gang!", 15, this.TYPE.FIGHT, "Attack Immortan Joe gang", "Flee", 5),
        new EventOnRoad("You drove on a solid ground.", 50, this.TYPE.TERRAIN),
        new EventOnRoad("You drove on a sandy path.", 60, this.TYPE.TERRAIN),
        new EventOnRoad("You drove on a muddy road.", 30, this.TYPE.TERRAIN),
        new EventOnRoad("You drove on a rocky path.", 40, this.TYPE.TERRAIN),
        new EventOnRoad("You see a Lone Wanderer.", 20, this.TYPE.ENCOUNTER, "Talk to the Lone Wanderer", "Keep moving", 0),
        new EventOnRoad("You see a dog.", 20, this.TYPE.ENCOUNTER, "Come closer to the dog", "Keep moving", 1),
        new EventOnRoad("You see a corpse.", 25, this.TYPE.ENCOUNTER, "Search the corpse", "Keep moving", 1),
        new EventOnRoad("You see a dead body, half-rotten.", 25, this.TYPE.ENCOUNTER, "Search the body", "Keep moving", 2),
        new EventOnRoad("You see an old, damaged car.", 25, this.TYPE.ENCOUNTER, "Check the car", "Keep moving", 1),
        new EventOnRoad("What??? Skywalker Ranch???", 5, this.TYPE.ENCOUNTER, "Check the ranch", "Keep moving", 0),
        new EventOnRoad("You see group of followers of the Flying Spaghetti Monster.", 10, this.TYPE.ENCOUNTER, "Talk to this freaks", "Keep moving", 0),
        new EventOnRoad("You see two wanderers.", 20, this.TYPE.ENCOUNTER, "Talk to wanderers", "Keep moving", 1),
        new EventOnRoad("You see an abandoned shack.", 20, this.TYPE.ENCOUNTER, "Search the shack", "Keep moving", 1),
        new EventOnRoad("You see a ruins of a village nearby.", 20, this.TYPE.ENCOUNTER, "Enter the ruins", "Keep moving", 2),
        new EventOnRoad("You see a ruins of a big house nearby.", 20, this.TYPE.ENCOUNTER, "Search the house", "Keep moving", 2),
        new EventOnRoad("You see a ruined house.", 30, this.TYPE.ENCOUNTER, "Search the house", "Keep moving", 3),
        new EventOnRoad("You see a ruined supermarket.", 25, this.TYPE.ENCOUNTER, "Check ruined supermarket", "Keep moving", 4),
        new EventOnRoad("You see a ruins of old chapel.", 25, this.TYPE.ENCOUNTER, "Search the chapel", "Keep moving", 4),
        new EventOnRoad("You see a slave hunter who leads two slaves on chains.", 15, this.TYPE.ENCOUNTER, "Talk to slave hunter", "Keep moving", 2),
        new EventOnRoad("You see a bandit camp.", 20, this.TYPE.ENCOUNTER, "Search the camp", "Keep moving", 5),
        new EventOnRoad("You see a damaged car.", 20, this.TYPE.ENCOUNTER, "Search the car", "Keep moving", 2),
        new EventOnRoad("You see a damaged truck.", 20, this.TYPE.ENCOUNTER, "Search the truck", "Keep moving", 3),
        new EventOnRoad("You see an empty bangit camp.", 20, this.TYPE.ENCOUNTER, "Enter the bandit camp", "Keep moving", 1),
        new EventOnRoad("You see an old graveyard.", 15, this.TYPE.ENCOUNTER, "Search the graveyard", "Keep moving", 5),
        new EventOnRoad("You see an old railway siding.", 20, this.TYPE.ENCOUNTER, "Enter railway siding", "Keep moving", 4)
    ];
    
    this.terrains = [
            new Terrain("Solid ground", 0, 0.6),
            new Terrain("Sand", 1, 0.75),
            new Terrain("Mud", 2, 1.88),
            new Terrain("Rocks", 3, 1.1)
        ];
    
    this.villages = [
      "Hub", "Klamath", "Nora", "Bunker Hill", "Shady Sands", "Redding", 
      "Junktown", "Modoc", "Den", "Abbey", "New Reno", "Broken Hills", "Goodsprings",
      "Bitter Springs"
    ];
    this.villageName = "";
    
    
    
    // FUNCTIONS
    this.getDistance = function() {
        return player.distance;
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
                this.gameEventStep = Math.floor(Math.random() * 3) + 2;
            }
        }
        e("spotdiv").scrollTop = e("spotdiv").scrollHeight;
    };

    this.distanceOnSpot = function() {
        return '<span style="color: burlywood;">'+player.distance.toFixed(2) +': </span>';
    };

    this.eventsOnTheRoad = function() {
        
        if (this.gameEventObject.type !== this.TYPE.TERRAIN) {
            this.running = false;
            e('actionbtn').innerHTML = this.gameEventObject.actionMsg;
            e('cancelbtn').innerHTML = this.gameEventObject.cancelMsg;
            e("actionbuttonpart").style.display = "block";
            
            // VILLAGE
            if (this.gameEventObject.type === this.TYPE.VILLAGE) {
                this.villageName = this.villages[Math.floor(Math.random() * this.villages.length)];
                e("spot").innerHTML += this.distanceOnSpot() +this.events[this.gameEvent].name+": " +this.villageName+".<br>";
            }
        }
        else { // TERRAIN UPDATE
            if (this.gameEvent === 6) { // SOLID GROUND
                this.terrain = this.terrains[0];
                e("terrain").innerHTML = this.terrains[0].name;
            }
            if (this.gameEvent === 7) { // SAND
                this.terrain = this.terrains[1];
                e("terrain").innerHTML = this.terrains[1].name;
            }
            if (this.gameEvent === 8) { // MUD
                this.terrain = this.terrains[2];
                e("terrain").innerHTML = this.terrains[2].name;
            }
            if (this.gameEvent === 9) { // ROCKS
                this.terrain = this.terrains[3];
                e("terrain").innerHTML = this.terrains[3].name;
            }
        }
    };

    // THE VILLAGE
    this.enterTheVillage = function() {
        e("spot").innerHTML += this.distanceOnSpot()+ "Entering the village...<br>";
        e('game').style.display = "none";
        e('village').style.display = "block";
        e("villageName").innerHTML = this.villageName;
        e("yourscrap").innerHTML = player.scrap;
        e("yourfuel").innerHTML = player.fuel.toFixed(2);
        e("yourmaxfuel").innerHTML = player.maxfuel;
        e("yourattack").innerHTML = player.attack;
        e("yourdefense").innerHTML = player.defense;
        e("yourshield").innerHTML = player.shield;
        e("yourmaxshield").innerHTML = player.maxshield;
        e("yourfood").innerHTML = player.food.toFixed(2);
        e("yourmaxfood").innerHTML = player.maxfood;
        e("yourwater").innerHTML = player.water.toFixed(2);
        e("yourmaxwater").innerHTML = player.maxwater;
    };
    
    //SMITTY'S GARAGE
    this.repairCar = function() {
        if (player.shield < player.maxshield) {
            if (player.scrap >= 10) {
                player.scrap -= 10;
                player.shield += 25;
                if (player.shield > player.maxshield) {
                    player.shield = player.maxshield;
                }
                e("shield").innerHTML = player.shield;
                e("yourshield").innerHTML = player.shield;
                e("scrap").innerHTML = player.scrap;
                e('yourscrap').innerHTML = player.scrap;
                e("villageMessage").innerHTML = "Car repaired. (shields +25)"; 
            }
            else e('villageMessage').innerHTML = "You don't have enough scrap!";
        }
        else e('villageMessage').innerHTML = 'Nothing to repair.';
    };
    
    // PIMP MY RIDE UPGRADES   
    this.shieldUpgrade = function() {
        if (player.scrap >= player.shieldLevel * 10) {
            player.shield = Math.ceil((player.shield * (player.maxshield + 25)) / player.maxshield);
            player.maxshield += 25;
            player.scrap -= (player.shieldLevel * 10);
            player.shieldLevel++;
            e("scrap").innerHTML = player.scrap;
            e("maxshield").innerHTML = player.maxshield;
            e("shield").innerHTML = player.shield;
            e("yourmaxshield").innerHTML = player.maxshield;
            e("yourshield").innerHTML = player.shield;
            e("shieldlevel").innerHTML = player.shieldLevel;
            e("villageMessage").innerHTML = "Shield upgrade +1";
            e('shieldsupgradecost').innerHTML = (player.shieldLevel * 10);
            e('shieldsupgradelevel').innerHTML = player.shieldLevel;
            e('yourscrap').innerHTML = player.scrap;
        }
        else e("villageMessage").innerHTML = "No enough scrap!";
    };

    this.fuelConsumptionUpgrade = function() {
        if (player.scrap >= player.fuelConsumptionLevel * 10) {
            player.scrap -= (player.fuelConsumptionLevel * 10);
            player.fuelConsumptionLevel++;
            e("scrap").innerHTML = player.scrap;
            e("fuelconsumptionlevel").innerHTML = player.fuelConsumptionLevel;
            e("villageMessage").innerHTML = "Fuel consumption upgrade +1";
            e('fuelconsumptionupgradecost').innerHTML = (player.fuelConsumptionLevel * 10);
            e('fuelconsumptionupgradelevel').innerHTML = player.fuelConsumptionLevel;
            e('yourscrap').innerHTML = player.scrap;
        }
        else e("villageMessage").innerHTML = "No enough scrap!";
    };
    
    this.attackUpgrade = function() {
        if (player.scrap >= player.attackLevel * 10) {
            player.scrap -= (player.attackLevel * 10);
            player.attackLevel++;
            player.attack++;
            e("attack").innerHTML = player.attack;
            e('yourattack').innerHTML = player.attack;
            e("scrap").innerHTML = player.scrap;
            e("attacklevel").innerHTML = player.attackLevel;
            e("villageMessage").innerHTML = "Attack upgrade +1";
            e('attackupgradecost').innerHTML = (player.attackLevel * 10);
            e('attackupgradelevel').innerHTML = player.attackLevel;
            e('yourscrap').innerHTML = player.scrap;
        }
        else e("villageMessage").innerHTML = "No enough scrap!";
    };
    
    this.defenseUpgrade = function() {
        if (player.scrap >= player.defenseLevel * 10) {
            player.scrap -= (player.defenseLevel * 10);
            player.defenseLevel++;
            player.defense++;
            e("defense").innerHTML = player.defense;
            e('yourdefense').innerHTML = player.defense;
            e("scrap").innerHTML = player.scrap;
            e("defenselevel").innerHTML = player.defenseLevel;
            e("villageMessage").innerHTML = "Defense upgrade +1";
            e('defenseupgradecost').innerHTML = (player.defenseLevel * 10);
            e('defenseupgradelevel').innerHTML = player.defenseLevel;
            e('yourscrap').innerHTML = player.scrap;
        }
        else e("villageMessage").innerHTML = "No enough scrap!";
    };
 
    this.fuelStorageUpgrade = function() {
        if (player.scrap >= player.fuelStorageLevel * 10) {
            player.scrap -= (player.fuelStorageLevel * 10);
            player.fuelStorageLevel++;
            player.maxfuel += 15;
            e('maxfuel').innerHTML = player.maxfuel;
            e('yourmaxfuel').innerHTML = player.maxfuel;
            e("scrap").innerHTML = player.scrap;
            e("fuelstoragelevel").innerHTML = player.fuelStorageLevel;
            e("villageMessage").innerHTML = "Fuel storage upgrade +1";
            e('fuelstorageupgradecost').innerHTML = (player.fuelStorageLevel * 10);
            e('fuelstorageupgradelevel').innerHTML = player.fuelStorageLevel;
            e('yourscrap').innerHTML = player.scrap;
        }
        else e("villageMessage").innerHTML = "No enough scrap!";
    };
    
    this.foodStorageUpgrade = function() {
        if (player.scrap >= player.foodStorageLevel * 10) {
            player.scrap -= (player.foodStorageLevel * 10);
            player.foodStorageLevel++;
            player.maxfood += 15;
            e('maxfood').innerHTML = player.maxfood;
            e('yourmaxfood').innerHTML = player.maxfood;
            e("scrap").innerHTML = player.scrap;
            e("foodstoragelevel").innerHTML = player.foodStorageLevel;
            e("villageMessage").innerHTML = "Food storage upgrade +1";
            e('foodstorageupgradecost').innerHTML = (player.foodStorageLevel * 10);
            e('foodstorageupgradelevel').innerHTML = player.foodStorageLevel;
            e('yourscrap').innerHTML = player.scrap;
        }
        else e("villageMessage").innerHTML = "No enough scrap!";
    };
    
    this.waterStorageUpgrade = function() {
        if (player.scrap >= player.waterStorageLevel * 10) {
            player.scrap -= (player.waterStorageLevel * 10);
            player.waterStorageLevel++;
            player.maxwater += 15;
            e('maxwater').innerHTML = player.maxwater;
            e('yourmaxwater').innerHTML = player.maxwater;
            e("scrap").innerHTML = player.scrap;
            e("waterstoragelevel").innerHTML = player.waterStorageLevel;
            e("villageMessage").innerHTML = "Water storage upgrade +1";
            e('waterstorageupgradecost').innerHTML = (player.waterStorageLevel * 10);
            e('waterstorageupgradelevel').innerHTML = player.waterStorageLevel;
            e('yourscrap').innerHTML = player.scrap;
        }
        else e("villageMessage").innerHTML = "No enough scrap!";
    };

    // CATCH-A-GAS STATION
    this.refuelCar = function() {
        if (player.fuel < player.maxfuel) {
            if (player.scrap >= 10) {
                player.scrap -= 10;
                player.fuel += 25;
                if (player.fuel > player.maxfuel) {
                    player.fuel = player.maxfuel;
                }
                e("fuel").innerHTML = player.fuel;
                e("scrap").innerHTML = player.scrap;
                e('yourscrap').innerHTML = player.scrap;
                e('yourfuel').innerHTML = player.fuel.toFixed(0);
                e("villageMessage").innerHTML = "Fuel added (fuel +25)"; 
            }
            else e('villageMessage').innerHTML = "You don't have enough scrap!";
        }
        else e('villageMessage').innerHTML = 'Your car is fully refueled.';
    };
    
    this.buyWater = function() {
        if (player.water < player.maxwater) {
            if (player.scrap >= 10) {
                player.scrap -= 10;
                player.water += 25;
                if (player.water > player.maxwater) {
                    player.water = player.maxwater;
                }
                e("water").innerHTML = player.water;
                e("scrap").innerHTML = player.scrap;
                e('yourscrap').innerHTML = player.scrap;
                e('yourwater').innerHTML = player.water;
                e("villageMessage").innerHTML = "Water added (+25)"; 
            }
            else e('villageMessage').innerHTML = "You don't have enough scrap!";
        }
        else e('villageMessage').innerHTML = 'You water resources are full.';
    };
    
    this.buyFood = function() {
        if (player.food < player.maxfood) {
            if (player.scrap >= 10) {
                player.scrap -= 10;
                player.food += 25;
                if (player.food > player.maxfood) {
                    player.food = player.maxfood;
                }
                e("food").innerHTML = player.food;
                e("scrap").innerHTML = player.scrap;
                e('yourscrap').innerHTML = player.scrap;
                e('yourfood').innerHTML = player.food;
                e("villageMessage").innerHTML = "Food added (+25)"; 
            }
            else e('villageMessage').innerHTML = "You don't have enough scrap!";
        }
        else e('villageMessage').innerHTML = 'You food resources are full.';
    };
    
    this.backToTheRoad = function() {
        e("village").style.display = "none";
        e("actionbuttonpart").style.display = "none";
        e("spot").innerHTML += this.distanceOnSpot() + "Back on the fury road!<br>";
        e("spotdiv").scrollTop = e("spotdiv").scrollHeight;
        this.running = true;
    };
    
    // YOU FOUND ....
    this.foundFuel = function(amount) {
        var f = (Math.floor((Math.random() * (amount * 2))+amount));
        player.fuel += f;
        if (player.fuel > player.maxfuel) {
            player.fuel = player.maxfuel;
        }
        e('spot').innerHTML += this.distanceOnSpot() + "You found "+f+" fuel.<br>";
        e("fuel").innerHTML = player.fuel.toFixed(2) +" (+"+f+")";  
    };
    
    this.foundFood = function(amount) {
        var f = (Math.floor((Math.random() * (amount * 2))+amount));
        player.food += f;
        if (player.food > player.maxfood) {
            player.food = player.maxfood;
        }
        e('spot').innerHTML += this.distanceOnSpot() + "You found "+f+" food.<br>";
        e("food").innerHTML = player.food.toFixed(2) +" (+"+f+")";  
    };
    
    this.foundWater = function(amount) {
        var f = (Math.floor((Math.random() * (amount * 2))+amount));
        player.water += f;
        if (player.water > player.maxwater) {
            player.water = player.maxwater;
        }
        e('spot').innerHTML += this.distanceOnSpot() + "You found "+f+" water.<br>";
        e("water").innerHTML = player.food.toFixed(2) +" (+"+f+")";  
    };
    
    this.foundScrap = function(amount) {
        var f = (Math.floor((Math.random() * (amount * 2))+amount));
        player.scrap += f;
        e('spot').innerHTML += this.distanceOnSpot() + "You found "+f+" scrap.<br>";
        e("scrap").innerHTML = player.scrap.toFixed(2) +" (+"+f+")";  
    };
    
    
    // ACTION BUTTONS
    this.action = function() {
        
        e('actionbuttonpart').style.display = 'none';
        
        // VILLAGE
        if (this.gameEvent === 0) {
            this.enterTheVillage();
        }
        
        // FIGHT
        if (this.gameEvent > 0 && this.gameEvent < 6) {
            this.fight();
        }
        
        if (this.gameEvent > 9) {
            switch (this.gameEvent) {
                case 10: {
                        e('spot').innerHTML += this.distanceOnSpot() + "The Lone Wanderer greets you.<br>"; 
                        break;
                }
                case 11: {
                        e('spot').innerHTML += this.distanceOnSpot() + "The dog has something on his mouth.<br>";
                        break;
                }
                case 12: {
                        e('spot').innerHTML += this.distanceOnSpot() + "You searched the corpse.<br>";
                        break;
                }
                case 13: {
                        e('spot').innerHTML += this.distanceOnSpot() + "You searched the body and you found some goods.<br>";
                        break;
                }
                case 14: {
                        e('spot').innerHTML += this.distanceOnSpot() + "In the car you've found some goods.<br>";
                        break;
                }
                case 15: {
                        e('spot').innerHTML += this.distanceOnSpot() + "OMG! Skywalker ranch! Luke Skywalker has a little gift for ya!<br>";
                        break;
                }
                case 16: {
                        e('spot').innerHTML += this.distanceOnSpot() + "The followers of the Flying Spaghetti Monster gave you a little gift.<br>";
                        this.foundScrap(6);
                        break;
                }
                case 17: {
                        e('spot').innerHTML += this.distanceOnSpot() + "The wanderers are not very talkative...<br>";
                        break;
                }
                case 18: {
                        e('spot').innerHTML += this.distanceOnSpot() + "In the shack you've found some goods.<br>";
                        break;
                }
                case 19: {
                        e('spot').innerHTML += this.distanceOnSpot() + "In the ruins only death you can find...<br>";
                        break;
                }
            }
            if (this.gameEventObject.danger > 0) {
                this.foundFuel(this.gameEventObject.danger);
                this.foundScrap(this.gameEventObject.danger);
                this.foundWater(this.gameEventObject.danger);
                this.foundFood(this.gameEventObject.danger);
            }
        }
        
        if (this.gameEvent > 0) { // THE IS RUNNING IF THE EVENT IS NOT A VILLAGE AND BUTTON 'ACTION' WAS CLICKED
            this.running = true;
        }
        e("spotdiv").scrollTop = e("spotdiv").scrollHeight;
    };
    
    this.cancel = function() {
        this.running = true;
        e('actionbuttonpart').style.display = 'none';
        
        // VILLAGE
        if (this.gameEvent === 0) {
            e("spot").innerHTML += this.distanceOnSpot() +"You bypassed the village.<br>";
        }
        e("spotdiv").scrollTop = e("spotdiv").scrollHeight;
    };
    
    
    
    this.fight = function() {
        e("spot").innerHTML += this.distanceOnSpot()+ "You are facing the enemies!<br>";
        
        if (this.gameEvent === 1) { // VICIOUS DOGS
            if (player.attack + (Math.round((Math.random() * this.gameEventObject.danger))) >= this.gameEventObject.danger) {
                e("spot").innerHTML += this.distanceOnSpot()+ "Dogs defeated!<br>";
                this.foundFuel(this.gameEventObject.danger);
                this.foundScrap(this.gameEventObject.danger);
                this.foundWater(this.gameEventObject.danger);
                this.foundFood(this.gameEventObject.danger);
            }
            else {
                var tempDamage = Math.floor((Math.random() * (this.gameEventObject.danger * 2)+1)) - (player.defense) +1;
                e("spot").innerHTML += this.distanceOnSpot()+ "Dogs, You loose... damage: "+tempDamage+"<br>";
                player.damage = tempDamage;
            }
        }
        
        if (this.gameEvent === 2) { // SMALL RAIDERS
            if (player.attack + (Math.round((Math.random() * this.gameEventObject.danger))) >= this.gameEventObject.danger) {
                e("spot").innerHTML += this.distanceOnSpot()+ "Small Raiders defeated!<br>";
                this.foundFuel(this.gameEventObject.danger);
                this.foundScrap(this.gameEventObject.danger);
                this.foundWater(this.gameEventObject.danger);
                this.foundFood(this.gameEventObject.danger);
            }
            else {
                var tempDamage = Math.floor((Math.random() * (this.gameEventObject.danger * 2)+1)) - (player.defense) +1;
                e("spot").innerHTML += this.distanceOnSpot()+ "Small Raiders, You loose... damage: "+tempDamage+"<br>";
                player.damage = tempDamage;
            }
        }
        
        if (this.gameEvent === 3) { // SKULZ RAIDERS
            if (player.attack + (Math.round((Math.random() * this.gameEventObject.danger))) >= this.gameEventObject.danger) {
                e("spot").innerHTML += this.distanceOnSpot()+ "Skulz Raiders defeated!<br>";
                this.foundFuel(this.gameEventObject.danger);
                this.foundScrap(this.gameEventObject.danger);
                this.foundWater(this.gameEventObject.danger);
                this.foundFood(this.gameEventObject.danger);
            }
            else {
                var tempDamage = Math.floor((Math.random() * (this.gameEventObject.danger * 2)+1)) - (player.defense) +1;
                e("spot").innerHTML += this.distanceOnSpot()+ "Skulz Raiders, You loose... damage: "+tempDamage+"<br>";
                player.damage = tempDamage;
            }
        }
        
        if (this.gameEvent === 4) { // KHANS RAIDERS
            if (player.attack + (Math.round((Math.random() * this.gameEventObject.danger))) >= this.gameEventObject.danger) {
                e("spot").innerHTML += this.distanceOnSpot()+ "Khans Raiders defeated!<br>";
                this.foundFuel(this.gameEventObject.danger);
                this.foundScrap(this.gameEventObject.danger);
                this.foundWater(this.gameEventObject.danger);
                this.foundFood(this.gameEventObject.danger);
            }
            else {
                var tempDamage = Math.floor((Math.random() * (this.gameEventObject.danger * 2)+1)) - (player.defense) +1;
                e("spot").innerHTML += this.distanceOnSpot()+ "Khans Raiders, You loose... damage: "+tempDamage+"<br>";
                player.damage = tempDamage;
            }
        }
        
        if (this.gameEvent === 5) { // IMMORTAN JOE
            if (player.attack + (Math.round((Math.random() * this.gameEventObject.danger))) >= this.gameEventObject.danger) {
                e("spot").innerHTML += this.distanceOnSpot()+ "Immortan Joe defeated!<br>";
                this.foundFuel(this.gameEventObject.danger);
                this.foundScrap(this.gameEventObject.danger);
                this.foundWater(this.gameEventObject.danger);
                this.foundFood(this.gameEventObject.danger);
            }
            else {
                var tempDamage = Math.floor((Math.random() * (this.gameEventObject.danger * 2)+1)) - (player.defense) +1;
                e("spot").innerHTML += this.distanceOnSpot()+ "Immortan Joe, You loose... damage: "+tempDamage+".<br>";
                player.damage = tempDamage;
            }
        }
    };
    
    this.flee = function() {
        e("spotdiv").scrollTop = e("spotdiv").scrollHeight;
        var tempDamage = 0;
        if (this.gameEvent === 1) tempDamage = (this.viciousDogsAttack * 2);
        else if (this.gameEvent === 2) tempDamage = (this.smallRaidersAttack * 2);
        else if (this.gameEvent === 3) tempDamage = (this.skulzAttack * 2);
        else if (this.gameEvent === 4) tempDamage = (this.khansAttack * 2);
        else if (this.gameEvent === 5) tempDamage = (this.immortanAttack * 2);
        e("spot").innerHTML += this.distanceOnSpot() +"You flee... damage: "+tempDamage+".<br>";
        player.damage = tempDamage;
        this.running = true;
    };
    
    

    this.checkGameOver = function() {
        if (player.food <= 0 || player.water <= 0 || player.shield <= 0 || player.fuel <= 0) {
            this.running = false;
            e('game').style.display = 'none';
            e('gameoverpart').style.display = 'block';
            e('distancedriven').innerHTML = player.distance.toFixed(2);
            if (this.food <= 0) e('reasongameover').innerHTML = 'You died of starvation !';
            else if (player.water <= 0) e('reasongameover').innerHTML = 'You died of dehydration !';
            else if (player.shield <= 0) e('reasongameover').innerHTML = 'Your car has exploded !';
            else if (player.fuel <= 0) e('reasongameover').innerHTML = 'Your fuel has run out, and after a few days of wandering you have died of exhaustion.';
        }
    };
    
    this.showHighScores = function() {
              
        if (typeof(window.localStorage) !== "undefined") {

            // RETRIVE FROM STORAGE
            var highscores = JSON.parse(localStorage.getItem("highscores"));
            var table = 0;

            if (highscores !== null) {
                table = document.createElement('table');

                // FIRST ROW WITH COLUMN TITLES
                var trtitles = document.createElement('tr');

                var thname = document.createElement('th');
                var textthname = document.createTextNode('Name');
                thname.appendChild(textthname);
                thname.className = "thname";

                var thscore = document.createElement('th');
                var textthscore = document.createTextNode('Score');
                thscore.appendChild(textthscore);
                thscore.className = "thscore";

                var thdate = document.createElement('th');
                var textthdate = document.createTextNode('Date');
                thdate.appendChild(textthdate);
                thdate.className = "thdate";

                trtitles.appendChild(thname);
                trtitles.appendChild(thscore);
                trtitles.appendChild(thdate);

                table.appendChild(trtitles);

                // NEXT ROWS
                for (i = 0; i < highscores.length; i++) {
                    var trrow1 = document.createElement('tr'); 
                    var td1 = document.createElement('td');
                    var td2 = document.createElement('td');
                    var td3 = document.createElement('td');
                    var text1 = document.createTextNode(highscores[i].name);
                    var text2 = document.createTextNode(highscores[i].score);
                    var text3 = document.createTextNode(highscores[i].date);
                    td1.appendChild(text1);
                    td2.appendChild(text2);
                    td3.appendChild(text3);
                    trrow1.appendChild(td1);
                    trrow1.appendChild(td2);
                    trrow1.appendChild(td3);
                    table.appendChild(trrow1);          
                }    
            }
            else {
                table = document.createElement('p');
                table.appendChild(document.createTextNode("No scores detected!"));
            }
            e('highscorestable').appendChild(table);
            
        } else {
            alert('Warning! No Local Storage support!');
            location.reload();
        }
    };

    // "GAME LOOP"
    this.gameLoop = function() {
        player.updateDistance(this.terrain);
        player.updateFuel();
        player.updateFuelUsage(this.terrain);
        player.updateFood();
        player.updateWater();
        player.updateScrap();
        player.updateShield(player.damage);
        this.updateSpot();
        this.checkGameOver();
        player.damage = 0;
    };

    this.playMusic = function() {
        this.music = true;
        e('musicbtn').src = "images/musicon.png";
        e('musicvolumeslider').value = this.musicVolume * 100;
        this.audio.play();
        this.savedMusicVolume[0] = 1;
        this.savedMusicVolume[1] = this.musicVolume;
        localStorage.setItem("musicvolume", JSON.stringify(this.savedMusicVolume));
    };
    
    this.stopMusic = function() {
        this.music = false;
        e('musicbtn').src = "images/musicoff.png";
        e('musicvolumeslider').value = 0;
        this.audio.pause();
        this.savedMusicVolume[0] = 0;
        this.savedMusicVolume[1] = this.musicVolume;
        localStorage.setItem("musicvolume", JSON.stringify(this.savedMusicVolume));
    };
    
    this.setMusicVolume = function(vol) {
        if (vol >= 0.1) {
            this.musicVolume = (vol / 100).toFixed(2);
            this.audio.volume = this.musicVolume;
            this.playMusic();
        }
        else {
            this.musicVolume = 0;
            this.audio.volume = 0;
            this.music = false;
            this.stopMusic();
        }
        this.savedMusicVolume[0] = this.musicVolume;
        localStorage.setItem("musicvolume", JSON.stringify(this.savedMusicVolume));
    };
    
    this.startGame = function() {
        
        e('mainmenu').style.display = "none";
        e('game').style.display = "block";
        this.terrain = this.terrains[0];
        var instance = this;
        
        // player.fuel = 1; // HACK !!!
        setInterval(function() {

            instance.gameStep++;
            if (instance.running) {
                if (instance.gameStep > 0) {
                    instance.gameLoop();
                    instance.gameStep = 0;
                }
            }
        }, 500);
    };
}
