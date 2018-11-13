const shuffle = require('lodash.shuffle');

/* this script generates a strip of 6 UK bingo cards.
the rules that each card/strip must conform to can be found here:
https://en.wikipedia.org/wiki/Bingo_(United_Kingdom)#Strips_of_6_tickets */

const generateStrip = () => {

  const generateCard = () => {

    const generateRow = () => {
      /* create a row with 5 number placeholders ('x')
      and 4 'blank' spaces ('_') then shuffle */
      const row = [];
      for (let i = 0; i < 5; i++) row.push('x')
      for (let i = 0; i < 4; i++) row.push('_')
      return shuffle(row)
    }
  
    const validateCard = (card) => {
      // check that every column in the card has at least one 'x'
      for (let colIndex = 0; colIndex < 9; colIndex++) {
        const column = [card[0][colIndex], card[1][colIndex], card[2][colIndex]]
        if (column.every(x => x === '_')) return false;
      }
      return true;
    }
  
    // create a new card composed of 3 rows
    const card = Array.from({length: 3}, x => generateRow())
  
    // only leep the card if it passes the validation test
    return validateCard(card) ? card : generateCard();
  };

  const addCard = (strip, cardIndex) => {
    strip.push(generateCard()) // add a new card to the strip

    /* if it passes the validation, then keep it;
    otherwise, discard it, and add another one*/
    if (validateStrip(strip, cardIndex)) return strip
    else {
      strip.pop()
      return addCard(strip, cardIndex)
    }
  }
  
  const validateStrip = (strip, cardIndex) => {

    // function that returns the whole column, regardless of strip length
    const getColumn = (strip, colIndex) => {
      const column = [];
      for (let cardIndex = 0; cardIndex < strip.length; cardIndex++) {
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
          column.push(strip[cardIndex][rowIndex][colIndex])
        }
      }
      return column;
    };

    // checks that the column conforms to the min/max number of numbers
    const validateColumn = (column, min, max) => {
      if (column.filter(x => x === 'x').length < min) return false
      if (column.filter(x => x === 'x').length > max) return false
    };

    /* a valid strip of bingo cards has 9 numbers in the first column,
    11 numbers in the last column, and 10 numbers in all of the columns
    in between.
    similarly, each column in a card must have at least one number.
    the algorithm checks, as each card is added to the strip, that these
    min/max number of numbers per column is adhered to */

    let colMinMax = {};

    if (cardIndex === 0) {
      colMinMax.col0 = {min: 1, max: 3}
      colMinMax.col1_7 = {min: 1, max: 3}
      colMinMax.col8 = {min: 1, max: 3}
    }
    else if (cardIndex === 1) {
      colMinMax.col0 = {min: 2, max: 5}
      colMinMax.col1_7 = {min: 2, max: 6}
      colMinMax.col8 = {min: 2, max: 6}
    }
    else if (cardIndex === 2) {
      colMinMax.col0 = {min: 3, max: 6}
      colMinMax.col1_7 = {min: 3, max: 7}
      colMinMax.col8 = {min: 3, max: 8}
    }
    else if (cardIndex === 3) {
      colMinMax.col0 = {min: 4, max: 7}
      colMinMax.col1_7 = {min: 4, max: 8}
      colMinMax.col8 = {min: 5, max: 9}
    }
    else if (cardIndex === 4) {
      colMinMax.col0 = {min: 6, max: 8}
      colMinMax.col1_7 = {min: 7, max: 9}
      colMinMax.col8 = {min: 8, max: 10}
    }
    else if (cardIndex === 5) {
      colMinMax.col0 = {min: 9, max: 9}
      colMinMax.col1_7 = {min: 10, max: 10}
      colMinMax.col8 = {min: 11, max: 11}
    }

    for (let colIndex = 0; colIndex < 9; colIndex++) {
      const { min, max } = (colIndex === 0)
      ? colMinMax.col0
      : (colIndex === 8)
      ? colMinMax.col8
      : colMinMax.col1_7

      // if the strip doesn't pass the validation test then return false
      if (validateColumn(getColumn(strip, colIndex), min, max) === false) return false
    }

    // otherwise, if the whole strip is valid, return true
    return true;
  };

  const populateStrip = strip => {
    for (let colIndex = 0; colIndex < 9; colIndex++) {

      // n represents the number of numbers to add to the column
      const n = (colIndex === 0) ? 9 : (colIndex === 8) ? 11 : 10

      /* this generates a shuffled array of numbers, of length n,
      conforming to the rules of bingo card number placement */
      const numbers = shuffle(
        Array.from(
          {length: n},
          (_, i) => (colIndex * 10) + ((colIndex === 0) ? (i + 1) : i)
        )
      )
      /* for each card in the strip, and for each row in the card,
      wherever there's a 'x' placeholder, replace it with a number */
      for (let cardIndex = 0; cardIndex < 6; cardIndex++) {
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
          if (strip[cardIndex][rowIndex][colIndex] === 'x') {
            strip[cardIndex][rowIndex][colIndex] = numbers.pop();
          }
        }
      }
    }
    return strip;
  };
  
  let strip = [];

  // add 6 cards to the strip (validation occurs in situ)
  for (let cardIndex = 0; cardIndex < 6; cardIndex++) {
    strip = addCard(strip, cardIndex)
  }

  // populate the stirp by replacing the 'x' placeholders with numbers
  return populateStrip(strip)
};

console.log(generateStrip())

module.exports = generateStrip;