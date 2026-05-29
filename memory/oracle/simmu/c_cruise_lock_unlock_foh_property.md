---
source: simmu
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/simmu/c_cruise_lock_unlock_foh_property.htm
title: "POS Operations Management"
crawled_at: 2026-05-29T14:28:41.058Z
---
# POS Operations Management

[Previous](t_manager_tasks_enable_disable_srm.htm) [Next](t_cruise_lock_unlock_foh_property.htm) JavaScript must be enabled to correctly display this content

Authorized workstation operators can lock and unlock workstations, transactions, and revenue centers from a workstation to avoid sales transactions during critical times. You can perform locking and unlocking operations individually or in groups.

You can prevent transactions in certain revenue centers for limited time periods, such as when running Start of Day (SOD), balancing the PMS and POS, and updating the application.

When a workstation is offline from the Check and Posting Service (CAPS) while submitting a workstation action (lock or unlock), the submitted command is queued and played as soon as possible. The following table lists offline workstation scenarios and describes the action results.

Table 3-1 Workstation Offline Scenarios

Workstation Offline From CAPS

Description of Lock and Unlock Outcome

Workstation from which the lock/unlock action occurs is offline from CAPS

Lock or unlock only the offline workstation

Workstation that is being locked/unlocked (action performed from another workstation) is offline from CAPS

Lock or unlock action occurs after the workstation resumes connection to CAPS

-   [Locking and Unlocking POS Operations From the Property](t_cruise_lock_unlock_foh_property.htm)  
    
-   [Closing a Workstation](t_cruise_close_application.htm)  
    
-   [Updating and Reloading the Workstation Database](t_cruise_update_reload_workstation_database.htm)  
    
-   [Running Start of Day Manually](t_cruise_run_sod_manually.htm)  
    
-   [Closed Guest Check Operations](c_closed_check_operations.htm)  
    
-   [Adjusting a Closed Check](t_closed_check_adjust.htm)  
    
-   [Reopening a Closed Check](t_closed_check_reopen.htm)  
    
-   [Reprinting a Closed Check](t_closed_check_reprint.htm)  
    

**Related Topics**

-   [Locking and Unlocking POS Operations From the Property](t_cruise_lock_unlock_foh_property.htm)
-   [Closing a Workstation](t_cruise_close_application.htm)
-   [Updating and Reloading the Workstation Database](t_cruise_update_reload_workstation_database.htm)
-   [Running Start of Day Manually](t_cruise_run_sod_manually.htm)
