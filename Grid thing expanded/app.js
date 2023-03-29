window.focus;

const house = new Image();
house.src = "images/house.png";

const grass = new Image();
grass.src = "images/grass.png";

const dead_down = new Image();
dead_down.src = "images/dead_down.png";

const single_road = new Image();
single_road.src = "images/single_road.png";

const full_junction = new Image();
full_junction.src = "images/full_junction.png";

const dead_left = new Image();
dead_left.src = "images/dead_left.png";

const dead_right = new Image();
dead_right.src = "images/dead_right.png";

const dead_up = new Image();
dead_up.src = "images/dead_up.png";

const junction_down = new Image();
junction_down.src = "images/junction_down.png";

const junction_left = new Image();
junction_left.src = "images/junction_left.png";

const junction_right = new Image();
junction_right.src = "images/junction_right.png";

const junction_up = new Image();
junction_up.src = "images/junction_up.png";

const straight_side = new Image();
straight_side.src = "images/straight_side.png";

const straight_up = new Image();
straight_up.src = "images/straight_up.png";

const turn_bottom_left = new Image();
turn_bottom_left.src = "images/turn_bottom_left.png";

const turn_bottom_right = new Image();
turn_bottom_right.src = "images/turn_bottom_right.png";

const turn_top_left = new Image();
turn_top_left.src = "images/turn_top_left.png";

const turn_top_right = new Image();
turn_top_right.src = "images/turn_top_right.png";

let the_canvas = document.getElementById("myCanvas");
let c = the_canvas.getContext("2d");

let mouse_down = false

let buyHouse = false

let toggleSell = false

let height = 500;
let width = 500;

var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

let top_margin = innerHeight / 2 - height / 2;
let left_margin = innerWidth / 2 - height / 2;

top_margin = top_margin.toString() + "px";
left_margin = left_margin.toString() + "px";

myCanvas.style.marginTop = top_margin;
myCanvas.style.marginLeft = left_margin;

let clearButton = document.getElementById("clear-button");

let clearButton_height = 80;
let clearButton_width = 200;

let clear_top_margin = innerHeight / 2 - clearButton_height - height / 2 - 20;
let clear_left_margin = innerWidth / 2 - clearButton_width / 2 + 4;

clear_top_margin = clear_top_margin.toString() + "px";
clear_left_margin = clear_left_margin.toString() + "px";

clearButton.style.marginTop = clear_top_margin;
clearButton.style.marginLeft = clear_left_margin;

let houseButton = document.getElementById("toggle-house-button");

let houseButton_height = 80;
let houseButton_width = 200;

let house_top_margin = innerHeight / 2 - height / 2;
let house_left_margin = innerWidth / 2 + width / 2 + 50;

house_top_margin = house_top_margin.toString() + "px";
house_left_margin = house_left_margin.toString() + "px";

houseButton.style.marginTop = house_top_margin;
houseButton.style.marginLeft = house_left_margin;

let sellButton = document.getElementById("toggle-sell-button");

let sellButton_height = 80;
let sellButton_width = 200;

let sell_top_margin = innerHeight / 2 - height / 2 + sellButton_height + 5;
let sell_left_margin = innerWidth / 2 + width / 2 + 50;

sell_top_margin = sell_top_margin.toString() + "px";
sell_left_margin = sell_left_margin.toString() + "px";

sellButton.style.marginTop = sell_top_margin;
sellButton.style.marginLeft = sell_left_margin;

startAnimating(60);

// initialize the timer variables and start the animation

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

sellButton.style.height = sellButton_height.toString() + "px";
sellButton.style.width = sellButton_width.toString() + "px";

houseButton.style.height = houseButton_height.toString() + "px";
houseButton.style.width = houseButton_width.toString() + "px";

clearButton.style.height = clearButton_height.toString() + "px";
clearButton.style.width = clearButton_width.toString() + "px";

the_canvas.height = height;
the_canvas.width = width;

let grid_number = 10;

let grid = [];

for (let index = 0; index < grid_number; index++) {
  grid.push([]);
  for (let index2 = 0; index2 < grid_number; index2++) {
    grid[index].push({
      bought: false,
      minX: (index2 * height) / grid_number,
      maxX: ((index2 + 1) * height) / grid_number,
      minY: (index * height) / grid_number,
      maxY: ((index + 1) * height) / grid_number,
      top_bought: false,
      bottom_bought: false,
      left_bought: false,
      right_bought: false,
      isHouse: false,
    });
  }
}

