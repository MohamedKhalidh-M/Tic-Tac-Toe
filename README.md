🎮 Tic-Tac-Toe Game

A modern, interactive web-based Tic-Tac-Toe game featuring Player vs Player and Player vs AI modes, three AI difficulty levels, and a visually appealing gradient UI.

✨ Features
🎯 Game Modes

Player vs Player (PvP) – Play against a friend on the same device

Player vs Computer (PvC) – Challenge an AI opponent

🤖 AI Difficulty Levels

Easy – Random moves (beginner-friendly)

Medium – Smart but beatable gameplay

Hard (Impossible) – Uses the Minimax algorithm, making the AI nearly unbeatable

🎨 User Interface

Modern purple–pink gradient theme

Glassmorphism effects

Smooth animations and transitions

Responsive design (mobile, tablet, desktop)

Winning combination highlighting

Animated victory modal

📊 Game Features

Real-time score tracking

Win / draw statistics

Current player turn indicator

Player highlighting

Keyboard shortcut support

Animated win celebrations

⌨️ Keyboard Shortcuts
Key	Action
1–9	Select board cells
R	Restart current game
M	Return to main menu

Cell layout reference:

1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9

🚀 Getting Started
Prerequisites

Any modern web browser
(Chrome, Firefox, Safari, Edge)

How to Play

Open the game

Open index.html in your browser

Or visit the live demo (if deployed)

Select Game Mode

Player vs Player

Player vs Computer

Choose Difficulty (PvC only)

Easy

Medium

Hard

Play the Game

Player X always goes first

Click an empty cell to place your mark

First to get 3 in a row wins

🏆 Win Conditions

3 symbols in a row:

Horizontal

Vertical

Diagonal

If all cells are filled with no winner → Draw

🧠 AI Algorithm (Hard Mode)

The Hard AI uses the Minimax Algorithm, which:

Evaluates all possible moves

Chooses the optimal move every time

Makes the AI almost impossible to beat

Minimax Scoring

+10 → AI wins

-10 → Player wins

0 → Draw

💡 Best possible result against Hard AI: Draw

📁 Project Structure
PRODIGY_WD_TASK3/
│
├── index.html      # Main HTML structure
├── styles.css      # Styling and animations
├── script.js       # Game logic and AI
└── README.md       # Project documentation

🛠️ Technologies Used

HTML5 – Semantic structure

CSS3 – Gradients, animations, flexbox

JavaScript (ES6+) – Game logic & AI

Font Awesome – Icons

🎨 Design Highlights
Color Palette

Primary Gradient: #667eea → #764ba2 → #f093fb

Player X: Cyan #06b6d4

Player O: Pink #ec4899

Accent: Gold #fbbf24

Animations

Fade-in transitions

Cell hover scaling

Winning cell highlights

Modal slide-in effects

Button press animations

📊 Score Tracking

Tracks:

Player X wins

Player O / AI wins

Total games played

Draws

Scores persist during the session and can be reset anytime.

🎯 Winning Patterns

The game checks 8 possible combinations:

Rows

[0,1,2], [3,4,5], [6,7,8]

Columns

[0,3,6], [1,4,7], [2,5,8]

Diagonals

[0,4,8], [2,4,6]

💡 Tips to Beat the Hard AI

Control the center (cell 5)

Create forks

Block early threats

Prefer corners over edges

Plan 2–3 moves ahead

🌟 Future Enhancements

Online multiplayer

Custom player names & avatars

Sound effects and music

Tournament mode

AI personality variations

Undo / Redo moves

Game history replay

Leaderboard system

Theme customization

Larger boards (4×4, 5×5)

📱 Browser Compatibility

✅ Chrome 90+

✅ Firefox 88+

✅ Safari 14+

✅ Edge 90+

✅ Opera 76+

🤝 Contributing

This project is part of the PRODIGY InfoTech Web Development Internship.

Contributions, issues, and feature requests are welcome.

📄 License

This project is open-source and available for educational purposes.

👨‍💻 Author

Created with ❤️ as part of PRODIGY_WD_TASK3

🎓 Learning Outcomes

Game state management

AI logic using Minimax

DOM manipulation

Event handling (mouse & keyboard)

Responsive UI design

CSS animations

Clean and modular JavaScript
