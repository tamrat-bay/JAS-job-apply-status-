const experss = require('express');
const router = experss.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    //check if the user exist in the db
    User.findOne({ email }, (err, user) => {
        if (err) return res.status(400).send(err);
        if (!user) {
            //hash password
            bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    //create user
                    const user = new User({ name, email, password: hashedPassword });
                    user.save()
                        .then(newUser => res.status(201).send(newUser))
                        .catch(err => res.status(400).send(err))
                })
                .catch(err => res.status(400).send(err))

        } else {
            return res.status(400).send('User already exsist');
        };
    });
});


router.post('/login', (req, res) => {
    const { email, password } = req.body;
    //check if the user exist in the db
    User.findOne({ email }, (err, user) => {
        if (err) return res.status(400).send(err);
        if (user) {
            const { name, id, email } = user;
            //check if password is correct
            bcrypt.compare(password, user.password)
                .then(result => {
                    if (result) {
                        //create and assign token
                        let TOKEN_SECRET = "anythingiwant" //todo - make this an env var later
                        const token = jwt.sign({ _id: id }, TOKEN_SECRET);
                        res.header('auth-token', token).send({ name, id, email, image: 'What?', token });
                    } else {
                        return res.status(403).send('incorrect password');
                    };
                })
                .catch(err => console.log(err))
        } else {
            return res.status(400).send('User not found');
        };
    })
});

module.exports = router;