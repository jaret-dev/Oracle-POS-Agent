---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/t_start_shift_increment.htm
title: "Incrementing a Shift"
crawled_at: 2026-05-29T14:28:34.575Z
---
# Incrementing a Shift

[Previous](t_start_shift_clock_in_out.htm) [Next](t_start_shift_tip_track.htm) JavaScript must be enabled to correctly display this content

## Incrementing a Shift

When a shift increments, the employee’s financial report resets to 0 (zero). This process often occurs when:

-   An employee works a double shift and the employee must make a deposit at the end of each shift. For example, an employee can work the breakfast shift and make a deposit of all cash due. Then, the employee can increment the shift so the lunch shift starts at 0.00. At the end of the lunch shift, the employee knows how much money to deposit without having to subtract the breakfast totals.
    
-   A shift spans a business day. For example, if an employee’s shift is from 1:00 a.m. to 9:00 a.m., and Start of Day runs at 3:00 a.m., you can configure Simphony so the employee’s report shows all activity from 1:00 a.m. to 9:00 a.m. In this situation, the employee’s report does not reset at 3:00 a.m.
    

You can increment shifts using the Employee PMC Procedure or with one of the increment shift function keys.

1.  To increment a shift, select one of the following function keys:
    
    -   863 - Increment Employee Shift for Signed-In Operator: Select this key to increment the shift for the signed-in workstation operator.
        
    -   864 - Increment Employee Shift, Prompt: Select this key to have the workstation show a list of employees. You can then select an employee and click the Increment Shift link.
        
    -   865 - Increment Cashier Shift for Signed-In Operator: Select this key to have the workstation increment the shift for the cashier associated with the signed-in workstation operator or the cashier associated with the workstation.
        
    -   866 - Increment Cashier Shift, Prompt: Select this key to have the workstation show a list of cashiers. You can then select a cashier and click the Increment Shift link.
        
    
2.  To increment a shift for the employee signed in to the workstation using the PMC Procedure, click Increment Current Employee Shift.

**Parent topic:** [Start of Shift](c_start_shift.htm)
