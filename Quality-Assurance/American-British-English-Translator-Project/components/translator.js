const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

function swapKeyValuePair(obj) {
  const swapped = {};
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    swapped[obj[key]] = key;
  })

  return swapped;
}

const britishToAmericanSpelling = swapKeyValuePair(americanToBritishSpelling);
const britishToAmericanTitles = swapKeyValuePair(americanToBritishTitles);
const americanEquivalents = swapKeyValuePair(americanOnly);
const britishEquivalents = swapKeyValuePair(britishOnly);

const amerSpellKeys = Object.keys(americanToBritishSpelling);
const amerTitleKeys = Object.keys(americanToBritishTitles);
const amerKeys = Object.keys(americanOnly);
const amerEqKeys = Object.keys(americanEquivalents);

const britSpellKeys = Object.keys(britishToAmericanSpelling);
const britTitleKeys = Object.keys(britishToAmericanTitles);
const britKeys = Object.keys(britishOnly);
const britEqKeys = Object.keys(britishEquivalents);


class Translator {
  americanToBritish(text) {
    const changes = {};
    const words = text.toLowerCase().split(" ");
    const splitText = text.split(" ");
    const n = words.length;

    for (let i = 0; i < n; ++i) {
      if (i < n - 2) {
        let word = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
        let word2 = `${splitText[i]} ${splitText[i + 1]} ${splitText[i + 2]}`;

        if (word.match(/\.$/)) {
          word = word.replace(".", "");
          word2 = word2.replace(".", "");
        }

        if (amerKeys.includes(word)) {
          changes[word2] = americanOnly[word];
        }
        else if (amerEqKeys.includes(word)) {
          changes[word2] = americanEquivalents[word];
        }
      }

      if (i < n - 1) {
        let word = `${words[i]} ${words[i + 1]}`;
        let word2 = `${splitText[i]} ${splitText[i + 1]}`;


        if (word.match(/\.$/)) {
          word = word.replace(".", "");
          word2 = word2.replace(".", "");
        }

        if (amerKeys.includes(word)) {
          changes[word2] = americanOnly[word];
        }
        else if (amerEqKeys.includes(word)) {
          changes[word2] = americanEquivalents[word];
        }
      }

      let word = words[i];
      let word2 = splitText[i];

      if (i === n - 1 && word.match(/\.$/)) {
        word = word.replace(".", "");
        word2 = word2.replace(".", "");
      }

      if (amerKeys.includes(word)) {
        changes[word2] = americanOnly[word];
      }
      else if (amerEqKeys.includes(word)) {
        changes[word2] = americanEquivalents[word];
      }
      else if (amerSpellKeys.includes(word)) {
        changes[word2] = americanToBritishSpelling[word];
      }
      else if (amerTitleKeys.includes(word)) {
        let title = americanToBritishTitles[word];
        title = title.replace(title[0], title[0].toUpperCase());
        changes[word2] = title;
      }
    }

    let output = text;

    const changeKeys = Object.keys(changes);

    changeKeys.forEach(change => {
        output = output.replace(change, changes[change]);
    })

    // let splitText = text.split(" ");
    let splitOutput = output.split(" ");    

    // output = splitOutput.join(" ");

    splitOutput.forEach((outWord, outIdx) => {
      const match = outWord.match(/\d{1,2}:\d{2}/);
      if(match) {
        outWord = match.join("").split(":").join(".");
        splitOutput[outIdx] = outWord;
      }
      if(!splitText.includes(outWord)) {
        outWord = `<span class="highlight">${outWord}</span>`;
        splitOutput[outIdx] = outWord;
      }
    })

    output = splitOutput.join(" ");
    return output;
  }



  britishToAmerican(text) {
    const changes = {};
    const words = text.toLowerCase().split(" ");
    const splitText = text.split(" ");
    const n = words.length;

    for (let i = 0; i < n; ++i) {
      if (i < n - 2) {
        let word = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
        let word2 = `${splitText[i]} ${splitText[i + 1]} ${splitText[i + 2]}`;

        if (word.match(/\.$/)) {
          word = word.replace(".", "");
        }

        if (amerKeys.includes(word)) {
          changes[word2] = britishOnly[word];
        }
        else if (amerEqKeys.includes(word)) {
          changes[word2] = britishEquivalents[word];
        }
      }

      if (i < n - 1) {
        let word = `${words[i]} ${words[i + 1]}`;
        let word2 = `${splitText[i]} ${splitText[i + 1]}`;

        if (word.match(/\.$/)) {
          word = word.replace(".", "");
        }

        if (amerKeys.includes(word)) {
          changes[word2] = britishOnly[word];
        }
        else if (amerEqKeys.includes(word)) {
          changes[word2] = britishEquivalents[word];
        }
      }

      let word = words[i];
      let word2 = splitText[i];

      if (i === n - 1 && word.match(/\.$/)) {
        word = word.replace(".", "");
      }

      if (britKeys.includes(word)) {
        changes[word2] = britishOnly[word];
      }
      else if (britEqKeys.includes(word)) {
        changes[word2] = britishEquivalents[word];
      }
      else if (britSpellKeys.includes(word)) {
        changes[word2] = britishToAmericanSpelling[word];
      }
      else if (britTitleKeys.includes(word)) {
        let title = britishToAmericanTitles[word];
        title = title.replace(title[0], title[0].toUpperCase());
        changes[word2] = title;
      }
    }

    let output = text;

    const changeKeys = Object.keys(changes);

    changeKeys.forEach(change => {
      output = output.replace(change, changes[change]);
    })

    let splitOutput = output.split(" ");    
    // let splitText = text.split(" ");

    // output = splitOutput.join(" ");

    splitOutput.forEach((outWord, outIdx) => {
      const match = outWord.match(/\d{1,2}\.\d{2}/);
      if(match) {
        outWord = match.join("").split(".").join(":");
        splitOutput[outIdx] = outWord;
      }
      if(!splitText.includes(outWord)) {
        outWord = `<span class="highlight">${outWord}</span>`;
        splitOutput[outIdx] = outWord;
      }
    })

    output = splitOutput.join(" ");
    return output;
  }

  translate(text, locale) {
    if (locale === 'american-to-british') {
      return this.americanToBritish(text);
    }
    else {
      return this.britishToAmerican(text);
    }
  }
}

module.exports = Translator;