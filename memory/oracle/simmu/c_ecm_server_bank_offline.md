---
source: simmu
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/simmu/c_ecm_server_bank_offline.htm
title: "Server Bank Offline"
crawled_at: 2026-05-29T14:28:42.379Z
---
# Server Bank Offline

[Previous](c_ecm_till_offline.htm) [Next](t_ecm_consolidate_server_banking_session.htm) JavaScript must be enabled to correctly display this content

When a server wants to post transactions from a workstation that is offline, you can open a new offline server bank. You can create a new server bank as a server may work on multiple workstations. Oracle Hospitality recommends limiting the number of workstations the server can use while offline. The server can perform most Cash Management operations on an offline session, including:

-   Tendering transactions on guest checks
    
-   Pulling cash: Funds are not transferred and a chit represents the cash pull
    
-   Printing reports for the session from the workstation
    
-   Counting the server bank
    
-   Depositing cash: The application creates an offline bank deposit on the local workstation to accept the cash deposit
    
-   Closing the server bank
    

After the workstation re-connects online and establishes communication with the Cash Management Service on the primary posting workstation, the application synchronizes all offline sessions and activity performed on the offline workstation with the Cash Management Service.

**Parent topic:** [Enterprise Cash Management (ECM)](c_ecm_operations.htm)
