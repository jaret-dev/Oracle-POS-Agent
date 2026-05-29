---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/t_payment_one_credit_card.htm
title: "Tendering with One Credit Card"
crawled_at: 2026-05-29T14:28:38.086Z
---
# Tendering with One Credit Card

[Previous](t_payment_reauthorize_released_cc.htm) [Next](t_payment_multiple_credit_card.htm) JavaScript must be enabled to correctly display this content

## Tendering with One Credit Card

You can tender checks using a single credit card based on the workstation configuration. The workstation has one of the following configurations:

-   Separate buttons for authorizing and finalizing credit card payments
    
-   One button to authorize and finalize credit card payments
    

1.  If the workstation has separate buttons for authorize and finalize (sale):
    1.  Press the Credit Card Authorization tender button.
    2.  Swipe the credit card or enter the credit card number and expiration date, and then press OK. The merchant and customer vouchers print (if configured). To abort the payment transaction from the workstation, press Cancel.
        
        If your system uses the Oracle Payment Interface (OPI) and you previously performed a credit card authorization and then added menu items to the check (for example, a bar tab), you are prompted with Select Existing Auth or New Card?. The card does not need to be present after the initial authorization. If you select an existing auth, the card will receive a new authorization for the full amount, and a merchant voucher prints. (The original authorization is reversed by OPI.)
        
    3.  Perform a service total.
    4.  Pick up the check.
    5.  Press the Credit Card Finalize tender button, enter the check amount, and then press OK. The customer receipt prints.
2.  If the workstation has one button for authorize and finalize (sale):
    1.  Press the tender button configured for credit card sale payments.
    2.  Enter the check amount, and then press OK.
    3.  Swipe the credit card or enter the credit card number and expiration date, and then press OK. Depending upon your configuration the merchant voucher, customer voucher, and the customer receipt either prints, does not print, or a prompt appears asking you to print. To abort the payment transaction from the workstation, press Cancel.
    4.  If your system uses OPI to process credit cards, after the guest signs the merchant voucher to authorize the credit transaction, you need to visually check to ensure that the signature on the merchant voucher matches the signature on the card.
        
        -   If the signatures match, click Yes at the Does the signature match the signature on the card? prompt.
            
        -   If the signatures do not match, click No. The payment is voided and a reversal request is sent to OPI. The check detail area appears, and the check remains open awaiting a new payment tender.
            
        -   If multiple languages are configured, click Translate to change the Yes, No, and Translate buttons to the configured language. The prompt message is not translated in Simphony version 2.10.
            
        

**Related Topics**

-   [Tendering with Multiple Credit Cards](t_payment_multiple_credit_card.htm)
-   [Check Payment](c_paying_check.htm)

**Parent topic:** [Check Payment](c_paying_check.htm)
