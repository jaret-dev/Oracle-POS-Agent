---
source: simmu
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/simmu/t_manager_procedures_transfer_android_logs_to_caps.htm
title: "Transferring Log Files from an Android Device to CAPS"
crawled_at: 2026-05-29T14:28:40.913Z
---
# Transferring Log Files from an Android Device to CAPS

[Previous](t_manager_procedures_caps_database.htm) [Next](t_manager_procedures_void_mi_closed_check.htm) JavaScript must be enabled to correctly display this content

You can enable the automatic transfer of logs from Android devices to the main workstation (known as the Check and Posting Server or CAPS) for support purposes. The frequency of the transfer can be set from 30 minutes up to every 8 hours.

This functionality allows log files to be retained on the CAPS machine for a longer time period than they may be available on the Android device. These logs can be easily accessed and viewed on CAPS to ensure that Android devices are working properly, or to analyze issues.

The Transfer Logs feature is supported with devices running Android versions 7 through 11, and Adyen Castles devices running Android versions 9 and 10.

1.  On the Android device, press the Launch PMC function key.
2.  Press Support.
3.  On the Support page, press Transfer Logs. The Transfer Logs dialog appears.
4.  Press Enable Log Transfer, and then select the Frequency of Log Transfer.
    
    By default, Enable Log Transfer is checked, and the Frequency of Log Transfer is set to 1 hour.
    
5.  Press Close.
    
    When the logs are rotated on the Android device, the two most recent archived log files are zipped and then transferred to CAPS based on the Frequency of Log Transfer. These logs are stored in the …\\EGatewayLog\\POSClientLogs folder on the CAPS machine.
    

**Parent topic:** [Manager Tasks for Workstation Reports and Procedures](c_manager_tasks_ws_reports_procedures.htm)
