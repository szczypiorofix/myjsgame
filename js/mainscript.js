	var mygame = new MyGame();

	function startGame() {
            document.getElementById('mainmenu').style.display = "none";
            document.getElementById('game').style.display = "block";
            mygame.startGame();
	}

	function startstop() {
            mygame.pausegame();
	}
        
        function help() {
             
             document.getElementById('game').style.display = "none";
             document.getElementById('helppart').style.display = "block";
        }
        
        function exithelp() {
             
             document.getElementById('game').style.display = "block";
             document.getElementById('helppart').style.display = "none";
        }
        
        function fight() {
            mygame.fight();
        }
        
        function flee() {
            mygame.flee();
        }
        
        function keepgoing() {
            document.getElementById("villagebtn").style.display = "none";
            document.getElementById("spot").innerHTML += mygame.distanceOnSpot() +"You bypassed the village.<br>";
            var objDiv = document.getElementById("spotdiv");
            objDiv.scrollTop = objDiv.scrollHeight;
            mygame.pausegame();
        }
        
        function enterTheVillage() {
            document.getElementById('game').style.display = "none";
            document.getElementById('village').style.display = "block";
            mygame.enterTheVillage();
        }
        
        function smittysExpand() {
            if (document.getElementById('smittysgarage').style.display === "block") {
                document.getElementById('smittysgarage').style.display = "none";
            }
            else {
                document.getElementById('smittysgarage').style.display = "block";
            }
        }
        
        function catchagasExpand() {
            if (document.getElementById('catchagas').style.display === "block") {
                document.getElementById('catchagas').style.display = "none";
            }
            else {
                document.getElementById('catchagas').style.display = "block";
            }
        }
        
        function freshwaterExpand() {
            if (document.getElementById('freshwaterstation').style.display === "block") {
                document.getElementById('freshwaterstation').style.display = "none";
            }
            else {
                document.getElementById('freshwaterstation').style.display = "block";
            }
        }
        
        function iguanaExpand() {
            if (document.getElementById('iguanaonstickrestaurant').style.display === "block") {
                document.getElementById('iguanaonstickrestaurant').style.display = "none";
            }
            else {
                document.getElementById('iguanaonstickrestaurant').style.display = "block";
            }
        }
        
        function repairCar() {
            mygame.repairCar();
        }
        
        function buySpareParts() {
            mygame.buySpareParts();
        }
        
        function refuelCar() {
            mygame.refuelCar();
        }
        
        function buyFood() {
            mygame.buyFood();
        }
        
        function buyWater() {
            mygame.buyWater();
        }
        
        function backToTheRoad() {
            document.getElementById('game').style.display = "block";
            mygame.backToTheRoad();
        }

	function setVerySlowSpeedGame() {
		mygame.setSpeed(1);
                document.getElementById("veryslowspeed").style.color = "#66ffff";
		document.getElementById("slowspeed").style.color = "#99ccff";
		document.getElementById("mediumspeed").style.color = "#99ccff";
		document.getElementById("fastspeed").style.color = "#99ccff";
	}

	function setSlowSpeedGame() {
		mygame.setSpeed(2);
                document.getElementById("veryslowspeed").style.color = "#99ccff";
		document.getElementById("slowspeed").style.color = "#66ffff";
		document.getElementById("mediumspeed").style.color = "#99ccff";
		document.getElementById("fastspeed").style.color = "#99ccff";
	}

	function setMediumSpeedGame() {
		mygame.setSpeed(3);
                document.getElementById("veryslowspeed").style.color = "#99ccff";
		document.getElementById("slowspeed").style.color = "#99ccff";
		document.getElementById("mediumspeed").style.color = "#66ffff";
		document.getElementById("fastspeed").style.color = "#99ccff";
	}

	function setFastSpeedGame() {
		mygame.setSpeed(4);
                document.getElementById("veryslowspeed").style.color = "#99ccff";
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