houseButton.addEventListener("mousedown", (event) => {
  houseButton.style.backgroundColor = "rgb(168, 129, 175)";
});

houseButton.addEventListener("mouseup", (event) => {
  houseButton.style.backgroundColor =  "rgb(128, 102, 157)";
  if (buyHouse) {
    buyHouse = false
    document.getElementById("button-text").innerHTML = "HOUSES: OFF"
  } else {
    buyHouse = true
    document.getElementById("button-text").innerHTML = "HOUSES: ON"
    toggleSell = false
    document.getElementById("sell-button-text").innerHTML = "SELL: OFF"
  }
})

houseButton.addEventListener("mouseout", (event) => {
  houseButton.style.backgroundColor = "rgb(128, 102, 157)";
});

sellButton.addEventListener("mousedown", (event) => {
  sellButton.style.backgroundColor = "rgb(168, 129, 175)";
});

sellButton.addEventListener("mouseup", (event) => {
  sellButton.style.backgroundColor =  "rgb(128, 102, 157)";
  if (toggleSell) {
    toggleSell = false
    document.getElementById("sell-button-text").innerHTML = "SELL: OFF"
  } else {
    toggleSell = true
    buyHouse = false
    document.getElementById("button-text").innerHTML = "HOUSES: OFF"
    document.getElementById("sell-button-text").innerHTML = "SELL: ON"
  }
})

sellButton.addEventListener("mouseout", (event) => {
  sellButton.style.backgroundColor = "rgb(128, 102, 157)";
});

clearButton.addEventListener("mousedown", (event) => {
  clearButton.style.backgroundColor = "rgb(168, 129, 175)";
});

clearButton.addEventListener("mouseup", (event) => {
  clearButton.style.backgroundColor = "rgb(128, 102, 157)";
  for (let row = 0; row < grid_number; row++) {
    for (let column = 0; column < grid_number; column++) {
      grid[row][column].bought = false;
      grid[row][column].isHouse = false
      grid[row][column].top_bought = false;
      grid[row][column].bottom_bought = false;
      grid[row][column].left_bought = false;
      grid[row][column].right_bought = false;
    }
  }
});

clearButton.addEventListener("mouseout", (event) => {
  clearButton.style.backgroundColor = "rgb(128, 102, 157)";
});

the_canvas.addEventListener("mousedown", (event) => {
  mouse_down = true;
  const canvasPosition = the_canvas.getBoundingClientRect();
  const clickX = event.clientX - canvasPosition.left - 5;
  const clickY = event.clientY - canvasPosition.top - 5;

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid.length; column++) {
      if (
        clickX > grid[row][column].minX &&
        clickX < grid[row][column].maxX &&
        clickY > grid[row][column].minY &&
        clickY < grid[row][column].maxY
      ) {
        if (toggleSell) {
          grid[row][column].top_bought = false
          grid[row][column].bought = false
          grid[row][column].bottom_bought = false
          grid[row][column].left_bought = false
          grid[row][column].right_bought = false
          grid[row][column].isHouse = false
          if (row > 0) {
            grid[row - 1][column].bottom_bought = false;
          }
          if (row < grid_number - 1) {
            grid[row + 1][column].top_bought = false;
          }
          if (column > 0) {
            grid[row][column - 1].right_bought = false;
          }
          if (column < grid_number - 1) {
            grid[row][column + 1].left_bought = false;
      }
        } else if (grid[row][column].bought) {
         } else {
              grid[row][column].bought = true;
              if (buyHouse) {
                grid[row][column].isHouse = true;
              }
              if ((grid[row][column].bought = true)) {
                if (row > 0) {
                  grid[row - 1][column].bottom_bought = true;
                }
                if (row < grid_number - 1) {
                  grid[row + 1][column].top_bought = true;
                }
                if (column > 0) {
                  grid[row][column - 1].right_bought = true;
                }
                if (column < grid_number - 1) {
                  grid[row][column + 1].left_bought = true;
            }
            }
          }
        }
      }
    }
  }
);

