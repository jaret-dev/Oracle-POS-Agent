---
source: rause
url: https://docs.oracle.com/en/industries/food-beverage/back-office/rause/c_alignment.htm
title: "Item Alignment"
crawled_at: 2026-05-29T14:28:44.859Z
---
# Item Alignment

[Previous](t_hierarchy_relationship.htm) [Next](t_alignmentrules_creating.htm) JavaScript must be enabled to correctly display this content

Standardize menu items by setting up master items, master groups, and master stores.

Item alignment matches the same items under the correct master item if there is any variance in the item name. This ensures accurate reports and calculations. When your organization does not use an enterprise management module to control data entry, different locations can enter the same item with slight variances.

Reporting and Analytics lets you define the master entries for items, such as menu items and order types. The following diagram provides an overview of the workflow for automatically and manually aligning items added to the database.

Figure 8-1 Item Alignment Process

![This diagram provides an overview of the workflow for automatically and manually aligning items added to the database.](img/itemalignment_process_new.png "This diagram provides an overview of the workflow for automatically and manually aligning items added to the database.")

Item alignment consists of the following components:

-   Master Items: A master item is the parent item name that unifies all name variations for an item.
    
    For example, a restaurant chain offers a one-pound beef hamburger with cheese. Each restaurant location can name or refer to this hamburger differently, such as cheeseburger or beef burger, 1LB. By default, reports and calculations handle these two entries as completely different entities. To consolidate the two entries, you can create a master item named Beef Cheeseburger, 1LB, and then link the two entries to the master item. Reporting and Analytics then always treats posted entries for cheeseburger and beef burger, 1LB as a Beef Cheeseburger, 1LB order.
    
-   Master Groups: A master group consists of similar locations, such as fast food stores, and lets an organization assign menu items and alignment rules to all locations within the group. Each location can only be assigned to one master group for each item type. Each master group must be assigned at least one master store.
    
    For example, a restaurant chain offers fast food stores and seated diner stores. The chain can create a master group for their fast food stores and a master group for their seated diner stores, and then assign a headquarters store to each group. This lets the restaurant control item alignment for fast food stores separately from seated diner stores.
    
-   Master Store: The master store sets the default rules and alignment for all other stores within the same master group. You can only assign one master store for each item type.
    
    For example, a restaurant chain configures a master group for their fast food chain, and assigns the Redwood Shores location as the master store for all front-of-house item categories, such as menu items and discounts. When a new menu item is introduced to the system in the Redwood Shores location, Reporting and Analytics treats the Redwood Shores instance as the master item. When a new menu item is introduced to the system in another location, Reporting and Analytics attempts to align the new menu item to existing master items, and you must either manually configure a master item or create an instance of the menu item at the Redwood Shores location.
    

The following diagram provides an example of an organization that defines two master groups to separate item alignment between fast food restaurants and seated diner restaurants.

Figure 8-2 Example Master Group and Master Store

![This image provides an example of a restaurant chain (organization) with a fast food master group and a seated diner master group. The restaurant assigns one master store for fast food restaurants, and two master stores to handle two sets of item groups for seated diners.](img/itemalignment_fnb_new.png "This image provides an example of a restaurant chain (organization) with a fast food master group and a seated diner master group. The restaurant assigns one master store for fast food restaurants, and two master stores to handle two sets of item groups for seated diners.")

This section contains the following topics:

-   [Configuring Automatic Alignment Rules](t_alignmentrules_creating.htm)  
    
-   [Configuring a Master Group](t_alignment_mastergroup.htm)  
    
-   [Assigning Locations as Master Stores](t_alignment_masterstore_setting.htm)  
    
-   [Assigning Locations to the Master Group](t_alignment_locations.htm)  
    
-   [Configuring Master Items](t_alignment_masteritem.htm)  
    
-   [Manual Item Alignment](c_alignment_manual.htm)
