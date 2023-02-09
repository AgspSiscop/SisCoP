const express = require('express');
const passport = require('passport');
require('./config/auth')(passport);
const router = express.Router();

const log = require('./src/controller/profiles/log');
const profile =  require('./src/controller/profiles/profile');

//const documentMaker = require('./src/controller/document_maker/assetsFormCtrl');
const createProcess = require('./src/controller/document_reader//createProcess');

const documentReader = require('./src/controller/document_reader/documentList');
const documentReaderT = require('./src/controller/document_reader/documentListInTransfer');
const documentReaderD = require('./src/controller/document_reader/processDone');

const messenger = require('./src/controller/messenger/message');

const processManager = require('./src/controller/process_manager/manager');

const converter = require('./src/controller/converter/converterController');


router.use(log);
router.use(profile);
//router.use('/montagem', documentMaker);
router.use('/meusprocessos', documentReader);
router.use('/processosrecebidos', documentReaderT);
router.use('/done', documentReaderD);
router.use('/novoprocesso', createProcess);
router.use('/mensageiro', messenger);
router.use('/acompanharprocessos', processManager);
router.use('/conversor', converter);


module.exports = router;