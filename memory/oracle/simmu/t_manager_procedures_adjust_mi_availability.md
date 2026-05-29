---
source: simmu
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/simmu/t_manager_procedures_adjust_mi_availability.htm
title: "Adjusting Menu Item Availability"
crawled_at: 2026-05-29T14:28:40.845Z
---
# Adjusting Menu Item Availability

[Previous](t_manager_procedures_adjust_mi_definitions.htm) [Next](t_manager_procedures_adjust_mi_price.htm) JavaScript must be enabled to correctly display this content

You can set a menu item as Out Of Menu Item to prevent workstation operators from posting an order for a menu item that is no longer in stock.

You can also set the Count Available for a menu item that has limited availability. The count is reduced each time the menu item is ordered. When the count reaches zero, the menu item automatically changes to Out Of Menu Item.

1.  Press the Menu Item Availability function key.
2.  Use the filters to streamline the menu item list, select an item, and then press Edit.
3.  If the menu item is not available, select Out Of Menu Item.
4.  To change the available menu item count, select Check Menu Item Availability, and then enter the available count in the Count Available field.
    
    This field is enabled only for definitions that are Definition Sequence #1. The available count decreases each time the item is ordered, and the number of remaining items appears on the Menu Item SLU button.
    
    Simphony shows the count available differently on the Menu Item SLU button, depending on whether CAPS is online or offline. When online, the actual numbers appear. When CAPS is offline, the numbers still appear in the count available, however they are enclosed in brackets and suffixed with a question mark. This indicates to the workstation operator that the count may not be accurate due to CAPS being offline.
    
5.  Press Save.
6.  Use the buttons with the left and right angle brackets (< >) to move between menu items from within the Edit Menu Item Availability dialog box, and then press Done.
7.  To remove the availability settings from all menu items in the list, press Clear Avail of All Items, and then press Yes to confirm.
8.  Press Done to close and exit the Select Menu Item: Edit Menu Item Availability screen.

**Parent topic:** [Manager Tasks for Workstation Reports and Procedures](c_manager_tasks_ws_reports_procedures.htm)
