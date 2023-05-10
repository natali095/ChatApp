const mongoose = require('mongoose');
const Msg = require('./models/messages');
const mongoDB = 'mongodb+srv://mongochat:passmongo123@cluster0.lklipqi.mongodb.net/message-database?retryWrites=true&w=majority';
mongoose.connect(mongoDB,{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
  console.log('connectedMongoose')
}).catch(err => console.log(err))

const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});

app.get('/', (req, res) => {
    res.send('Hello, I`m Nataliia`s server');
})


let userList = new Map();
io.on('connection', (socket) => {
  let userName = socket.handshake.query.userName;
  addUser(userName, socket.id);

  socket.broadcast.emit('user-list', [...userList.keys()]);
  socket.emit('user-list', [...userList.keys()]);

  socket.on('message', (msg) => {
      socket.broadcast.emit('message-broadcast', {message: msg, userName: userName});
  })

  socket.on('disconnect', (reason) => {
      removeUser(userName, socket.id);
  })
});
function addUser(userName, id) {
    if (!userList.has(userName)) {
        userList.set(userName, new Set(id));
    } else {
        userList.get(userName).add(id);
    }
}
function removeUser(userName, id) {
  if (userList.has(userName)) {
      let userIds = userList.get(userName);
      userIds.delete(id);
      if (userIds.size == 0) {
          userList.delete(userName);
      }
  }
}


http.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running ${process.env.PORT || 3000}`);
});


// const express = require('express');
// const path = require("path");
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongo = require("mongoose");






// const app = express();
// const http = require('http').createServer(app);

// const io = require('socket.io')(http, {
//     cors: {
//         origin: '*'
//     }
// });

// app.get('/', (req, res) => {
//     res.send('Hello, I`m Nataliia`s server');
// })


// let userList = new Map();
// io.on('connection', (socket) => {
//   let userName = socket.handshake.query.userName;
//   addUser(userName, socket.id);

//   socket.broadcast.emit('user-list', [...userList.keys()]);
//   socket.emit('user-list', [...userList.keys()]);

//   socket.on('message', (msg) => {
//       socket.broadcast.emit('message-broadcast', {message: msg, userName: userName});
//   })

//   socket.on('disconnect', (reason) => {
//       removeUser(userName, socket.id);
//   })
// });




// function addUser(userName, id) {
//     if (!userList.has(userName)) {
//         userList.set(userName, new Set(id));
//     } else {
//         userList.get(userName).add(id);
//     }
// }
// function removeUser(userName, id) {
//   if (userList.has(userName)) {
//       let userIds = userList.get(userName);
//       userIds.delete(id);
//       if (userIds.size == 0) {
//           userList.delete(userName);
//       }
//   }
// }


// http.listen(process.env.PORT || 3000, () => {
//     console.log(`Server is running ${process.env.PORT || 3000}`);
// });
