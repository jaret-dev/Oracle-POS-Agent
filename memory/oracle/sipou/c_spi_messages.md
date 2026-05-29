---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/c_SPI_messages.htm
title: "SPI Messages"
crawled_at: 2026-05-29T14:28:40.264Z
---
# SPI Messages

[Previous](c_error_messages.htm) [Next](#) JavaScript must be enabled to correctly display this content

## SPI Messages

Message

Description

Acceptor Contact Acquirer, Security - Code 66

The transaction is declined.

Collect the card and contact the card acquirer's securtity department for further instructions.

Already Paid - Code 38

The transaction is declined.

Pay at Table - the check has already been paid in full.

Approved for Partial Amount - Code 10

The transaction is approved for a lesser amount.

The transaction is approved for a lesser amount than requested. Obtain additional payment for the remaining amount.

Approved, Update Track 3 - Code 16

N/A

Approved, VIP - Code 11

The transaction is approved.

This cardholder is identified as a VIP.

Bank Not Supported By Switch - Code 31

The transaction is declined.

The bank associated with the payment card account is not supported. Use a different payment.

Cannot Complete, Violation of the LAW - Code 93

The transaction is declined.

The requested transaction is illegal and can't be performed.

Capture Card - Code 67

The transaction is declined.

Collect the card.

Card Acceptor, Contact Acquirer, Retain Card - Code 35

The transaction is declined.

The card is not valid. Contact the acquirer and collect the card.

Check is Opened (by other workstation) - Code 26

The transaction is declined.

Pay at Table - the referenced check is open on another workstation. Close the check on the other workstation, then try again.

Contact Acquirer Security Department, Retain Card - Code 37

The transaction is declined.

Collect the card and contact the card acquirer's security department for further instructions.

Cutoff in Progress - Code 90

The transaction is declined.

The terminal is performing the day-end cutoff. Try again when the process is completed.

CVV Validation Error - Code 82

The transaction is declined.

The validation failed. Verify the information and try again.

Do Not Honor - Code 5

The transaction is declined.

Do not honor this card for payment and use a different payment.

Duplicate Transaction - Code 94

The transaction is declined.

The same transaction has already been performed.

Error - Code 6

The transaction is declined.

This is a generic error, no further detail is available.

Exceeds Withdrawal Limit - Code 61

The transaction is declined.

N/A

Expired Card - Code 54

The transaction is declined.

The payment card is expired. Use a different payment.

Expired Card, Capture - Code 33

The transaction is declined.

The payment card is expired. Collect the card.

Format Error - Code 30

The transaction is declined.

The message format is incorrect.

Function Not Permitted to Cardholder - Code 57

The transaction is declined.

The requested function is not permitted with this card. Use a different payment.

Function Not Permitted to Terminal - Code 58

The transaction is declined.

The requested function is not permitted on this payment device. Try on a different device.

Function Not Supported - Code 40

The transaction is declined.

The requested function is not supported with the payment support provider.

Host or Switch Unavailable

The transaction is declined.

The terminal is unable to communicate with the host or switch.

Incorrect PIN - Code 55

The transaction is declined.

The entered PIN is incorrect. Try again.

Insufficient Funds - Code 51

The transaction is declined.

The account associated with this card does not have sufficient funds or credit to cover the transaction. Use a different payment.

Invalid Card Number - Code 14

The transaction is declined.

The card number is invalid. Re-enter or use a different card.

Invalid Transaction - Code 12

The transaction is declined.

This transaction type is not supported.

Invalid Transaction RVC ID or Merchant Mismatch - Code 97

The transaction is declined.

The payment device is registered to a different merchant than the Revenue Center is associated with. Correct the configuration and try again.

Lost Card - Code 41

The transaction is declined.

This card has been reported as lost. Use a different payment.

No Action Taken - Code 21

The transaction is declined.

The requested procedure was not executed. Try again.

No Card Record - Code 56

The transaction is declined.

N/A

No Check Account - Code 52

The transaction is declined.

N/A

No Credit Account - Code 39

The transaction is declined.

This card is not associated with a valid credit account. Use a different payment.

No Investment Account - Code 44

The transaction is declined.

N/A

No Issuer - Code 15

The transaction is declined.

The card is not associated with a valid issuer. Use a different payment.

No Merchant - Code 3

The transaction is declined.

The configured Merchant ID is invalid. Correct the configuration and try again.

No Open Check On This Table - Code 24

The transaction is declined.

Pay at Table - there are no open checks associated with the table number. Verify the information and try again.

No Privilege to Perform Refund - Code 29

The transaction is declined.

The signed in user does not have the privilege to perform a refund.

Pick Up Card - Code 4

The transaction is declined.

Collect the payment card, if possible.

Pick Up Card, Special - Code 7

The transaction is declined.

Collect the payment card, if possible.

PIN Tried Exceeded - Code 75

The transaction is declined.

The card holder has entered the wrong PIN too many times. Collect the card.

PIN Tries Exceeded, Capture - Code 38

The transaction is declined.

The card holder has entered the wrong PIN too many times. Collect the card.

POS Cancel - Code 0

The transaction is declined.

The transaction has been canceled from the POS.

Posting Failure - Code 45

The transaction is declined.

N/A

Read Card Error - Code 0

The transaction is declined.

The card could not be read. Try again or use a different payment.

Re-enter Last Transaction - Code 19

The transaction is declined.

The last transaction failed. Try Again.

Refer to Issuer - Code 1

The transaction is declined.

Contact the card issuer for more information.

Refer to Issuer, Special -Code 2

The transaction is declined.

Contact the card issuer for more information.

Request in Progress - Code 9

The transaction is declined.

Another request is being processed. Try again.

Restricted Card - Code 62

The transaction is declined.

The card has been restricted. Use a different payment.

Restricted Card, Retain Card - Code 36

The transaction is declined.

The card has been restricted. Collect the card.

Stolen Card - Code 43

The transaction is declined.

This card has been reported as stolen. Use a different payment.

Suspected Fraud - Code 59

The transaction is declined.

Fraud is suspected with this card account. Use a different payment.

Suspected Fraud, Retain Card - Code 34

The transaction is declined.

Fraud is suspected with this card account. Collect the card.

Suspected Malfunction - Code 22

The transaction is declined.

A technical error occurred and the transaction was not completed. Retry.

System Error - Code 96

The transaction is declined.

A technical error occurred and the transaction was not completed. Retry.

Transaction Approved - Code 0

N/A

Message is never displayed.

Unable to Locate Record on File - Code 25

The transaction is declined.

This error occurs when a transaction such as incremental authorization, finalization, void, or refund is referencing a previous transaction that can't be found or is otherwise not valid. Verify the information and try again.

Unacceptable Transaction Fee - Code 23

The transaction is declined.

N/A

User Cancel - Code 0

The transaction is declined.

The user has canceled the transaction from the payment device.

User Not Found - Code 18

The transaction is declined.

The configured user for this driver is invalid.

User Not Login Yet - Code 27

The transaction is declined.

Pay at Table - the user must log in first.

User Response Timed Out - Code 0

The transaction is declined.

The card holder didn't respond to the terminal prompt within the allocated time. Retry.

**Parent topic:** [Understanding Workstation Messages](c_messages.htm)
