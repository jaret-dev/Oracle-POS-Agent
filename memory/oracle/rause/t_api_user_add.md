---
source: rause
url: https://docs.oracle.com/en/industries/food-beverage/back-office/rause/t_API_user_add.htm
title: "Adding API Accounts"
crawled_at: 2026-05-29T14:28:43.925Z
---
# Adding API Accounts

[Previous](c_API_accounts.htm) [Next](c_BI_API_permissions.htm) JavaScript must be enabled to correctly display this content

Create an API administrator account for managing API user accounts.

**Parent topic:** [API Accounts](c_API_accounts.htm "API user accounts let you connect to Reporting and Analytics through web services.")

### Adding an API Administrator Account

1.  Add a role for administering API user accounts or edit an existing role.
    
    When you create or edit the role, assign the API Accounts system privilege View/Add/Edit/Delete API Accounts to the role. For example, create a role named API User Administration.
    
2.  Add a user that can administer API user accounts and assign the user to the role you created or edited (for example, API User Administration).

### Adding API User Accounts

You must have the View/Add/Edit/Delete API Accounts privilege to add API accounts.

1.  In Reporting and Analytics, click the side navigation menu, click Administration, click System, click API Accounts, and then click Add API Account.
2.  Specify account details as described in the following table. The API for which you are adding the account determines the values that you specify.
    
    Field
    
    Description
    
    Username
    
    Enter a unique user name.
    
    Email
    
    Enter the user’s email address.
    
    Type
    
    Select the feature that the API account will have access to.
    
    Client Scope, Authorization Scope
    
    If you selected Simphony Transaction Services from the Type drop-down, specify the client scope and authorization scope. See [Simphony Transaction Services API](c_STSG2_API_permissions.htm).
    
    Enterprise Location or Level
    
    If you selected Business Intelligence API, select the locations or levels for which the API returns data.
    
    Data Access Permissions
    
    If you selected Business Intelligence API, specify the type of data the account can access. See [Business Intelligence API](c_BI_API_permissions.htm "The Business Intelligence API lets you query the Reporting and Analytics database on demand for transactional, operational, and kitchen data.").
    
3.  Click Add.
    
    A unique Client ID value is generated for the API account. Use the ID to authenticate the API account before making API calls to the Reporting and Analytics database. You can retrieve an ID for an account by searching for the account on the API Accounts page and then clicking the account.
    
    The API account user receives a Welcome email with instructions on how to set the password for the account.
    
4.  To edit an account, select it from the account list and make your changes.
