---
source: rause
url: https://docs.oracle.com/en/industries/food-beverage/back-office/rause/t_export_add_schedule.htm
title: "Adding an Export Schedule"
crawled_at: 2026-05-29T14:28:45.505Z
---
# Adding an Export Schedule

[Previous](t_export_delivery_profile.htm) [Next](t_export_on_demand.htm) JavaScript must be enabled to correctly display this content

Specify the enterprise locations for which an export configuration exports data, set the export frequency and recurrence, specify how the system delivers the exported data file.

Required system privileges: Export Schedules and Add/Edit/View/Delete Schedules.

When you add an export schedule, you select a delivery profile and you can select a location group. Add the delivery profile and location group before adding the export schedule.

1.  In Reporting and Analytics, click the side navigation menu, click Reports, click Exports, click Schedules, and then click Add Export Schedule.
2.  Specify a name for the schedule, select an export configuration, and then click Add.
3.  If you do not need to immediately run the export configuration with the schedule you are creating, leave the default status as Inactive.
    
    You can change the status to Active when you run the export configuration. An inactive schedule does not generate an export.
    
4.  In the Location Scope section, select the locations for which data is exported.
    
    To export data for a group of locations, you need to create the location group first before you can select it from the Location Group drop-down.
    
5.  In the Frequency section, set the export first run date, run time, time zone, and recurrence type.
6.  Select the recurrence options that appear based on your recurrence type selection.
7.  In the Conditions section, select the condition that starts the export and how frequently the system checks to determine if the condition is met.
8.  Specify additional export conditions.
    
    For example, you can set an end of day condition to not export data until all Simphony transactions have posted after the business day is over.
    
9.  In the Export Delivery Options section, specify basic properties for the data export file such as the name of the file.
    
    In the Export File Name field, enter the name of the export file with the file extension. You can use a combination of text and tokens. The following sample file name includes text and tokens for location reference and business date:
    
    My\_Export\_${locationName}\_${businessDate}.csv
    
    The system supports the following tokens:
    
    -   ${organizationId}
        
    -   ${organizationName}
        
    -   ${locationId}
        
    -   ${businessDate}
        
    -   ${country}
        
    -   ${region}
        
    -   ${locationName}
        
    -   ${month}
        
    -   ${week}
        
    -   ${counter-10000} - Resets at 10000
        
    -   ${dateCounter} - Increments for the same day and resets at change of business date
        
    -   ${dayCounter} - Increments each day and resets when reaches 1000
        
    -   ${startDate} & ${endDate}
        
    -   ${startTime} & ${endTime}
        
    -   ${siteID}
        
    -   ${financialWeekNum}
        
    -   ${fixedPeriod}
        
    -   ${financialPeriodNum}
        
    -   ${timeZone}
        
    
    The ${businessDate}, ${startDate}, ${endDate}, ${startTime}, and ${endTime} tokens support the following date and time sub-tokens:
    
    -   YYYY: four-digit year
        
    -   YY: two-digit year
        
    -   MM: two-digit month (examples: 01 for January, 02 for February)
        
    -   MMM: three-character description of the month (examples: JAN, FEB, MAR)
        
    -   DD: two-digit day of month (01 through 31)
        
    -   hh: two digits of hour (00 through 23; do not use am and pm values)
        
    -   mm: two digits of minute (00 through 59)
        
    -   ss: two digits of second (00 through 59)
        
    
    The following examples show valid token and sub-token combinations:
    
    -   ${businessDate(YYYY-MMM-DD)}
        
    -   ${startDate(YYYY-MMM-DD)}
        
    -   ${endDate(YYYY-MMM-DD)}
        
    -   ${startTime(YYYY-MM-DDThh:mm:ss)}
        
    -   ${endTime(YYYY-MMM-DDThh:mm:ss)}
        
    
    To create a ZIP version of the export file, select Compress Export.
    
    To encrypt the data, select Encrypt using PGP Encryption and then paste an encryption key in the text box.
    
10.  Select the delivery profile.
     
     The delivery profile defines the settings for delivering the exported data file to the end point. The delivery profile owner must have the data permissions for the subject areas that are used in the configuration.
     

**Parent topic:** [Export Data from Reporting and Analytics](c_export_data.htm "Set up the data export process and run exports to an endpoint to manage data.")
