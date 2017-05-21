function e(element) {
    return document.getElementById(element);
}

function Player() {
    
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
    this.fuelConsumptionLevel = 1;
    this.fuelStorageLevel = 1;
    this.waterStorageLevel = 1;
    this.foodStorageLevel = 1;
    this.shieldLevel = 1;
    this.attackLevel = 1;
    this.defenseLevel = 1;
    
    this.updateWater = function() {
        this.water -= 0.5;
        e("water").innerHTML = this.water.toFixed(2);
    };
    
    this.updateDistance = function(terrain) {
        this.distanceStep = (4 - (terrain.value / 5));
        this.distance += this.distanceStep;
        e("distance").innerHTML = this.distance.toFixed(2);
        e("step").innerHTML = (this.distanceStep).toFixed(2);
        e("distanceBig").innerHTML = this.distance.toFixed(2);
    };

    this.updateFood = function() {
        this.food -= 0.5;
        e("food").innerHTML = this.food.toFixed(2);
    };
    
    this.updateFuel = function() {
        this.fuel -= this.fuelusage;
        e("fuel").innerHTML = this.fuel.toFixed(2);
    };

    this.updateFuelUsage = function(terrain) {
        this.fuelusage = terrain.fuelConsumption - (this.fuelConsumptionLevel * 0.04);
        e("fuelusage").innerHTML = this.fuelusage.toFixed(2);
    };
    
    this.updateShield = function(dmg) {
        this.shield -= dmg;
        e("shield").innerHTML = this.shield;
    };
    
    this.updateScrap = function() {
        e("scrap").innerHTML = this.scrap;
    };
    
}
