var xml2js=require("xml2js");

exports.getXml = function (ctx) {
    return new Promise((resolve,reject)=>{
        var contentXml="";
        ctx.req.on("data",(chunk) => {
            contentXml+=chunk.toString();
        })
        
        ctx.req.on("end",()=>{
            resolve(contentXml);
        })
    })
}


exports.xmlToObject=function(xml){
    return new Promise((resolve,reject) => {
        var parseString=xml2js.parseString;
        parseString(xml,(err,result) => {
            if(err) reject(err);
            else 
                resolve(formatXmlObject(result));
        })
    })
}

function formatXmlObject(xmlObject){
    var result={};
    for(var item in xmlObject.xml){
        result[item]=xmlObject.xml[item][0]
    }
    
    return result;
    
    
}