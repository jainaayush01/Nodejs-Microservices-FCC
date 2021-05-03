const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = (app, myDataBase) => {
  app.route('/').get((req, res) => {
    res.render(process.cwd() + '/views/pug/index', {
      title: 'Connected to Database',
      message: 'Please login',
      showLogin: true,
      showRegistration: true,
      showSocialAuth: true
    });
  });

  app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
  })

  app.get('/profile', ensureAuthenticated, (req, res) => {
    res.render(process.cwd() + '/views/pug/profile', { username: req.user.username });
  })

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
  })

  app.post('/register', (req, res, next) => {
    myDataBase.findOne({ username: req.body.username }, (err, user) => {
      const hash = bcrypt.hashSync(req.body.password, 12);
      if (err) next(err);
      if (user) res.redirect('/');
      myDataBase.insertOne(
        {
          username: req.body.username,
          password: hash
        },
        (err, doc) => {
          if (err) res.redirect('/');
          next(null, doc.ops[0])
        }
      )
    })
  },
    passport.authenticate('local', { failureRedirect: '/' }),
    (req, res, next) => {
      res.redirect('/profile');
    }
  )

  app.get('/auth/github', passport.authenticate('github', { failureRedirect: '/' }))
  
  app.route('/auth/github/callback').get(passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    req.session.user_id = req.user.id
    res.redirect('/chat');
  });


  app.get('/chat', (req, res) => {
    res.render(process.cwd() + '/views/pug/chat', { user: req.user });
  })

  app.use((req, res, next) => {
    res.status(404).type('text').send('Not Found');
  })
}


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};