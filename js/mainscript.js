	var mygame = new MyGame();

	function startGame() {
		document.getElementById('mainmenu').style.display = "none";
		document.getElementById('game').style.display = "block";
		mygame.startGame();
	}

	function startstop() {
		mygame.pausegame();
	}

	function setSlowSpeedGame() {
		mygame.setSpeed(1);
		document.getElementById("slowspeed").style.color = "#66ffff";
		document.getElementById("mediumspeed").style.color = "#99ccff";
		document.getElementById("fastspeed").style.color = "#99ccff";
	}

	function setMediumSpeedGame() {
		mygame.setSpeed(2);
		document.getElementById("slowspeed").style.color = "#99ccff";
		document.getElementById("mediumspeed").style.color = "#66ffff";
		document.getElementById("fastspeed").style.color = "#99ccff";
	}

	function setFastSpeedGame() {
		mygame.setSpeed(3);
		document.getElementById("slowspeed").style.color = "#99ccff";
		document.getElementById("mediumspeed").style.color = "#99ccff";
		document.getElementById("fastspeed").style.color = "#66ffff";
	}
        
        function fuelStorageUpgrade() {
            mygame.fuelStorageUpgrade();
        }
        
        function shieldUpgrade() {
            mygame.shieldUpgrade();
        }
        
        function foodStorageUpgrade() {
            mygame.foodStorageUpgrade();
        }
        
        function waterStorageUpgrade() {
            mygame.waterStorageUpgrade();
        }
        
        function fuelConsumptionUpgrade() {
            mygame.fuelConsumptionUpgrade();
        }
        
        function repair() {
            mygame.repair();
        }