window.focus;

let the_canvas = document.getElementById("myCanvas");
let c = the_canvas.getContext("2d");

let height = 800;
let width = 800;

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

startAnimating(60);

// initialize the timer variables and start the animation

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

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
    });
  }
}

clearButton.addEventListener("mousedown", (event) => {
  clearButton.style.backgroundColor = "rgb(168, 129, 175)";
});

clearButton.addEventListener("mouseup", (event) => {
  clearButton.style.backgroundColor = "rgb(128, 102, 157)";
  for (let row = 0; row < grid_number; row++) {
    for (let column = 0; column < grid_number; column++) {
      grid[row][column].bought = false;
    }
  }
});

clearButton.addEventListener("mouseout", (event) => {
  clearButton.style.backgroundColor = "rgb(128, 102, 157)";
});

the_canvas.addEventListener("click", (event) => {
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
      )
        grid[row][column].bought = true;
    }
  }
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
    for (let index = 1; index < grid_number; index++) {
      c.fillRect((index * height) / grid_number, 0, 1, height);
      c.fillRect(0, (index * height) / grid_number, height, 1);
    }

    for (i = 0; i < grid_number; i++) {
      for (j = 0; j < grid_number; j++) {
        if (grid[i][j].bought == true) {
          //   console.log("How you doin'?");
          c.fillRect(
            grid[i][j].minX,
            grid[i][j].minY,
            height / grid_number,
            height / grid_number
          );
        }
      }
    }
  }
}
