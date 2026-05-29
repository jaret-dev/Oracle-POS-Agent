---
source: simmu
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/simmu/t_import_export_prepare_files_menu_items.htm
title: "Preparing Single Menu Item Data Files for Import"
crawled_at: 2026-05-29T14:28:42.605Z
---
# Preparing Single Menu Item Data Files for Import

[Previous](t_import_export_generate_export_file.htm) [Next](t_import_export_import_file_menu_items.htm) JavaScript must be enabled to correctly display this content

Because there are relationships between the databases and menu items, you must import single menu item data files in a specific order. Importing single menu item data files out of order causes the import job to fail and an inability to add the new menu items on the POS client workstations. If you are importing integrated menu items (fully configured menu items), skip this section.

After you export the required menu item data files but before you import the files, ensure that certain values contained in the prospective import files match in specific columns and rows.

1.  Open the export file that contains the Menu Item (MI) Master data, and record the value of the Id column and the corresponding MenuItemName for each menu item to be imported.
2.  Open the export file that contains the MI Class data.
    1.  Record the name of each MI Class located in the Name column. Remaining on the same row, scroll to the ObjectNumber column and record the corresponding values there, which are associated with each MI Class name.
    2.  Review the prospective MI Class import data to ensure that all fields are configured in order for the menu items to function as expected.
3.  Open the export file that contains the MI Definitions data.
    1.  Enter the ObjectNumber values from the MI Class data file into the MenuItemClass column for each MI Definition.
    2.  Enter or verify that the values in the MenuItemMasterId column in the MI Definitions file match the values of the Id column in the MI Master data file. This holds true for menu items that have multiple definitions.
    3.  For items with multiple definitions, ensure that the DefinitionSequence column is numbered in sequential order.
4.  Open the export file that contains the MI Price data.
    1.  Enter or verify that the values in the MenuItemDefID column in the MI Price data file match the values of the Id column in the MI Definitions data file. This holds true for menu items that have multiple prices.
    2.  For items with multiple prices, ensure that the PriceSequence column is numbered in sequential order.

**Parent topic:** [Import and Export of Data](c_import_export.htm)
