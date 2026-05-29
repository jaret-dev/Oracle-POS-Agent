---
source: simmu
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/simmu/t_import_export_import_file_menu_items.htm
title: "Importing Menu Item Files"
crawled_at: 2026-05-29T14:28:42.665Z
---
# Importing Menu Item Files

[Previous](t_import_export_prepare_files_menu_items.htm) [Next](t_import_export_prepare_files_events.htm) JavaScript must be enabled to correctly display this content

The default maximum size of an imported file is 4 MB.

Menu Item Object numbers must not exceed nine digits when importing/exporting data.

1.  Click Import/Export.
2.  On the Import/Export Request Parameters page, select the Import option.
3.  Click Browse, and then select the file to import. When you import single menu item data files, do so in the following order:
    1.  Menu Item Master (Select this file first, and then continue with Step 4.)
    2.  Menu Item Class
    3.  Menu Item Definitions
    4.  Menu Item Price
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
        
    
10.  Save the imported files using a text editor, such as Microsoft Notepad.
11.  Repeat Steps 1 through 10 to import each menu item data file (Menu Item Master, Menu Item Class, Menu Item Definitions, Menu Item Price).
     
     Attention:
     
     When importing menu item price records and any changes are made to a menu item's previously non-existing Effectivity Group setting, a new price record gets created. This newly created price record contains the updated price (if any) and the newly updated Effectivity Group. This is by design.
     

**Parent topic:** [Import and Export of Data](c_import_export.htm)
