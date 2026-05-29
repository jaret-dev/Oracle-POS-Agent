---
source: rause
url: https://docs.oracle.com/en/industries/food-beverage/back-office/rause/t_report_hierarchy_creating.htm
title: "Creating Reporting Hierarchies"
crawled_at: 2026-05-29T14:28:44.143Z
---
# Creating Reporting Hierarchies

[Previous](c_bar_charts.htm) [Next](t_categorygroups_creating.htm) JavaScript must be enabled to correctly display this content

Establish organizational relationships between locations and levels.

If the organizational hierarchy and the reporting hierarchy are different, then the location results in iQuery and reports will not be aligned.

1.  In Reporting and Analytics, click the side navigation menu, click Configuration, click Warehouse Admin, click Reporting Hierarchies, and then click Hierarchies.
2.  Click Add.
3.  Type a hierarchy name (for example, District 1).
4.  Add levels to the hierarchy:
    1.  Click the side navigation menu, click Configuration, and then click Reporting Levels.
    2.  Click Add.
    3.  Type a reporting level name (for example, Free-standing).
    4.  Click Save.
    5.  Repeat these substeps to add more levels.
5.  Establish relationships between levels:
    1.  Click the side navigation menu, click Configuration, and then click Reporting Hierarchy Relationships.
    2.  Select the reporting hierarchy name and then click Select.
    3.  Click Assign Level.
    4.  Select the level (for example, Free-standing).
    5.  Select the parent level. If the level you are assigning is the first level, select No Parent from the Parent Level Name drop-down list.
    6.  Click Assign Level.
    7.  Repeat these substeps to assign more levels.
6.  Establish relationships between levels and locations:
    1.  Click Assign Location.
    2.  Select the location (for example, Columbia).
    3.  Select the parent level for the location (for example, Free-standing).
    4.  Click Assign Location.
    5.  Repeat these substeps to establish remaining level-location relationships.

**Parent topic:** [Reports](c_reports.htm "Build original reports, manage the reports on your dashboard, organize your most frequently viewed reports, and create custom reports in Excel with iquery.")
