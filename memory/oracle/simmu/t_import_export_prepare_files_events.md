---
source: simmu
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/simmu/t_import_export_prepare_files_events.htm
title: "Preparing Event Data Files for Import"
crawled_at: 2026-05-29T14:28:42.744Z
---
# Preparing Event Data Files for Import

[Previous](t_import_export_import_file_menu_items.htm) [Next](t_import_export_import_file_events.htm) JavaScript must be enabled to correctly display this content

Because there are relationships between the databases and event information, you must import event data files in a specific order. Importing event data files out of order causes the import job to fail and an inability to add the new events on the POS client workstations.

After you export the required event data files but before you import the files, ensure that certain values contained in the prospective import files match in specific columns and rows.

1.  Open the export file that contains the Event Type data, and then record the value of the Id column for each event type to be imported.
2.  Open the export file that contains the Event Sub Type data, and then record the value of the GroupEventType column for each sub event to be imported.
    
    To associate an Event Sub Type with a specific Event Type, verify that the value in the Id column of the Event Type data file matches the value of the GroupEventType column in the Event Sub Type data file.
    
3.  Open the export file that contains the Event Area data, and then record the values of the ObjectNumber column and the HierarchyId column for each event area to be imported.
4.  Open the export file that contains the Event Definition data.
    1.  Copy the values from the Id columns of the Event Type and the Event Sub Type data files.
    2.  Paste the Id values into the GroupEventSubType and the GroupEventType columns in the Event Definition data file.
5.  Open the export file that contains the Event Definition Detail data.
    1.  Ensure that there is a column for GroupEventArea and a column for RevenueCenterID.
        
        To associate a revenue center and an event area with Event Definition Details, add the following two rows in the Event Definition Details file:
        
        -   Event Area
            
        -   Revenue Center ID
            
        
    2.  Copy the values from the Id column of the Event Definition data file.
    3.  Paste the Id values into the GroupEventDefinition column of the Event Definition Detail data file.

**Related Topics**

-   [Importing Event Files](t_import_export_import_file_events.htm)

**Parent topic:** [Import and Export of Data](c_import_export.htm)
