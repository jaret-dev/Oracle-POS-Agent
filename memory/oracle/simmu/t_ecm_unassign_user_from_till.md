---
source: simmu
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/simmu/t_ecm_unassign_user_from_till.htm
title: "Unassigning a User From a Till"
crawled_at: 2026-05-29T14:28:42.035Z
---
# Unassigning a User From a Till

[Previous](t_ecm_pull_cash.htm) [Next](t_ecm_unassign_till_from_cash_drawer.htm) JavaScript must be enabled to correctly display this content

Unassigning a user from the till does not close the till; it prevents the user from performing additional transactions on the till. Users that are unassigned from a till session are automatically unassigned from a second till that is also assigned to the workstation to support acceptance of multiple currencies based on change configuration for a currency class. For example, if users are unassigned from one till (with Euro currency only) and change is issued in US Dollars, access is removed for the second till on the same workstation that has US Dollars only. Thus, users from both till sessions are automatically unassigned from both tills.

1.  Select the function to unassign a user from a till.
2.  Depending on the configuration, select one of the following:
    
    -   Highlight an employee, and then click Remove to remove the employee from the assigned list. Repeat this to unassign more than one employee.
        
    -   Click Remove All to remove all assigned employees.
        
    
3.  Click Save to complete the unassignments.
4.  Click Yes at the prompt to confirm.

**Related Topics**

-   [Till and User Assignment](c_ecm_till_user_assignment.htm)

**Parent topic:** [Enterprise Cash Management (ECM)](c_ecm_operations.htm)
