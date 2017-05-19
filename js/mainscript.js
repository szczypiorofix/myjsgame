    
    function e(element) {
        return document.getElementById(element);
    }
    
    document.addEventListener("DOMContentLoaded", function(event) {
        var mygame = new MyGame();    

        e('startgamebtn').addEventListener('click', function() { 
            e('mainmenu').style.display = "none";
            e('game').style.display = "block";
            mygame.startGame();
        });
        
        e('highscoresbtn').addEventListener('click', function() { 
            e('mainmenu').style.display = "none";
            e('highscorespart').style.display = "block";
            if (typeof(window.localStorage) !== "undefined") {
                mygame.showHighScores();
            }
            else {
                alert('Warning! No Local Storage support!');
            }
        });
        
        e('highscoresexit').addEventListener('click', function() { 
            e('mainmenu').style.display = "block";
            e('highscorestable').innerHTML = '';
            e('highscorespart').style.display = "none";
        });
        
        e('submitscorebtn').addEventListener('click', function() {
            
            if (typeof(window.localStorage) !== "undefined") {
                alert('Congratulations!');
                var highScores = JSON.parse(localStorage.getItem("highscores"));
                var temp = new Object;
                temp.name = e('playername').value;
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1; //January is 0!
                var yyyy = today.getFullYear();
                if(dd<10) {
                    dd='0'+dd;
                } 
                if(mm<10) {
                    mm='0'+mm;
                } 
                today = mm+'/'+dd+'/'+yyyy;
                temp.date = today;
                temp.score = mygame.distance.toFixed(2);

                if (highScores === null) highScores = [];

                highScores.push(temp);
                localStorage.setItem("highscores", JSON.stringify(highScores));   
            }
            else {
                alert('Warning! No Local Storage support!');
            }
            location.reload();
        });

        e('clearscores').addEventListener('click', function() {
            var r = confirm('Delete all scores?');
            if (r === true) {
                localStorage.setItem("highscores", JSON.stringify(null));
                location.reload();
            }
        });

        e('buttonhelp').addEventListener('click', function() { 
            e('game').style.display = "none";
            e('helppart').style.display = "block";
        });

        e('helpexit').addEventListener('click', function() { 
            e('game').style.display = "block";
            e('helppart').style.display = "none";
        });

        e('fightbtn').addEventListener('click', function() { 
            mygame.fight();
        });

        e('fleebtn').addEventListener('click', function() { 
            mygame.flee();
        });

        e('keepgoingbtn').addEventListener('click', function() { 
            e("villagebtn").style.display = "none";
            e("spot").innerHTML += mygame.distanceOnSpot() +"You bypassed the village.<br>";
            var objDiv = document.getElementById("spotdiv");
            objDiv.scrollTop = objDiv.scrollHeight;
            mygame.pausegame();
        });

        e('entervillagebtn').addEventListener('click', function() { 
            e('game').style.display = "none";
            e('village').style.display = "block";
            mygame.enterTheVillage();
        });

        e('smittyexpandbtn').addEventListener('click', function() { 
            if (e('smittysgarage').style.display === "block") {
                e('smittysgarage').style.display = "none";
            }
            else {
                e('smittysgarage').style.display = "block";
            }
        });

        e('pimpexpandbtn').addEventListener('click', function() { 
            if (e('pimpmyride').style.display === "block") {
                e('pimpmyride').style.display = "none";
            }
            else {
                e('pimpmyride').style.display = "block";
            }
        });

        e('catchagasbtn').addEventListener('click', function() { 
            if (e('catchagas').style.display === "block") {
                e('catchagas').style.display = "none";
            }
            else {
                e('catchagas').style.display = "block";
            }
        });

        e('freshwaterstationbtn').addEventListener('click', function() { 
            if (e('freshwaterstation').style.display === "block") {
                e('freshwaterstation').style.display = "none";
            }
            else {
                e('freshwaterstation').style.display = "block";
            }
        });

        e('iguanarestaurantbtn').addEventListener('click', function() { 
            if (e('iguanaonstickrestaurant').style.display === "block") {
                e('iguanaonstickrestaurant').style.display = "none";
            }
            else {
                e('iguanaonstickrestaurant').style.display = "block";
            }
        });

        // SMITTY'S GARAGE
        e('repaircarbtn').addEventListener('click', function() { 
           mygame.repairCar();
        });
        
        // PIMP MY RIDE
        e('shieldsupgradebtn').addEventListener('click', function() { 
           mygame.shieldUpgrade();
        });
        
        e('fuelconsumptionupgradebtn').addEventListener('click', function() { 
           mygame.fuelConsumptionUpgrade();
        });
        
        e('attackupgradebtn').addEventListener('click', function() { 
           mygame.attackUpgrade();
        });
        
        e('defenseupgradebtn').addEventListener('click', function() { 
           mygame.defenseUpgrade();
        });
        
        e('fuelstorageupgradebtn').addEventListener('click', function() { 
           mygame.fuelStorageUpgrade();
        });
        
        e('foodstorageupgradebtn').addEventListener('click', function() { 
           mygame.foodStorageUpgrade();
        });
        
        e('waterstorageupgradebtn').addEventListener('click', function() { 
           mygame.waterStorageUpgrade();
        });

        // CATCH-A-GAS STATION
        e('refuelcarbtn').addEventListener('click', function() { 
           mygame.refuelCar();
        });

        // FRESH WATER STATION
        e('buywaterbtn').addEventListener('click', function() { 
           mygame.buyWater();
        });

        // IGUANA-ON-STICK RESTAURANT
        e('buyfoodbtn').addEventListener('click', function() { 
           mygame.buyFood();
        });

        e('backtoroadbtn').addEventListener('click', function() { 
           e('game').style.display = "block";
            mygame.backToTheRoad();
        });

        e('veryslowspeed').addEventListener('click', function() { 
            mygame.setSpeed(1);
            e("veryslowspeed").classList.remove("active");
            e("slowspeed").classList.remove("active");
            e("mediumspeed").classList.remove("active");
            e("fastspeed").classList.remove("active");
            e("veryslowspeed").classList.add("active");
        });
        e('slowspeed').addEventListener('click', function() { 
            mygame.setSpeed(2);
            e("veryslowspeed").classList.remove("active");
            e("slowspeed").classList.remove("active");
            e("mediumspeed").classList.remove("active");
            e("fastspeed").classList.remove("active");
            e("slowspeed").classList.add("active");
        });
        e('mediumspeed').addEventListener('click', function() { 
            mygame.setSpeed(3);
            e("veryslowspeed").classList.remove("active");
            e("slowspeed").classList.remove("active");
            e("mediumspeed").classList.remove("active");
            e("fastspeed").classList.remove("active");
            e("mediumspeed").classList.add("active");
        });
        e('fastspeed').addEventListener('click', function() { 
            mygame.setSpeed(4);
            e("veryslowspeed").classList.remove("active");
            e("slowspeed").classList.remove("active");
            e("mediumspeed").classList.remove("active");
            e("fastspeed").classList.remove("active");
            e("fastspeed").classList.add("active");
        });
    });
