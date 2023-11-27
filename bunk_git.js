var px, oldpx, skill, health, cash, msg, mon_sk, mon_he, dead, levelup, donut, item, key, chest_rm;

level = 1;

const donut_stash = [0, 0, 0, 0]

//co-ords
const don_left = [0,
  25, 135, 245, 355, 465, 575,
  25, 135, 245, 355, 465, 575,
  25, 135, 245, 355, 465, 575,
  25, 135, 245, 355, 465, 575,
  25, 135, 245, 355, 465, 575,
]

const don_top = [0,
  25, 25, 25, 25, 25, 25,
  135, 135, 135, 135, 135, 135,
  245, 245, 245, 245, 245, 245,
  355, 355, 355, 355, 355, 355,
  465, 465, 465, 465, 465, 465,]

const room_map = [0,
  1, 4, 1, 1, 1, 1,
  1, 1, 2, 1, 1, 1,
  5, 2, 4, 2, 1, 1,
  1, 1, 2, 1, 2, 2,
  1, 5, 1, 1, 2, 3]

const room_name = ["brick.png", "gold.png", "redsquare.png", "blacksquare.png", "greensquare.png", "redsquare.png", "gold.png", "gold.png", "gold.png", "spiral.png"]

const mx = [
  "Welcome to the Dungeon! <br>It's gonna get messy! Let's go!",
  "This is an empty room... <br>Choose another",
  "It's a monster! Fight (0) <br>or retreat (X) to previous room?",
  "It's Death himself! Fight (0) <br>or retreat (X) to previous room?",
  "Roulette Wheel. Fancy your luck? SPIN or LEAVE",
  "You meet a mysterious fellow. <br>FIGHT or RETREAT?",
  "You see a chest, but it's locked. <br> Time to move on",
  "You see a chest, but luckily you have the key! Have some cash!",
  "Just an empty room with an empty chest. Time to move on.",
  "room9",
  "room10",
  "You killed that bad boy! Upskill, take a donut and move on buddy!",
  "SORRY, YOU'RE DEAD <br> Hit NEW to play again.",
  "You've killed Death and completed the level. Hit NEXT for next level",
  "Whoa! That was fun, where next?",
  "You killed death. Time for the next floor <br> It's going to be tougher this time!",
  "Death awaits... <br>Destroy it to enter the next level",
  "Nice work. You win $5",
  "Bad luck. You lose $2",
  "Fair enough. Try your luck another day!",
  "Hmmm... He seemed kinda nice. <br>Lose a skill point and move on.",
  "Very wise. Not everyone's an enemy. <br> Here have a special key."
]

reset(); start();


function start() {
  document.getElementById("message").src = "message.png";
  document.getElementById("level_btn").src = "orange-btn.png";
  document.getElementById("sidepanel").src = "panel_new.png"
  document.getElementById("roompanel").src = "message.png"
  document.getElementById("slot1").src = "potion_slot.png";
  document.getElementById("slot2").src = "potion_slot.png";
  document.getElementById("slot3").src = "potion_slot.png";
  document.getElementById("slot4").src = "potion_slot.png";
  document.getElementById("compass").src = "compass.png";
  document.getElementById("health_panel").src = "healthbox.png";
  document.getElementById("skill_panel").src = "skillbox.png";
  document.getElementById("cash_panel").src = "cashbox.png";

  document.getElementById("pic1").style.top = "10px";
  document.getElementById("pic1").style.left = "10px";
  document.getElementById("pic1").src = "gold.png";

  document.getElementById("butta").innerHTML = "&#9635";
  document.getElementById("buttb").innerHTML = "&#9635";


  for (i = 2; i < 31; i++) {
    xtop = (don_top[i] - 15) + "px";
    document.getElementById("pic" + i).style.top = xtop;

    xleft = (don_left[i] - 15) + "px"
    document.getElementById("pic" + i).style.left = xleft;

    document.getElementById("pic" + i).src = "brick.png";
  };
  don();
  enadir();
  disAB(); disCD();
  clear_monster();

  document.getElementById("skill_head").innerHTML = "SKILL";
  document.getElementById("health_head").innerHTML = "HEALTH";
  document.getElementById("cash_head").innerHTML = "CASH"; update();
  document.getElementById("message_txt").innerHTML = mx[msg];
  document.getElementById("level_hd").innerHTML = "LEVEL: " + level;

}

function print_rm() {
  xtop = (don_top[px] - 15) + "px";
  document.getElementById("pic" + px).style.top = xtop;

  xleft = (don_left[i] - 15) + "px"
  document.getElementById("pic" + px).style.left = xleft;

  document.getElementById("pic" + px).src = room_name[room_map[px]];
}

//placing the DON
function don() {
  document.getElementById("don").src = "donatello.png";
  document.getElementById("don").style.left = (don_left[px] - 7) + "px";
  document.getElementById("don").style.top = (don_top[px] - 7) + "px";
}

