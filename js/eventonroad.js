function EventOnRoad(name, chance, type, actionMsg, cancelMsg, danger) {
    
    this.name = name || "Empty event.";
    this.chance = chance || 50;
    this.type = type || 0;
    this.danger = danger || 0;
    this.actionMsg = actionMsg || "Default action message";
    this.cancelMsg = cancelMsg || "Default cancel message";
}