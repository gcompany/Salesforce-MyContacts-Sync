# Salesforce-MyContacts-Sync

## Add libary to the project
Before using this script you will need to add the apps script oauth2 library to the project.
https://github.com/gsuitedevs/apps-script-oauth2/

## Create Service account
You also need a google cloud service account to do the API calls.
1. Open the Service accounts page. If prompted, select a project.
2. Click Create service account.
3. In the Create service account window, type a name for the service account, and select Furnish a new private key. If you want to grant G Suite domain-wide authority to the service account, also select Enable G Suite Domain-wide Delegation. Then click Save.
4. Copy paste the PRIVATE_KEY and CLIENT_EMAIL from the private key json and paste it in the project.

## Authorise Service account
Enable the contacts API in your cloud platform project
Add the Client ID and contacts scope to your google apps admin panel
scope: https://www.googleapis.com/auth/contacts
