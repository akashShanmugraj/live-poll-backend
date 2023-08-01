function myFunction() {
  const responseList = getResponseList();
  var options = {
    'method': 'post',
    'payload': responseList
  };

  var response = UrlFetchApp.fetch("https://psg-scapes-backend.onrender.com/api/utility/info", options)
  Logger.log(response.getContentText())
}

function getResponseList() {
  const form = FormApp.openById('1Gzh9CD4CUM2Xzy8iWe7ueIe4F-tkWMt01YrAxZUcEsY');
  var formResponses = form.getResponses();

  const finalresponse = {};
  
  for (var i = 0; i < formResponses.length; i++) {
    var formResponse = formResponses[i];
    var itemResponses = formResponse.getItemResponses();
    
  
    for (var j = 0; j < itemResponses.length; j++) {
      var itemResponse = itemResponses[j];     
      
      if (finalresponse[itemResponse.getItem().getTitle()] == undefined) {
        finalresponse[itemResponse.getItem().getTitle()] = {}
      }
        
      if (finalresponse[itemResponse.getItem().getTitle()][itemResponse.getResponse()] == undefined) {
          finalresponse[itemResponse.getItem().getTitle()][itemResponse.getResponse()] = 0;
        }
      
      finalresponse[itemResponse.getItem().getTitle()][itemResponse.getResponse()] = finalresponse[itemResponse.getItem().getTitle()][itemResponse.getResponse()] + 1
      
    }
    
  }
  return finalresponse;
}