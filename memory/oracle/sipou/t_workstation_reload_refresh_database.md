---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/t_workstation_reload_refresh_database.htm
title: "Updating Workstations After Configuration Changes"
crawled_at: 2026-05-29T14:28:34.461Z
---
# Updating Workstations After Configuration Changes

[Previous](c_workstation_unsent_checks_warning.htm) [Next](t_workstation_reload_refresh_caps_database.htm) JavaScript must be enabled to correctly display this content

## Updating Workstations After Configuration Changes

When an administrator makes configuration changes, workstations automatically download the new information based on the EMC’s database update frequency settings. If you want to force an immediate update to workstations, you can use the following functions to save time:

Table 1-1 Workstation Database Actions

Action

Description

Reload

Reloads the workstation database to immediately get the latest information. You cannot reload the database of workstations that are offline.

The process of reloading downloads the entire database to the workstation. Reloading may take longer to complete due to the large amount of information being sent.

Refresh

Refreshing the database allows workstations to download the latest EMC configuration changes since the workstation’s last database update.

Redraw Page Content

Flushes and redraws all pages with any newly added content. The difference between this function and the Reload and Refresh functions is that Redraw Page Content updates the page that the button is on, without you having to log out and log back onto the workstation. Updates occur after you navigate away from the page and then return to it.

You must have the appropriate privileges to use the Reload, Refresh, and Redraw functions.

1.  To reload the workstation database, click the Reload Workstation Database function key.
2.  To set the workstation to start a job in the background to download the configuration changes, click the Refresh Database function key.
3.  To set the workstation to start a job in the foreground to download the configuration changes, click the Refresh Database Live function key. When you are running a database refresh in the foreground, you cannot perform other tasks on the workstation until the update completes.
4.  To redraw all pages with any newly added content, click the Redraw Page Content function key.

**Parent topic:** [Basic Workstation Operations](c_workstation.htm)
