---
source: rause
url: https://docs.oracle.com/en/industries/food-beverage/back-office/rause/c_BI_API_permissions.htm
title: "Business Intelligence API"
crawled_at: 2026-05-29T14:28:44.089Z
---
# Business Intelligence API

[Previous](t_API_user_add.htm) [Next](c_STSG2_API_permissions.htm) JavaScript must be enabled to correctly display this content

The Business Intelligence API lets you query the Reporting and Analytics database on demand for transactional, operational, and kitchen data.

Adding an API Account

The information needed to add an API account depends on the API for which you are adding the account. When you add an account for the Business Intelligence API, select Business Intelligence API as the account type. See [Adding API Accounts](t_API_user_add.htm "Create an API administrator account for managing API user accounts.").

Permissions

The following table describes Business Intelligence API permissions for totals and point-of-sale definitions. Assigning any one of the permissions to an API account also grants the API account access to all the point-of-sale definitions.

Data Access Permission

Grants Access to

Sales and Operations

All the operational daily totals, guest checks, non-sale transactions, journal log, and control totals.

Kitchen Performance

Kitchen display system's performance details.

Cash Management

Cash management and cash management adjustment details.

Employee Performance

Employee daily totals.

Labor General

Job code daily totals.

Fiscal

Fiscal invoice data, totals, and invoice control data.

Extensibility

Guest check extensibility data.

The following table describes permissions for definitions only.

Data Access Permission

Grants Access to

Point of sale (POS) definitions

All point of sale definitions.

Personal Identifiable Information

Definitions with personal identifiable information like employees.

**Parent topic:** [API Accounts](c_API_accounts.htm "API user accounts let you connect to Reporting and Analytics through web services.")
