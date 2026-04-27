const fs = require('fs');
const content = fs.readFileSync('script.js', 'utf8');
try {
  new Function(content);
  console.log("Syntax is OK");
} catch (e) {
  console.log("Syntax ERROR:", e);
}
