const express = require('express');
const passport = require('passport');
require('./config/auth')(passport);
const router = express.Router();

const log = require('./src/controller/profiles/log');
const profile =  require('./src/controller/profiles/profile');

const documentMaker = require('./src/controller/document_maker/assetsFormCtrl');
const createProcess = require('./src/controller/document_reader//createProcess');

const documentReader = require('./src/controller/document_reader/documentList');

router.use(log);
router.use(profile);
router.use('/montagem', documentMaker);
router.use('/meusprocessos', documentReader);
router.use('/novoprocesso', createProcess);

module.exports = router;