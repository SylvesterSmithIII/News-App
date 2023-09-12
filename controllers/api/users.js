const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// controllers/api/users.js
module.exports = {
    create,
    login,
    checkToken,
    updateSettings,
    saveArticle,
    deleteArticle
}

// POST /api/users
async function create(req, res) {
   try {
    // add user to db
    const user = await User.create(req.body)
    const token = createJWT(user)
    res.json(token)
   } catch (error) {
    // client will catch non 2xx status codes
    // 400 = Bad Request
    res.status(400).json(error)
   }
}

async function login(req, res) {
    let user

    try {
        user = await User.findOne({
            email: req.body.email
        })
    } catch (error) {
        return res.status(400).json(error);
    }

    if (!user) {
        // email not found
        return res.status(400).json("Bad Credentials");
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (match) {
        const token = createJWT(user);
        return res.json(token);
    }

    // Password doesn't match
    return res.status(400).json("Bad Credentials");
}

async function updateSettings(req, res) {
    try {
        const user = await User.findById(req.user._id);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        if (!req.body.zipcodeKey) {
            req.body.zipcodeKey = user.zipcodeKey
        }
        user.settings = req.body;


        const updatedUser = await user.save();
        const token = createJWT(user)
    
        res.json({ user: updatedUser, token});
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
}

async function saveArticle(req, res) {
    try {
        const user = await User.findById(req.user._id);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        user.savedArticles.push(req.body)


        const updatedUser = await user.save();
        const token = createJWT(user)
    
        res.json({ user: updatedUser, token});
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
}

async function deleteArticle(req, res) {
    try {

        const { description } = req.body

        const user = await User.findById(req.user._id);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const articleId = user.savedArticles.find(savedArticle => savedArticle.description === description)



        user.savedArticles = user.savedArticles.filter(article => article._id !== articleId._id)


        const updatedUser = await user.save();
        const token = createJWT(user)
    
        res.json({ user: updatedUser, token});
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
}


// Helper Functions //

function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}

function checkToken(req, res) {
    // req.user will always be there for you when a token is sent
    console.log('req.user', req.user);
    res.json(req.exp);
}