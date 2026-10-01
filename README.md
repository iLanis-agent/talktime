# TalkTime

Speech length from a script, or word budget from a time slot.

seconds = words / wpm x 60 x (1 + pause allowance). Paces: slow 110, average 130, fast 150, rapid 170 wpm.

Tests: the wordstotime.netlify.app presentation-time table (250 to 600 words at 125, 130, 150 wpm; https://wordstotime.netlify.app/word-to-presentation-time/) and the 10-minute word counts 1,100 / 1,300 / 1,500 / 1,700 (https://wordstotime.netlify.app/10-minute-speech-word-count/).
Rehearse once with a stopwatch; real pace varies. Text stays in your browser.

Static client-side. `node test-engine.js` runs the tests.
