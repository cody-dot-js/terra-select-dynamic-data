const fs = require('fs');
const randomWords = require('random-words');

function hashCode(str) {
  if (!str.length) {
    return 0;
  }

  return [...str].reduce((hash, c) => {
    const char = c.charCodeAt(0);
    return ((hash << 5) - hash + char) | 0;
  }, 0);
};

const uniqueRandomWords = [...new Set(randomWords(1000))]
  .sort()
  .map(word => ({ display: word, value: `${hashCode(word)}` }));

const js = `export default ${JSON.stringify(uniqueRandomWords, undefined, 2)}
`;

fs.writeFileSync('./src/randomData.js', js);
