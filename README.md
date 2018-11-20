# Salesforce-MyContacts-Sync Setup:

## 1. Create a new google apps script.
1. Go to: https://script.google.com
2. Click "New > New script"
3. Copy the code from [Code.gs](../master/Code.gs) into the newly created script and save the script

## 2. Add libary to the project
Before using this script you will need to add the apps script [oauth2 library](https://github.com/gsuitedevs/apps-script-oauth2) to the project.
1. Click on the menu item "Resources > Libraries..."
2. In the "Find a Library" text box, enter the script ID 1B7FSrk5Zi6L1rSxxTDgDEUsPzlukDsi4KGuTMorsTQHhGBzBkMun4iDF and click the "Select" button.
3. Choose a version in the dropdown box (usually best to pick the latest version).
4. Click the "Save" button.

## 3. Enable API's and create a Service account
You also need a google cloud service account to do the API calls.
1. Click on the menu item "Resources > Cloud Platform Project..."
2. Click the project link to go to the associated Cloud Platform Project
3. Go to the [Contacts API](https://console.cloud.google.com/apis/library/contacts.googleapis.com?q=Contacts) page to enable the API.
4. When the api is enabled [Create a Service account](https://console.cloud.google.com/iam-admin/serviceaccounts/create)
5. Enter a name and click the "Create" button
6. You dont need to add Service account permissions so click "Continue"
7. Click "+Create Key" and in the side window click "Create" and save the JSON file on your computer
8. Click "Done" to finish creating the service account.
9. TODO: Enable Domain wide delegation

## 4. Authorise Service account in the admin console

## 5. Update the script with the private key
