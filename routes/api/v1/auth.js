const { Router } = require('express') ;
const bcrypt = require('bcryptjs') ;
const config = require('../../../config') ;
const jwt = require('jsonwebtoken') ;
const auth = require('../../../middlewares/auth') ;
const User = require('../../../models/User') ;
const {isValidUsername, isValidEmail} = require('../../../utils/Regex');
const { JWT_SECRET } = config;
const router = Router();

/**
 * @route   POST api/v1/auth/login
 * @desc    Login user
 * @access  Public
 */

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  let user;
  
  try {
    if (!username || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    const isEmail = isValidEmail(username);
    switch(isEmail) {
      case true: {
        user = await User.findOne({ email: username });
        if (!user) throw Error('User Does not exist');
        break;
      };
      case false: {
        user = await User.findOne({ username });
        if (!user) throw Error('User Does not exist');
        break;
      }
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    const token = jwt.sign({ id: user._id, username: user.username  }, JWT_SECRET, { expiresIn: 86400 });
    if (!token) return res.status(500).json({msg: "JWT Operation Failed"})

    res.status(200).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
        }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/v1/auth/register
 * @desc    Register new user
 * @access  Public
 */

router.post('/register', async (req, res) => {
  
    const { name, email, username, password } = req.body;
    if (!name || !email || !password || !username) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  if(!isValidUsername(username)) return res.status(400).json({msg: 'Invalid Username'})
  if(!isValidEmail(email)) return res.status(400).json({msg: 'Invalid Email'})

  try {
    const user = await User.findOne({ email });
    if (user) throw Error('User already exists');
    
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) throw Error('Username already taken');

    const salt = await bcrypt.genSalt(10);
    if (!salt) return res.status(500).json({msg: 'Something went wrong!'});

    const hash = await bcrypt.hash(password, salt);
    if (!hash) return res.status(500).json({msg: 'Something went wrong hashing the password'});
    
    newUser = new User({
      name,
      email,
      username,
      password: hash
    });

    const savedUser = await newUser.save();
    if (!savedUser) return res.status(500).json({msg: 'Internal Server Error'});

    const token = jwt.sign({ id: savedUser._id, username: savedUser.username }, JWT_SECRET, {
      expiresIn: 86400
    });

    res.status(201).json({
      auth_user: {
        token: token,
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email,
          username: savedUser.username,
          avatar_url: savedUser.avatar_url
        }
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(401).json({msg: "Token is not valid"})
    res.json({user: user});
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   GET api/auth/user
 * @desc    Check username
 * @access  Public
 */

router.get('/username/available', async (req, res) => {
    try {
        if(req.query.username) {
        const username = req.query.username;
        if(!isValidUsername(username)) return res.status(400).json({msg: 'Invalid Username'})
        const user = await User.findOne({username: username})
        
        if(!user) return res.status(200).json({code: "USERNAME_AVAILABLE", msg: "Available"});
        else return res.status(200).json({code: "USERNAME_NOT_AVAILABLE", msg: "Not Available"});
        } else {
        throw Error('Invalid Request');
        }
    } catch(e) {
        res.status(400).json({ msg: e.message });
    }
});


module.exports = router;
