const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
  let translator = new Translator();
  let text, output;
  suite('Translate using Translator.americanToBritish()', () => {

    test('Translate Mangoes are my favorite fruit.', (done) => {
      text = 'Mangoes are my favorite fruit.';
      output = 'Mangoes are my <span class="highlight">favourite</span> fruit.';

      assert.equal(translator.americanToBritish(text), output);
      done();
    })

    test('Translate I ate yogurt for breakfast.', (done) => {
      text = 'I ate yogurt for breakfast.';
      output = 'I ate <span class="highlight">yoghurt</span> for breakfast.';

      assert.equal(translator.americanToBritish(text), output);
      done();
    })

    test('Translate We had a party at my friend\'s condo.', (done) => {
      text = 'We had a party at my friend\'s condo.';
      output = 'We had a party at my friend\'s <span class="highlight">flat.</span>';

      assert.equal(translator.americanToBritish(text), output);
      done();
    })

    test('Translate Can you toss this in the trashcan for me?', (done) => {
      text = 'Can you toss this in the trashcan for me?';
      output = 'Can you toss this in the <span class="highlight">bin</span> for me?';

      assert.equal(translator.americanToBritish(text), output);
      done();
    })

    test('Translate The parking lot was full.', (done) => {
      text = 'The parking lot was full.';
      output = 'The <span class="highlight">car</span> <span class="highlight">park</span> was full.';

      assert.equal(translator.americanToBritish(text), output);
      done();
    })

    test('Translate Like a high tech Rube Goldberg machine.', (done) => {
      text = 'Like a high tech Rube Goldberg machine.';
      output = 'Like a high tech <span class="highlight">Heath</span> <span class="highlight">Robinson</span> <span class="highlight">device.</span>';

      assert.equal(translator.americanToBritish(text), output);
      done();
    })

    test('Translate To play hooky means to skip class or work.', (done) => {
      text = 'To play hooky means to skip class or work.';
      output = 'To <span class="highlight">bunk</span> <span class="highlight">off</span> means to <span class="highlight">dumpster</span> class or work.';

      assert.equal(translator.americanToBritish(text), output);
      done();
    })

    test('Translate No Mr. Bond, I expect you to die.', (done) => {
      text = 'No Mr. Bond, I expect you to die.';
      output = 'No <span class="highlight">Mr</span> Bond, I expect you to die.';

      assert.equal(translator.americanToBritish(text), output);
      done();
    })

    test('Translate Dr. Grosh will see you now..', (done) => {
      text = 'Dr. Grosh will see you now..';
      output = '<span class="highlight">Dr</span> Grosh will see you now..';

      assert.equal(translator.americanToBritish(text), output);
      done();
    })

    test('Translate Lunch is at 12:15 today.', (done) => {
      text = 'Lunch is at 12:15 today.';
      output = 'Lunch is at <span class="highlight">12.15</span> today.';

      assert.equal(translator.americanToBritish(text), output);
      done();
    })
  })

  suite('Translate using Translator.britishToAmerican()', () => {
    test('Translate We watched the footie match for a while.', (done) => {
      text = 'We watched the footie match for a while.';
      output = 'We watched the <span class="highlight">soccer</span> match for a while.';

      assert.equal(translator.britishToAmerican(text), output);
      done();
    })

    test('Translate Paracetamol takes up to an hour to work.', (done) => {
      text = 'Paracetamol takes up to an hour to work.';
      output = '<span class="highlight">Tylenol</span> takes up to an hour to work.';

      assert.equal(translator.britishToAmerican(text), output);
      done();
    })

    test('Translate First, caramelise the onions.', (done) => {
      text = 'First, caramelise the onions.';
      output = 'First, <span class="highlight">caramelize</span> the onions.';

      assert.equal(translator.britishToAmerican(text), output);
      done();
    })

    test('Translate I spent the bank holiday at the funfair.', (done) => {
      text = 'I spent the bank holiday at the funfair.';
      output = 'I spent the <span class="highlight">public</span> holiday at the <span class="highlight">carnival.</span>';

      assert.equal(translator.britishToAmerican(text), output);
      done();
    })

    test('Translate I had a bicky then went to the chippy.', (done) => {
      text = 'I had a bicky then went to the chippy.';
      output = 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip</span> <span class="highlight">shop.</span>';

      assert.equal(translator.britishToAmerican(text), output);
      done();
    })

    test('Translate I\'ve just got bits and bobs in my bum bag.', (done) => {
      text = 'I\'ve just got bits and bobs in my bum bag.';
      output = 'I\'ve just got <span class="highlight">odds</span> and <span class="highlight">ends</span> in my <span class="highlight">fanny</span> <span class="highlight">pack.</span>';

      assert.equal(translator.britishToAmerican(text), output);
      done();
    })

    test('Translate The car boot sale at Boxted Airfield was called off.', (done) => {
      text = 'The car boot sale at Boxted Airfield was called off.';
      output = 'The <span class="highlight">swap</span> <span class="highlight">meet</span> at Boxted Airfield was called off.';

      assert.equal(translator.britishToAmerican(text), output);
      done();
    })

    test('Translate Have you met Mrs Kalyani?', (done) => {
      text = 'Have you met Mrs Kalyani?';
      output = 'Have you met <span class="highlight">Mrs.</span> Kalyani?';

      assert.equal(translator.britishToAmerican(text), output);
      done();
    })

    test('Translate Prof Joyner of King\'s College, London.', (done) => {
      text = 'Prof Joyner of King\'s College, London.';
      output = '<span class="highlight">Prof.</span> Joyner of King\'s College, London.';

      assert.equal(translator.britishToAmerican(text), output);
      done();
    })

    test('Translate Tea time is usually around 4 or 4.30.', (done) => {
      text = 'Tea time is usually around 4 or 4.30.';
      output = 'Tea time is usually around 4 or <span class="highlight">4:30.</span>';

      assert.equal(translator.britishToAmerican(text), output);
      done();
    })
  })

  suite('Highlight Translation', () => {
    test('Highlight Translation in Mangoes are my favorite fruit.', (done) => {
      text = 'Mangoes are my favorite fruit.';
      output = 'Mangoes are my <span class="highlight">favourite</span> fruit.';

      assert.equal(translator.americanToBritish(text), output);
      done();
    })

    test('Highlight Translation in I ate yogurt for breakfast.', (done) => {
      text = 'I ate yogurt for breakfast.';
      output = 'I ate <span class="highlight">yoghurt</span> for breakfast.';

      assert.equal(translator.americanToBritish(text), output);
      done();
    })

    test('Highlight Translation in We watched the footie match for a while.', (done) => {
      text = 'We watched the footie match for a while.';
      output = 'We watched the <span class="highlight">soccer</span> match for a while.';

      assert.equal(translator.britishToAmerican(text), output);
      done();
    })

    test('Highlight Translation in Paracetamol takes up to an hour to work.', (done) => {
      text = 'Paracetamol takes up to an hour to work.';
      output = '<span class="highlight">Tylenol</span> takes up to an hour to work.';

      assert.equal(translator.britishToAmerican(text), output);
      done();
    })
  })
});
