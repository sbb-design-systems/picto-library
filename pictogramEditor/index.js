var fs = require('fs'),
    http = require('http');

http.createServer(function (req, res) {
  switch (req.url) {
    case "/":
      sendFile(res, __dirname + "/index.html");
      break;
    case "/pictoLibrary.json":
      sendFile(res, __dirname.substring(0, __dirname.lastIndexOf("/")) + "/pictoLibrary.json");
      break;
    case "/updateLibrary":
      writeLibrary(req, res);
      break;
    default:
    if(req.url.includes("?")) {
      sendFile(res, __dirname + req.url.substring(0, req.url.lastIndexOf("?")));
    }
    else {
      sendFile(res, __dirname + req.url);
    }
  }
}).listen(3000);

function sendFile(res, url) {
  fs.readFile(url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}

function writeLibrary(req, res) {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    try {
      JSON.parse(data);
      fs.writeFile(__dirname.substring(0, __dirname.lastIndexOf("/") +1) + "pictoLibrary.json", data, "utf8", function(err) {
        if(err) {
          res.writeHead(200);
          res.end(JSON.stringify({text: "Unable to save Library: " + err, type: "error"}));
          console.log("Unable to save Library: " + err);
        }
      });
    }
    catch(e) {
      res.writeHead(200);
      res.end(JSON.stringify({text: "Sent data is no valid json string: " + e, type: "error"}));
      console.log("Sent data is no valid json string: " + e);
    }
    res.writeHead(200);
    res.end(JSON.stringify({text: "Library successfuly saved", type: "success"}));
    console.log("Library successfuly saved");
  });
}
