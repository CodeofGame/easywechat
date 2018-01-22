var rp = require("request-promise");
var querystring = require("querystring");

var questionUrl = "http://jisuznwd.market.alicloudapi.com/iqa/query";

function getQuestion(question) {
    var appCode = "dcf8a5beb7c447ef9ff3e6cf354bfb71";

    var qs = querystring.stringify({
        question : question
    });
    let url = "http://jisuznwd.market.alicloudapi.com/iqa/query?" + qs;

    var options = {
        url : url,
        json : true,
        headers : {
            'Authorization' : 'APPCODE ' + appCode
        }
    }
    return rp(options);
}

exports.getQuestion = getQuestion;