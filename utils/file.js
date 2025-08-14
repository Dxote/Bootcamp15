import fs from 'fs';

export function read(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code !== 'ENOENT') { 
      console.error("Error reading", err);
    }
    return [];
  }
}

export function write(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing", err);
    throw err; 
  }
}
