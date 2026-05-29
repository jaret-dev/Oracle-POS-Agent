---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/t_checks_send_mi_kds_check_open_ug.htm
title: "Sending Items to Order Devices While Remaining on the Check"
crawled_at: 2026-05-29T14:28:34.969Z
---
# Sending Items to Order Devices While Remaining on the Check

[Previous](t_checks_fire_mi.htm) [Next](t_checks_refire_items.htm) JavaScript must be enabled to correctly display this content

## Sending Items to Order Devices While Remaining on the Check

1.  Begin a check and add menu items.
2.  Click the Send and Stay Service Total tender key. Menu items are sent to order devices.
    
    Sent menu items are treated as previous round menu items. The check preview on the open check screen lookup (SLU) shows yellow for other workstations in the revenue center.
    
3.  If your system has workstation alerting enabled and menu items fail to send to the order device/KDS or kitchen printer, the Alerts function key flashes in one or more status bars. To handle the alert notification and ensure that the kitchen staff is aware of items which need to be prepared:
    1.  Click one of the following function keys:
        
        -   Alerts
            
        -   Show Checks With Failed Prints To KDS/Order Device
            
        
        The Checks Failed to Print on Order Device dialog appears listing all checks (for the currently signed in employee) with items that failed to send to an order device. This dialog also lists the order devices which did not confirm receiving the print job.
        
    2.  Select a check in the list, and then click the View button.
    3.  On the Check – Items Failed To Print On Order Devices dialog, note the items and order devices, and then notify the kitchen staff of the menu items that did not reach the kitchen for preparation.
        
        If the POS client device loses wireless network connectivity, return to the range of Wi-Fi coverage to ensure that items are sent to the order device.
        
        If the kitchen printer is out of paper, add a paper roll to the printer.
        
        If the KDS Controller or Print Controller is turned off, restart it.
        
    4.  After remedying the situation, click the Acknowledge button. The check item is removed from the list.
        
        To return to the Checks Failed to Print on Order Device dialog if there are more alerts to be acknowledged, click the OK button.
        
        To close the Check – Items Failed To Print On Order Device dialog without taking action, click the Cancel button; the Alerts button will continue to flash for 30 minutes from the time of failure of the last check.
        
        The list of checks with unsent items will follow the employee from workstation to workstation.
        
4.  Add more menu items to the check.
5.  Repeat Steps 2 through 4 until you complete the order for the current round.
6.  End the current service round by sending the remaining items to the order devices.

**Related Topics**

-   [Order Handling on Open Checks](c_checks_order_handling_open_checks_ug.htm)
-   [Indicators on the Employee Check Journal Report](r_checks_held_check_indicators_emp_journal_report.htm)

**Parent topic:** [Guest Checks](c_checks.htm)