//enable direction buttons
function enadir() {
  document.getElementById("butt_up").style.visibility = "visible";
  document.getElementById("butt_rt").style.visibility = "visible";
  document.getElementById("butt_dn").style.visibility = "visible";
  document.getElementById("butt_lf").style.visibility = "visible";

  if (px < 7) { document.getElementById("butt_up").style.visibility = "hidden" };
  if (px > 24) { document.getElementById("butt_dn").style.visibility = "hidden" };
  if (px == 1 || px == 7 || px == 13 || px == 19 || px == 25) { document.getElementById("butt_lf").style.visibility = "hidden" };
  if (px == 6 || px == 12 || px == 18 || px == 24 || px == 30) { document.getElementById("butt_rt").style.visibility = "hidden" };

}

function move(yy) {
  oldpx = px;
  clear_monster();
  if (yy.id == "butt_up") { px = px - 6 };
  if (yy.id == "butt_rt") { px++ };
  if (yy.id == "butt_dn") { px = px + 6 };
  if (yy.id == "butt_lf") { px-- };

  print_rm();
  don();
  health = health - 1;
  document.getElementById("health_val").innerHTML = health;
  disdir();
  if (health <= 0) {
    death(); return;
  }

  msg = room_map[px];
  message();

  //empty room
  if (room_map[px] == 1) {
    enadir();
    document.getElementById("butta").innerHTML = "&#9635";
    document.getElementById("buttb").innerHTML = "&#9635";
    return;
  }
  if (room_map[px] == 8) {
    document.getElementById("monster").style.visibility = "visible";
    document.getElementById("monster").src = "chest_empty.png";
    enadir();
    document.getElementById("butta").innerHTML = "&#9635";
    document.getElementById("buttb").innerHTML = "&#9635";
    return;
  }




  //small monster
  if (room_map[px] == 2) {
    message(); enaAB();
    document.getElementById("butta").innerHTML = "FIGHT";
    document.getElementById("buttb").innerHTML = "RETREAT";

    mon_sk = 5; mon_he = 10;
    document.getElementById("mon_skill").innerHTML = "SKILL: " + mon_sk;

    document.getElementById("mon_health").innerHTML = "HEALTH: " + mon_he;

    document.getElementById("monster").style.visibility = "visible";
    document.getElementById("monster").src = "monster.png";
  }

  //big monster
  if (room_map[px] == 3) {
    message(); enaAB();
    document.getElementById("butta").innerHTML = "FIGHT";
    document.getElementById("buttb").innerHTML = "RETREAT";
    mon_sk = 10; mon_he = 10;
    document.getElementById("mon_skill").innerHTML = "SKILL: " + mon_sk;

    document.getElementById("mon_health").innerHTML = "HEALTH: " + mon_he;

    document.getElementById("monster").style.visibility = "visible";
    document.getElementById("monster").src = "death.png";
  }

  //roulette
  if (room_map[px] == 4) {
    enaAB();
    document.getElementById("butta").innerHTML = "SPIN";
    document.getElementById("buttb").innerHTML = "LEAVE";


    return;
  }

  //wizard
  if (room_map[px] == 5) {
    enaAB(); message();
    document.getElementById("butta").innerHTML = "FIGHT";
    document.getElementById("buttb").innerHTML = "RETREAT";


    mon_sk = 5; mon_he = 10;
    document.getElementById("mon_skill").innerHTML = "SKILL: " + mon_sk;

    document.getElementById("mon_health").innerHTML = "HEALTH: " + mon_he;

    document.getElementById("monster").style.visibility = "visible";
    document.getElementById("monster").src = "wizard2.png";
  }

  //chest locked
  if (room_map[px] == 6) {
    enadir();
    document.getElementById("monster").style.visibility = "visible";
    document.getElementById("monster").src = "chest_closed.png";
  }

  //chest unlocked
  if (room_map[px] == 7) {
    enadir();
    document.getElementById("monster").style.visibility = "visible";
    document.getElementById("monster").src = "chesty_open.png";
    cash = cash + 30;
    update();
    room_map[px] = 8;
  }

}

function btnA() {
  //fight monster/ death
  if (room_map[px] == 2 || room_map[px] == 3 || room_map[px] == 5) {
    fight();
    if (mon_he == 0 && room_map[px] == 2) { victory() };
    if (mon_he == 0 && room_map[px] == 5) { wiz_victory() };
    if (mon_he == 0 && room_map[px] == 3) { stage_victory() };
    if (health <= 0) { death() };
  }

  //spin
  if (room_map[px] == 4) {
    spin();
    if (mon_he == 0 && room_map[px] == 2) { victory() };
    if (mon_he == 0 && room_map[px] == 3) { stage_victory() };
    if (health <= 0) { death() };
  }



}

