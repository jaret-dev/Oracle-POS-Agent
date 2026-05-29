---
source: simmu
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/simmu/t_import_export_import_file_events.htm
title: "Importing Event Files"
crawled_at: 2026-05-29T14:28:42.777Z
---
# Importing Event Files

[Previous](t_import_export_prepare_files_events.htm) [Next](c_order_information_service.htm) JavaScript must be enabled to correctly display this content

The default maximum size of an imported file is 4 MB.

1.  Click Import/Export.
2.  On the Import/Export Parameters page, select the Import option.
3.  Click Browse, and then select the file to import. When you import event data files, do so in the following order:
    1.  Event Type (Select this file first and then continue with Step 4.)
    2.  Event Sub Type
    3.  Event Area
    4.  Event Definition
    5.  Event Definition Detail
4.  Select the type of information to import from the Object Type drop-down list.
    
    The information in the Mandatory Columns and the Columns field automatically appears based on the Object Type selected. The column names appear in the imported file and show the type of data to be imported. You cannot change the values in this field.
    
5.  Select the Language.
6.  (Optional) Enter the Request Name.
    
    This is a description of the activity (for example, Importing Menu Items for Property A).
    
7.  Click the Submit Request button.
8.  Click the Status link to refresh the page.
9.  Click one of the following links for the import request, and then click the Open button:
    
    -   Pre Import Snapshot: Shows the before information.
        
    -   Retrieve Import File: Shows the after information that was imported into EMC.
        
    
10.  Save the imported files using a text editor, such as Notepad.
11.  Repeat Steps 1 through 10 to import each event data file (Event Type, Event Sub Type, Event Area, Event Definition, Event Definition Detail).

**Related Topics**

-   [Preparing Event Data Files for Import](t_import_export_prepare_files_events.htm)

**Parent topic:** [Import and Export of Data](c_import_export.htm)
