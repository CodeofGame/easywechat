var translate=require("./translate");

exports.responseMessage=responseMessage;

async function responseMessage(xmlobject){
    var msgType = xmlobject.MsgType;
    var content = xmlobject.Content;
    // 发送方的openId
    var FromUserName = xmlobject.FromUserName;
    // 接收方openId
    var ToUserName=xmlobject.ToUserName;
    
    switch (msgType) {
    case "text":
        return await responseTextMessage(xmlobject);
        break;
    default:
        responseTextMessage("无匹配的", FromUserName,ToUserName);
    }
}


// 回复文本消息
async function responseTextMessage(msg) {
    
    var responseContent="";
   
    if (msg.Content == "我爱肉肉") {  
          
        responseContent="欢迎我最亲爱的肉丁丁，你可以使用翻译功能啦！\n请输入文字吧！";
    }
    else{
        console.log(msg.Content);
        var answer=await translate.getQuestion(msg.Content);
        
        console.log(answer.status);
        responseContent=answer.result.content;
    }
    var textXmlTemplate =`<xml>
        <ToUserName><![CDATA[${msg.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${msg.ToUserName}]]></FromUserName>
        <CreateTime>12345678</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${responseContent}]]></Content>
        </xml>`;
    return textXmlTemplate;
}