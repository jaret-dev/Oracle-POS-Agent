---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/c_error_messages.htm
title: "Error Messages"
crawled_at: 2026-05-29T14:28:40.256Z
---
# Error Messages

[Previous](c_messages.htm) [Next](c_SPI_messages.htm) JavaScript must be enabled to correctly display this content

## Error Messages

The following table describes error messages you may encounter on a workstation:

Message

Description

Add check to itself not allowed

This message displays if you type the number of the current open check and press an \[Add/Transfer\] key. For example, if you opened or picked up check #1234 (or the equivalent table number) and then entered 1234 (or the equivalent table number) and pressed \[Add/Transfer\], you would be trying to add check #1234 to itself. Press \[Clear\] and enter the correct check identification.

AT entry not allowed with percentage service charge

This message displays if you use the \[@/For\] key with a percentage \[Discount\] key or a percentage \[Service Charge\] key. You may only use the \[@/For\] key with an amount \[Discount\] or \[Service Charge\].

Authorizing employee does not have authority

This message displays when authorization is required and the employee ID that is entered is for an employee not privileged to authorize the action. Press \[Clear\] and enter a privileged employee’s ID number, or press \[Clear\] again to cancel the operation.

Authorizing employee is not in the correct employee group

This message displays when you attempt to access another employee's record and this employee is not in your employee group.

Auto service is already on

This message displays if you press an \[Auto Service Charge\] key when an auto service charge is programmed to automatically apply to all checks in this revenue center.

Bank amount entry required

This message displays if you attempt to begin a transaction without declaring an opening bank amount for your cash drawer. Press \[Clear\] to continue. Enter the opening bank amount with a \[Media Loan\] type tendering key. On your system, this key may be labelled \[Opening Bank\], \[Declare Cash\], etc.

Cannot add checks with different order types

This message displays if you attempt to add a check to another check with a different order type. For example, you cannot add a check with the order type TO GO to a check with the order type EAT IN. To proceed, change the order type of one check to match the other, then begin again.

Cannot split check with allocated discounts

This message displays if the \[Split Check\] key is used on a check which has a subtotal discount which is an allocated discount.

Cannot split item with modifiers

This message displays if a line has more than one of an item (for example, 3 Hamburgers), and the line has condiments (for example, Rare) and you attempt to void only 1 or 2 of this line item. If a line has consolidated menu items which have condiments, the menu items cannot be split. You must void the entire line, and post the menu items separately.

Cannot split open priced item

This message displays if a line has more than one of an open priced item (for example, 3 Open Food), and you attempt to void only 1 or 2 of these items. When a consolidated line is comprised of open priced menu items, you must void the entire line.

Cannot use with exemption

This message displays when you press a key other than a tendering key after using an \[Exempt Tax\] key or an \[Exempt Auto Service Charge\] key which requires a tendering key be pressed. Press a tendering key; or, void the exemption.

Check not found

This message displays if you attempt to pick up a guest check using the \[Pick Up Check By Number\] key and enter the number of a check that is not in the Open Check File. Either a check with that number is already closed or has never been opened.

Check number already exists

This message may display under two conditions:

-   If the system is programmed to allow you to assign check numbers and you enter the number of a currently open check and press the \[Begin Check By Number\] key.
    
-   If the system is programmed to assign check numbers, the check counter has exceeded the upper limit for that workstation, and the check numbers have cycled from the lower limit to the number of a currently open check.
    

Check pickup required

This message displays if you press a \[Discount\], \[Service Charge\], or \[Tender/Media\] key outside of a transaction. It also displays if you are not privileged to begin a fast transaction and you press a \[Menu Item\] key outside of a transaction. Press \[Clear\] to continue, and then begin a new check or pick-up an open guest check.

Choose an order pickup time after <date/time>.

This message displays when you need to enter a new pickup time as the current time has passed. The <date/time> is the current time + the service level time.

