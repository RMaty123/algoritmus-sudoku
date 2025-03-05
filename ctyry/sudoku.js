// Znaky pro sudoku
const symbols = ['A', 'B', 'C', 'D'];

// Generování mřížky Sudoku
const grid = document.getElementById('sudoku-grid');
const sudoku = Array(4).fill().map(() => Array(4).fill(''));

// Vytvoření mřížky s obrázky
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    const img = document.createElement('img');
    img.dataset.row = i;
    img.dataset.col = j;
    img.addEventListener('click', () => handleInput(i, j));
    cell.appendChild(img);
    grid.appendChild(cell);
  }
}

// Zpracování vstupu - výběr obrázku
function handleInput(row, col) {
  const currentSymbol = sudoku[row][col];
  let nextSymbolIndex = symbols.indexOf(currentSymbol) + 1;
  if (nextSymbolIndex >= symbols.length) nextSymbolIndex = 0;

  const newSymbol = symbols[nextSymbolIndex];
  sudoku[row][col] = newSymbol;
  
  // Aktualizace obrázku
  const img = document.querySelector(`img[data-row="${row}"][data-col="${col}"]`);
  img.src = `img/${newSymbol.toLowerCase()}.png`; // Načte obrázek z adresáře 'img'
}

// Kontrola, jestli je hodnota platná
function isValid(row, col, value) {
  for (let i = 0; i < 4; i++) {
    if (sudoku[row][i] === value || sudoku[i][col] === value) return false;
  }
  const boxRow = Math.floor(row / 2) * 2;
  const boxCol = Math.floor(col / 2) * 2;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      if (sudoku[boxRow + i][boxCol + j] === value) return false;
    }
  }
  return true;
}

// Hlavní funkce pro vyřešení Sudoku
function solveSudoku() {
  if (solve(0, 0)) {
    renderGrid();
  } else {
    alert('Sudoku nemá řešení!');
  }
}

// Rekurzivní řešitel
function solve(row, col) {
  if (row === 4) return true;
  if (col === 4) return solve(row + 1, 0);
  if (sudoku[row][col] !== '') return solve(row, col + 1);

  for (const value of symbols) {
    if (isValid(row, col, value)) {
      sudoku[row][col] = value;
      if (solve(row, col + 1)) return true;
      sudoku[row][col] = '';
    }
  }
  return false;
}

// Zobrazení výsledku v mřížce
function renderGrid() {
  document.querySelectorAll('.cell img').forEach((img) => {
    const row = img.dataset.row;
    const col = img.dataset.col;
    const symbol = sudoku[row][col];
    img.src = `img/${symbol.toLowerCase()}.png`;
  });
}
