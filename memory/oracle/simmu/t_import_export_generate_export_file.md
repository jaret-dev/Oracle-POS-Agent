---
source: simmu
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/simmu/t_import_export_generate_export_file.htm
title: "Generating a File to Export"
crawled_at: 2026-05-29T14:28:42.622Z
---
# Generating a File to Export

[Previous](t_import_export_create_schedule.htm) [Next](t_import_export_prepare_files_menu_items.htm) JavaScript must be enabled to correctly display this content

1.  Click Import/Export.
2.  On the Import/Export Request Parameters page, select the Export option.
3.  In the Hierarchy Selection area, select one or more hierarchies, and then use the arrow buttons to include hierarchies in the export.
    
    Select Include Inherited prior to selecting a hierarchy to include children in the selection.
    
    You can export an integrated menu item (fully configured menu items) Object Type at the Enterprise and zone levels only; if you select the property or revenue center levels, you will receive an error later.
    
4.  In the Parameter Selection area, select the Language in which to export the data.
5.  (Optional) In the Date Since field, select the date from which to export information.
    
    The Date Since applies to both new and modified information. For example, select 06/01/2022, to export information that was new or modified since June 1, 2022. For the most recent export, select the current date.
    
    When a date is selected in the Date Since field, any record for that object that has been changed (either directly or as a result of another update) will be exported once, no matter how many times it has been changed since the selected date.
    
6.  Select the Format for the export file:
    
    -   Excel Compatible CSV (ANSI): Select this option to edit the file using Excel, Notepad or Notepad++. This option is only available for the English language.
        
    -   International CSV (UNICODE): Select this option to edit the file using Notepad or Notepad++. This option is available for all character sets and languages.
        
    -   Pipe Delimited (UNICODE): Select this option to edit the file using Unicode. This option is available for all character sets and languages.
        
    
    Note:
    
    Exports greater than 1 GB are compressed.
    
7.  (Optional) Change the Schedule for your export.
    
    -   To export the file immediately, ensure that the Schedule field shows Process Immediately. This is a one-time export request.
        
    -   To schedule the export, select the recurrence and time schedule from the Schedule drop-down list.
        
    
    If no schedules exist, nothing appears in the Schedule drop-down list. See [Creating an Export Schedule](t_import_export_create_schedule.htm) for more information about schedules.
    
8.  (Optional) Enter the Request Name.
    
    This can be a description of the activity (for example, Exporting Menu Items for Zone A).
    
9.  Select the type of information to export from the Object Type drop-down list.
    
    The information in the Mandatory Columns field automatically appears based on the Object Type you selected. The column names appear in the exported file and show the type of data to be exported. You cannot change the values in this field.
    
10.  Select the Data Level:
     
     -   Selected Hierarchy: Select this option to export only the current level of hierarchy. For example, if you selected the property in the Hierarchy Selection without Include Inherited to export discounts, the export only includes discounts that are created for this property, not those created at the Enterprise level or revenue center.
         
     -   Selected Hierarchy With Ancestors: Select this option to export the current level of hierarchy and the higher levels (parent level). For example, if you created discounts at the property level, selecting this option exports discounts created for the property and the Enterprise levels.
         
     -   Selected Hierarchy With Inherited: Select this option to export the current level of hierarchy and the lower levels (child levels). For example, if you created discounts at the property level, selecting this option exports discounts created for the property and the revenue center levels.
         
     -   Selected Hierarchy With Ancestors And Inherited: Select this option to export all levels of hierarchy (for example, Enterprise, property, and revenue center levels).
         
     
11.  In the Columns field, select the information to export. Use Ctrl + Select or Shift + arrows to highlight multiple column names.
     
     All columns are selected by default. The information in the Columns field is a subsection of the Object Type selection.
     
12.  (Optional) In the Sort By field, add one ore more sort options for the results.
13.  Click the Submit Request button.
14.  To refresh the page, click the Status link.
15.  To view scheduled exports, click + adjacent to the ID and the Request Name.
16.  Click the Download link for the export request, and then click the Open button.
17.  (Optional) Change the file as necessary (insert, update, or delete) using a text editor, such as Notepad, rename the file, and save it in a different location.
     
     When you export a file, the application assigns `SimphonyExport.csv` as the file name. Rename each exported file to keep them organized before importing the files.
     

**Related Topics**

-   [File Export](c_import_export_export.htm)

**Parent topic:** [Import and Export of Data](c_import_export.htm)
