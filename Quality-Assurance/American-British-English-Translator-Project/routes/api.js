'use strict';

const Translator = require('../components/translator.js');

module.exports = function(app) {

  const translator = new Translator();
  const modes = ['american-to-british', 'british-to-american']

  app.route('/api/translate')
    .post((req, res) => {
      let { text, locale } = req.body;
      if ((!text && text !== '') || !locale) {
        res.json({ error: 'Required field(s) missing' });
      }
      else if (text === '') {
        res.json({ error: 'No text to translate' });
      }
      else if (!modes.includes(locale)) {
        res.json({ error: 'Invalid value for locale field' });
      }
      else {
        let translation = translator.translate(text);
        if (translation === text) {
          res.json({
            text,
            translation: 'Everything looks good to me!'
          })
        }
        else {
          res.json({
            text,
            translation
          })
        }
      }
    });
};
