// gak.
// Feb 2019. Functions that make the Monte Hall web page work.
//
      function totalReset(opt) {
        // if reset button was selected, need also to set win/lose numbers to zero
        if( opt == 'reset' ) {
          document.getElementById("lose").textContent = 0;
          document.getElementById("win").textContent = 0;
          document.getElementById("pctStay").textContent = 0;
          document.getElementById("pctSwitch").textContent = 0;
          document.getElementById("score").textContent = 0;
          document.getElementById("plays").textContent = 0;
        }

        // need to set text on doors and prize door
        document.getElementById('button0').textContent = "none";
        document.getElementById('button1').textContent = "none";
        document.getElementById('button2').textContent = "none";
        document.getElementById('button3').textContent = "none";

        document.getElementById('titleOne').textContent = "One";
        document.getElementById('titleTwo').textContent = "Two";
        document.getElementById('titleThree').textContent = "Three";

        document.getElementById('conversation').textContent =
          "Select a door. After you pick, Monte will show you an empty door.";
        document.getElementById("imgDoorThree").src = "./pics/browndoor.jpg";
        document.getElementById("imgDoorTwo").src = "./pics/browndoor.jpg";
        document.getElementById("imgDoorOne").src = "./pics/browndoor.jpg";
      };

      function doorSelect(door) {

        var pArray = new Array("titleOne", "titleTwo", "titleThree");
        var dArray = new Array("imgDoorOne", "imgDoorTwo", "imgDoorThree");

        // first click.
        if ( document.getElementById('button0').textContent == 'none' )
        {

          // increment the total number of plays
          var l = Number(document.getElementById("plays").textContent);
          l = l + 1;
          document.getElementById("plays").textContent = l;

          // if we haven't selected the prize door yet, need to do that
          var prizeDoorInt = Math.floor(Math.random() * 3 ); // should return 0, 1, 2
          // save the prize door
          document.getElementById('button0').textContent = prizeDoorInt;
          
          // set the user door to show it was selected by user. errrrr.
          var userDoorInt = 0;
          if ( door == "titleOne") {
            document.getElementById("titleOne").textContent = "Your Selection";
            userDoorInt = 0;
          } else if ( door == "titleTwo") {
            document.getElementById("titleTwo").textContent = "Your Selection";
            userDoorInt = 1;
          } else {
            document.getElementById("titleThree").textContent = "Your Selection";
            userDoorInt = 2;
          }
          // save the user selected door
          document.getElementById("button1").textContent = userDoorInt;

          // 'Monte' needs to pick a door now and say "Look, nothing here, bitch!"
          var mPick = Math.floor(Math.random() * 3 );
          while ( mPick == prizeDoorInt || mPick == userDoorInt) {
            mPick = Math.floor(Math.random() * 3 );
          }
          // save the door that Monte selected. 
          document.getElementById("button2").textContent = mPick;
          console.log("prize " + prizeDoorInt + " user " + userDoorInt + " monte " + mPick);

          document.getElementById(pArray[mPick]).textContent = "Monte";
          document.getElementById(dArray[mPick]).src = "./pics/donkey.jpg";

          // final step, let user know the next step.
          document.getElementById("conversation").textContent = 
            "Finish the game by clicking one of the remaining two doors."

        }

        // arrive at this branch when user selects final door.
        else {
          // if user clicks on Monte's door, tell them to fuck off.
          //var userDoorInt = document.getElementById("button1").textContent;
          var mPick = document.getElementById("button2").textContent;

          // again, determine which door was clicked. 
          var userDoorInt = 0;
          if ( door == "titleOne") {
            userDoorInt = 0;
          } else if ( door == "titleTwo") {
            userDoorInt = 1;
          } else {
            userDoorInt = 2;
          }

          // if they clicked Monte's empty door, message and return.
          if( userDoorInt == mPick ) {
            console.log ("user selected Monte's door.");
            document.getElementById("conversation").textContent = 
              "No prize there, Silly Billy. Try again.";
            return;
          } else if (document.getElementById('button3').textContent == "true") {
              totalReset('quik');
            //document.getElementById("conversation").textContent = 
            //  "Please Click Play Again! button.";
            return;
          }
          console.log("2nd pick " + userDoorInt);

          // compare users pick to the prize door
          var pPick = document.getElementById("button0").textContent;
          if( userDoorInt == pPick ) {
            // they have won. show prize and increment the Win tally.
            document.getElementById('button3').textContent = "true";
            document.getElementById(pArray[userDoorInt]).textContent = "Final Choice";
            document.getElementById(dArray[userDoorInt]).src = "./pics/win.jpg";

            document.getElementById("conversation").textContent = 
              "Winner! Click Play Again button.";

            var l = Number(document.getElementById("win").textContent);
            l = l + 1;
            document.getElementById("win").textContent = l;

            // increment the switch win or stay win tally.
            var originalUserPick = Number(document.getElementById("button1").textContent);
            if( originalUserPick == userDoorInt ) {
              // increment the stay win tally
              var l = Number(document.getElementById("pctStay").textContent);
              l = l + 1;
              document.getElementById("pctStay").textContent = l;
            } else {
              var l = Number(document.getElementById("pctSwitch").textContent);
              l = l + 1;
              document.getElementById("pctSwitch").textContent = l;
            }

            // calculate score
            var numPlays = Number(document.getElementById("plays").textContent);
            var numWins = Number(document.getElementById("win").textContent);
            document.getElementById("score").textContent = (numWins / numPlays).toFixed(2);

          } else {
            document.getElementById('button3').textContent = "true";
            // they did not win. Show a fail pic, inc the lose tally.
            document.getElementById(pArray[userDoorInt]).textContent = "Final Choice";
            document.getElementById(dArray[userDoorInt]).src = "./pics/donkey.jpg";
            document.getElementById("conversation").textContent = 
              "Ouch. Click Play Again button.";
            var l = Number(document.getElementById("lose").textContent);
            l = l + 1;
            document.getElementById("lose").textContent = l;

            // calculate score
            var numPlays = Number(document.getElementById("plays").textContent);
            var numWins = Number(document.getElementById("win").textContent);
            document.getElementById("score").textContent = (numWins / numPlays).toFixed(2);

            // #F36E21  BSU Orange.
          }
        }

      }