function btnB() {
  //restart
  if (dead == 1) {
    reset(); start()
  }

  // level up
  if (levelup == 1) {
    reset(); start()
  }

  //fight retreat
  if (room_map[px] == 2 || room_map[px] == 3) {
    health = health - 5;

    update();
    if (health <= 0) {
      death(); return;
    };
    px = oldpx;
    print_rm();
    don();
    enadir();
    disAB();
    msg = room_map[px]; message();
    clear_monster();
    document.getElementById("butta").innerHTML = "&#9635";
    document.getElementById("buttb").innerHTML = "&#9635";
    return;
  }

  //wizard retreat
  if (room_map[px] == 5) {
    enadir();
    msg = 21; message();
    room_map[px] = 1; print_rm();
    px = oldpx;
    print_rm();
    don();
    enadir();
    disAB();
    clear_monster();
    document.getElementById("butta").innerHTML = "&#9635";
    document.getElementById("buttb").innerHTML = "&#9635";
    document.getElementById("slot" + item).src = "keys.png";
    item++; key = 1; room_map[chest_rm] = 7;

    return;

  }

  //roulette leave
  if (room_map[px] == 4) {
    enadir();
    msg = 19; message();
    document.getElementById("butta").innerHTML = "&#9635";
    document.getElementById("buttb").innerHTML = "&#9635";
    disAB();

    return;
  }

}
function message() {
  document.getElementById("message_txt").innerHTML = mx[msg];
  return;
}

function disdir() {
  document.getElementById("butt_up").style.visibility = "hidden";
  document.getElementById("butt_rt").style.visibility = "hidden";
  document.getElementById("butt_dn").style.visibility = "hidden";
  document.getElementById("butt_lf").style.visibility = "hidden";
}

function disAB() {
  document.getElementById("butta").disabled = true;
  document.getElementById("buttb").disabled = true;
}

function disCD() {
  document.getElementById("buttc").disabled = true;
  document.getElementById("buttd").disabled = true;
}

function enaAB() {
  document.getElementById("butta").disabled = false;
  document.getElementById("buttb").disabled = false;
}

function enaCD() {
  document.getElementById("buttc").disabled = false;
  document.getElementById("buttd").disabled = false;

}


function update() {
  document.getElementById("skill_val").innerHTML = skill;
  document.getElementById("health_val").innerHTML = health;
  document.getElementById("cash_val").innerHTML = cash;

}

function fight() {
  xxx = (Math.floor(Math.random() * 3));

  if (xxx == 0) {
    health--;
    document.getElementById("health_val").style.color = "red";
    document.getElementById("health_val").innerHTML = health;
    setTimeout(back_don, 100);

  } else {
    mon_he--;
    document.getElementById("mon_health").style.color = "red";
    document.getElementById("mon_health").innerHTML = "HEALTH: " + mon_he;
    setTimeout(back_mon, 100);
  };
  return;
}

function spin() {
  xxx = (Math.floor(Math.random() * 4));

  if (xxx == 0) { cash = cash + 5; update(); msg = 17; message() }
  else { cash = cash - 2; update(); msg = 18; message() };

}

function victory() {
  skill++; update();
  room_map[px] = 1; print_rm();
  msg = 11; message();
  enadir();
  disAB();
  document.getElementById("butta").innerHTML = "&#9635";
  document.getElementById("buttb").innerHTML = "&#9635";
  document.getElementById("monster").src = "tomb.png";

  if (donut == 5) { return };

  donut_xxx = (Math.floor(Math.random() * 3));
  donut_stash[item - 1] = donut_xxx;
  document.getElementById("slot" + item).src = donut_xxx + "donut.png"; item++;
  return;
}

function wiz_victory() {
  skill--; update();
  room_map[px] = 1; print_rm();
  msg = 20; message();
  enadir();
  disAB();
  document.getElementById("butta").innerHTML = "&#9635";
  document.getElementById("buttb").innerHTML = "&#9635";
  document.getElementById("monster").src = "tomb.png";
  return;
}

function clear_monster() {
  document.getElementById("mon_skill").innerHTML = "";
  document.getElementById("mon_health").innerHTML = "";
  document.getElementById("monster").style.visibility = "hidden";
  mon_he = 20;
}

function death() {
  msg = 12; message();
  document.getElementById("butta").style.visibility = "hidden";
  document.getElementById("buttb").disabled = false;
  document.getElementById("buttb").innerHTML = "NEW";

  disdir();
  level = 1;
  dead = 1;
}

function reset() {
  px = 1; oldpx = 1; skill = 10; health = 99; cash = 25; msg = 0; dead = 0; levelup = 0; item = 1; key = 0; chest_rm = 16; room_map[chest_rm] = 6;

  document.getElementById("butta").style.visibility = "visible";

}

function stage_victory() {
  msg = 13; message();
  document.getElementById("butta").style.visibility = "hidden";
  document.getElementById("buttb").disabled = false;
  document.getElementById("buttb").innerHTML = "NEXT";

  disdir(); levelup = 1; level++;

}

function back_mon() {
  document.getElementById("mon_health").style.color = "black"; document.getElementById("mon_health").innerHTML = "HEALTH: " + mon_he;
}

function back_don() {
  document.getElementById("health_val").style.color = "beige";
  document.getElementById("health_val").innerHTML = health;
}