the_canvas.addEventListener("mousemove", (event) => {
  if (mouse_down) {
    const canvasPosition = the_canvas.getBoundingClientRect();
    const clickX = event.clientX - canvasPosition.left - 5;
    const clickY = event.clientY - canvasPosition.top - 5;

    for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid.length; column++) {
        if (
          clickX > grid[row][column].minX &&
          clickX < grid[row][column].maxX &&
          clickY > grid[row][column].minY &&
          clickY < grid[row][column].maxY
        ) {
          if (toggleSell) {
            grid[row][column].top_bought = false
            grid[row][column].bought = false
            grid[row][column].bottom_bought = false
            grid[row][column].left_bought = false
            grid[row][column].right_bought = false
            grid[row][column].isHouse = false
            if (row > 0) {
              grid[row - 1][column].bottom_bought = false;
            }
            if (row < grid_number - 1) {
              grid[row + 1][column].top_bought = false;
            }
            if (column > 0) {
              grid[row][column - 1].right_bought = false;
            }
            if (column < grid_number - 1) {
              grid[row][column + 1].left_bought = false;
        }
          } else if (grid[row][column].bought) {
           } else {
                grid[row][column].bought = true;
                if (buyHouse) {
                  grid[row][column].isHouse = true;
                }
                if ((grid[row][column].bought = true)) {
                  if (row > 0) {
                    grid[row - 1][column].bottom_bought = true;
                  }
                  if (row < grid_number - 1) {
                    grid[row + 1][column].top_bought = true;
                  }
                  if (column > 0) {
                    grid[row][column - 1].right_bought = true;
                  }
                  if (column < grid_number - 1) {
                    grid[row][column + 1].left_bought = true;
              }
           }
            
          }
          
        }
      }
    }
  }
});

the_canvas.addEventListener("mouseup", (event) => {
  mouse_down = false;
});

function animate() {
  requestAnimationFrame(animate);
  //   console.log("din mamma");

  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    // console.log("din pappa");
    // Get ready for next frame by setting then=now, but also adjust for your
    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    then = now - (elapsed % fpsInterval);

    // Put your drawing code here
    c.clearRect(0, 0, width, height);
    c.fillStyle = "rgb(0,0,0)";
    // c.fillRect(x, y, blob_size, blob_size)

    // c.fillRect(x, y, blob_size, blob_size)

    for (i = 0; i < grid_number; i++) {
      for (j = 0; j < grid_number; j++) {
        if (grid[i][j].bought) {
          if (grid[i][j].isHouse){
            image = house
          } else if (
            grid[i][j].top_bought &&
            grid[i][j].bottom_bought &&
            grid[i][j].left_bought &&
            grid[i][j].right_bought
          ) {
            image = full_junction;
          } else if (
            grid[i][j].top_bought &&
            grid[i][j].left_bought &&
            grid[i][j].right_bought
          ) {
            image = junction_down;
          } else if (
            grid[i][j].bottom_bought &&
            grid[i][j].left_bought &&
            grid[i][j].right_bought
          ) {
            image = junction_up;
          } else if (
            grid[i][j].bottom_bought &&
            grid[i][j].left_bought &&
            grid[i][j].top_bought
          ) {
            image = junction_right;
          } else if (
            grid[i][j].bottom_bought &&
            grid[i][j].right_bought &&
            grid[i][j].top_bought
          ) {
            image = junction_left;
          } else if (grid[i][j].bottom_bought && grid[i][j].top_bought) {
            image = straight_up;
          } else if (grid[i][j].right_bought && grid[i][j].left_bought) {
            image = straight_side;
          } else if (grid[i][j].bottom_bought && grid[i][j].right_bought) {
            image = turn_bottom_right;
          } else if (grid[i][j].bottom_bought && grid[i][j].left_bought) {
            image = turn_bottom_left;
          } else if (grid[i][j].top_bought && grid[i][j].right_bought) {
            image = turn_top_right;
          } else if (grid[i][j].top_bought && grid[i][j].left_bought) {
            image = turn_top_left;
          } else if (grid[i][j].bottom_bought) {
            image = dead_up;
          } else if (grid[i][j].top_bought) {
            image = dead_down;
          } else if (grid[i][j].left_bought) {
            image = dead_right;
          } else if (grid[i][j].right_bought) {
            image = dead_left;
          } else {
            image = single_road;
          }
        } else {
          image = grass;
        }
        c.drawImage(
          image,
          grid[i][j].minX,
          grid[i][j].minY,
          height / grid_number,
          height / grid_number
        );
      }
    }
    for (let index = 1; index < grid_number; index++) {
      c.fillRect((index * height) / grid_number, 0, 1, height);
      c.fillRect(0, (index * height) / grid_number, height, 1);
    }
  }
}