Condiment not allowed

This message displays if you attempt to add condiments to a menu item which is a member of a Menu Item Class which is not programmed to accept condiments.

Condiment not allowed: <condiment group> - full

This message displays when you ring up a menu item whose assigned maximum threshold value for the required condiment group is exceeded.

Cover charge requires a preset amount service charge

This message displays if you attempt to enter either an open dollar amount Service Charge, or a percentage Service Charge, as a Cover Charge.

Discount is not allowed with the current order channel

This message displays when you attempt to apply a manual or coupon discount which is restricted to an order channel which does not match the guest check's order channel.

Discount is not allowed with the current order type

This message displays when you attempt to apply a manual or coupon discount which is restricted to an order type which does not match the guest check's order type.

Employee ID can not be found

This message displays if you enter either an Employee Number or Employee ID number, and the entry does not exist in the Employee module.

Employee inactive

This message displays if you enter the Employee Number of an employee whose Employee ID is zero.

Fast transaction cannot be service totaled

This message displays if you attempt to service total a fast transaction and your system is not programmed to allow this. You must tender and close the guest check on the system before beginning another transaction.

Final payment entry must be voided

This message displays if you attempt to modify a re-opened check which was closed with a final tender and change was due. You cannot modify the check until you void the tender using the line item void method.

Inclusive tax exemption not allowed with card payment

This error message is displayed for any payment with a credit card tender where the SPI default tender exempts inclusive tax rates.

Invalid SKU number

This message displays if the system is programmed to perform a Check Digit Verification on SKU entries and the entered number was incorrect.

Items with <tax rate name> tax cannot be shared

This message displays if you attempt to share an item associated with the Luxury or Add-On, Excludes Start Amount tax type among multiple seats or checks.

Last item void not allowed

This message displays if you partially tender a guest check to a Property Management System (PMS) (for example, through a room charge), then attempt to void the action. On completing the partial tender, the charge is automatically posted to the PMS computer, so a last item void is not allowed. To void an incorrect partial tender posted to a PMS, you must void it as if it had been entered in a previous service round.

Magnetic card is the wrong type

This message displays if you swipe a card through the magnetic card reader which is of the wrong type. For example, you receive this message if, during a tendering operation, you have swiped a magnetic card which is not a debit or credit card.

No cash drawer assigned

This message displays if you use the \[No Sale\] key to open a cash drawer and there is no cash drawer assigned to you.

No employee assigned to cash drawer at this workstation

This message displays if there is an attempt to use the \[Unasgn Csh Drawr\] key when there are no employees currently assigned to any cash drawer.

No items to repeat

This message displays if you press the \[Repeat Round\] key and no items from the previous service rounds are programmed to repeat. Menu items must be programmed to allow their use with the \[Repeat Round\] key.

No response

This message displays if a Property Management System (PMS) has not responded to the Simphony system within the time limit set in the Interface File. Press \[Clear\] to continue, and try again. If this problem recurs, it may be caused by a problem with PMS communications, or it may indicate that the entry in the PMS Timeout field in the Interface File must be increased.

No sales to apply service charge to

This message displays if a \[Service Charge\] key is pressed and either of the following two conditions are in effect:

-   No menu items have been posted which are programmed to add to the itemizers to which this service charge calculates.
    
-   The itemizers have been cleared by a previously applied service charge.
    

Non-Revenue Service Charge not allowed

This message displays if a \[Service Charge\] key is pressed and either of the following two conditions are in effect:

-   This message displays if you attempt to post a service charge which is programmed as a Non-Revenue Service Charge while in a transaction. The service charge must be posted inside a transaction.
    
-   This message displays if you are in the Training Mode and attempt any of several actions that are not allowed in Training Mode (for example, PMS posting, Credit Authorization, etc.).
    

Not allowed with menu item on hold

This message displays if you are using the Hold and Fire function, and you attempt to split, memo tender, or transfer this check before firing. Press \[Clear\] to continue. Fire the order and begin again.

