# 15 Puzzle Game (Game of 15)

A browser-based sliding tile puzzle built with **HTML, CSS, and JavaScript**, using direct DOM manipulation to render and update the board — created as part of a Full Stack Web Development case study.

## 🔗 Live Demo
[Play it here](https://dr2gonv1mp1re.github.io/15-PUZZLE-GAME-DOM/) <!-- update this link once GitHub Pages is live -->

## 📖 Problem Statement
Design a web page for the Game of 15 — a 4×4 board with 15 numbered tiles and one empty slot. Any tile adjacent to the empty slot can be moved into it by clicking. The goal is to arrange the tiles in sequential order using the DOM and click events.

## ✨ Features
- 4×4 board with tiles shuffled into a **guaranteed-solvable** random start position
- Click-to-move tiles, restricted to valid adjacent moves only
- Live move counter
- Shuffle button to restart with a new puzzle
- Win detection with a success message and highlighted tiles
- Responsive layout for mobile screens
- Animated floating "space" background (parallax star layers)

## 🛠️ Tech Stack
- **HTML5** — page structure
- **CSS3** — styling, responsive grid layout, animations
- **JavaScript (Vanilla, DOM API)** — game logic and dynamic rendering, no libraries/frameworks used

## 🧠 DOM Concepts Used
- `document.createElement()` and `appendChild()` to build the board dynamically (no hardcoded tiles in HTML)
- `addEventListener('click', ...)` for tile interaction
- `textContent` and `classList` updates for efficient re-rendering (only the two swapped tiles are updated per move, not the whole board)
- Array-based state model synced with the DOM via a flat 16-element array

## 📂 File Structure
```
15-PUZZLE-GAME-DOM/
├── index.html      # Page structure
├── style.css        # Styling and animations
├── script.js         # Game logic and DOM manipulation
└── README.md      # Project documentation
```

## ▶️ How to Run Locally
1. Clone or download this repository
2. Open `index.html` directly in any browser — no build step or server required

## 🎮 How to Play
1. Click **Shuffle** to start a new game
2. Click any tile adjacent to the empty slot to slide it
3. Arrange all tiles from 1–15 in order to win

## 👤 Author
Harini N S
B.Tech CSE, SRM Institute of Science and Technology, Trichy
