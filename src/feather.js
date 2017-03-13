const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const hooks = require('feathers-hooks');
const memory = require('feathers-memory');
const bodyParser = require('body-parser');
const errors = require('feathers-errors');
const errorHandler = require('feathers-errors/handler');
const local = require('feathers-authentication-local');
const jwt = require('feathers-authentication-jwt');
const auth = require('feathers-authentication');

const app = feathers();
app.configure(rest())
  .configure(socketio())
  .configure(hooks())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(auth({ secret: 'supersecret' }))
  .configure(local())
  .configure(jwt())
  .use('/users', memory())
  .use('/envelopes', memory())
  .use('/', feathers.static(__dirname + '/public'))
  .use(errorHandler());

app.service('authentication').hooks({
  before: {
    create: [
      // You can chain multiple strategies
      auth.hooks.authenticate(['jwt', 'local'])
    ],
    remove: [
      auth.hooks.authenticate('jwt')
    ]
  }
});
app.service('envelopes').hooks({
  before: {
    create: [
      auth.hooks.authenticate('jwt')
    ],
    remove: [
      auth.hooks.authenticate('jwt')
    ],
    find: [
      auth.hooks.authenticate('jwt')
    ],
  }
});

// Add a hook to the user service that automatically replaces
// the password with a hash of the password before saving it.
app.service('users').hooks({
  before: {
    find: [
      auth.hooks.authenticate('jwt')
    ],
    create: [
      local.hooks.hashPassword({ passwordField: 'password' })
    ]
  }
});
// Create a user that we can use to log in
var User = {
  'email': 'admin@feathersjs.com',
  'password': 'admin',
  permissions: ['*']
};

app.service('users').create(User).then(user => {
  console.log('Created default user', user);
}).catch(console.error);

const port = 3030;
let server = app.listen(port);
server.on('listening', function () {
  console.log(`Feathers application started on localhost:${port}`);
});