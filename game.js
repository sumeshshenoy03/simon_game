var buttonList = ["green", "red", "yellow", "blue"];
var newSequence = [];
var level = 0;
var count = 0;
var started = false;
function nextSequence() {
  level++;
  count = 0;
  $("#level-title").text(`Level ${level}`);
  var randomNumber = Math.floor(Math.random() * 4);
  newSequence.push(buttonList[randomNumber]);
  animate(buttonList[randomNumber]);
  new Audio(`./sounds/${buttonList[randomNumber]}.mp3`).play();
  console.log(newSequence);
}

function animate(color) {
  $(`.${color}`).addClass("pressed");
  setTimeout(function () {
    $(`.${color}`).removeClass("pressed");
  }, 100);
}

function checkSequence(color) {
  animate(color);
  new Audio(`./sounds/${color}.mp3`).play();
  if (newSequence[count] === color) {
    count++;
    console.log("count " + count);
    if (count == newSequence.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    new Audio("./sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);

    $("#level-title").text("Game Over, Press any Key to Restart");
    count = 0;
    level = 0;
    newSequence = [];
    started = false;
  }
}

// $(".green").click(function () {
//   checkSequence("green");
// });
// $(".red").click(function () {
//   checkSequence("red");
// });
// $(".yellow").click(function () {
//   checkSequence("yellow");
// });

// $(".blue").click(function () {
//   checkSequence("blue");
// });

$(".btn").click(function () {
  var selectedColor = $(this).attr("id");
  checkSequence(selectedColor);
});

document.addEventListener("keydown", function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});
