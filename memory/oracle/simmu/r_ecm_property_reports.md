---
source: simmu
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/simmu/r_ecm_property_reports.htm
title: "ECM Property Reports"
crawled_at: 2026-05-29T14:28:42.473Z
---
# ECM Property Reports

[Previous](r_ecm_individual_receptacle_types.htm) [Next](c_simphony_web_portal.htm) JavaScript must be enabled to correctly display this content

The workstation property reports contain information about active receptacle sessions and transactions to assist in daily operations management. The reports include multiple classes showing additional currency and class details. You can print these reports to a local printer. The following table lists the ECM property reports.

Table 4-4 ECM Property Reports

Report

Description

Bank Deposit Report

This report contains information about active bank deposit sessions for the location.

Cash Pull Report

This report contains information about cash pull transactions posted for the current business date.

Change Order Report

This report contains information about open Change Order sessions and transactions for the location.

Count Sheet

This report is not selectable, and it prints automatically after completion of a receptacle count. The details shown are for counts entered during a receptacle count, including class totals and over/short values (if applicable).

Over/Short Detail Report

This report contains information about over and short conditions recorded for the current business date.

Paid-In/Paid-Out Report

This report contains information about paid-in and paid-out transactions recorded for the current business date. It is based on the revenue center in which the paid-in/paid-out activity occurred.

Petty Cash Report

This report contains information about active petty cash sessions for the location.

Safes Report

This report contains information about active safe sessions for the location.

Server Bank Report

This report contains information about the active server bank session for the operator signed on to the workstation.

Server Banking Report

This report contains information about active server banking sessions for the location.

Till Banking Report

This report contains information about active till sessions for the location.

Till Report

This report contains information about active till sessions assigned on the workstation.

The following image shows an example of a Petty Cash Report.

Figure 4-1 Petty Cash Report

  
![This figure shows an example of a Petty Cash Report.](img/ecm_property_report_example.png "This figure shows an example of a Petty Cash Report.")  

The summary section for each report shows the currency name, abbreviation, and values (using symbol and separator). Totals are shown for each currency.

You can filter a property report by revenue center. The revenue center filter is based on the employee operator assignment record, reporting privileges (for each report), and the receptacle location. The filter recognizes the level at which the receptacle was defined (such as property or revenue center). Users (managers) that have access—through operator assignment—to all revenue centers can view receptacles at the property level and below (revenue centers). When a user is assigned to a specific revenue center, the filter only shows the revenue center assignment. When a user (supervisor) has reporting privileges in a specific revenue center but only has server (non-reporting) privileges in another revenue center, the filter shows the revenue center for which they have reporting privilege. The revenue center filter is not available for the Till Report or the Server Bank Report.

**Parent topic:** [Enterprise Cash Management (ECM)](c_ecm_operations.htm)
