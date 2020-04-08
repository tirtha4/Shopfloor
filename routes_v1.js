const fs = require("fs");

const addItem = (item) =>{
   let ul = document.getElementById("dynamic-list");
   var li = document.createElement("li");
   li.setAttribute('id',item);
   li.appendChild(document.createTextNode(item));
   ul.appendChild(li);
}

const removeItem = (item) =>{
  let ul = document.getElementById("dynamic-list");
  ul.removeChild(item);
}

const requestHandler = (req,res) => {
  const url = req.url;
  let userName;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<h2> Add users <h2>')
    res.write('<head><title>Enter User</title><head>');
    res.write('<body><form action="/createUser" method="POST"><input type="text" name="user"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/users') {
    res.write('<html>');
    res.write('<h3> USER LIST <h3>')
    res.write(`<ul id="dynamic-list"><li>stupid</li></ul>`);
    res.write('</html>');
    return res.end();
  }
  if (url === '/createUser' && method === 'POST'){

    const body = [];
    req.on('data',(value)=>{
      body.push(value);
      console.log(value);
    });
    req.on('end',()=>{
      const parseValue = Buffer.concat(body).toString();
      const userName = parseValue.split('=')[1];
      fs.writeFile('message.txt', `New User: ${userName}`, (err)=>{
        res.statusCode = 302;
        console.log(userName);
        return res.end();
      });
     
    })

    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
}

module.exports = requestHandler;
