const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('./controllers/userController.js');
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', userController.getAllUsers);
app.get('/user/:id', userController.getUser);
app.post('/create', userController.createUser);
app.delete('/delete/:id', userController.deleteUser);
app.put('/update/:id', userController.updateUser);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
