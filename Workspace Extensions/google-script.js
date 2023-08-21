function main(e) {
    const formID = FormApp.getActiveForm().getId()
    var POST_URL = `http://11.22.33.444:9999/r/${formID}`;
    var form = FormApp.getActiveForm();
    var allResponses = form.getResponses();
    var latestResponse = allResponses[allResponses.length - 1];
    var response = latestResponse.getItemResponses();
    var payload = {};
    for (var i = 0; i < response.length; i++) {
        var question = response[i].getItem().getTitle();
        var answer = response[i].getResponse();
        payload[question] = answer;
    }
    payload.formid = form.getId()
  
    var options = {
        "method": "post",
        "contentType": "application/json",
        "payload": JSON.stringify(payload)
    };
  UrlFetchApp.fetch(POST_URL, options);
};
