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
    const input = text.toLowerCase();
    const words = input.split(" ");
    const n = words.length;

    for (let i = 0; i < n; ++i) {
      if (i < n - 2) {
        let word = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;

        if (word.match(/\.$/)) {
          word = word.replace(".", "");
        }

        if (amerKeys.includes(word)) {
          changes[word] = americanOnly[word];
        }
        else if (amerEqKeys.includes(word)) {
          changes[word] = americanEquivalents[word];
        }
      }

      if (i < n - 1) {
        let word = `${words[i]} ${words[i + 1]}`;

        if (word.match(/\.$/)) {
          word = word.replace(".", "");
        }

        if (amerKeys.includes(word)) {
          changes[word] = americanOnly[word];
        }
        else if (amerEqKeys.includes(word)) {
          changes[word] = americanEquivalents[word];
        }
      }

      let word = words[i];

      if (i === n - 1 && word.match(/\.$/)) {
        word = word.replace(".", "");
      }

      if (amerKeys.includes(word)) {
        changes[word] = americanOnly[word];
      }
      else if (amerEqKeys.includes(word)) {
        changes[word] = americanEquivalents[word];
      }
      else if (amerSpellKeys.includes(word)) {
        changes[word] = americanToBritishSpelling[word];
      }
      else if (amerTitleKeys.includes(word)) {
        changes[word] = americanToBritishTitles[word];
      }
    }
    console.log(changes);

    let output = text;

    const changeKeys = Object.keys(changes);

    changeKeys.forEach(change => {
      if (amerTitleKeys.includes(change)) {
        let amerTitle = change;
        let britTitle = americanToBritishTitles[amerTitle];
        britTitle = britTitle.replace(britTitle[0], britTitle[0].toUpperCase());

        output = output.replace(amerTitle, britTitle);

        amerTitle = amerTitle.replace(amerTitle[0], amerTitle[0].toUpperCase());
        output = output.replace(amerTitle, britTitle);
      }
      else {
        let outChange = changes[change];
        output = output.replace(change, changes[change]);
        
        change = change.replace(change[0], change[0].toUpperCase());
        changes[change] = outChange.replace(outChange[0], outChange[0].toUpperCase());

        output = output.replace(change, changes[change]);
      }
    })

    let splitOutput = output.split(" ");    
    let splitText = text.split(" ");

    console.log({splitOutput});
    output = splitOutput.join(" ");
    console.log({output});

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
    const input = text.toLowerCase();
    const words = input.split(" ");
    const n = words.length;

    for (let i = 0; i < n; ++i) {
      if (i < n - 2) {
        let word = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;

        if (word.match(/\.$/)) {
          word = word.replace(".", "");
        }

        if (amerKeys.includes(word)) {
          changes[word] = britishOnly[word];
        }
        else if (amerEqKeys.includes(word)) {
          changes[word] = britishEquivalents[word];
        }
      }

      if (i < n - 1) {
        let word = `${words[i]} ${words[i + 1]}`;

        if (word.match(/\.$/)) {
          word = word.replace(".", "");
        }

        if (amerKeys.includes(word)) {
          changes[word] = britishOnly[word];
        }
        else if (amerEqKeys.includes(word)) {
          changes[word] = britishEquivalents[word];
        }
      }

      let word = words[i];

      if (i === n - 1 && word.match(/\.$/)) {
        word = word.replace(".", "");
      }

      if (britKeys.includes(word)) {
        changes[word] = britishOnly[word];
      }
      else if (britEqKeys.includes(word)) {
        changes[word] = britishEquivalents[word];
      }
      else if (britSpellKeys.includes(word)) {
        changes[word] = britishToAmericanSpelling[word];
      }
      else if (britTitleKeys.includes(word)) {
        changes[word] = britishToAmericanTitles[word];
      }
    }
    console.log(changes);

    let output = text;

    const changeKeys = Object.keys(changes);

    changeKeys.forEach(change => {
      if (britTitleKeys.includes(change)) {
        let britTitle = change;
        let amerTitle = americanToBritishTitles[britTitle];
        amerTitle = amerTitle.replace(amerTitle[0], amerTitle[0].toUpperCase());

        output = output.replace(britTitle, amerTitle);

        britTitle = britTitle.replace(britTitle[0], britTitle[0].toUpperCase());
        output = output.replace(britTitle, britTitle);
      }
      else {
        let outChange = changes[change];
        output = output.replace(change, changes[change]);
        
        change = change.replace(change[0], change[0].toUpperCase());
        changes[change] = outChange.replace(outChange[0], outChange[0].toUpperCase());

        output = output.replace(change, changes[change]);
      }
    })

    let splitOutput = output.split(" ");    
    let splitText = text.split(" ");

    console.log({splitOutput});
    output = splitOutput.join(" ");
    console.log({output});

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