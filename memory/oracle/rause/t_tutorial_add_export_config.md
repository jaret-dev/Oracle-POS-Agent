---
source: rause
url: https://docs.oracle.com/en/industries/food-beverage/back-office/rause/t_tutorial_add_export_config.htm
title: "Tutorial: Export Sales Operations Data"
crawled_at: 2026-05-29T14:28:45.754Z
---
# Tutorial: Export Sales Operations Data

[Previous](t_export_config_delete.htm) [Next](c_localization_languages.htm) JavaScript must be enabled to correctly display this content

Explains step-by-step how to export menu item sales data for the Sales Operations data category.

This tutorial shows how to export sales operations data from the Reporting and Analytics database. The following table lists the decisions we need to make to complete the tutorial.

Decisions to Consider

This Tutorial

What type of sales operations data do I want to export?

Menu item sales

Which database table contains the data I want to export?

menuItemSales

Which table columns do I want to export?

-   Location name
    
-   Business date
    
-   Major group master name
    
-   Sales total rounded to 2 decimal places
    
-   Sum of discount totals
    

How do I want to format the exported data?

Define the format of the data with custom JavaScript.

1.  In Reporting and Analytics, click the side navigation menu, click Reports, click Exports, click Configurations, and then click Add Export Configuration.
2.  In the Export Configuration Name field, type Menu Item Sales Tutorial.
3.  Since we are creating a new configuration, click New, and then click Add
4.  Add the Menu Item Sales subject area to the configuration:
    
    1.  In the Subject Areas section on the Details tab, click Add.
    2.  Select Menu Item Sales from the Subject Area drop-down list.
        
        The Version drop-down list defaults to 1.0. You do not need to change this value.
        
    3.  For Data Type, click Sample data and then click Add.
    
    Reporting and Analytics shows the menuItemSales database table columns with sample data. Since our configuration has only one subject area, Reporting and Analytics appends the table name with the number 1 (menuItemSales1). If we added another subject area, Reporting and Analytics would append the table name with the number 2.
    
5.  In the Drill Step 1 text box, add the following SQL code to query the database table and return the data we want.
    
    Note:
    
    The following code contains line numbers. Do not include the line numbers in your SQL code. The numbers are for illustrative purposes only to describe the code in the table that follows the code.
    
    1 SELECT
    2  mi.locationName as locationName,
    3  mi.businessdate as businessDate,
    4  mi.majorGroupMasterName as MGName,
    5  round(sum(mi.salesTotal), 2) as netSales,
    6  sum(mi.discountTotal) as discountTotal
    7 FROM 
    8  menuItemSales1() as mi 
    9 GROUP BY
    10 mi.locationName, mi.businessDate, mi.majorGroupMasterName
    
    The following table describes each line of the SQL code:
    
    Line Number
    
    Description
    
    1
    
    SQL `SELECT` statement used to select data.
    
    2
    
    Selects the `mi.locationName` column and returns it as `locationName`, where `mi` is the table alias defined in line 8.
    
    3
    
    Selects the `mi.businessdate` column and returns it as `businessDate`, where `mi` is the table alias defined in line 8.
    
    4
    
    Selects the `mi.majorGroupMasterName` column and returns it as `MGName`, where `mi` is the table alias defined in line 8.
    
    5
    
    Selects the sum of the `mi.salesTotal` column and returns it as `netSales` rounded to 2 decimal places, where `mi` is the table alias defined in line 8.
    
    6
    
    Selects the sum of the `mi.discountTotal` column and returns it as `discountTotal`, where `mi` is the table alias defined in line 8.
    
    7
    
    SQL `FROM` command to specify the table from which data is returned.
    
    8
    
    Specifies menuItemSales1 as the table from which data is returned. The `FROM` command assigns a SQL alias value of `mi` to the table.
    
    9
    
    SQL `GROUP BY` statement that groups returned values into a summary row.
    
    10
    
    Groups returned values `mi.locationName`, `mi.businessDate`, and `mi.majorGroupMasterName` into a summary row.
    
    Under the Drill Step 1 section, select Enabled and Include in export.
    
    Click Test Step to test the query. The returned data appears in the Drill Result section.
    
6.  Click Add JavaScript Step and then add the following custom JavaScript code to format the returned data. The code uses the `padStart()` method to apply spacing between the returned column data in a row.
    
    var input = step1;
    var output = \`\`;
    var i;
    for (i = 0; i < input.length; i++) {
      if(i == 0) output += \`
    \`
    output += input\[i\].locationName.padStart(25);
    output += input\[i\].businessDate.padStart(25);
    output += input\[i\].MGName.padStart(25);
    output += input\[i\].netSales.toString().padStart(15);
    output += input\[i\].discountTotal.toString().padStart(10);
      if(i < input.length) output += \`
    \`
    }
    
7.  To view the results, go to the Results tab and then click Run and See Results.
    
    Reporting and Analytics returns the data as follows.
    
    Note:
    
    If you are viewing the PDF version of this user guide, the lines of data wrap to the next line to fit onto the PDF page.
    
    "
            Columbia Location               2018-10-03                 Food.TMG         597.16    -19.71
            Columbia Location               2018-10-03        N/A Beverages.TMG         165.13    -10.95
    "
    

**Parent topic:** [Export Data from Reporting and Analytics](c_export_data.htm "Set up the data export process and run exports to an endpoint to manage data.")
