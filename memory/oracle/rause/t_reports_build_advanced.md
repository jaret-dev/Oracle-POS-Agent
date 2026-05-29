---
source: rause
url: https://docs.oracle.com/en/industries/food-beverage/back-office/rause/t_reports_build_advanced.htm
title: "Building a Report with the Advanced Editor"
crawled_at: 2026-05-29T14:28:44.400Z
---
# Building a Report with the Advanced Editor

[Previous](t_reports_build_basic.htm) [Next](t_reports_build_revise.htm) JavaScript must be enabled to correctly display this content

The advanced report builder feature gives you more freedom to personalize reports than the basic builder, though it requires XML knowledge. The Oracle MICROS Reporting and Analytics Report Designer’s Guide provides details for using the advanced editor.

You can begin to build a report without all subject area data permissions, but to preview the report you must have those permissions.

Required system privilege: Add/Edit/View/Delete Reports.

1.  In Reporting and Analytics, click the side navigation menu, click Reports, click Builder, and then click Add Report.
2.  Enter the report name and description, and then click Add.
    
    The creation method field is set to New by default. Other options include:
    
    -   Copy: replicates an existing report.
        
    -   Sample: shows a sample report with an example of the XML.
        
    
3.  Review the Publish Details information that will appear on the report preview when published.
4.  Click the Advanced layout.
5.  Enter XML text.
    
    -   For examples of the XML text used to create report components, click Sample in step 2.
        
    -   Use the subject area search feature to search for a measure or attribute, for example Net Sales, and view the subject areas associated with it. The alias for each subject area, measure, or attribute is in parentheses. When adding XML text, you must use the alias.
        
    -   You can use the basic editor to add report components and then go back to the advanced editor to see the XML text. However, certain changes to the XML text with the advanced editor are not supported in the basic editor.
        
    
6.  Click Verify XML to check for errors.
7.  Click:
    -   Save and Run Preview to review the report and publish.
    -   Save to publish the report later.
    -   Save As to create a working copy of new changes, but do not want to make permanent changes to the existing report. This action creates a new report with your changes and does not make changes to the original report.
8.  Click Publish if the report is complete or click Definition to edit the report.
9.  Review the card preview information and then click Publish.

**Parent topic:** [Building Reports](c_reports_builder.htm)
