---
source: rause
url: https://docs.oracle.com/en/industries/food-beverage/back-office/rause/t_report_mail.htm
title: "Scheduling Reports for Email Distribution"
crawled_at: 2026-05-29T14:28:45.540Z
---
# Scheduling Reports for Email Distribution

[Previous](c_report_scheduled.htm) [Next](c_export_data.htm) JavaScript must be enabled to correctly display this content

Set up report mail and define how often the emails are sent.

1.  In Reporting and Analytics, click the side navigation menu, click Configuration, click Report Mail, and then click Report Mail.
2.  Click Add.
3.  Within the Content tab, specify email content as described in the following table:
    
    Setting
    
    Description
    
    Type
    
    Select the report type.
    
    Report Selection
    
    Select the report. If the list of reports is long, specify search criteria to locate the report.
    
    Preferences
    
    -   Specify delivery preferences. The report you select determines the preferences that appear.
        
    -   If you select multiple locations, one report is sent for each location.
        
    -   Select Consolidated to send one email with aggregate report data for all locations.
        
    -   By default, each report is sent in a separate email. If you want one email with all report files, then select Zip multiple files.
        
    -   Select the Output Type and Date Selection.
        
    -   Depending on the report you select, there may be additional selection options.
        
    
4.  Click the Name tab and then specify email settings as described in the following table:
    
    Field
    
    Description
    
    Name
    
    Enter the name of the report email that identifies it in Reporting and Analytics.
    
    Description
    
    Enter a description of the report email that identifies it in Reporting and Analytics.
    
    Subject
    
    Enter the email subject line.
    
    Active
    
    Select to send the email. Deselect to stop report email, but save the settings.
    
    Email When Error
    
    Select to notify the system administrator of report email errors.
    
5.  Click the Recipients tab and then select the email recipients.
    
    If you want to send the email to more than one user, select the first user, select Additional recipient(s) emails, and then enter the email addresses.
    
6.  Click the Frequency tab and then specify how often report emails are sent as described in the following table:
    
    Field
    
    Description
    
    Precondition
    
    Select the End of Day option if you want the system to verify that the end of day has been completed before sending the report mail.
    
    Frequency Type
    
    Select how often the report mail will be emailed.
    
    Time Zone
    
    Select the time zone.
    
    Depending on your system configuration, Reporting and Analytics can run scheduled reports and send report emails after a service outage. Reports scheduled to run more than once during the interval only run once with the last set of information. If the business date changed during the service outage, all reports are run as if they were scheduled to run on the current day. For example, the Daily Operations report will show information for the most recent business date rather then retrieving information for the day that the service outage occurred.
    
7.  Click Save.

**Parent topic:** [Scheduled Reports](c_report_scheduled.htm)
