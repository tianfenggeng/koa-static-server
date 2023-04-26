const router = require('koa-router')()
const staticControl = require('../controllers/static');

router.get('/', async (ctx) => {
  const fileList = await staticControl.getFileList();
  await ctx.render('index', {
    title: '首页',
    fileList,
});
});


module.exports = router
