window.focus;

function loadImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

const house = loadImage("images/house.png");
const grass = loadImage("images/grass.png");
const dead_down = loadImage("images/dead_down.png");
const single_road = loadImage("images/single_road.png");
const full_junction = loadImage("images/full_junction.png");
const dead_left = loadImage("images/dead_left.png");
const dead_right = loadImage("images/dead_right.png");
const dead_up = loadImage("images/dead_up.png");
const junction_down = loadImage("images/junction_down.png");
const junction_left = loadImage("images/junction_left.png");
const junction_right = loadImage("images/junction_right.png");
const junction_up = loadImage("images/junction_up.png");
const straight_side = loadImage("images/straight_side.png");
const straight_up = loadImage("images/straight_up.png");
const turn_bottom_left = loadImage("images/turn_bottom_left.png");
const turn_bottom_right = loadImage("images/turn_bottom_right.png");
const turn_top_left = loadImage("images/turn_top_left.png");
const turn_top_right = loadImage("images/turn_top_right.png");
const shop = loadImage("images/shop.png");

let the_canvas = document.getElementById("myCanvas");
let c = the_canvas.getContext("2d");

let mouse_down = false;

let buyHouse = false;

let buyShop = false;

let toggleSell = false;

let height = 1000;
let width = 1000;

var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

let top_margin = innerHeight / 2 - height / 2;
let left_margin = innerWidth / 2 - height / 2;

top_margin = top_margin.toString() + "px";
left_margin = left_margin.toString() + "px";

myCanvas.style.marginTop = top_margin;
myCanvas.style.marginLeft = left_margin;

function createButton(whichButton, the_top_margin, the_left_margin) {
  whichButton.style.marginTop = the_top_margin.toString() + "px";
  whichButton.style.marginLeft = the_left_margin.toString() + "px";

  whichButton.style.height = "80px";
  whichButton.style.width = "200px";
}

let clearButton = document.getElementById("clear-button");
createButton(
  clearButton,
  innerHeight / 2 - 80 - height / 2 - 20,
  innerWidth / 2 - 200 / 2 + 4
);

let houseButton = document.getElementById("toggle-house-button");
createButton(
  houseButton,
  innerHeight / 2 - height / 2,
  innerWidth / 2 + width / 2 + 50
);

let sellButton = document.getElementById("toggle-sell-button");
createButton(
  sellButton,
  innerHeight / 2 - height / 2 + 80 + 5,
  innerWidth / 2 + width / 2 + 50
);

let shopButton = document.getElementById("toggle-shop-button");
createButton(
  shopButton,
  innerHeight / 2 - height / 2 + 160 + 10,
  innerWidth / 2 + width / 2 + 50
);

startAnimating(60);

// initialize the timer variables and start the animation

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

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
      type: "none",
    });
  }
}

houseButton.addEventListener("mousedown", (event) => {
  houseButton.style.backgroundColor = "rgb(168, 129, 175)";
});

houseButton.addEventListener("mouseup", (event) => {
  houseButton.style.backgroundColor = "rgb(128, 102, 157)";
  if (buyHouse) {
    buyHouse = false;
    document.getElementById("button-text").innerHTML = "HOUSES: OFF";
  } else {
    buyHouse = true;
    document.getElementById("button-text").innerHTML = "HOUSES: ON";
    toggleSell = false;
    document.getElementById("sell-button-text").innerHTML = "SELL: OFF";
    buyShop = false;
    document.getElementById("shop-button-text").innerHTML = "SHOPS: OFF";
  }
});

houseButton.addEventListener("mouseout", (event) => {
  houseButton.style.backgroundColor = "rgb(128, 102, 157)";
});

shopButton.addEventListener("mousedown", (event) => {
  shopButton.style.backgroundColor = "rgb(168, 129, 175)";
});

shopButton.addEventListener("mouseup", (event) => {
  shopButton.style.backgroundColor = "rgb(128, 102, 157)";
  if (buyShop) {
    shopHouse = false;
    document.getElementById("shop-button-text").innerHTML = "SHOPS: OFF";
  } else {
    buyShop = true;
    document.getElementById("shop-button-text").innerHTML = "SHOPS: ON";
    buyHouse = false;
    document.getElementById("button-text").innerHTML = "HOUSES: OFF";
    toggleSell = false;
    document.getElementById("sell-button-text").innerHTML = "SELL: OFF";
  }
});

shopButton.addEventListener("mouseout", (event) => {
  shopButton.style.backgroundColor = "rgb(128, 102, 157)";
});

sellButton.addEventListener("mousedown", (event) => {
  sellButton.style.backgroundColor = "rgb(168, 129, 175)";
});

sellButton.addEventListener("mouseup", (event) => {
  sellButton.style.backgroundColor = "rgb(128, 102, 157)";
  if (toggleSell) {
    toggleSell = false;
    document.getElementById("sell-button-text").innerHTML = "SELL: OFF";
  } else {
    toggleSell = true;
    buyHouse = false;
    document.getElementById("button-text").innerHTML = "HOUSES: OFF";
    document.getElementById("sell-button-text").innerHTML = "SELL: ON";
    buyShop = false;
    document.getElementById("shop-button-text").innerHTML = "SHOPS: OFF";
  }
});

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
      grid[row][column].type = "none";
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
          sell(row, column);
        } else if (grid[row][column].bought) {
        } else {
          buy(row, column);
        }
      }
    }
  }
});

function sell(row, column) {
  grid[row][column].bought = false;
  grid[row][column].type = "none";
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
}

function buy(row, column) {
  grid[row][column].bought = true;
  if (buyHouse) {
    grid[row][column].type = "house";
  } else if (buyShop) {
    grid[row][column].type = "shop";
  } else {
    grid[row][column].type = "road";
  }
}

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
            sell(row, column);
          } else if (grid[row][column].bought) {
          } else {
            buy(row, column);
          }
        }
      }
    }
  }
});

the_canvas.addEventListener("mouseup", (event) => {
  mouse_down = false;
});

function checkUnlocks() {
  for (row = 0; row < grid_number; row++) {
    for (let column = 0; column < grid_number; column++) {
      if (grid[row][column].bought == true) {
        if (grid[row][column].type == "road") {
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
        } else {
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
        }
      } else {
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
      }
    }
  }
}

function chooseImage(i, j) {
  if (grid[i][j].bought) {
    if (grid[i][j].type == "house") {
      image = house;
    } else if (grid[i][j].type == "shop") {
      image = shop;
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
  return image;
}

function animate() {
  requestAnimationFrame(animate);

  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    c.clearRect(0, 0, width, height);
    c.fillStyle = "rgb(0,0,0)";

    checkUnlocks();

    for (i = 0; i < grid_number; i++) {
      for (j = 0; j < grid_number; j++) {
        image = chooseImage(i, j);
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
