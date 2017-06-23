import assert from 'assert';
import {initialState} from '../data.js';
import {checkAnswer, checkLives, sortStat} from '../lib/utils.js';

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
    assert.equal(0, initialState.totalTime);
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

  describe(`Sort statisitcs`, () => {
    it(`Statistics should by sortet by answers and time`, () => {
      assert.deepEqual([{answers: 2, time: 12}, {answers: 1, time: 12}],
          sortStat([{answers: 1, time: 12}, {answers: 2, time: 12}]));
      assert.deepEqual([{answers: 2, time: 12}, {answers: 2, time: 15}],
          sortStat([{answers: 2, time: 15}, {answers: 2, time: 12}]));
      assert.deepEqual([{answers: 5, time: 12}, {answers: 5, time: 18}, {answers: 2, time: 12}, {answers: 2, time: 15}],
          sortStat([{answers: 5, time: 18}, {answers: 2, time: 15}, {answers: 5, time: 12}, {answers: 2, time: 12}]));
    });
  });
});

