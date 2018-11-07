var PRIVATE_KEY = "";
var CLIENT_EMAIL = "";


function syncUsers(){
  //set the users that needs to sync the salesforce contact groups with myContacts
  
  var userList = ['name@example.com','name2@example.com']
  for (var i in userList){
    contactSyncSF(userList[i]);
  }
}


function contactSyncSF(email) {
  var service = getService(email);
  service.reset();
  
  var sfGroupId = getSFgroup(service);
  if (sfGroupId){
    var sfGroupMembers = getSFmembers(service,sfGroupId);
    var code = updateMyContacts(service,sfGroupMembers);
    console.log(email + ' ' + code);
  }
}

function updateMyContacts(service,contacts){
  var url = 'https://people.googleapis.com/v1/contactGroups/myContacts/members:modify'
  var response = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: 'Bearer ' + service.getAccessToken()
    },
    payload: JSON.stringify({'resourceNamesToAdd': contacts}),
    method: 'POST',
    contentType:"application/json",
    muteHttpExceptions:true
  });
  var respCode = response.getResponseCode()
  return respCode
}

function getSFgroup(service){
  //returns the resource name for the salesforce group or returns false
  
  var url = 'https://people.googleapis.com/v1/contactGroups'
  var response = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: 'Bearer ' + service.getAccessToken()
    },
    method: 'GET',
    contentType:"application/json",
    muteHttpExceptions:true
  });
  var respCode = response.getResponseCode()
  if (respCode = 200){
    var contactGroups = JSON.parse(response.getContentText()).contactGroups
    for (var i in contactGroups){
      if (contactGroups[i].name == 'Salesforce Sync'){
        return contactGroups[i].resourceName
      }
    }
  } else {
    console.warn(respCode);
  }  
  return false;
}

function getSFmembers(service, groupId){
  //returns a list of groupMember names to add to myContacts
  
  var url = 'https://people.googleapis.com/v1/'+groupId+'?maxMembers=10000';
  var response = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: 'Bearer ' + service.getAccessToken()
    },
    method: 'GET',
    contentType:"application/json",
    muteHttpExceptions:true
  });
  var respCode = response.getResponseCode()
  if (respCode = 200){
    var groupMembers = JSON.parse(response.getContentText()).memberResourceNames
    return groupMembers;
    
  } else {
    console.warn(respCode);
  } 
  
}

function getService(USER_EMAIL) {
  return OAuth2.createService('peopleAPI'+USER_EMAIL)
      // Set the endpoint URL.
      .setTokenUrl('https://accounts.google.com/o/oauth2/token')
  
      // Set the private key and issuer.
      .setPrivateKey(PRIVATE_KEY)
      .setIssuer(CLIENT_EMAIL)

      // Set the name of the user to impersonate. This will only work for
      // Google Apps for Work/EDU accounts whose admin has setup domain-wide
      // delegation:
      // https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority
      .setSubject(USER_EMAIL)

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getScriptProperties())

      // Set the scope. This must match one of the scopes configured during the
      // setup of domain-wide delegation.
      .setScope('https://www.googleapis.com/auth/contacts');
}