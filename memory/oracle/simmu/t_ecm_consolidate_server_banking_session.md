---
source: simmu
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/simmu/t_ecm_consolidate_server_banking_session.htm
title: "Consolidating Offline Server Banking Sessions"
crawled_at: 2026-05-29T14:28:42.347Z
---
# Consolidating Offline Server Banking Sessions

[Previous](c_ecm_server_bank_offline.htm) [Next](r_ecm_individual_receptacle_types.htm) JavaScript must be enabled to correctly display this content

If the server created more than one server banking session during the course of a shift (for example, to perform cash activities on offline workstations), Oracle Hospitality recommends consolidating all offline sessions into a single session. Consolidation reports transaction activity for the unselected sessions into the single master session to maintain a complete audit trail. The application automatically clears sessions that are not consolidated before the next business day, and does not record transaction activity from these sessions. The server should reconcile funds recorded for these sessions as an over or short count on the valid server banking session.

1.  Select the function to consolidate multiple server banking sessions.
2.  If necessary, on the employee form, select the employee with multiple sessions to consolidate, and then click OK.
    
    This is required only when more than one employee with multiple sessions exists.
    
3.  Highlight the session to retain as the master session, and then click OK to consolidate all other sessions into the master session.

**Parent topic:** [Enterprise Cash Management (ECM)](c_ecm_operations.htm)
