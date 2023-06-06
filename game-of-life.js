const boardSize = 100;
const padding = 0;
const gap = 0;
let canvas = undefined;
const createBoard = (cellWidth, cellHeight) => {
  let board = [];
  let rectX = padding,
    rectY = padding;
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      board.push({ x: rectX, y: rectY, w: cellWidth, h: cellHeight, state: 0 });
      rectX += cellWidth + gap;
    }
    rectX = padding;
    rectY += cellHeight + gap;
  }
  return board;
};

const drawBoard = (board, ctx) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (rect of board) {
    if (rect.state == 1) ctx.fillStyle = "yellow";
    else if (rect.state == 0) ctx.fillStyle = "grey";
    ctx.strokeStyle = "red";
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  }
};
const collide = (board, x, y, ctx) => {
  var isCollision = false;
  console.log(board);
  for (rect of board) {
    var left = rect.x,
      right = rect.x + rect.w;
    var top = rect.y,
      bottom = rect.y + rect.h;
    if (right >= x && left <= x && bottom >= y && top <= y) {
      if (rect.state == 0) rect.state = 1;
      else if (rect.state == 1) rect.state = 0;
      isCollision = true;
      console.log("coll");
      drawBoard(board, ctx);
      return isCollision;
    }
  }
  return isCollision;
};

// const onClick = (e) => {
//   console.log(board);
//   let rect = collide(board, e.offsetX, e.offsetY);
//   console.log(e.offsetX, e.offsetY, rect);
//   if (rect) rect.state = 1;
// };

const init = () => {
  console.log("draw");
  canvas = document.getElementById("board");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.strokeStyle = "black";
    console.log(canvas.width, canvas.height);

    cellWidth = (canvas.width - padding * 2 - gap * boardSize) / boardSize;
    cellHeight = (canvas.height - padding * 2 - gap * boardSize) / boardSize;
    console.log(cellWidth, cellHeight);
    let board = createBoard(cellWidth, cellHeight);
    console.log(board);
    drawBoard(board, ctx);
    canvas.addEventListener("click", (e) => {
      //   console.log(board);
      let rect = collide(board, e.offsetX, e.offsetY, ctx);
      console.log(e.offsetX, e.offsetY, rect);
      if (rect) rect.state = 1;
    });
    setInterval(drawLoop, 1000, board, ctx);
  } else {
    console.log("canva not supported");
  }
};

const drawLoop = (board, ctx) => {
  //   console.log(board);
  drawBoard(board, ctx);
};
