---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/c_checks_team_service_check_handling.htm
title: "Transaction Handling with Team Checks"
crawled_at: 2026-05-29T14:28:35.412Z
---
# Transaction Handling with Team Checks

[Previous](c_checks_team_check.htm) [Next](c_checks_team_service_adjustment.htm) JavaScript must be enabled to correctly display this content

## Transaction Handling with Team Checks

Team members can only post menu items, discounts, service charges, or tenders to a team check when the corresponding Role privileges are granted.

Team Service is not supported with fast transactions (transactions you start without using a Begin Check function key) and Autofire checks. However, after an Autofire check fires, a team can be assigned because it is then considered a regular check.

Transaction Handling When Offline

Team Service operations are available when CAPS is offline. If a service team is created when CAPS is offline, team members should access checks of that team only from the workstation where the team was created as only that workstation is aware of the team. If a team check for that team is picked up at different workstations, it changes to a regular (non-team) check since the team is not recognized.

When CAPS is back online, it updates with all team changes made. Team check transactions should be limited to the originating workstation until the CAPS workstation is updated with all of the team changes. If a team is created at two different workstations with the same name when CAPS is offline, when it is back online, it resolves the duplicated team names (which in normal conditions is not allowed) by appending /1 to one of the team names. For example, if two workstations have a team named Front Team, when CAPS is restored, it renames one of the team names to Front Team/1.

**Related Topics**

-   [Creating a Service Team](t_checks_create_service_team.htm)
-   [Adding Employees to an Existing Service Team](t_checks_add_new_emps_service_team.htm)
-   [Removing an Employee from a Service Team](t_checks_remove_emps_service_team.htm)
-   [Printing Team Member Names](t_checks_print_service_team.htm)
-   [Deleting a Service Team](t_checks_delete_service_team.htm)
-   [Creating a Team Check](t_checks_create_team_check.htm)
-   [Adding a Service Team to an Open Check](t_checks_add_service_team_to_check.htm)
-   [Removing a Service Team From an Open Team Check](t_checks_remove_service_team_from_check.htm)

**Parent topic:** [Guest Checks](c_checks.htm)
