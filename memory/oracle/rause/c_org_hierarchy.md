---
source: rause
url: https://docs.oracle.com/en/industries/food-beverage/back-office/rause/c_org_hierarchy.htm
title: "Organizational Hierarchies"
crawled_at: 2026-05-29T14:28:44.687Z
---
# Organizational Hierarchies

[Previous](t_guest_checks.htm) [Next](c_revenue_centers.htm) JavaScript must be enabled to correctly display this content

Create and link revenue centers, locations, and levels of the organization.

The enterprise has only one organizational hierarchy, which provides structure for an enterprise and its locations. The hierarchy ensures totals from all locations are available for reports and it controls how charts show information in Reporting and Analytics. If the organizational hierarchy and the reporting hierarchy are different, then the location results in iQuery and reports will not be aligned.

The organizational hierarchy consists of levels and locations. A location is a restaurant. A level is a group of locations or a group of levels. You define the hierarchy by creating parent-child relationships between levels and locations. In the following figure of a sample organizational hierarchy, District 1 is the parent to the Las Vegas and Reno locations, and the West Region is the parent to District 1 and District 2.

Figure 7-1 Example Organizational Hierarchy

![This image provides an example of an organizational hierarchy involving three levels (country, region, district) and locations for a district.](img/org_hierarchy_updated.png "This image provides an example of an organizational hierarchy involving three levels (country, region, district) and locations for a district.")

You can use the organizational hierarchy to determine user access to information in the system. Using the sample hierarchy as a model, you can create a District Manager role and then assign the role to the District Manager for District 1. Because of the system relationship between District 1 and the Las Vegas and Reno locations, the District Manager can only see information for those locations and cannot see information for the locations related to the other districts.

-   [Revenue Centers](c_revenue_centers.htm)  
    
-   [Adding Levels](t_levels_creating.htm)  
    
-   [Adding Locations](t_locations_creating.htm)  
    
-   [Establishing Relationships Between Levels and Locations](t_hierarchy_relationship.htm)
