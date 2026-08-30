/* =========================================================
   GAME OF 15 — DOM-driven sliding puzzle
   ---------------------------------------------------------
   Key DOM concepts demonstrated (for viva):
   1. document.getElementById()      -> selecting elements
   2. document.createElement()       -> creating elements dynamically
   3. appendChild()                  -> inserting elements into the DOM
   4. addEventListener('click', fn)  -> event handling
   5. element.textContent            -> updating content directly
                                         (no innerHTML, no re-render)
   6. classList.add/remove/toggle    -> updating styles via DOM
   ========================================================= */

const SIZE = 4; // 4x4 board
const EMPTY = null; // value representing the empty slot
let tiles = []; // flat array of 16 values (state lives here)
let emptyIndex = SIZE * SIZE - 1; // index of the empty slot in `tiles`
let moveCount = 0;
let tileElements = []; // parallel array of the actual DOM elements

const board = document.getElementById("board");
const moveCountEl = document.getElementById("moveCount");
const shuffleBtn = document.getElementById("shuffleBtn");
const winMsg = document.getElementById("winMsg");

/* ---------- 1. Build the solved state ---------- */
function getSolvedState() {
  const arr = [];
  for (let i = 1; i < SIZE * SIZE; i++) arr.push(i);
  arr.push(EMPTY); // last slot empty
  return arr;
}

/* ---------- 2. Create the DOM elements ONCE ----------
   We do NOT rebuild the board with innerHTML on every move.
   Each tile is created a single time with createElement,
   given a click listener, and appended to the board.
   Moves only update textContent + classList afterwards. */
function buildBoardDOM() {
  board.innerHTML = ""; // clear only on full rebuild (setup/shuffle-restart)
  tileElements = [];

  tiles.forEach((value, index) => {
    const tile = document.createElement("div"); // DOM creation
    tile.classList.add("tile");
    tile.dataset.index = index;

    if (value === EMPTY) {
      tile.classList.add("empty");
      tile.textContent = "";
    } else {
      tile.textContent = value;
    }

    // Event delegation could also be used on `board`, but per-tile
    // listeners are fine here since tiles are created only once.
    tile.addEventListener("click", () => handleTileClick(index));

    board.appendChild(tile); // insert into the DOM
    tileElements.push(tile);
  });
}

/* ---------- 3. Adjacency check — O(1) ----------
   No looping/searching involved: convert both flat indices
   to (row, col) using division/modulo, then compare. */
function isAdjacent(i, j) {
  const rowI = Math.floor(i / SIZE),
    colI = i % SIZE;
  const rowJ = Math.floor(j / SIZE),
    colJ = j % SIZE;
  const sameRowNextCol = rowI === rowJ && Math.abs(colI - colJ) === 1;
  const sameColNextRow = colI === colJ && Math.abs(rowI - rowJ) === 1;
  return sameRowNextCol || sameColNextRow;
}

/* ---------- 4. Handle a tile click ---------- */
function handleTileClick(index) {
  if (index === emptyIndex) return; // clicked the empty slot itself
  if (!isAdjacent(index, emptyIndex)) return; // not movable

  // Swap values in the state array
  tiles[emptyIndex] = tiles[index];
  tiles[index] = EMPTY;

  // Update only the two affected DOM elements directly —
  // this is the efficient alternative to innerHTML re-rendering.
  updateTileElement(emptyIndex);
  updateTileElement(index);

  emptyIndex = index;
  moveCount++;
  moveCountEl.textContent = moveCount;

  checkWin();
}

/* ---------- 5. Update a single tile's DOM node ---------- */
function updateTileElement(index) {
  const tile = tileElements[index];
  const value = tiles[index];

  if (value === EMPTY) {
    tile.textContent = "";
    tile.classList.add("empty");
  } else {
    tile.textContent = value;
    tile.classList.remove("empty");
  }
}

/* ---------- 6. Shuffle (guaranteed solvable) ----------
   Instead of randomly permuting values (which can produce
   unsolvable states), we perform N random valid moves
   starting from the solved position. */
function shuffleBoard(movesToMake = 150) {
  tiles = getSolvedState();
  emptyIndex = tiles.length - 1;

  for (let m = 0; m < movesToMake; m++) {
    const neighbors = getNeighborIndices(emptyIndex);
    const randomNeighbor =
      neighbors[Math.floor(Math.random() * neighbors.length)];
    // Slide that neighbor into the empty slot
    tiles[emptyIndex] = tiles[randomNeighbor];
    tiles[randomNeighbor] = EMPTY;
    emptyIndex = randomNeighbor;
  }

  moveCount = 0;
  moveCountEl.textContent = moveCount;
  winMsg.classList.add("hidden");
  buildBoardDOM();
}

function getNeighborIndices(index) {
  const row = Math.floor(index / SIZE),
    col = index % SIZE;
  const neighbors = [];
  if (row > 0) neighbors.push(index - SIZE); // up
  if (row < SIZE - 1) neighbors.push(index + SIZE); // down
  if (col > 0) neighbors.push(index - 1); // left
  if (col < SIZE - 1) neighbors.push(index + 1); // right
  return neighbors;
}

/* ---------- 7. Win check ---------- */
function checkWin() {
  const solved = getSolvedState();
  const isSolved = tiles.every((val, i) => val === solved[i]);

  if (isSolved) {
    winMsg.classList.remove("hidden");
    tileElements.forEach((tile) => {
      if (!tile.classList.contains("empty")) tile.classList.add("solved");
    });
  }
}

/* ---------- Init ---------- */
shuffleBtn.addEventListener("click", () => shuffleBoard());
shuffleBoard(); // start with a shuffled, solvable board
