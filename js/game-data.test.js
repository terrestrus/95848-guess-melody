import assert from 'assert';
import {initialState} from '../js/data.js';
import {checkAnswer, checkLives} from '../js/utils.js';

describe(`The number of questions`, () => {
  it(`should be 10 questions in the game`, () => {
    assert.equal(10, initialState.numberOfQuestions);
  });
  it(`the number of questions can't be negative`, () => {
    assert.ok(initialState.numberOfQuestions >= 0);
  });
});

describe(`Total game time`, () => {
  it(`total time of game should be 2 minutes`, () => {
    assert.equal(120, initialState.totalTime);
  });
});

describe(`Player answers in 'one of three' game`, () => {
  it(`answer should be right or wrong`, () => {
    assert.equal(true, checkAnswer([true, true, true, true]));
    assert.equal(false, checkAnswer([false, true, true, true]));
    assert.equal(false, checkAnswer([false, false, true, true]));
    assert.equal(false, checkAnswer([false, true, true, false]));
  });
});

describe(`Check lives`, () => {
  it(`Player should have lives to play`, () => {
    assert.equal(true, checkLives(2));
    assert.equal(false, checkLives(0));
  });
});

