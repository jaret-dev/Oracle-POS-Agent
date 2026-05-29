---
source: rause
url: https://docs.oracle.com/en/industries/food-beverage/back-office/rause/c_roles_set_hierarchy_functional_admin.htm
title: "Administrator Roles"
crawled_at: 2026-05-29T14:28:43.525Z
---
# Administrator Roles

[Previous](t_roles_view_role.htm) [Next](t_set_hierarchy_admin.htm) JavaScript must be enabled to correctly display this content

There are two types of administrator roles, the Hierarchy Administrator and the Functional Administrator. They grant access to areas of Reporting and Analytics to roles and they also manage users. See the two administrator role definitions below for more details.

Note:

When upgrading from release 9.1 to release 20.1, the role with the Sys Admin option selected becomes the Hierarchy Administrator. Any roles in release 9.1 with access to the Portal portlet or the Administer Roles Admin portlet, become Functional Administrators in release 20.1.

Hierarchy Administrator

The Hierarchy Administrator is assigned to one role that has full access to all roles, users, enterprise levels, and locations. They are limited to granting access only to portlets, privileges, and data permissions that they themselves have access to. The Hierarchy Administrator:

-   Is only assigned to one role.
    
-   Can access the Roles and the Users module.
    
-   Can access all users and roles in the enterprise.
    
-   Can assign only portlets, privileges, and data permissions that they have access to.
    
-   Can assign any level and location.
    

Functional Administrator

The Functional Administrator can be assigned to roles that manage access for other roles and users. They can grant access to any portlets, privileges, and data permissions. The Functional Administrator:

-   Can be assigned to multiple roles and there must be at least one.
    
-   Can also be the Hierarchy Administrator.
    
-   Can access the Roles module.
    
-   Can grant themselves access to the Users module.
    
-   Can assign any portlets, privileges, and data permissions to themselves or any other role, even the Hierarchy Administrator.
    
-   Can assign only the levels and locations they have access to.
    
-   Can assign other Functional Administrators.
    

**Parent topic:** [Control Who Sees What](c_access_controls.htm "Define the privileges and access users have within each role.")
