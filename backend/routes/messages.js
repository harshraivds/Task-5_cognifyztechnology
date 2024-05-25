const express = require('express');
const router = express.Router();

const Message = require('../models/Message');

// @route   GET api/messages
// @desc    Get All Messages
router.get('/', (req, res) => {
    Message.find()
        .sort({ date: -1 })
        .then(messages => res.json(messages))
        .catch(err => res.status(404).json({ nomessagesfound: 'No messages found' }));
});

// @route   POST api/messages
// @desc    Create A Message
router.post('/', (req, res) => {
    const { username, email, message } = req.body;

    const newMessage = new Message({
        username,
        email,
        message
    });

    newMessage.save()
        .then(message => res.json(message))
        .catch(err => res.status(500).json({ error: 'Unable to save message' }));
});

module.exports = router;
