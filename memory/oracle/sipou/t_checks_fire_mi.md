---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/t_checks_fire_mi.htm
title: "Firing Menu Items on a Check"
crawled_at: 2026-05-29T14:28:35.111Z
---
# Firing Menu Items on a Check

[Previous](c_checks_order_handling_open_checks_ug.htm) [Next](t_checks_send_mi_kds_check_open_ug.htm) JavaScript must be enabled to correctly display this content

## Firing Menu Items on a Check

The Fire Now feature cannot be used with Dynamic Order Mode (DOM).

1.  Begin a check and add menu items.
2.  Click the Fire Now function key. The Fire Now dialog appears, listing menu items that do not have a status indicator (for example, Held or Timed Fire).
3.  Select one or more menu items from the Fire Now dialog.
    
    To filter menu items based on seat, course, Major Group or Family Group (limiting the menu items shown in the dialog), click one of the following buttons:
    
    -   Fire By Seat
        
    -   Fire By Course
        
    -   Fire By Major Group
        
    -   Fire By Family Group
        
    
4.  Click the Fire button to fire the selected menu items to the order device.
    
    Fired menu items are treated as previous round menu items. The previous round indicator (asterisk \*) appears adjacent to fired items in the check detail area. Non-fired items are current round menu items.
    
5.  To cancel a transaction containing fired items prior to performing a Service Total, click the Transaction Cancel function key, and then click Yes to confirm.
    
    Items that were fired remain on the check with a previous round indicator. Non-fired menu items are discarded from the check.
    
6.  To void a transaction containing previous round fired items:
    1.  Select one or more fired menu items in the check detail area, and then click the Void function key.
    2.  If prompted, select a void reason, and then click OK. Items are voided from the check detail area.
    3.  To fire voided items to the order device, perform one of the following operations by clicking the function key:
        
        -   Fire Now: When pressed, the Fire Now dialog appears with the voided menu items marked with an asterisk (\*).You must select the voided menu items and then click Fire to send the items to the order devices.
            
        -   Send and Stay
            
        -   Service Total
            
        
        The voided items are sent to the order device and are indicated by a void icon adjacent to the items in the order device.
        

**Parent topic:** [Guest Checks](c_checks.htm)
