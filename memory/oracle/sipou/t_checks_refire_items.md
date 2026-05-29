---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/t_checks_refire_items.htm
title: "Re-firing Items to the Order Device"
crawled_at: 2026-05-29T14:28:34.983Z
---
# Re-firing Items to the Order Device

[Previous](t_checks_send_mi_kds_check_open_ug.htm) [Next](t_checks_hold_mi.htm) JavaScript must be enabled to correctly display this content

## Re-firing Items to the Order Device

If you have the appropriate privilege, you can use the Re-fire command to re-send items to the order device.

You cannot re-fire items from the following types of checks:

-   Closed Checks
    
-   Training Checks
    
-   Waste Checks
    
-   Autofire Checks
    

The re-fire function is not supported with Dynamic Order Mode (DOM). Menu items configured with Timed Fire cannot be re-fired using the re-fire functionality.

Re-firing items is not allowed when there is activity in the current round.

1.  Pick up the check that has been Service Totaled and contains the items.
2.  Select one or more items to re-send to the order device, click the Re-fire button, and then click OK.
    
    After the items are sent to the kitchen, the transaction is automatically canceled to avoid further activity that round. Printed orders include a Re-fire header line. KDS orders show a Re-fire indicator.
    

**Related Topics**

-   [Order Handling on Open Checks](c_checks_order_handling_open_checks_ug.htm)
-   [Indicators on the Employee Check Journal Report](r_checks_held_check_indicators_emp_journal_report.htm)

**Parent topic:** [Guest Checks](c_checks.htm)