Not allowed with closed check adjustment

This message displays if you attempt to make any changes to a closed check other than to change the tender type or the amount of the charged tip. You may adjust only the payment type or the amount of a charged tip with the \[Adjust Closed Check\] key. Other items on a closed check may be added, removed, or changed using the \[Reopen Closed Check\] key.

Not allowed with fast transaction

This message displays if you press an \[Add/Xfer Check\] key during a fast transaction. This message also displays if you press the \[Split Check\] key during a fast transaction printing a line-by-line customer receipt.

Not allowed with non-revenue service charge posting

Non-revenue service charges must be tendered immediately, and for the exact amount. This message displays if you attempt to add detail entries after posting a non-revenue service charge, or if you attempt to overtender the check.

Not allowed with Reopened Check

This message displays if you press an \[Add/Xfer Check\] key after reopening a closed check. A check cannot be added to a re-opened check.

Not allowed with Transaction Void

This message may display in response to any of several actions which are not allowed after pressing the \[Transaction Void\] button.

Not supported on this version

This message may display under two conditions:

-   For Microsoft Windows workstations, when using the Custom Browser feature, this message displays when the version of Microsoft Edge installed is not supported. You need a minimum version of Microsoft Edge 79.0.309.0.
    
-   This message displays when the version of CAL is below CAL 160 when using the Custom Browser.
    

Number of guests entry required

This message displays if you are required to enter the number of guests each time you begin a check.

Out Of Menu Item

This message displays if you select a menu item which has been set to unavailable in the system. A manager or another privileged employee can change a menu item’s status using a Property Management Console (PMC) procedure.

Quantity greater than 1 not allowed for items with <tax rate name> tax

This message displays if you finalize a transaction where a quantity greater than 1 for items with the Luxury or Add-On, Exclude Start Amount tax exists.

Remove tax exemption before splitting or sharing items on the check

This message displays if you attempt to split or share an item with a tax exemption. Remove the tax exemption to split or share the item.

Return not allowed

This message displays if you press the \[Return\] key on an open check, and then attempt to return a detail entry other than a menu item, such as a discount, service charge, or tender.

Scale at zero

This message displays if the weight registered on an attached electronic scale is zero.

Scale calibration error

This message displays if the scale is not calibrated to zero.

Scale failure

This message may display if the workstation is not configured properly or if there is a malfunction with the scale itself.

Scale response timeout

This message displays if a weighed \[Menu Item\] key is pressed and the workstation is expecting a weight signal (from the attached electronic scale) which is not received.

Selected seat has no entries

This message displays if you enter a seat number (for example, while splitting a check), which has no menu items entered, and then you press the \[Filter Seat\] key.

Service Charge not found

This message displays if a number outside the range of service charge NLU numbers is entered when using a Service Charge NLU key. It also displays if a direct access service charge key is not correctly identified in the Discount/Service Charge File. The first case is usually simply an erroneous key strike. The second case is a programming error.

Service Charge that adds to guest count required

This message displays if your system is programmed to require a service charge which adds to the guest count for each check (this is usually a cover charge). Press the \[Service Charge\] key which adds to the guest count.

Service total of closed checks is not allowed

This message may display when you attempt to service total a check which you re-opened using the \[Reopen Closed Check\] key. You can only tender the transaction after you have made any modifications using this key.

Sign-in not allowed, revenue center not found

This message displays if the revenue center to which the employee is linked in the Employee module is not included in the list of revenue centers which this workstation can access. The revenue center number displayed is drawn from the RVC Configuration module.

Surcharge taxes cannot be exempt

This message may display under two conditions:

-   The exempted menu item has a surcharge and the operator presses the Tax Exempt Item function key (configured with or without arguments).
    
-   If any menu items have a surcharge, and the operator presses the Tax Exempt Item function key (configured using an argument equal to the item’s surcharge rate).
    

