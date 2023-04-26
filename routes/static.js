const router = require('koa-router')()

const { filesUpload } = require('../utils/io');

const StaticServer = require('../controllers/static');

router.prefix('/staticServer');

router.get('/:fileName', StaticServer.getFile);

router.post('/upload', filesUpload.single('files'), StaticServer.saveFile);


module.exports = router
