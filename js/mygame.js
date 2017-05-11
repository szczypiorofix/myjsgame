
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
    this.damage = 0;
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
        "A pack of vicious dogs!",
        "Small group of raiders!",
        "Large group of raiders!",
        "Immortan Joe!",
        "A long, long road...",
        "You've found some fuel!",
        "You've found some water!",
        "You've found some food!",
        "You've found some scrap!",
        "Spare parts!",
        "Nothing special here",
        "A village?",
        "A trader?",
        "A lone wastelander..."
    ];


    this.updateDistance = function() {
        this.distanceStep = (5 - this.terrain.value);
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
        this.fuelusage = this.terrain.fuelConsumption;
        document.getElementById("fuelusage").innerHTML = this.fuelusage.toFixed(2);
    };
    
    this.updateShield = function(dmg) {
        this.shield -= dmg;
        document.getElementById("shield").innerHTML = this.shield;
    };

    this.updateSpareParts = function() {
        document.getElementById("spareparts").innerHTML = this.spareparts;
    };
    
    this.updateScrap = function() {
        document.getElementById("scrap").innerHTML = this.scrap;
    };

    this.updateTerrainPeriod = function() {

        if (this.terrainCount <= 0) {
            this.terrainPeriod = Math.floor((Math.random() * 6) + 3);
            this.terrainCount = this.terrainPeriod;
            this.updateTerrain();
        }
        else {
            this.terrainCount -= 1;
        }
    };

    this.setSpeed = function(speed) {
        this.gameSpeed = speed;
    };

    this.updateTerrain = function() {
        var randomTerrain = (Math.floor((Math.random() * this.terrains.length)));
        this.terrain = this.terrains[randomTerrain];
        document.getElementById("terrain").innerHTML = this.terrains[randomTerrain].name;
    };

    this.fuelStorageUpgrade = function() {
        this.fuelStorageLevel++;
        document.getElementById("fuelstoragelevel").innerHTML = this.fuelStorageLevel;
    };
    
    this.shieldUpgrade = function() {
        this.shieldLevel++;
        document.getElementById("shieldlevel").innerHTML = this.shieldLevel;
    };
    
    this.foodStorageUpgrade = function() {
        this.foodStorageLevel++;
        document.getElementById("foodstoragelevel").innerHTML = this.foodStorageLevel;
    };
    
    this.waterStorageUpgrade = function() {
        this.waterStorageLevel++;
        document.getElementById("waterstoragelevel").innerHTML = this.waterStorageLevel;
    };
    
    this.updateSpot = function() {
        this.spot = (Math.floor((Math.random() * this.events.length)));
        document.getElementById("spot").innerHTML = this.events[this.spot];
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
                this.damage = 8;
            }
            if (this.spot === 3) {
                this.damage = 14;
            }
        }
        else {
            this.damage = 0;
            
            // FOUND SOME FUEL
            if (this.spot === 5) {
                var foundFuel = (Math.floor((Math.random() * 6)+1));
                this.fuel += foundFuel;
                if (this.fuel > this.maxfuel) {
                    this.fuel = this.maxfuel;
                }
                document.getElementById("fuel").innerHTML = this.fuel.toFixed(2) +" (+"+foundFuel+")";
            }
            
            // FOUND SOME WATER
            if (this.spot === 6) {
                var foundWater = (Math.floor((Math.random() * 8)+1));
                this.water += foundWater;
                if (this.water > this.maxwater) {
                    this.water = this.maxwater;
                }
                document.getElementById("water").innerHTML = this.water +" (+"+foundWater+")";
            }
            
            // FOUND SOME FOOD
            if (this.spot === 7) {
                var foundFood = (Math.floor((Math.random() * 8)+1));
                this.food += foundFood;
                if (this.food > this.maxfood) {
                    this.food = this.maxfood;
                }
                document.getElementById("food").innerHTML = this.food +" (+"+foundFood+")";
            }
            
            // FOUND SOME SCRAP
            if (this.spot === 8) {
                var foundScrap = (Math.floor((Math.random() * 16)+1));
                this.scrap += foundScrap;
                document.getElementById("scrap").innerHTML = this.scrap +" (+"+foundScrap+")";
            }
            
            // FOUND SOME SPARE PARTS
            if (this.spot === 9) {
                var foundSpareParts = (Math.floor((Math.random() * 16)+1));
                this.spareparts += foundSpareParts;
                document.getElementById("spareparts").innerHTML = this.spareparts +" (+"+foundSpareParts+")";
            }
        }
    };

    this.gameLoop = function() {
        this.updateTerrainPeriod();
        this.updateDistance();
        this.updateFuel();
        this.updateFuelUsage();
        this.updateFood();
        this.updateWater();
        this.updateSpareParts();
        this.updateScrap();
        this.updateSpot();
        this.updateShield(this.damage);
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
            new Terrain("Solid ground", 0, 0.2),
            new Terrain("Sand", 1, 0.4),
            new Terrain("Mud", 2, 0.6),
            new Terrain("Rocks", 3, 0.8)
        ];
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
