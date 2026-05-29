---
source: simmu
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/simmu/t_ecm_assign_user_till.htm
title: "Assigning a User to a Till"
crawled_at: 2026-05-29T14:28:41.858Z
---
# Assigning a User to a Till

[Previous](t_ecm_assign_till_cash_drawer.htm) [Next](t_ecm_quick_start.htm) JavaScript must be enabled to correctly display this content

Depending on the configuration, you can assign one or more users to the till session on the workstation. Users that are assigned to a till session are automatically assigned to a second till that is also assigned to the workstation to support acceptance of multiple currencies based on change configuration for a currency class. For example, if users are assigned to one till (with Euro currency only) and change is issued in US Dollars, access is required for the second till on the same workstation that has US Dollars only. Thus, users from both till sessions are automatically assigned to both tills so that change can be issued.

1.  Select the function to assign a user to a till.
2.  Depending on your configuration, select one of the following:
    
    -   Highlight an employee, and then click Add to add the employee to the assigned list. Repeat this step if more than one employee can use the till.
        
    -   Click Add All to add all employees to the assigned list.
        
    
    If you attempt to assign a till that already belongs to another user when the configuration is restricted to a single user per till, the following error message appears: Only One Employee can be Assigned to Till.
    
3.  Click Save to complete the assignments.
4.  Click Yes at the prompt to confirm.

**Related Topics**

-   [Till and User Assignment](c_ecm_till_user_assignment.htm)

**Parent topic:** [Enterprise Cash Management (ECM)](c_ecm_operations.htm)
