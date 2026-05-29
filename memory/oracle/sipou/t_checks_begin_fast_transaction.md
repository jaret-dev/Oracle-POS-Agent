---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/t_checks_begin_fast_transaction.htm
title: "Beginning a Fast Transaction"
crawled_at: 2026-05-29T14:28:34.846Z
---
# Beginning a Fast Transaction

[Previous](t_checks_begin_close_check.htm) [Next](t_checks_add_guest_count.htm) JavaScript must be enabled to correctly display this content

## Beginning a Fast Transaction

A fast transaction lets you start a transaction without having to select a Begin Check function key. Fast Transactions are often used in retail or concession environments where a workstation operator stands in one place and quickly adds transactions repeatedly without assigning guests to table or check numbers.

If the property is using the Simphony Payment Interface (SPI) to process standard credit card transactions and quick chip is enabled, the guest can swipe or dip the credit card at the beginning of a fast transaction while you enter menu items.

1.  Sign on to the workstation.
2.  Click any menu item key.
    
    If quick chip is enabled, the PIN Entry Device (PED) lights up on the start of the transaction. If a card was dipped or swiped during the fast transaction, the card details can then be used to pay for the transaction.
    
3.  In case of partial payment, the swiped/dipped card’s information is used for the first card payment that is initiated at the workstation. Any subsequent card payments cause the PED to prompt the guest to swipe or dip a card. If the guest pays with a different payment method or presses the Cancel button on the PED at any time after swiping or dipping the card, the card details are removed and the transaction is treated as a regular, non-quick-chip transaction. The PED lights up when the credit card payment is invoked at the workstation.

**Related Topics**

-   [Guest Checks](c_checks.htm)
-   [Beginning and Closing a Check](t_checks_begin_close_check.htm)

**Parent topic:** [Guest Checks](c_checks.htm)
