function Terrain(name, value, fuelConsumption) {
    this.value = value || 0;
    this.name = name || "tempName";
    this.fuelConsumption = fuelConsumption || 0.5;

    this.getValue = function() {
        return this.value;
    };

    this.getName = function() {
        return this.name;
    };

    this.getFuelConsumption = function() {
        return this.fuelConsumption;
    };
}
