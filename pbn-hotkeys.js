//PBN Add-On

//Universal Commands (DEFAULTS):
var command_get_token = "gt";
var command_sell_token = "st";
var command_get_flag = "gf";
var command_sell_flag = "sf";
var command_reload_weapon = "rw";
var command_buy_ammunition = "ra";
var command_game_ready = "game ready auto";
var command_game_standby = "game ready standby";
var command_screen_center = "screen center";
var command_target_home = "tar home";
var command_target_north = "tar n";
var command_target_east = "tar e";
var command_target_south = "tar s";
var command_target_west = "tar w";
var command_target_north_east = "tar n && tar e";
var command_target_south_east = "tar s && tar e";
var command_target_north_west = "tar n && tar w";
var command_target_south_west = "tar s && tar w";
var command_weapon_next = "next_weapon";
var command_weapon_previous = "previous_weapon";

function pbn_hotkeys(){

  var canShieldOn = 0;
  var mainInputBoxID = "Component592";
  var playScreenID = "Component140";
  const mainInputBox = document.getElementById(mainInputBoxID);
  const playScreen = document.getElementById(playScreenID);

  this.submitCommands = function() {
  
    this.hitEnterOnTextBox = function() {
      var ev = new KeyboardEvent('keydown', {
        altKey:false,
        bubbles: true,
        cancelBubble: false, 
        cancelable: true,
        charCode: 0,
        code: "Enter",
        composed: true,
        ctrlKey: false,
        currentTarget: null,
        defaultPrevented: true,
        detail: 0,
        eventPhase: 0,
        isComposing: false,
        isTrusted: true,
        key: "Enter",
        keyCode: 13,
        location: 0,
        metaKey: false,
        repeat: false,
        returnValue: false,
        shiftKey: false,
        type: "keydown",
        which: 13
      });
      mainInputBox.dispatchEvent(ev);
    }

    this.addTextToInputBox = function(textToAdd) {mainInputBox.value = textToAdd;}
    this.sendTextCommand = function(commandString) {this.addTextToInputBox(commandString); this.hitEnterOnTextBox();}

    this.nextWeapon = function() {canShieldOn = 0; this.sendTextCommand(command_weapon_next);}
    this.previousWeapon = function() {canShieldOn = 0; this.sendTextCommand(command_weapon_previous);}
    this.getToken = function() {this.sendTextCommand(command_get_token);}
    this.sellToken = function() {this.sendTextCommand(command_sell_token);}
    this.getFlag = function() {this.sendTextCommand(command_get_flag);}
    this.sellFlag = function() {this.sendTextCommand(command_sell_flag);}
    this.reloadWeapon = function() {this.sendTextCommand(command_reload_weapon);}
    this.reloadAmmo = function() {this.sendTextCommand(command_buy_ammunition);}
    this.gameReadyAuto = function() {this.sendTextCommand(command_game_ready);}
    this.gameReadyStandby = function() {this.sendTextCommand(command_game_standby);}
    this.screenCenter = function() {this.sendTextCommand(command_screen_center);}
    this.targetNorth = function() {this.sendTextCommand(command_target_north);}
    this.targetSouth = function() {this.sendTextCommand(command_target_south);}
    this.targetEast = function() {this.sendTextCommand(command_target_east);}
    this.targetWest = function() {this.sendTextCommand(command_target_west);}
    this.targetNorthEast = function() {this.sendTextCommand(command_target_north_east);}
    this.targetNorthWest = function() {this.sendTextCommand(command_target_north_west);}
    this.targetSouthEast = function() {this.sendTextCommand(command_target_south_east);}
    this.targetSouthWest = function() {this.sendTextCommand(command_target_south_west);}
    this.targetHome = function() {this.sendTextCommand(command_target_home);}

  }

  canShield = function(loopPattern, objectCMD) {
    var delayTime = 185;

    objectCMD.targetHome();
    objectCMD.targetNorth();
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    function cw_loop(i) {
      (i == 1 || i == 8) && objectCMD.targetEast();
      (i == 2 || i == 3) && objectCMD.targetSouth();
      (i == 4 || i == 5) && objectCMD.targetWest();
      (i == 6 || i == 7) && objectCMD.targetNorth();
    }

    function ccw_loop(i) {
      (i == 1 || i == 8) && objectCMD.targetWest();
      (i == 2 || i == 3) && objectCMD.targetSouth();
      (i == 4 || i == 5) && objectCMD.targetEast();
      (i == 6 || i == 7) && objectCMD.targetNorth();
    }

    function loop_seq_1(i) {
      objectCMD.targetHome();
	    switch(i){
		    case 1:
			    objectCMD.targetNorth();
			    break;
		    case 2:
			    objectCMD.targetSouth();
			    break;
		    case 3:
			    objectCMD.targetWest();
          break;
		    case 4:
			    objectCMD.targetEast();
          break;
		    case 5:
			    objectCMD.targetNorthWest();
          break;
		    case 6:
          objectCMD.targetSouthEast();
          break;
		    case 7:
          objectCMD.targetNorthEast();
          break;
		    case 8:
          objectCMD.targetSouthWest();
        break;
	    };
    }

    const run_loop = async (loopType) => {
	  var i = 1;
	  objectCMD.sendTextCommand("tar home && tar n");
	  do {
	    switch(loopType) {
	      case "cwloop":
          cw_loop(i);
	        break;
	      case "ccwloop":
	        ccw_loop(i);
	        break;
        case "loop_seq_1":
          loop_seq_1(i);
          break;
	    }
	    i++;
        if (i > 8) {i = 1;}
	    await wait(delayTime);
	  } while(canShieldOn == 1);
    }
    run_loop(loopPattern);
  }

  this.run_hotkeys = function() {
    //Enable Commands
    var submitCommand = new this.submitCommands();
    //var canCan = new this.canShield("", submitCommand);

    //MOUSE WHEEL FUNCTIONALITY
    const changeWeapon = (event) => {(event.deltaY < 0) ? submitCommand.nextWeapon() : submitCommand.previousWeapon();}
    playScreen.onwheel = changeWeapon;

    //KEYBOARD SHORTCUTS
    document.addEventListener("keypress", function(event) {
      if (document.activeElement !== mainInputBox) {
        switch(event.keyCode){
          //
          //Common Keys:
          //
          //Keyboard 0 (48)
          //Keyboard 1 (49)
          case 49:
            submitCommand.gameReadyAuto();
            break;
          //Keyboard 2 (50)
          case 50:
            submitCommand.gameReadyStandby();
            break;
          //Keyboard 3 (51)
          //Keyboard 4 (52)
          //Keyboard 5 (53)
          //Keyboard 6 (54)
          //Keyboard 7 (55)
          //Keyboard 8 (56)
          //Keyboard 9 (57)
          //Keyboard A (65) or a (97)
          //Keyboard B (66) or b (98)
          //Keyboard C (67) or c (99)
          case 67:
          case 99:
            submitCommand.reloadAmmo();
            break;
          //Keyboard D (68) or d (100)
          //Keyboard E (69) or e (101)
          case 69:
          case 101:
            submitCommand.getToken();
            break;
          //Keyboard F (70) or f (102)
          case 70:
          case 102:
            submitCommand.screenCenter();
            break;
          //Keyboard G (71) or g (103)
          case 71:
          case 103:
            canShieldOn = 0;
            break;
          //Keyboard H (72) or h (104)
          //Keyboard I (73) or i (105)
          //Keyboard J (74) or j (106)
          //Keyboard K (75) or k (107)
          //Keyboard L (76) or l (108)
          //Keyboard M (77) or m (109)
          //Keyboard N (78) or n (110)
          //Keyboard O (79) or o (111)
          //Keyboard P (80) or p (112)
          //Keyboard Q (81) or q (113)
          case 81:
          case 113:
            submitCommand.getFlag();
            break;
          //Keyboard R (82) or r (114)
          case 82:
          case 114:
            submitCommand.reloadWeapon();
            break;
          //Keyboard S (83) or s (115)
          //Keyboard T (84) or t (116)
          case 84:
          case 116:
            if (canShieldOn != 1) {canShieldOn = 1; canShield("cwloop", submitCommand);}
            break;
          //Keyboard U (85) or u (117)
          case 85:
          case 117:
            if (canShieldOn != 1) {canShieldOn = 1; canShield("loop_seq_1", submitCommand);}
            break;
          //Keyboard V (86) or v (118)
          //Keyboard W (87) or w (119)
          //Keyboard X (88) or x (120)
          case 88:
          case 120:
            submitCommand.sellToken();
            break;
          //Keyboard Y (89) or y (121)
          case 89:
          case 121:
            if (canShieldOn != 1) {canShieldOn = 1; canShield("ccwloop", submitCommand);}
            break;
          //Keyboard Z (90) or z (122)
          case 90:
          case 122:
            submitCommand.sellFlag();
            break;
        };
      };
    });
  }

}

var newgame = new pbn_hotkeys();
newgame.run_hotkeys();