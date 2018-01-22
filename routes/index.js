const router = require('koa-router')()
var sha1=require("sha1");

var xmlUtil=require("../tools/xmlUtil");

var message=require("../tools/message");

var translate=require("../tools/translate");

// 验证回调服务器
router.get('/', async (ctx, next) => {
    var signature=ctx.query.signature; 
    var timestamp=ctx.query.timestamp;
    var nonce=ctx.query.nonce;
    var echostr=ctx.query.echostr; 
    var token=ctx.config.wechat.token;
    
    var validateStr=sha1([token,timestamp,nonce].sort().join(""));
    if(validateStr === signature){
        ctx.body=echostr;
    }
    else
      await next();
})

// 消息回复
router.post("/",async (ctx,next) => { 
    var requestXml=await xmlUtil.getXml(ctx);
    var xmlObject=await xmlUtil.xmlToObject(requestXml);
    var responseXml=await message.responseMessage(xmlObject);
    console.log(responseXml);
    ctx.body=responseXml;
     
})



router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
