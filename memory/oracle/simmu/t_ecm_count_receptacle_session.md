---
source: simmu
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/simmu/t_ecm_count_receptacle_session.htm
title: "Counting a Receptacle Session"
crawled_at: 2026-05-29T14:28:41.458Z
---
# Counting a Receptacle Session

[Previous](t_ecm_paid_out.htm) [Next](t_ecm_recall_count.htm) JavaScript must be enabled to correctly display this content

You can count a receptacle session based on the Count Sheet defined for the receptacle type. During the counting process, other workstation operators cannot post transactions in order to maintain an accurate count. The person counting can optionally save the count progress prior to completion, and return later to resume the counting process. Clicking Save allows you to attend to other activities and recall progress in the count at a later time. [Recalling a Count](t_ecm_recall_count.htm) contains instructions to return to a count that you saved.

Clicking Done finalizes the count; you can adjust the count if you need to make a change due to a mistake.

If the system has 27 - Prevent Multiple Receptacle Counts and 28 - Prevent Transactions once a Count has been Performed enabled in the EMC, only a single count is allowed for a till or server bank receptacle session. Before the count starts, a warning message informs the workstation operator that no more transactions will be allowed after the count is complete. The workstation operator can proceed after acknowledging this message.

You can view the actual totals for each class, in addition to the values entered. A variance between these two values indicates an over or short condition. The manager might instruct you to recount the receptacle when the variance is greater than permissible levels. You must select from a list of pre-defined over or short reasons in order to complete the count. Upon completion of the count, the application prompts for authorization to change the receptacle balance to the amount entered. Upon update, the Count Sheet prints.

1.  Select the function to count a receptacle.
2.  If multiple receptacles are available, highlight the appropriate session, and then click OK.
    
    If multiple till sessions are assigned to a till, select the appropriate till session (listed by receptacle name, date opened, and employee name (if configured to display employee first for tills on dashboard in the EMC)), and then click OK. The employee name is listed when there is only one employee assigned to a till; when multiple employees are assigned, the first employee shown in the assignment list is displayed.
    
3.  If prompted, enter a reference for the count, and then click OK. The Count Sheet appears.
    
    You are not obligated to enter a reference; you can click OK without first entering a reference.
    
4.  Enter the funds for each of the defined groups on the pages in the Count Sheet.
    
    The Count Sheet shows the pages and groups in the order they were set up. Use the navigation options at the top of the sheet to change the page or group shown.
    
    If a currency class is excluded for a receptacle type, this class does not appear in the Count Sheet.
    
5.  (Optional) You can enter the number of defined units within a group. The Count Sheet accepts keypad entry when a keyboard is physically attached to the workstation on which the count is being performed.
6.  Click Next to advance to the next unit, group, or page defined.
7.  Continue to enter all funds until you reach the Totals Page.
    
    The Totals Page shows a row for each class counted. Depending on the privileges granted, the Totals Page may also show Expected totals and Variance amounts that differ from the counted amounts. If a variance appears on the Totals Page, select an over or short reason for each class to continue.
    
8.  If the count sheet has an allowable over or short limit, recount the receptacle up to the configured number of times. When the variance falls within allowable threshold levels or you reach the recount limit, you can continue.
9.  Click Done to complete the count. If the receptacle is configured to close on count completion, the receptacle session closes. Otherwise, the Count Sheet chit prints. This chit lists the currencies in order by primary class, followed by non-currency classes, and then alternate classes (all alphabetized).
    
    If the expected amount does not match the entered amount, the session balance updates to the entered amount on completion of the count. Depending on the configuration, the application prompts for approval to complete this update.
    
    Class values (minus starting amounts for server bank and till receptacles) are deposited according to the defined Cash Deposit Routing for the currency class. When the counted receptacle is a server bank or till, starting amounts for each class are returned to their source receptacles.
    

**Parent topic:** [Enterprise Cash Management (ECM)](c_ecm_operations.htm)
