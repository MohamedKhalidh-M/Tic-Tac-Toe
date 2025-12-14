// Game State Variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameMode = ''; // 'pvp' or 'pvc'
let difficulty = ''; // 'easy', 'medium', 'hard'
let gameActive = true;
let scores = { X: 0, O: 0, draws: 0, games: 0 };

// Winning combinations
const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

// DOM Elements
const modeSelection = document.getElementById('modeSelection');
const difficultySelection = document.getElementById('difficultySelection');
const gameContainer = document.getElementById('gameContainer');
const cells = document.querySelectorAll('.cell');
const winModal = document.getElementById('winModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalIcon = document.getElementById('modalIcon');

// Buttons
const pvpBtn = document.getElementById('pvpBtn');
const pvcBtn = document.getElementById('pvcBtn');
const diffBtns = document.querySelectorAll('.diff-btn');
const backToModeBtn = document.getElementById('backToMode');
const restartBtn = document.getElementById('restartBtn');
const resetBtn = document.getElementById('resetBtn');
const menuBtn = document.getElementById('menuBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const mainMenuBtn = document.getElementById('mainMenuBtn');

// Event Listeners
pvpBtn.addEventListener('click', () => selectMode('pvp'));
pvcBtn.addEventListener('click', () => showDifficultySelection());
diffBtns.forEach(btn => btn.addEventListener('click', selectDifficulty));
backToModeBtn.addEventListener('click', backToModeSelection);
restartBtn.addEventListener('click', restartGame);
resetBtn.addEventListener('click', resetScores);
menuBtn.addEventListener('click', goToMainMenu);
playAgainBtn.addEventListener('click', playAgain);
mainMenuBtn.addEventListener('click', goToMainMenu);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Select Game Mode
function selectMode(mode) {
    gameMode = mode;
    modeSelection.style.display = 'none';
    gameContainer.style.display = 'block';
    
    if (mode === 'pvc') {
        document.getElementById('playerOName').textContent = 'AI';
    } else {
        document.getElementById('playerOName').textContent = 'Player O';
    }
    
    initializeGame();
}

// Show Difficulty Selection
function showDifficultySelection() {
    modeSelection.style.display = 'none';
    difficultySelection.style.display = 'block';
}

// Select Difficulty
function selectDifficulty(e) {
    difficulty = e.currentTarget.dataset.difficulty;
    difficultySelection.style.display = 'none';
    selectMode('pvc');
}

// Back to Mode Selection
function backToModeSelection() {
    difficultySelection.style.display = 'none';
    modeSelection.style.display = 'block';
}

// Initialize Game
function initializeGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    
    cells.forEach(cell => {
        cell.classList.remove('x', 'o', 'winning');
        cell.textContent = '';
    });
    
    updateTurnIndicator();
    updatePlayerHighlight();
}

// Handle Cell Click
function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.dataset.index);
    
    // Check if cell is already filled or game is not active
    if (board[index] !== '' || !gameActive) return;
    
    // Make move
    makeMove(index, currentPlayer);
    
    // Check for win or draw
    if (checkWin(currentPlayer)) {
        endGame(false);
        return;
    }
    
    if (checkDraw()) {
        endGame(true);
        return;
    }
    
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnIndicator();
    updatePlayerHighlight();
    
    // AI turn
    if (gameMode === 'pvc' && currentPlayer === 'O' && gameActive) {
        setTimeout(() => {
            aiMove();
        }, 500);
    }
}

// Make Move
function makeMove(index, player) {
    board[index] = player;
    const cell = cells[index];
    cell.classList.add(player.toLowerCase());
}

// AI Move
function aiMove() {
    let move;
    
    if (difficulty === 'easy') {
        move = getRandomMove();
    } else if (difficulty === 'medium') {
        move = getMediumMove();
    } else {
        move = getBestMove();
    }
    
    if (move !== -1) {
        makeMove(move, 'O');
        
        if (checkWin('O')) {
            endGame(false);
            return;
        }
        
        if (checkDraw()) {
            endGame(true);
            return;
        }
        
        currentPlayer = 'X';
        updateTurnIndicator();
        updatePlayerHighlight();
    }
}

