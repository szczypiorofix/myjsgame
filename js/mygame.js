
function MyGame() {

    this.running = true;
    this.distance = 0;
    this.distanceStep = 0;
    this.fuel = 50;
    this.fuelusage = 0;
    this.food = 50;
    this.maxfood = 50;
    this.water = 50;
    this.maxwater = 50;
    this.gameSpeed = 1;
    this.gameStep = 0;

    this.terrain = 0;
    this.terrainPeriod = 0;
    this.terrainCount = 0;
    this.terrains = [];
    this.events = [
        "Long, long road...",
        "Raiders!",
        "You've found some fuel!",
        "You've found some water!",
        "You've found some food!",
        "You've found some scrap!",
        "A pack of vicious dogs!",
        "Immortan Joe!",
        "Nothing special here",
        "A village?",
        "A trader?",
    ];


    this.updateDistance = function() {
        this.distanceStep = (5 - this.terrain.value);
        this.distance += this.distanceStep;
        document.getElementById("distance").innerHTML = this.distance.toFixed(2);
        document.getElementById("step").innerHTML = (this.distanceStep).toFixed(2);
    }

    this.updateFood = function() {
        this.food--;
        document.getElementById("food").innerHTML = this.food;
    }

    this.updateWater = function() {
        this.water--;
        document.getElementById("water").innerHTML = this.water;
    }

    this.updateFuel = function() {
        this.fuel -= this.fuelusage;
        document.getElementById("fuel").innerHTML = this.fuel.toFixed(2);
    }

    this.updateFuelUsage = function() {
        this.fuelusage = this.terrain.fuelConsumption;
        document.getElementById("fuelusage").innerHTML = this.fuelusage.toFixed(2);
    }

    this.updateTerrainPeriod = function() {

        if (this.terrainCount <= 0) {
            this.terrainPeriod = Math.floor((Math.random() * 6) + 3);
            this.terrainCount = this.terrainPeriod;
            this.updateTerrain();
        }
        else {
            this.terrainCount -= 1;
        }
    }

    this.setSpeed = function(speed) {
        this.gameSpeed = speed;
    }

    this.updateTerrain = function() {
        var randomTerrain = (Math.floor((Math.random() * this.terrains.length)));
        this.terrain = this.terrains[randomTerrain];
        document.getElementById("terrain").innerHTML = this.terrains[randomTerrain].name;
    }

    this.updateSpot = function() {
        document.getElementById("spot").innerHTML = this.events[(Math.floor((Math.random() * this.events.length)))];
    }

    this.gameLoop = function() {
        this.updateTerrainPeriod();
        this.updateDistance();
        this.updateFuel();
        this.updateFuelUsage();
        this.updateFood();
        this.updateWater();
        this.updateSpot();
    }

    this.pausegame = function() {
        if (this.running == true) {
            this.running = false;
            document.getElementById("startstop").innerHTML = "START";
            document.getElementById("startstop").style.color = "gray";
        }
        else {
            this.running = true;
            document.getElementById("startstop").innerHTML = "PAUSE";
            document.getElementById("startstop").style.color = "#99ccff";
        }
    }

    this.startGame = function() {
        this.terrains = [
            new Terrain("Solid ground", 0, 0.2),
            new Terrain("Sand", 1, 0.4),
            new Terrain("Mud", 2, 0.6),
            new Terrain("Rocks", 3, 0.8)
        ]
        var instance = this;
        var interval = setInterval(function() {

            instance.gameStep++;
            if (instance.running) {
                if (instance.gameStep > (8 - (instance.gameSpeed * 2))) {
                    instance.gameLoop();
                    instance.gameStep = 0;
                }
            }
        }, 500);
    }
}