Table already entered

This message displays if you are in a transaction with a check which already has a table number assigned and you attempt to use the \[Table Number\] key to assign a table number.

Table entry not found

This message displays when you attempt to begin, pick up, or transfer a check by table number and a table number is entered which is not listed in the revenue center’s Tables module.

Tare weight is larger than item weight

This message displays if you enter a weight for a weighed menu item which is smaller than the tare weight (the weight of the empty packaging). Press \[Clear\] to continue. Enter the combined weight of the weighed menu item and its package.

Tax Exempt Item is not supported with multiple inclusive taxes

This message displays if you attempt to perform an item level exemption of a menu item with multiple inclusive taxes. Item level exemption can only exempt a single inclusive tax. All inclusive (non-VAT) taxes can be exempt using the Tax Exempt function.

Tender entry required

A revenue center may be programmed to require tendering in full after a partial tender. If you post a partial tender, and then attempt to do anything else but close this check, this message displays. You may void the partial tender which was just entered, or you may fully tender the check.

Tender/Media not found

This message displays if the number entered with a \[Tender NLU\] key is outside the range of Tender/Media key sequence numbers defined in the Tender/Media File. It also displays if a credit card number has not been defined with a \[Credit Card\] key or a \[Credit Card Lookup\] key before pressing the \[Credit Card Recall\] key.

These items have more than the allowed maximum of 8 inclusive tax rates. Adjust the configuration or transaction so 8 or fewer inclusive tax rates are active for the \[menu item(s)\].

This message displays if a taxable item has more than the supported maximum of 8 inclusive (non-VAT) taxes. The configuration must be adjusted or the transaction changed so eight or fewer inclusive (non-VAT) are active.

This operator is not allowed to begin a check

This message displays if you attempt to use the \[Begin Check By Table\] key or the \[Begin Check By Number\] key and you are not privileged to do so. Check with your manager to correct the situation.

Transaction cancel not allowed after charge posting

This message displays when you press the \[Transaction Cancel\] key when a Property Management System (PMS) posting has already taken place within this service round.

Transaction cancel not allowed after splitting

This message displays if you press the \[Transaction Cancel\] key after using the \[Split Check\] key. You may only service total, print, or tender a split check.

Transaction void not allowed after entries made this round

This message displays if you attempt to use the \[Transaction Void\] key after entries have been made in this round.

URL is blocked. Your organization doesn’t allow you to view this site.

This message displays when you try to access a website which has not been configured by your organization when using the Custom Browser feature.

Valid serving period required to begin a transaction

This message displays if the following conditions are in effect:

-   The current Serving Period has expired.
    
-   Revenue Center programming requires a Serving Period to be active in order to post sales.
    
-   You attempt to begin a transaction. A privileged employee must change the active Serving Period.
    

Void check not allowed after entries made this round

This message displays if you press the \[Void Check\] key in a service round after you have already made an entry in this round. The \[Void Check\] key must be the first key pressed at the beginning of a service round.

Void not allowed after FOR entry

This message displays if you attempt to use the \[@/For\] key twice in voiding a detail entry. For example, entering \[3\] \[@/For\] \[5\] \[@/For\] \[Void\] will generate this message.

You are not assigned to a cash drawer at this workstation

This message displays when you have no cash drawer assigned to you, and you use the \[Unasgn Csh Drawr\] key.

You are already assigned to a cash drawer

This message displays when you already have a cash drawer assigned to you, and you use the \[Asgn Csh Drawr\] key.

You are not clocked in

This message displays if you attempt to sign in and you are required to clock in first. Clock in before you sign in.

You are not currently assigned to this Revenue Center

This message displays if you attempt to sign in on a workstation which is permanently assigned to a revenue center other than your own, or whose list of available revenue centers does not include yours.

**Parent topic:** [Understanding Workstation Messages](c_messages.htm)
