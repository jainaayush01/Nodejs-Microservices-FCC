# [Metric-Imperial Converter](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/metric-imperial-converter)

[Repl](https://boilerplate-project-metricimpconverter.jainaayush01.repl.co/)

User Stories
1. You can GET /api/convert with a single parameter containing an accepted number and unit and have it converted. (Hint: Split the input by looking for the index of the first character which will mark the start of the unit)

2. You can convert 'gal' to 'L' and vice versa. (1 gal to 3.78541 L)

3. You can convert 'lbs' to 'kg' and vice versa. (1 lbs to 0.453592 kg)

4. You can convert 'mi' to 'km' and vice versa. (1 mi to 1.60934 km)

5. All incoming units should be accepted in both upper and lower case, but should be returned in both the initUnit and returnUnit in lower case, except for liter, which should be represented as an uppercase 'L'.

6. If the unit of measurement is invalid, returned will be 'invalid unit'.

7. If the number is invalid, returned will be 'invalid number'.

8. If both the unit and number are invalid, returned will be 'invalid number and unit'.

9. You can use fractions, decimals or both in the parameter (ie. 5, 1/2, 2.5/6), but if nothing is provided it will default to 1.

10. Your return will consist of the initNum, initUnit, returnNum, returnUnit, and string spelling out units in the format '{initNum} {initUnitString} converts to {returnNum} {returnUnitString}' with the result rounded to 5 decimals.

11. All 16 unit tests are complete and passing.

12. All 5 functional tests are complete and passing.
