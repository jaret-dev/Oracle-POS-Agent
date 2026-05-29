---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/t_checks_add_guest_room_no.htm
title: "Adding the Guest Room Number to a Check"
crawled_at: 2026-05-29T14:28:34.861Z
---
# Adding the Guest Room Number to a Check

[Previous](t_checks_add_guest_count.htm) [Next](c_checks_order_type_change.htm) JavaScript must be enabled to correctly display this content

## Adding the Guest Room Number to a Check

After beginning a check, you can validate a guest’s room number and last name. This does not pre-authorize nor charge payment; it is simply a query through the OPERA Payment Driver to associate the guest’s room number and name on the check. During payment of the check, you can process the room charge without re-entering the guest’s room number and name.

1.  Begin a check.
2.  Add at least one menu item.
3.  Click the Assign Opera Account button.
4.  Enter the guest’s Room number and Last name, and then click OK.
    
    The application queries the OPERA property management system to confirm the room number and name. If the confirmation is successful, a Verified dialog appears, and the guest’s name appears in the check detail. If an invalid room number or name was entered, an error message appears.
    
5.  (Optional) To change the room number or last name, repeat steps 3 and 4.
6.  To tender the check, see [Using OPERA Self Pay to Close a Check](t_paying_check_opera_self_pay_close_check.htm) for instructions.

**Parent topic:** [Guest Checks](c_checks.htm)
