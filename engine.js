(function (root) {
  'use strict';
  var PACES = { slow: 110, average: 130, fast: 150, rapid: 170 }; // words per minute
  function countWords(text) { var m = String(text).trim().match(/\S+/g); return m ? m.length : 0; }
  // seconds to speak `words` at `wpm`, plus a pause allowance (fraction, e.g. 0.1 for slide changes)
  function seconds(words, wpm, pause) { return words / wpm * 60 * (1 + (pause || 0)); }
  // words that fit in `minutes`, after the pause allowance
  function wordsFor(minutes, wpm, pause) { return Math.round(minutes * wpm / (1 + (pause || 0))); }
  function fmt(sec) { var n = Math.round(sec), m = Math.floor(n / 60), s = n % 60; return m + 'm ' + s + 's'; }
  // minutes:seconds parse for a time limit: "10", "7:30", "7.5"
  function parseMinutes(str) {
    var t = String(str).trim(); if (/^\d+:\d{1,2}$/.test(t)) { var p = t.split(':'); return +p[0] + p[1] / 60; }
    return /^\d+(\.\d+)?$/.test(t) && parseFloat(t) > 0 ? parseFloat(t) : null;
  }
  var api = { PACES: PACES, countWords: countWords, seconds: seconds, wordsFor: wordsFor, fmt: fmt, parseMinutes: parseMinutes };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Talk = api;
})(typeof window !== 'undefined' ? window : this);
