---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/c_mobile_battery_warnings.htm
title: "Battery Indicator Warning Messages"
crawled_at: 2026-05-29T14:28:34.437Z
---
# Battery Indicator Warning Messages

[Previous](c_workstation.htm) [Next](c_workstation_unsent_checks_warning.htm) JavaScript must be enabled to correctly display this content

## Battery Indicator Warning Messages

Battery indicator warning messages appear on Android mobile phone devices if the battery percentage is 15% or less, advising the server to recharge the device. If the battery percentage is 5% or less, servers cannot use a function that opens a check. Servers need to confirm the battery warning message, and these entries are logged in the Employee Journal Report. The warning messages appear by default and cannot be switched off.

If the battery life on a mobile device is greater than 5% and less than or equal to 15%, a warning message appears after the workstation operator signs in to the POS and when a function is selected that starts a check. The message shows the battery life percentage and advises the operator to recharge the device as soon as possible. The message must be acknowledged by the operator before continuing, and the acknowledgement is logged.

Figure 1-1 Low Battery Warning

  
![This figure shows the low battery warning message when the battery percentage is greater than 5% and less than or equal to 15%. The operator can click OK.](img/mobile_low_battery_warning.png "This figure shows the low battery warning message when the battery percentage is greater than 5% and less than or equal to 15%. The operator can click OK.")  

If the battery life on a mobile device is equal to or less than 5%, an error message appears after the workstation operator signs in to the POS, informing the operator to recharge the device now.

Figure 1-2 Critical Battery Warning at Less Than 5 %

  
![This figure shows the critical battery warning message when the battery percentage is equal to or less than 5%. The operator can click OK.](img/mobile_critical_battery_warning_less_than_5_percent.png "This figure shows the critical battery warning message when the battery percentage is equal to or less than 5%. The operator can click OK.")  

An error message appears when a function is selected that opens a check. The operator is prevented from opening the check until the battery percentage is more than 5%.

Figure 1-3 Critical Battery Warning on Open Check Function

  
![This figure shows the critical battery warning message when a function is selected that opens a check. The operator can click OK.](img/mobile_critical_battery_warning_open_check.png "This figure shows the critical battery warning message when a function is selected that opens a check. The operator can click OK.")  

A Battery Percentage Warning entry is written to the Employee Journal Report when the battery life is greater than 5% and less than or equal to 15%. An error message is written to the Employee Journal Report when the battery life is equal to or less than 5%. The journal entry logs the battery percentage and the operator that selected OK to the message.

Figure 1-4 Battery Percentage Warning

  
![This figure shows the Battery Percentage Warning that is written to the Employee Journal Report when the operator selects OK.](img/mobile_battery_percentage_warning.png "This figure shows the Battery Percentage Warning that is written to the Employee Journal Report when the operator selects OK.")  

A Battery Percentage Error is written to the Employee Journal Report when the operator opens a check and the battery life is equal to or less than 5%. The journal entry logs the battery percentage and the operator that selected OK to the message.

Figure 1-5 Battery Percentage Error

  
![This figure shows the Battery Percentage Error that is written to the Employee Journal Report when the operator selects OK.](img/mobile_battery_percentage_error.png "This figure shows the Battery Percentage Error that is written to the Employee Journal Report when the operator selects OK.")  

**Parent topic:** [Basic Workstation Operations](c_workstation.htm)
