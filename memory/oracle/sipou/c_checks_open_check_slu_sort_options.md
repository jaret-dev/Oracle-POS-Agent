---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/c_checks_open_check_slu_sort_options.htm
title: "Open Check SLU Sorting Options"
crawled_at: 2026-05-29T14:28:34.808Z
---
# Open Check SLU Sorting Options

[Previous](c_checks_order_channel_change.htm) [Next](c_checks_order_handling_open_checks_ug.htm) JavaScript must be enabled to correctly display this content

## Open Check SLU Sorting Options

After beginning a check, the primary sort order for the check SLU depends on the pre-defined sort order configured in the EMC.

-   Check Open Time: Open checks appear in the order in which they are created (opened) in the check SLU, with the earliest time shown first. This is the default sort order.
    
-   Table Name: Open checks started with a table name or number appear in alphanumeric order in the check SLU. Checks without table names or numbers appear first before table name/number checks.
    
-   Service Total Time: Open checks appear in the order in which they are service totaled. The earliest service total time is shown first. This is useful for drive thru operations where checks are ordered in the same sequence as cars entering the drive thru. Workstation operators are able to pick up checks quickly and service guests efficiently with their drive thru orders.
    

Sort Order Overrides:

When options 65 - Sort Check SLU by Table Name (in the RVC Parameters module) or 23 - Sort Check SLU by Table Name (in the Employee Classes module or the Employee Maintenance module (Operator Records tab)) are enabled in the EMC and no table name/number is used, the secondary sort order is determined by the check SLU sort order configuration.

Sort Order Exceptions:

The following scenarios do not follow the check SLU sort order:

-   When Table Name sort order is enabled, checks using a Check Name (ID), where the name or ID is a customer reference, are shown first in the Check SLU in alphabetical order so they can be easily identified.
    
-   Autofire (future) checks are listed at the end of the check SLU, irrespective of the sort order setting, and follow regular checks chronologically sorted by scheduled fire date/time.
    

**Parent topic:** [Guest Checks](c_checks.htm)
