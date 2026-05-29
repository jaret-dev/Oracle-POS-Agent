---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/c_check_filter_and_memo_check.htm
title: "Seat Filtering and Memo Checks"
crawled_at: 2026-05-29T14:28:36.000Z
---
# Seat Filtering and Memo Checks

[Previous](t_email_receipt.htm) [Next](t_check_filter_seat.htm) JavaScript must be enabled to correctly display this content

## Seat Filtering and Memo Checks

You can filter a check by one or more seat numbers, apply a tender only for the detail and summary totals associated with the seat, and if required, create a check for the filtered seats. This enables you to:

-   Review check detail posting to facilitate the delivery of meals to the proper guest
    
-   Print checks for one or more seats, or for groups of seats in a large party without creating separate checks
    

For example, a party of four arrives at the restaurant. You begin a check for the table, assigning a seat number to each order. When the party has completed the dining experience, guests at seats 1 and 2 want to pay and leave before the guests at seats 3 and 4. You can:

1.  Filter the check by seats 1 and 2.
    
2.  Apply a tender and close the check for the filtered seats.
    
3.  If configured, print a memo check.
    
4.  Close the check by tendering the remaining seats.
    

After applying a tender to a filtered check, items belonging to the filtered seat or seats are removed from the primary guest check.

The check for the filtered seats is referred to as a memo check. After closing a memo check, depending on the configuration, the active seat in the filter increments to the next seat number, and menu items associated with that seat appear in the check detail area. A memo tendered check contains the same information as the primary check when closed, such as service team details, event details, and suite owner details.

You can identify memo checks on the Check Journal Report by the MEMO CHECK banner on the check header and in ad-hoc reports, as well as on the printed check.

Figure 3-3 Sample Check Filtered by Seats

  
![This figure shows a sample check filtered by three seats.](img/ws_memo_check.png "This figure shows a sample check filtered by three seats.")  

Figure 3-4 Sample Printed Memo Check

  
![This figure shows a sample printed memo check.](img/printed_memo_chk.png "This figure shows a sample printed memo check.")  

If you print a memo check before applying a tender to the filtered seats, the memo check prints with the check number of the primary check. If you print a memo check after applying a tender and closing the check, a new check number is assigned to the check that is closed. This check numbering continues until the last items on the check are tendered, which closes the primary check and retains the number.

Applying Discounts on Memo Checks

You can apply manual discounts to a memo check.

-   If one seat is in the active seat filter, the manual discount is applied to the seat that is filtered, and the indicator next to the discount shows the seat number in the check detail.
    
-   If multiple seats are in the active seat filter, the manual discount is applied to all seats that are in the seat filter, but not on the remaining items on the primary check. The indicator next to the discount shows the letter F in the check detail as the discount is applied to multiple seats.
    
-   If there is no active seat filter, the manual discount is applied to the entire check. There is no indicator next to the discount in the check detail.
    

If an automatic or coupon discount is applied to the primary check, Simphony recalculates the discount when the check is filtered by seats. That is, Simphony applies the automatic or coupon discount to the memo check only if the menu items for the filtered seats are eligible for the discount.

Performing Operations on a Memo Check

The following conditions apply when performing operations on a memo check:

-   When the check is filtered by multiple seats, new menu items, discounts, and service charges that you add are added to the lowest seat number.
    
-   You cannot perform the following functions when a seat filter is active:
    
    -   Fire Now
        
    -   Next #/Next Seat
        
    -   Touch Split
        
    -   Begin Check
        
    -   Pick Up Check
        
    -   Transfer Check
        
-   Simphony supports assigning up to 99 seats to a check.
    

Performing Memo Tenders When Using a Kitchen Display System (KDS)

The following conditions apply to the KDS when performing a memo tender:

-   KDS Reports and report drill downs do not account for memo tendered or split checks in check counts, timings, and check detail.
    
-   Check modifications such as adding new menu items to a check, adding or editing condiments, and the voiding of existing menu items are not allowed when the following Dynamic Order Mode (DOM) types are enabled:
    
    -   Fire on Fly
        
    -   Fire on Next
        
    -   Fire on Tender
        

**Related Topics**

-   [Filtering a Check by Seat Number](t_check_filter_seat.htm)
-   [Removing a Seat from the Filter](t_check_remove_filter.htm)
-   [Changing the Seat Number of Menu Items on a Check](t_check_edit_seat.htm)
-   [Printing a Memo Check](t_check_print_memo_chk.htm)

**Parent topic:** [Guest Checks](c_checks.htm)
