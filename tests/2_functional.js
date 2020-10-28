/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chai = require("chai");
const assert = chai.assert;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let Solver;

suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load sudoku solver then run tests
    Solver = require('../public/sudoku-solver.js');
  });

  suite('Text area and sudoku grid update automatically', () => {
    // Entering a valid number in the text area populates 
    // the correct cell in the sudoku grid with that number
    test('Valid number in text area populates correct cell in grid', done => {
      const inputs = [...document.querySelectorAll('.sudoku-input')];
      const solution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
      const solutionArray = solution.split('');

      //
      document.querySelector('#text-input').value = solution;
      document.querySelector('#solve-button').click();

      assert.equal(
        inputs[0].value,
        solutionArray[0]
      );

      assert.equal(
        inputs[80].value,
        solutionArray[80]
      );

      done();
    });

    // Entering a valid number in the grid automatically updates
    // the puzzle string in the text area
    test('Valid number in grid updates the puzzle string in the text area', done => {
      const inputs = [...document.querySelectorAll('.sudoku-input')];
      const solutionIncomplete = '.35762984946381257728459613694517832812936745357824196473298561581673429269145378';
      
      //
      document.querySelector('#text-input').value = solutionIncomplete;
      inputs[0].value = '1';
      inputs[0].dispatchEvent(new window.Event('change'));

      const solution = document.querySelector('#text-input').value;
      const solutionArray = solution.split('');

      assert.equal(
        inputs[0].value,
        solutionArray[0]
      );

      done();
    });
  });

  suite('Clear and solve buttons', () => {
    // Pressing the "Clear" button clears the sudoku 
    // grid and the text area
    test('Function clearInput()', done => {
      const inputs = [...document.querySelectorAll('.sudoku-input')];
      const solution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
      const solutionArray = solution.split('');

      //
      document.querySelector('#text-input').value = solution;
      document.querySelector('#solve-button').click();

      //
      document.querySelector('#clear-button').click();

      assert.equal(
        document.querySelector('#text-input').value,
        ''
      );

      inputs.map(input => {
        assert.equal(
          input.value,
          ''
        );
      })

      done();
    });

    // Pressing the "Solve" button solves the puzzle and
    // fills in the grid with the solution
    test('Function showSolution(solve(input))', done => {
      const inputs = [...document.querySelectorAll('.sudoku-input')];
      const solution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
      const solutionArray = solution.split('');

      //
      document.querySelector('#text-input').value = solution;
      document.querySelector('#solve-button').click();

      solutionArray.map((value, key) => {
        assert.equal(
          inputs[key].value,
          value
        );
      });

      done();
    });
  });
});

