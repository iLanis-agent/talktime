var E = require('./engine.js'), n = 0, bad = 0;
function eq(a, b, m, t) { n++; if (!(Math.abs(a - b) <= (t == null ? 1e-9 : t))) { bad++; console.log('FAIL', m, a, b); } }
function is(a, b, m) { n++; if (a !== b) { bad++; console.log('FAIL', m, a, b); } }
// wordstotime.netlify.app word-to-presentation-time table
var T = { 250: ['2m 0s', '1m 55s', '1m 40s'], 300: ['2m 24s', '2m 18s', '2m 0s'], 400: ['3m 12s', '3m 5s', '2m 40s'], 500: ['4m 0s', '3m 51s', '3m 20s'], 600: ['4m 48s', '4m 37s', '4m 0s'] };
Object.keys(T).forEach(function (w) { [125, 130, 150].forEach(function (wpm, i) { is(E.fmt(E.seconds(+w, wpm)), T[w][i], w + ' words @' + wpm); }); });
is(E.fmt(E.seconds(100, 100)), '1m 0s', '100wpm');
// 10-minute speech: 1,100 / 1,300 / 1,500 / 1,700 words at 110 / 130 / 150 / 170 wpm
eq(E.wordsFor(10, E.PACES.slow), 1100, 'slow'); eq(E.wordsFor(10, E.PACES.average), 1300, 'avg'); eq(E.wordsFor(10, E.PACES.fast), 1500, 'fast'); eq(E.wordsFor(10, E.PACES.rapid), 1700, 'rapid');
// pause allowance of 10%: 1300 words take 11 minutes; 10 minutes with 10% pauses fits 1182 words
eq(E.seconds(1300, 130, 0.1), 660, 'pauses', 1e-9); eq(E.wordsFor(10, 130, 0.1), 1182, 'fit with pauses');
// word counting
eq(E.countWords('Hello there, world!'), 3, 'wc'); eq(E.countWords('  one\n two\t three  '), 3, 'ws'); eq(E.countWords(''), 0, 'empty'); eq(E.countWords('   '), 0, 'blank');
// minutes parsing
eq(E.parseMinutes('10'), 10, 'p10'); eq(E.parseMinutes('7:30'), 7.5, 'p730'); eq(E.parseMinutes('7.5'), 7.5, 'p75'); eq(E.parseMinutes('abc') === null ? 1 : 0, 1, 'bad'); eq(E.parseMinutes('0') === null ? 1 : 0, 1, 'zero');
console.log(n + ' assertions, ' + bad + ' failed'); process.exit(bad ? 1 : 0);
