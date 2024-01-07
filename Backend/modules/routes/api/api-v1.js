const express = require('express');
const router = express.Router();
//setting routes***********************************

const users = require('./userRouter');
router.use('/user',users);

const admin = require('./adminRouter');
router.use('/admin', admin);

const agent = require('./agentRouter');
router.use('/agent', agent);

module.exports = router;
