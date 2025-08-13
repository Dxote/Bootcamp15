const fs = require('fs');

function loadJSON(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code !== 'ENOENT') { 
      console.error(`Error reading ${filePath}: ${err.message}`);
    }
    return [];
  }
}

function saveJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Error writing ${filePath}: ${err.message}`);
    throw err; 
  }
}

module.exports = { loadJSON, saveJSON };
