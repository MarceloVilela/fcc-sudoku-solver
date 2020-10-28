const textArea = document.getElementById('text-input');
const inputs = [...document.querySelectorAll('.sudoku-input')];
const gridDimension = 9;
// import { puzzlesAndSolutions } from './puzzle-strings.js';

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
});

function validateLength(text) {
  const pieces = text.split('');

  if (pieces.length != 81) {
    return false;
  }

  return true;
}

function validatePuzzle(data) {

  for (var row = 0; row < gridDimension; row++) {

    data[row].sort();

    for (var col = 0; col < gridDimension; col++) {

      var value = data[row][col], next_value = data[row][col + 1];

      if (value !== '.') {
        // check if value exists and is a valid number
        if (!(value && value > 0 && value < 10)) {
          return false;
        }

        // check if numbers are unique
        if (col !== 8 && value === next_value) {
          return false;
        }
      }

    }
  }
  return true;
};

function formatTextAsMultidimensionalArray(text) {
  const pieces = text.split('');

  let multidimensionalArray = [];
  for (let rowIndex = 0; rowIndex < gridDimension; rowIndex++) {
    const beginPosition = Number(rowIndex * gridDimension);
    const endPosition = Number(rowIndex * gridDimension) + Number(gridDimension);
    const rowData = pieces.slice(beginPosition, endPosition);
    multidimensionalArray.push(rowData);
  }

  return multidimensionalArray;
}

function errorInPuzzleString(text) {

  if (!validateLength(text)) {
    return 'Error: Expected puzzle to be 81 characters long.';
  }

  const multidimensionalArray = formatTextAsMultidimensionalArray(text);
  if (!validatePuzzle(multidimensionalArray)) {
    return 'Error: Invalid puzzles';
  }

  return '';
}

function addOnGrid(text, valueToAdd, position) {
  text = String(text);
  valueToAdd = String(valueToAdd);

  const getTextAreaValueUpdated = (digit) => {
    const textAreaAsArray = text.length === 81
      ? text.split('')
      : ''.padEnd('81', '.').split('');
    textAreaAsArray[position - 1] = digit;
    return textAreaAsArray.join('');
  }

  const match = valueToAdd.match(/^[1-9]{1}$/);
  if (match === null || valueToAdd.length !== 1) {
    return '';
  }

  const textAreaValueUpdated = getTextAreaValueUpdated(valueToAdd);

  return textAreaValueUpdated;
}

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  /*
    clicking the "Solve" button
  */
  function treatTextAreaErrors() {
    var errorMsg = errorInPuzzleString(textArea.value);
    document.getElementById('error-msg').textContent = errorMsg;
  }

  function applyTextAreaToCells() {
    const pieces = textArea.value.split('');
    inputs.map((input, key) => {
      if (pieces[key] !== '.') {
        input.value = pieces[key];
      }
    })
  }

  function handleSolveButton() {
    treatTextAreaErrors();
    applyTextAreaToCells();
  }
  document.querySelector('#solve-button').addEventListener('click', handleSolveButton);

  /*
    clicking the "Clear" button
  */
  function handleClearButton() {
    textArea.value = '';
    inputs.forEach(input => input.value = '');
  }
  document.querySelector('#clear-button').addEventListener('click', handleClearButton);

  /*
    number is entered in the sudoku grid
  */
  function successOnCellChange(textAreaValueUpdated) {
    textArea.value = textAreaValueUpdated;
  }

  function errorOnCellChange() {
    input.value = '';
    document.getElementById('error-msg').textContent = 'Invalid characters (anything other than "1-9") are not accepted';
    return;
  }

  function formatCellAsPosition(id) {
    const rowLetterToNumber = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8 };
    const [rowLetter, columnNumber] = id.split('');
    const position = Number(rowLetterToNumber[rowLetter] * 9) + Number(columnNumber);
    return position;
  }

  function handleCellChange(event) {
    const element = event.target;

    const position = formatCellAsPosition(element.getAttribute('id'));

    const textAreaValueUpdated = addOnGrid(textArea.value, element.value, position);

    if (!textAreaValueUpdated) {
      errorOnCellChange();
    }
    else {
      successOnCellChange(textAreaValueUpdated);
    }
  }

  inputs.forEach(input => {
    input.addEventListener('change', (event) => handleCellChange(event));
  })


  module.exports = {
    errorInPuzzleString,
    addOnGrid,
    formatTextAsMultidimensionalArray
  }
} catch (e) { }
