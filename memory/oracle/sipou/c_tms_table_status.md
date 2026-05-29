---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/c_tms_table_status.htm
title: "Enhanced Table Status and Functions"
crawled_at: 2026-05-29T14:28:38.831Z
---
# Enhanced Table Status and Functions

[Previous](c_tms_host_section_layout.htm) [Next](t_tms_host_select_table.htm) JavaScript must be enabled to correctly display this content

## Enhanced Table Status and Functions

Enhanced tables provide graphical images that represent dining statuses and indicators. The following example table illustrates several of the status and indicator icons that might appear on a seated table.

Figure 10-1 Table Status Example

  
![This figure shows an example of table status images and indicators.](img/TableExampleWithLabels.gif "This figure shows an example of table status images and indicators.")  

The on-screen table provides a visual indication of the current table and check status and assignment information. The following table information is shown by default.

-   Section Color
    
-   Table Decorator
    
-   Employee Indicator Color
    

You can change the status of:

-   Open Tables
    
-   Occupied Tables
    
-   Closed Tables
    

Long-press on a table without seated guests to see the functions available on an open table. The following table lists the functions you can perform.

Table 10-2 Open Table Functions

Table Function

Description

Quick Seat

Rapidly seat guests at a table without adding them to the Wait List.

An employee assignment done during the Quick Seat process is used only for the guest check started during the Quick Seat process. Use the Assign Employee function to permanently change the employee assigned to the table.

Begin Check

Create a new guest check on the selected table. Using the Begin Check function from the table does not include the guest check in Table Management System reporting. Oracle Hospitality recommends that you do not begin a guest check from this function.

Assign Section

Assign the table to a different section. The section override is valid only for the duration of time in which the current section layout is active. When you activate a new section layout, the override clears.

Select Employee

Assign the table to a different server. The employee override is valid only for the duration of time in which the current section layout is active. When you activate a new section layout, the override clears.

Set as Clean

Indicate that a table is clean and show the Clean table decorator. A clean table is available for seating.

Set as Dirty

Indicate that a table is dirty and show the Dirty table decorator. A dirty table is unavailable for seating.

Close Table

Indicate that a table is closed and show the Closed table decorator. A closed table is unavailable for seating.

Reserve Table

Indicate that a table is reserved for a party arriving in the future and show the Reserved table decorator. A reserved table is not suggested by the system when seating from the Wait List.

Merge Table

Join two or more tables. The application prompts you to select the table to merge into. The tables remain merged until you deactivate the section layout or activate a different layout. Both parent and child tables update the table decorator. The application might prompt you to indicate the number of seats available with the newly merged tables. The cumulative number of seats between all merged tables appears by default.

Change Table Capacity

The application might prompt you to change the seating capacity of a table. The table retains the override capacity until you:

-   Manually update the table
    
-   Deactivate the section layout
    
-   Activate a different layout
    

Long-press on a table with an open guest check to see the functions available on an occupied table. The following table lists the functions you can perform.

Table 10-3 Occupied Table Functions

Table Function

Description

Begin Check

Add a guest check to the selected table. Using the Begin Check function from the table does not include the guest check in Table Management System reporting. Oracle Hospitality recommends that you do not begin a guest check from this function.

Pickup Table (Check#)

Pick up an existing guest check on the table. Ownership of the check transfers to the employee performing the pickup.

Unseat Table (Check #)

Returns the guest to the Wait List and makes the table available. If a guest check was already on the table, it becomes lost.

Assign Section

Assign the table to a different section. The section override is valid only for the duration of time in which the current section layout is active. When you activate a new section layout, the override clears.

Select Employee

Assign the table to a different server. The employee override is valid only for the duration of time in which the current section layout is active. When you activate a new section layout, the override clears. Pre-existing guest checks remain with the original employee.

Set as Clean

Indicate that a table is clean and show the Clean table decorator. A clean table is available for seating.

Set as Dirty

Indicate that a table is dirty and show the Dirty table decorator. A dirty table is unavailable for seating.

Close Table

Indicate that a table is closed and show the Closed table decorator. A closed table is unavailable for seating.

Reserve Table

Indicate that a table is reserved for a party arriving in the future and show the Reserved table decorator. A reserved table is not suggested by the system when seating from the Wait List.

Merge Table

Join two or more tables. The application prompts you to select the table to merge into. The tables remain merged until you deactivate the section layout or activate a different layout. Both parent and child tables update the table decorator. The application might prompt you to indicate the number of seats available with the newly merged tables. The cumulative number of seats between all merged tables appears by default.

Long-press on a closed table to see the functions available. The following table lists the functions you can perform.

Table 10-4 Closed Table Functions

Table Function

Description

Open Table

Indicate that a table is open and remove the Closed table decorator. An open table is available for seating.

Change Table Capacity

The application might prompt you to change the seating capacity of a table. The table retains the override capacity until you:

-   Manually update the table
    
-   Deactivate the section layout
    
-   Activate a different layout
    

**Related Topics**

-   [Hiding Colors and Table Decorators from a Table](t_tms_hide_colors_decorators.htm)
-   [Employee Section Assignment Report](r_tms_employee_section_assignment_report.htm)
-   [Table Management System Gestures](r_tms_gestures.htm)

**Parent topic:** [Dining Room Management](c_tms.htm)
