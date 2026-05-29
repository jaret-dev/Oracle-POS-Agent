---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/c_tms_host_command_display_legend.htm
title: "Host Command Area, Display, and Legend"
crawled_at: 2026-05-29T14:28:38.771Z
---
# Host Command Area, Display, and Legend

[Previous](c_tms.htm) [Next](c_tms_host_dining_table_status.htm) JavaScript must be enabled to correctly display this content

## Host Command Area, Display, and Legend

Host Command Area

In most cases, the administrator creates the hosting page with a designated Host Command Area. The Host Command Area contains many of the hosting staff and manager functions for the table management system (TMS).

Host Display

The Host Area Display option allows you to view the following information:

-   Show Legend
    
-   Show and Hide Dining Table Status
    
-   Show and Hide Reservation List
    
-   Show and Hide Employee Lines
    
-   Show and Hide Wait List
    
-   Show and Hide Section Layout
    
-   Show and Hide Sections
    
-   Show and Hide Table Decorators
    
-   Show and Hide Employees
    

Information that appears dimmed has not been configured for use in the Host Area.

Host Legend

The Legend Area show information about the following visual features of the Table Management System (TMS):

-   Table Decorators
    
    The decorators indicate one or more table statuses. A decorator covers all or a portion of the table in the Dining Table Layout screen. You can hide certain decorators by removing the check mark next to the decorator and clicking OK. The table decorators are preset in the application.
    
    Table 10-1 Table Decorators
    
    Decorator
    
    Description
    
    Clean
    
    The table is clean.
    
    Dirty
    
    The table is dirty.
    
    Close
    
    The table is closed.
    
    Reserved
    
    The table is reserved.
    
    Parent
    
    The table is a parent to one or more child tables. This is the primary table when joining tables.
    
    Child
    
    These tables are joined to a parent table.
    
    Seated
    
    Hosting staff recently seated a guest at the table.
    
    Occupied
    
    A guest is occupying the table.
    
    Printed
    
    The server printed the guest check for the guests at the table.
    
    Paid
    
    The guests at the table tendered the guest check.
    
    User Suggested
    
    This is the table that the host or guest requested as part of the reservation or wait request. This decorator appears only when you select a request that is waiting to be seated.
    
    System Suggested
    
    This is the table at which the system suggests the reservation or wait request be seated based on configuration to more efficiently manage dining activities. This decorator appears only when you select a request that is waiting to be seated.
    
    Selected
    
    This decorator indicates that you have selected the table and it is available for an action or update. You can select more than one table. This table decorator cannot be hidden.
    
-   Course Decorators
    
    Course decorators show the current dining course for the guests on the table. Updates to the table occur as menu items are saved to the guest check and when a specific event occurs in the Kitchen Display System (KDS) (such as bumping an order).
    
-   Employee Colors
    
    A color assigned to the employee appears on the host page to distinguish one employee from another. All TMS features that show the employee use this color as the employee indicator. If no TMS Color is defined for the employee’s Operator record, white appears to identify the employee.
    
-   Section Colors
    
    A section color indicates tables that are assigned to sections.
    
-   Service Alerts
    
    Service Alerts can change the Alert color window, based on the length of elapsed time since a server performed an action on the guest check for the table. When an action occurs, the Service Alert resets and the counter starts at zero. The Service Alert also shows the cover count for the table. If multiple guest checks are open on the table, the Service Alert also shows the number of checks and cover count for each check.
    
-   Check Alerts
    
    Check Alerts can change the Alert color window, based on the length of elapsed time for the guest check on the table. The Check Alert indicates the length of time (in hours and minutes) the guest has occupied the table and whether the table is expected to be available soon.
    
-   Employee Totals
    
    The Employee Totals window appears after you click the More button in the Legend. Employee Totals provides information about the current workload and statistics for servers assigned to tables in the revenue center for the current business date. Click OK to close the Employee Totals window and return to the Legend.
    

**Related Topics**

-   [Hiding Colors and Table Decorators from a Table](t_tms_hide_colors_decorators.htm)
-   [Employee Section Assignment Report](r_tms_employee_section_assignment_report.htm)
-   [Table Management System Gestures](r_tms_gestures.htm)

**Parent topic:** [Dining Room Management](c_tms.htm)
