---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/c_checks_follow_me_sharing.htm
title: "Follow Me Checks"
crawled_at: 2026-05-29T14:28:35.831Z
---
# Follow Me Checks

[Previous](c_checks_transfer_team_check.htm) [Next](t_checks_printer_selection.htm) JavaScript must be enabled to correctly display this content

## Follow Me Checks

When servers share one or more workstations, inactive checks affect the workflow. The following table outlines a workflow example when two or more servers share a single workstation.

Table 3-4 Sample Workflow When Employees Share a Workstation

Server

Actions

Employee 1

1.  Signs on to the workstation and begins a fast transaction by ordering a few beers.
    
2.  Turns around to speak with a guest but does not perform a service total on the check.
    

Employee 2

1.  Walks to the same workstation and swipes the card to sign on while Employee 1’s check is open. Employee 2 is now signed in and Employee 1’s check is automatically suspended.
    
2.  Begins a new fast transaction with an order for fish and chips.
    
3.  Walks away to get a beer order, leaving the check open on the workstation.
    

Employee 1

1.  Walks to the same workstation and swipes the card to sign on.
    
2.  Employee 1 automatically resumes the check that was suspended when Employee 2 signed on.
    
3.  Employee 1 tenders the check.
    

This sample scenario continues repeatedly in a pub or fast casual restaurant environment. Upon signing on to the workstation, the last suspended check resumes for the signed on employee until that check is either service totaled or paid. After performing a service total or final tender, the employee can begin a new check or pick up an existing check. After an employee performs a service total or final tender, the workstation sends kitchen items to the order device.

This workflow is the same when multiple workstations are present. An employee with a suspended check can sign on to any workstation in the revenue center to automatically resume the check.

The Check Inactivity Timeout causes the workstation to automatically sign the employee out and suspend the check. When the check inactivity timeout elapses, the workstation does not send menu items to order devices. After an employee performs a service total or final tender, the workstation sends kitchen items to the order device.

**Parent topic:** [Guest Checks](c_checks.htm)
