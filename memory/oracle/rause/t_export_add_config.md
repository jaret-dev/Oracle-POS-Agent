---
source: rause
url: https://docs.oracle.com/en/industries/food-beverage/back-office/rause/t_export_add_config.htm
title: "Adding an Export Configuration"
crawled_at: 2026-05-29T14:28:45.588Z
---
# Adding an Export Configuration

[Previous](c_export_data.htm) [Next](t_export_add_loc_group.htm) JavaScript must be enabled to correctly display this content

Add subject areas to the configuration, add code that queries the database, specify the format of the exported data.

Required system privileges: Export Configurations, Add/Edit/View/Delete Export Configurations

1.  In Reporting and Analytics, click the side navigation menu, click Reports, click Exports, click Configurations, and then click Add Export Configuration.
2.  Enter a configuration name and then click a creation method.
    
    To add a brand-new configuration, click New.
    
    To copy an existing configuration and then modify it, click Copy, and then select the source configuration.
    
    To copy a core export configuration and then modify it, click Core Exports, and then select a template.
    
    When you copy a configuration or use a core export configuration as a template, you can preview the subject areas and steps (the code for querying the subject areas in the database) for the source and you can also preview the final result.
    
3.  Click Add.
4.  Define the subject areas for your configuration.
    
    For a brand-new configuration, to add a subject area, click Add in the Subject Areas section. Select the category, subject area, and version. To work with actual data from your Reporting and Analytics database, click the Actual data type. If you do not have permissions to work with actual data, only the Sample data type is available.
    
    If you copied an existing configuration or used a core export configuration template, you can click a subject area menu to edit or remove the subject area.
    
5.  Define the steps for your configuration.
    
    A step contains the Apache Drill SQL code for selecting subject area data in the Reporting and Analytics database.
    
    For a brand-new configuration, Reporting and Analytics automatically adds the first step. Enter the code in the code text area. Keep the following points in mind when entering code:
    
    -   The subject area being queried needs opening and closing parentheses after the alias name. The alias name is shown on the left side of the screen after the subject area has been added and expanded. The value after Table: is the alias.
        
    
    The following example shows code for selecting JSON fields from a subject area:
    
    ```
    SELECT
      'DSC' as `Record Type`,
      COALESCE(DD.revenueCenterNum, 0) AS `Revenue Center Number`,
      COALESCE(DD.discountNum, 0) AS `Discount Number`,
      COALESCE(DD.discountName, ' ') AS `Discount Name`,
      COALESCE(DD.discountTotal, 0) AS `Total`,
      COALESCE(DD.discountCount, 0) AS `Count`,
      COALESCE(DD.discountMasterName, ' ') AS `Discount Master Name`,
      COALESCE(DD.discountMasterNum, 0) AS `Discount Master Number`, 
      COALESCE(DD.revenueCenterName, ' ') AS `Revenue Center Name`,
      COALESCE(DD.revenueCenterMasterName, ' ') AS `Revenue Center Master Name`,
      COALESCE(DD.revenueCenterMasterNum, 0) AS `Revenue Center Master Number`,
      COALESCE(DD.discountGrossVat, 0) AS `Discount Gross VAT`
    FROM discountDailyTotals3() DD
    ```
    
    Note:
    
    The alias for a step cannot be changed and can be referenced in other steps. For example, to reference Step 1, use the alias step1.
    
    To add a step, click Add Step, enter a step name, and then add the query code.
    
    To test the query, click Test All Steps or Test Step. If one step references another step, then click Test All Steps.
    
    To exclude a step when testing the query, deselect the Enabled box to make it inactive. Select Enabled again to include the step in the final output.
    
    To exclude step query results from the output, deselect the Include in export box to make it inactive.
    
    To add custom JavaScript code to format the output, click Add JavaScript Step, and then enter the JavaScript code in the code text area.
    
6.  Save your changes and then click Results to specify the format of the exported data.
    
    To export to a JSON file without formatting, click JSON.
    
    To export to a file with fields separated by a delimiter, click Delimited and then enter the delimiter in the Delimeter Value field. Optionally, specify a single-character text qualifier that encloses each value. To include headers in the output, select Include headers.
    
    To export to a tab-delimited file, click Tab Delimited. Optionally, specify a single-character text qualifier that encloses each value. To include headers in the output, select Include headers.
    
    To export to an XML file, click XML. Click the Mapping drop-down and select the XML structure for the output file:
    
    -   Xml Node Mapping: Makes the output of each step a parent node. The row alias name of the step output is the name of the child node as defined in final output JSON.
        
    -   Xml Node Attribute Mapping: Makes the output of each step a parent node and records child nodes. The row alias name of the step output is the name of the child node as defined in final output JSON.
        
    -   Xml Table Mapping: Makes the output of each step a table.
        
    
    To include headers in the output XML, select Include Headers and enter the headers in the code text area.
    
7.  To preview the results, click Run and See Results.
8.  Save your changes and then add an export schedule.
    
    The export schedule defines when the system runs the export and how the system delivers the exported data file to the end point.
    

**Parent topic:** [Export Data from Reporting and Analytics](c_export_data.htm "Set up the data export process and run exports to an endpoint to manage data.")
