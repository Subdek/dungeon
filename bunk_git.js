var px, oldpx, skill, health, cash, msg, mon_sk, mon_he, dead, levelup;

level = 1;

//co-ords
const don_left = [0,
  25, 135, 245, 355, 465,
  25, 135, 245, 355, 465,
  25, 135, 245, 355, 465,
  25, 135, 245, 355, 465,
  25, 135, 245, 355, 465,
]

const don_top = [0,
  25, 25, 25, 25, 25,
  135, 135, 135, 135, 135,
  245, 245, 245, 245, 245,
  355, 355, 355, 355, 355,
  465, 465, 465, 465, 465,]

const room_map = [0,
  1, 1, 1, 1, 1,
  1, 1, 2, 2, 1,
  1, 1, 1, 1, 1,
  1, 1, 1, 1, 1,
  1, 1, 1, 1, 3]

const room_name = ["assets/brick.png", "gold.png", "redsquare.png", "blacksquare.png", "greensquare.png", "spiral.png"]


const mx = [
  "Welcome to the Dungeon! <br>It's gonna get messy! Let's go!",
  "This is an empty room... <br>Choose another",
  "It's a monster! Fight (0) <br>or retreat (X) to previous room?",
  "It's Death himself! Fight (0) <br>or retreat (X) to previous room?",
  "room4",
  "room5",
  "room6",
  "room7",
  "room8",
  "room9",
  "room10",
  "You killed that bad boy! <br> Upskill and move on buddy!",
  "SORRY, YOU'RE DEAD <br> Hit NEW to play again.",
  "You've killed Death and completed the level. Hit NEXT for next level",
  "Whoa! That was fun, where next?",
  "You killed death. Time for the next floor <br> It's going to be tougher this time!",
  "Death awaits... <br>Destroy it to enter the next level"]

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


  for (i = 2; i < 26; i++) {
    xtop = (don_top[i] - 15) + "px";
    document.getElementById("pic" + i).style.top = xtop;

    xleft = (don_left[i] - 15) + "px"
    document.getElementById("pic" + i).style.left = xleft;

    document.getElementById("pic" + i).src = "brick.png";
  };
  don();
  enadir();
  disXO();
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

  if (px < 6) { document.getElementById("butt_up").style.visibility = "hidden" };
  if (px > 20) { document.getElementById("butt_dn").style.visibility = "hidden" };
  if (px == 1 || px == 6 || px == 11 || px == 16 || px == 21) { document.getElementById("butt_lf").style.visibility = "hidden" };
  if (px == 5 || px == 10 || px == 15 || px == 20 || px == 25) { document.getElementById("butt_rt").style.visibility = "hidden" };

}

function move(yy) {
  oldpx = px;
  clear_monster();
  if (yy.id == "butt_up") { px = px - 5 };
  if (yy.id == "butt_rt") { px++ };
  if (yy.id == "butt_dn") { px = px + 5 };
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

  //monster
  if (room_map[px] == 2) {
    message(); enaXO();
    document.getElementById("butta").innerHTML = "FIGHT";
    document.getElementById("buttb").innerHTML = "RETREAT";

    mon_sk = 5; mon_he = 20;
    document.getElementById("mon_skill").innerHTML = "SKILL: " + mon_sk;

    document.getElementById("mon_health").innerHTML = "HEALTH: " + mon_he;

    document.getElementById("monster").style.visibility = "visible";
    document.getElementById("monster").src = "monster.png";
  }

  //death monster
  if (room_map[px] == 3) {
    message(); enaXO();
    document.getElementById("butta").innerHTML = "FIGHT";
    document.getElementById("buttb").innerHTML = "RETREAT";
    mon_sk = 10; mon_he = 10;
    document.getElementById("mon_skill").innerHTML = "SKILL: " + mon_sk;

    document.getElementById("mon_health").innerHTML = "HEALTH: " + mon_he;

    document.getElementById("monster").style.visibility = "visible";
    document.getElementById("monster").src = "death.png";
  }


}

function message() {
  document.getElementById("message_txt").innerHTML = mx[msg];
}

function disdir() {
  document.getElementById("butt_up").style.visibility = "hidden";
  document.getElementById("butt_rt").style.visibility = "hidden";
  document.getElementById("butt_dn").style.visibility = "hidden";
  document.getElementById("butt_lf").style.visibility = "hidden";
}

function disXO() {
  document.getElementById("butta").disabled = true;
  document.getElementById("buttb").disabled = true;
}

function enaXO() {
  document.getElementById("butta").disabled = false;
  document.getElementById("buttb").disabled = false;
}

function update() {
  document.getElementById("skill_val").innerHTML = skill;
  document.getElementById("health_val").innerHTML = health;
  document.getElementById("cash_val").innerHTML = cash;

}

function btnO() {
  //fight monster/ death
  if (room_map[px] == 2 || room_map[px] == 3) {
    fight();
    if (mon_he == 0 && room_map[px] == 2) { victory() };
    if (mon_he == 0 && room_map[px] == 3) { stage_victory() };
    if (health <= 0) { death() };
  }



}

function btnX() {
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
    disXO();
    msg = room_map[px]; message();
    clear_monster();
    document.getElementById("butta").innerHTML = "&#9635";
    document.getElementById("buttb").innerHTML = "&#9635";
    return;
  }

}

function fight() {
  xxx = (Math.floor(Math.random() * 3));

  if (xxx == 0) { health-- } else { mon_he-- };
  update();
  document.getElementById("mon_health").innerHTML = "HEALTH: " + mon_he;
  return;
}

function victory() {
  skill++; update();
  room_map[px] = 1; print_rm();
  msg = 11; message();
  enadir();
  disXO();

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
  px = 1; oldpx = 1; skill = 10; health = 23; cash = 25; msg = 0; dead = 0; levelup = 0;
  const room_map = [0,
    1, 1, 1, 1, 1,
    1, 1, 2, 2, 1,
    1, 1, 1, 1, 1,
    1, 1, 1, 1, 1,
    1, 1, 1, 1, 1];
  document.getElementById("butta").style.visibility = "visible";

}

function stage_victory() {
  msg = 13; message();
  document.getElementById("butta").style.visibility = "hidden";
  document.getElementById("buttb").disabled = false;
  document.getElementById("buttb").innerHTML = "NEXT";

  disdir(); levelup = 1; level++;

}
