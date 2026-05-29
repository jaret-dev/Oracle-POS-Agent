---
source: rause
url: https://docs.oracle.com/en/industries/food-beverage/back-office/rause/c_calendar_financial.htm
title: "Financial Calendars"
crawled_at: 2026-05-29T14:28:45.144Z
---
# Financial Calendars

[Previous](c_calendar.htm) [Next](c_calendar_accountingcycle.htm) JavaScript must be enabled to correctly display this content

The sales information received by Reporting and Analytics from the POS application is processed each business day, as configured by the end-of-day (or end-of-night) operations.

For example, if a location is configured to perform end-of-day operations every night even when it is closed on weekends, the application creates Saturday and Sunday as business days with no sales values, resulting in a seven-day week. If a store is configured to perform end-of-day operations every week day, the application only creates Monday to Friday, and the empty sales values from Saturday and Sunday are rolled into Monday, resulting in a five-day week.

The Reporting and Analytics financial calendar organizes the business dates within the following defined fiscal year components:

-   The start and end of the fiscal year. Financial calendars also define how to handle the surplus day(s) at the end of the year.
    
-   The start and end of each financial quarter.
    
-   The start and end of each financial period.
    
-   The accounting cycle of weeks in each financial period.
    
-   The starting day of each week.
    

Defining fiscal year components, rather than using calendar months, ensures consistent calculations and comparisons across multiple months. Calendar months have inconsistent numbers of weeks and days, making comparison across multiple months less meaningful. A defined financial period consists of four or five weeks, depending on the accounting cycle, and each period includes the same number of each day of the week. This results in a meaningful comparison of values across periods.

The following illustration shows the components of a financial calendar:

![This image shows a diagram of a financial calendar, some financial years that it includes, the financial quarters in a year, the financial periods in a quarter, the financial weeks in a period, the business days in a week, and the day parts in a day.](img/diagram_financialcalendar_update.png "This image shows a diagram of a financial calendar, some financial years that it includes, the financial quarters in a year, the financial periods in a quarter, the financial weeks in a period, the business days in a week, and the day parts in a day.")

\* The financial calendar can be assigned to an organization level and location, with the location settings overriding the level settings.

\*\* The length of a financial period depends on the accounting cycle selected for the financial year. Financial periods are defined by the number of weeks since the start of the financial quarter, and do not correlate to any one specific calendar month.

\*\*\*The first business day of the financial year determines the starting day of the financial week. For example, if a financial year begins Saturday, June 1, every financial week begins on Saturday and ends on the following Friday.

**Parent topic:** [Financial Calendars and Day Parts](c_calendar.htm "Set up day parts and define the financial calendar.")
