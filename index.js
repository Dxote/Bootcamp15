import http from 'http';
const port = 3000;
const ipAddress = 'localhost';
import fs from 'fs';

function render(res, html) {
  fs.readFile(html, 'utf-8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });
}

http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    render(res, "./index.html", res);
  } 
  else if (url === "/contact") {
    render(res, "./contact.html", res);
  } 
  else if (url === "/about") {
    render(res, "./about.html", res);
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404 Not Found');
  }
})
.listen(port, ipAddress, () => {
    console.log(`Server is listening on http://${ipAddress}:${port}`);
});