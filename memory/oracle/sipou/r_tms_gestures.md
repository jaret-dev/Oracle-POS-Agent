---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/r_tms_gestures.htm
title: "Table Management System Gestures"
crawled_at: 2026-05-29T14:28:39.814Z
---
# Table Management System Gestures

[Previous](r_tms_employee_section_assignment_report.htm) [Next](c_events.htm) JavaScript must be enabled to correctly display this content

## Table Management System Gestures

Gestures simulate actions that you can perform with a mouse click on a touchscreen device. The following table lists the gestures you can use in Simphony.

Table 10-14 Gestures

Gesture

Description

Simple Click

The Simple Click touchscreen operation is the standard way of interacting with the POS client. When you click an item on the screen (for example, a Screen Lookup (SLU), menu item, or tender), Simphony responds by activating the object.

Multi Select

The Multi Select touchscreen operation allows you to select several objects at once. For example, when you use the Table Management System (TMS) in Host Mode, you can select multiple dining table objects. After selecting the tables, you can perform a common action, such as Press and Hold or Drag.

Double-click

Use the double-click touchscreen operation with the Reservation and Wait Lists. When you double-click (or double-tap) the Reservation List or Wait List, a dialog appears for you to add a new entry.

The Wait List toggles the selection of an item in the list in response to a Simple Click, but does not:

-   Perform an action to transition away from the screen
    
-   Change the application state (other than to toggle the item selection)
    

You can also use double-click with another user interface (UI) element that does not immediately launch a task during a simple click.

Press and Hold

Use the Press and Hold touchscreen operation with the following TMS areas:

-   Wait List
    
-   Dining Tables
    
-   Host Command Area
    
-   Seating Section Layout
    

When you press the touchscreen and release over the same object or list item, Simphony considers this to be a Press and Hold operation if the length of time between the press and the release is more than 1.5 seconds.

You can use Press and Hold to show a pop-up dialog with context sensitive operations. For example, the Wait List shows a list of options to Greet Guest, Abandon Request, Hide Summary Area, and Modify Summary Area. The Press and Hold operation allows a large number of buttons to be kept off of the touchscreen, resulting in more screen space for the other UI objects.

It also allows a specific command area to act as a launch point for miscellaneous commands that are not directly related to a specific UI element. An example of this is the Host Command area.

Swipe

Use the Swipe touchscreen operation with the Dining Table Status area. When you press the touchscreen and release over the same object with a distance of at least .5 inches, Simphony considers this to be a Swipe operation. The operation most commonly performed is to change to a next or previous item from a list. In the case of the Dining Table Status area, swiping changes to or from the next or previous dining table.

If you perform a Swipe gesture too quickly on a touchscreen device, the driver may not be able to detect the movement.

Drag

Use the Drag touchscreen operation with Dining Table objects in TMS to merge one or more tables. Pressing the touchscreen in one area and releasing over a different object is considered to be a Drag operation to Simphony. Dragging a dining table object to another dining table object allows the first object to be added as a child of the second object.

You can also Drag various TMS UI areas to different locations on the screen. Using your fingers, press the title area of the TMS UI area and drag it to a different part of the screen. You can move the following TMS items:

-   Wait List Area
    
-   Reservations Area
    
-   Section Layout Area
    
-   Dining Table Status Area
    
-   Host Command Area
    

Edge Scrolling

Use the Edge Scrolling touchscreen operation to scroll through a list of items without a scroll area. This allows more space for other UI elements.

When you press and hold a location at the top or bottom 10% of a list, the list begins to scroll. The scrolling is slow at first and increases speed the longer you press the auto-scroll area.

**Related Topics**

-   [Host Command Area, Display, and Legend](c_tms_host_command_display_legend.htm)
-   [Dining Table Status](c_tms_host_dining_table_status.htm)
-   [Employee Lines](c_tms_host_employee_lines.htm)
-   [Section Layout](c_tms_host_section_layout.htm)
-   [Enhanced Table Status and Functions](c_tms_table_status.htm)
-   [Hiding Colors and Table Decorators from a Table](t_tms_hide_colors_decorators.htm)

**Parent topic:** [Dining Room Management](c_tms.htm)
