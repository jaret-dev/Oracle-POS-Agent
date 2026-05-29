---
source: rause
url: https://docs.oracle.com/en/industries/food-beverage/back-office/rause/t_alignmentrules_creating.htm
title: "Configuring Automatic Alignment Rules"
crawled_at: 2026-05-29T14:28:44.874Z
---
# Configuring Automatic Alignment Rules

[Previous](c_alignment.htm) [Next](t_alignment_mastergroup.htm) JavaScript must be enabled to correctly display this content

Alignment rules define the item alignment processes by:

-   Controlling how unaligned items are matched.
    
-   Enabling standard food costs.
    
-   Enabling item aliasing.
    
-   Setting the start and end times for charts.
    
-   Defining the default methods for identifying new items.
    
-   Defining how new items are matched to existing values.
    

Alignment rules do not guarantee that all new items are aligned to existing items. You can use the rules to increase the likelihood of successfully automated matches. Administrators should continue to perform routine checks of unaligned items and review item alignment to ensure accuracy.

1.  In Reporting and Analytics, click the side navigation menu, click Configuration, click Warehouse Admin, click Miscellaneous, and then click Alignment Rules.
2.  For each item type, select an item property from the corresponding drop-down list. Reporting and Analytics searches for and aligns items with exact case-sensitive matches for the selected item property.
    
    Table 8-1 Food and Beverage Item Alignment Rules
    
    Item Type
    
    Drop-down List
    
    Item Properties
    
    Menu Item
    
    Menu Item Alignment Based On
    
    -   POS Number
        
    -   Name 1
        
    -   Name 2
        
    -   Name 1 and POS Number
        
    
    General Item
    
    General Alignment Type
    
    -   POS Item Number Only
        
    -   POS Name Only
        
    -   POS Item Number and Name
        
    
    Back-of-House Item
    
    BOH Align Type
    
    -   POS Item Number Only
        
    -   POS Name Only
        
    -   POS Item Number and Name
        
    
3.  Enter the start and end time for all charts in the portal using the 24-hour format.
4.  Enter the default food cost percentage when a percentage is not included in the master table or the data posted from the POS.
5.  Select how the system handles new menu items from the Menu Item Name Change drop-down list:
    
    -   Replace an Old Name
        
    -   Create a New Menu Item
        
    
6.  Enter the Number of Attempts to be made to align each menu item.
7.  Select how Reporting and Analytics creates or modifies tax definitions from the Create New Tax Definition drop-down list.
    
    -   Select Update Existing to update tax definition items that exist in the system.
        
    -   Select On Rate Change to update tax definitions for items that undergo a rate change.
        
    -   Select On Name Change to update tax definitions for items that undergo a name change.
        
    -   Select On Name or Rule Change to update tax definitions for items that undergo both a rate and name change.
        
    
8.  Select Enable Menu Item Aliasing to allow users to designate aligned items as an alias of the master item. Automatic alignment then performs alignment if an item matches the master item or an alias.
9.  Select Enable Other Table Aliasing to allow unaligned menu items to alias with items found in other database tables.
10.  You can enter other alignment rule information in the Other Alignment Rules field.

**Parent topic:** [Item Alignment](c_alignment.htm "Standardize menu items by setting up master items, master groups, and master stores.")
