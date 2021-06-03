# [Quality Assurance Projects - American / British Translator](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/american-british-translator)

[Repl](https://boilerplate-project-american-british-english-translator.jainaayush01.repl.co/)

User Stories
1. You can POST to /api/translate with a body containing text with the text to translate and locale with either american-to-british or british-to-american. The returned object should contain the submitted text and translation with the translated text.

2. The /api/translate route should handle the way time is written in American and British English. For example, ten thirty is written as "10.30" in British English and "10:30" in American English. The span element should wrap the entire time string, i.e. <span class="highlight">10:30</span>.

3. The /api/translate route should also handle the way titles/honorifics are abbreviated in American and British English. For example, Doctor Wright is abbreviated as "Dr Wright" in British English and "Dr. Wright" in American English. See /public/american-to-british-titles.js for the different titles your application should handle.

4. Wrap any translated spelling or terms with <span class="highlight">...</span> tags so they appear in green.

5. If one or more of the required fields is missing, return { error: 'Required field(s) missing' }.

6. If text is empty, return { error: 'No text to translate' }

7. If locale does not match one of the two specified locales, return { error: 'Invalid value for locale field' }.

8. If text requires no translation, return "Everything looks good to me!" for the translation value.

9. All 24 unit tests are complete and passing. See /tests/1_unit-tests.js for the expected behavior you should write tests for.

10. All 6 functional tests are complete and passing. See /tests/2_functional-tests.js for the functionality you should write tests for.
