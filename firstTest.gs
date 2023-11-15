function test() {
  let sheet =  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('refrences');
  let driveFolder = DriveApp.getFolderById("1ccwc_BxHfiakeyJFn1tcRBIqdEqNKsyX")
  let  allData = sheet.getDataRange().getValues()
  //let API_kEY = ""
  let URL_PI = "https://jsonplaceholder.typicode.com/photos/"
  //let refEX=""
 // let REQUEST = URL_PIXELS + API_kEY + "&query="

   for (var i = 1; i <= allData.length ; i++) {
    let ref = sheet.getRange(i,1).getValue()
    let urlObject = URL_PI+i ;
    let response = UrlFetchApp.fetch(urlObject)
    let data = JSON.parse(response.getContentText())
    Logger.log(data)
    let fileUrl = data.url ;
  //  let fileUrl = sheet.getRange(i,2).getValue() ;
        if(ref !== '' &&  fileUrl !== '' ) {
           let folderId =  driveFolder.createFolder(ref).getId();
            returnedUrl = getFileByUrl(fileUrl, folderId , data.id);
            ContentService.createTextOutput(returnedUrl)
        }
    }
}

function getFileByUrl(url, folderId ,fileName){
  let fileData = UrlFetchApp.fetch(url);
  let folder = DriveApp.getFolderById(folderId);
 // let fileName = url.split('/').pop(); // last value = file name in last folder, url/folder/filename.type
  let newFileUrl = folder.createFile(fileData).setName(fileName).getUrl();
 // Logger.log(newFileUrl);
  return newFileUrl;

}
