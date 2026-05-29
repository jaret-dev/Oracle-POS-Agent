---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/c_workstation_unsent_checks_warning.htm
title: "Warning Messages for Unsent Checks"
crawled_at: 2026-05-29T14:28:34.463Z
---
# Warning Messages for Unsent Checks

[Previous](c_mobile_battery_warnings.htm) [Next](t_workstation_reload_refresh_database.htm) JavaScript must be enabled to correctly display this content

## Warning Messages for Unsent Checks

Warning messages appear on Windows and Linux workstations and Android mobile devices when the POS client is disconnected from the Check and Posting Service (CAPS) and there are unsent checks. The messages appear as a translucent yellow banner at the top of all pages outside a transaction. They do not appear when a transaction is in progress so as not to distract from, or slow down, the order taking process.

After posting a transaction, there is a 30-second delay to enable checks to send before a warning message appears. The warnings make the server aware of an issue so that they can either move the device back into network range or alert a manager that there is a connection issue.

The warning messages show the number of unsent transactions on the device so that when a solution is found, servers can see the number decrease and know that the issue has been resolved. Warnings appear by default and cannot be switched off.

When a workstation operator selects a function that starts or picks up a check, the warning message disappears. This includes options such as Adjust Closed Check, Pickup Check, and Begin Autofire Check (not just the Begin Check functions).

The message disappears if tapped. This allows access to buttons or status bar information under the message. The message will reappear when there is another unsent check or if the workstation operator changes pages.

Figure 1-6 Unsent Check Warning on Workstation and Tablet Sign In Page

  
![This figure shows the unsent checks banner on the sign in page using the POS client for the workstation or tablet UI.](img/unsent_checks_workstation_signin.png "This figure shows the unsent checks banner on the sign in page using the POS client for the workstation or tablet UI.")  

Figure 1-7 Unsent Check Warning on Workstation and Tablet Start Check

  
![This figure shows the unsent checks banner on the transaction page using the POS client for the workstation or tablet UI.](img/unsent_checks_workstation_start_check.png "This figure shows the unsent checks banner on the transaction page using the POS client for the workstation or tablet UI.")  

Figure 1-8 Unsent Check Warning on Mobile Phones and Handheld Sign In Page

  
![This figure shows the unsent checks banner on the sign in page using the POS client for the mobile UI.](img/unsent_checks_mobile_signin.png "This figure shows the unsent checks banner on the sign in page using the POS client for the mobile UI.")  

Figure 1-9 Unsent Check Warning on Mobile Phones and Handheld Start Check

  
![This figure shows the unsent checks banner on the transaction page using the POS client for the mobile UI.](img/unsent_checks_mobile_start_check.png "This figure shows the unsent checks banner on the transaction page using the POS client for the mobile UI.")  

**Parent topic:** [Basic Workstation Operations](c_workstation.htm)
