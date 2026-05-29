---
source: rause
url: https://docs.oracle.com/en/industries/food-beverage/back-office/rause/c_export_data.htm
title: "Export Data from Reporting and Analytics"
crawled_at: 2026-05-29T14:28:45.422Z
---
# Export Data from Reporting and Analytics

[Previous](t_report_mail.htm) [Next](t_export_add_config.htm) JavaScript must be enabled to correctly display this content

Set up the data export process and run exports to an endpoint to manage data.

Export configurations let you export data from the Reporting and Analytics database to a file and then deliver the file to an endpoint through SFTP or through posting to a URL over an HTTPS connection. The export configuration contains code for querying the database and defines the format of the exported data. You associate an export schedule with the configuration to specify the enterprise locations from which data is exported, export frequency, and how the data file is delivered to the endpoint.

The Exports tab houses the export summary page, which shows status across all export configurations for your enterprise. You can drill down to view more details by clicking on the numbers associated with each status.

Within the Export Metrics page you can:

-   Filter status by selecting an execution time frame for a specific configuration.
    
-   View export configurations by location by clicking on a status. For example, click Failed to view all configurations by location that failed.
    
-   Search export results by export configuration and schedule or you can search for results of on-demand exports.
    

Other actions related to exporting data can be found in side menu of the Exports tab.

-   [Adding an Export Configuration](t_export_add_config.htm)  
    Add subject areas to the configuration, add code that queries the database, specify the format of the exported data.
-   [Adding a Location Group](t_export_add_loc_group.htm)  
    Specify a group of locations for which an export configuration exports data. Create a location group before adding an export schedule.
-   [Adding a Delivery Profile](t_export_delivery_profile.htm)  
    Specify delivery through SFTP or HTTPS, define destination settings such as the server location for SFTP or the URL for HTTPS, specify authentication details. A delivery profile must be added before adding an export schedule.
-   [Adding an Export Schedule](t_export_add_schedule.htm)  
    Specify the enterprise locations for which an export configuration exports data, set the export frequency and recurrence, specify how the system delivers the exported data file.
-   [On-Demand Exports](t_export_on_demand.htm)  
    Run an export schedule on-demand outside of its scheduled run time.
-   [Searching for Exports](t_exports_search.htm)  
    Search for on-demand exports or configurations run with schedules.
-   [Changing the Export Configuration Owner](t_export_config_change_owner.htm)  
    
-   [Deleting Export Configurations](t_export_config_delete.htm)  
    
-   [Tutorial: Export Sales Operations Data](t_tutorial_add_export_config.htm)  
    Explains step-by-step how to export menu item sales data for the Sales Operations data category.
