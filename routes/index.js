const express = require('express');
const app = express();
const { upload } = require('../middlewares/upload');
const passport = require('passport');
require('../middlewares/passport')(passport);
const eventUpload = upload('events').fields([{ name: 'image', maxCount: 10 }]);
const noticeUpload = upload('notice').fields([{ name: 'image', maxCount: 10 }]);
const userUpload = upload('users').fields([{ name: 'image' }]);
const playerUpload = upload('players').fields([{ name: 'image' }]);
const memberUpload = upload('members').fields([{ name: 'image' }]);
const eventsController = require('../controllers/events');
const playersController = require('../controllers/players');
const positionController = require('../controllers/position');
const noticeController = require('../controllers/notice');
const membersController = require('../controllers/members');
const userController = require('../controllers/users');
const contactController = require('../controllers/contact');
const committeeController = require('../controllers/committee');
const {} = require('../controllers/index');

app.post('/users', userUpload, userController.createUser);
app.post('/user/login', userController.Login);
app.get('/users', userController.fetchUsers);
// app.get('/users',passport.authenticate('jwt', { session: false }), userController.fetchUsers);
app.get('/users/:id', userController.fetchUserByID);
app.patch('/users/:id',userUpload, userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

//Events
app.post('/events',eventUpload, eventsController.createEventsController);
app.get('/events', eventsController.getEventsController);
app.delete('/events/:id', eventsController.deleteEventsController);

//players
app.post('/players', playerUpload, playersController.createPlayersController);
app.get('/players', playersController.getPlayersController);
app.patch(
  '/players/:id',
  playerUpload,
  playersController.updatePlayersController,
);
app.delete('/playerss/:id', playersController.deletePlayersController);

//position
app.post('/position', positionController.createPositionController);
app.get('/position', positionController.getPositionController);
app.patch('/position/:id', positionController.updatePositionController);
app.delete('/position/:id', positionController.deletePositionController);

//notice
app.post('/notice', noticeUpload, noticeController.createNoticeController);
app.get('/notice', noticeController.getNoticeController);
app.delete('/notice/:id', noticeController.deleteNoticeController);
 
//members
app.post('/members',memberUpload, membersController.createMemberController);
app.get('/members', membersController.getMemberController);
app.patch('/members/:id',memberUpload, membersController.updateMemberController);
app.delete('/members/:id', membersController.deleteMemberController);

//contact
app.post('/contact', contactController.createContactController);
app.get('/contact', contactController.getContactController);
app.patch('/contact/:id',contactController.updateContactController);
app.delete('/contact/:id', contactController.deleteContactController);

//committee
app.post('/committee', committeeController.createCommitteeController);
app.get('/committee', committeeController.getCommitteeController);
app.patch('/committee/:id', committeeController.updateCommitteeController);
app.delete('/committee/:id', committeeController.deleteCommitteeController);

 

module.exports = app;