// Get Random Move (Easy AI)
function getRandomMove() {
    const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

// Get Medium Move (Smart but not perfect)
function getMediumMove() {
    // 50% chance to make best move, 50% random
    if (Math.random() < 0.5) {
        return getBestMove();
    } else {
        return getRandomMove();
    }
}

// Get Best Move (Minimax Algorithm - Impossible AI)
function getBestMove() {
    let bestScore = -Infinity;
    let bestMove = -1;
    
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';
            
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    
    return bestMove;
}

// Minimax Algorithm
function minimax(board, depth, isMaximizing) {
    // Check for terminal states
    if (checkWin('O')) return 10 - depth;
    if (checkWin('X')) return depth - 10;
    if (checkDraw()) return 0;
    
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// Check Win
function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

// Check Draw
function checkDraw() {
    return board.every(cell => cell !== '');
}

// Get Winning Combination
function getWinningCombination(player) {
    return winningCombinations.find(combination => {
        return combination.every(index => board[index] === player);
    });
}

// End Game
function endGame(isDraw) {
    gameActive = false;
    scores.games++;
    
    if (isDraw) {
        scores.draws++;
        showModal('It\'s a Draw!', 'Nobody wins this round!', 'fas fa-handshake');
    } else {
        scores[currentPlayer]++;
        const winningCombo = getWinningCombination(currentPlayer);
        
        // Highlight winning cells
        if (winningCombo) {
            winningCombo.forEach(index => {
                cells[index].classList.add('winning');
            });
        }
        
        const playerName = gameMode === 'pvc' && currentPlayer === 'O' ? 'AI' : `Player ${currentPlayer}`;
        showModal(`${playerName} Wins!`, 'Congratulations on your victory!', 'fas fa-trophy');
    }
    
    updateScores();
}

// Show Modal
function showModal(title, message, icon) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalIcon.innerHTML = `<i class="${icon}"></i>`;
    winModal.classList.add('show');
}

// Update Scores
function updateScores() {
    document.getElementById('scoreX').textContent = scores.X;
    document.getElementById('scoreO').textContent = scores.O;
    document.getElementById('gamesPlayed').textContent = scores.games;
    document.getElementById('draws').textContent = scores.draws;
}

// Update Turn Indicator
function updateTurnIndicator() {
    document.getElementById('currentTurn').textContent = currentPlayer;
}

// Update Player Highlight
function updatePlayerHighlight() {
    const playerX = document.getElementById('playerX');
    const playerO = document.getElementById('playerO');
    
    if (currentPlayer === 'X') {
        playerX.classList.add('active');
        playerO.classList.remove('active');
    } else {
        playerX.classList.remove('active');
        playerO.classList.add('active');
    }
}

// Restart Game
function restartGame() {
    winModal.classList.remove('show');
    initializeGame();
}

// Reset Scores
function resetScores() {
    scores = { X: 0, O: 0, draws: 0, games: 0 };
    updateScores();
    restartGame();
}

// Go to Main Menu
function goToMainMenu() {
    winModal.classList.remove('show');
    gameContainer.style.display = 'none';
    difficultySelection.style.display = 'none';
    modeSelection.style.display = 'block';
    
    // Reset everything
    scores = { X: 0, O: 0, draws: 0, games: 0 };
    updateScores();
    gameMode = '';
    difficulty = '';
}

// Play Again
function playAgain() {
    winModal.classList.remove('show');
    initializeGame();
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'R' to restart
    if (e.key === 'r' || e.key === 'R') {
        if (gameContainer.style.display !== 'none') {
            restartGame();
        }
    }
    
    // Press 'M' for main menu
    if (e.key === 'm' || e.key === 'M') {
        if (gameContainer.style.display !== 'none') {
            goToMainMenu();
        }
    }
    
    // Press numbers 1-9 to select cells
    if (e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key) - 1;
        if (gameActive && board[index] === '' && currentPlayer === 'X') {
            cells[index].click();
        }
    }
});

// Initialize
console.log('🎮 Tic-Tac-Toe Game Ready!');
console.log('Keyboard Shortcuts:');
console.log('- Numbers 1-9: Select cells');
console.log('- R: Restart game');
console.log('- M: Main menu');
