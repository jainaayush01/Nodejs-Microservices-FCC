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
    // let splitOutput = output.split(" ");

    const changeKeys = Object.keys(changes);

    changeKeys.forEach(change => {
      if (amerTitleKeys.includes(change)) {
        let amerTitle = change;
        let britTitle = americanToBritishTitles[amerTitle];
        britTitle = britTitle.replace(britTitle[0], britTitle[0].toUpperCase());

        output = output.replace(amerTitle, britTitle);
        // splitOutput[amerTitle] = britTitle;

        amerTitle = amerTitle.replace(amerTitle[0], amerTitle[0].toUpperCase());
        output = output.replace(amerTitle, britTitle);
        // splitOutput[amerTitle] = britTitle;      
      }
      else {
        let outChange = changes[change];
        output = output.replace(change, changes[change]);
        // splitOutput[change] = changes[change];
        
        change = change.replace(change[0], change[0].toUpperCase());
        changes[change] = outChange.replace(outChange[0], outChange[0].toUpperCase());

        output = output.replace(change, changes[change]);
        // splitOutput[change] = changes[change];
      }
    })
    
    let splitOutput = output.split(" ");    
    let splitText = text.split(" ");

    splitOutput.forEach((outWord, outIdx) => {
      let match = splitText.find((inWord, inIdx) => inWord.toLowerCase() === outWord && inIdx >= outIdx);

      if(match) {
        if(match[0].toUpperCase === match[0]) {
          outWord = outWord.replace(outWord[0], outWord[0].toUpperCase());
        }
        splitOutput[outIdx] = outWord;
      }
    })

    console.log({splitOutput});
    output = splitOutput.join(" ");

    console.log({output});
    splitOutput.forEach((outWord, outIdx) => {
      if(!splitText.includes(outWord)) {
        outWord = `<span class="highlight">${outWord}</span>`;
        splitOutput[outIdx] = outWord;
      }
    })

    output = splitOutput.join(" ");
    return output;
  }

  britishToAmerican(text) {
    return text;
  }

  translate(text, locale) {
    if (locale === 'american-to-british') {
      return this.americanToBritish(text);
    }
    else {
      return this.britishToAmerican(text);
    }
  }

  // translate(text, locale) {
  //   let translation = "";
  //   // let lines = text.split('\n');
  //   // for (let i = 0; i < lines.length; ++i, translation += "\n") {
  //   // let words = lines[i].split(' ');
  //   let words = text.split(' ');
  //   for (let j = 0; j < words.length; ++j, translation += " ") {
  //     let word = words[j];
  //     if (locale === 'american-to-british') {
  //       if (americanToBritishTitles.hasOwnProperty(word)) {
  //         translation += '<span class="highlight">' + americanToBritishTitles[word] + '</span>';
  //       }
  //       else if (americanToBritishSpelling.hasOwnProperty(word)) {
  //         translation += '<span class="highlight">' + americanToBritishSpelling[word] + '</span>';
  //       }
  //       else if (americanOnly.hasOwnProperty(word)) {
  //         translation += '<span class="highlight">' + americanOnly[word] + '</span>';
  //       }
  //       else if (word.match(':')) {
  //         let time = word.split(':');
  //         translation += '<span class="highlight">' + time[0] + '.' + time[1] + '</span>';
  //       }
  //       else {
  //         translation += word;
  //       }
  //     }
  //     else {
  //       translation += word;
  //     }
  //     if (words.length === j - 1) break;
  //   }
  //   // }
  //   return translation;
  // }
}

module.exports = Translator;