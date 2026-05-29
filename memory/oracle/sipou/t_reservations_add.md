---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/t_reservations_add.htm
title: "Adding a Reservation"
crawled_at: 2026-05-29T14:28:39.409Z
---
# Adding a Reservation

[Previous](t_reservations_waitlist_sort.htm) [Next](t_reservations_edit.htm) JavaScript must be enabled to correctly display this content

## Adding a Reservation

1.  Open the Reservation List using one of the following methods:
    
    -   Double-tap quickly on the Reservation List.
        
    -   Click the New Reservation button (if enabled).
        
    
    When creating a reservation from an allocated reservation (double-tapping on a time slot), the application completes certain fields with information from the allocated reservation, including the date, time and covers. The new reservation inherits values from the selected reservation slot.
    
2.  (Optional) Click the Date button to change the date. The date of the reservation request defaults to the highlighted date before opening the Reservation List.
    
    On the Reservations calendar, select a different date, and then click OK. Click the arrows to move forward and backward between months.
    
3.  Enter information about the guest on the Add Reservation Entry dialog, and then click OK.
    
    You can enter data using either a keyboard or mouse that are physically attached to the workstation in which you are entering the request. Alternately, click the Keyboard button on the Add Reservation Entry dialog. The following table describes the fields and buttons.
    
    Table 10-6 Add Reservation Entry Fields
    
    Field or Button
    
    Description
    
    Name
    
    Enter the First Name, Last Name, or both. The name appears on the reservation request and guest check.
    
    Look Up (optional)
    
    If the property is using a loyalty application, such as Oracle Hospitality Gift and Loyalty Advanced Cloud Service, you can look up and associate a guest’s loyalty account with the reservation.
    
    VIP (optional)
    
    Select this option to indicate the guest is a VIP.
    
    Cover Count
    
    Enter the number of guests in the party that require seating.
    
    If you double-tap on a reservation and enter a smaller or larger cover count that is equal to the seating capacity in the list, the application assigns the reservation to a matching seating capacity with the cover count. For example, enter 6 covers for a 4-top at 8:00 p.m. The application assigns this reservation to the same time slot (8:00 p.m.), where the seating capacity and cover count are both 6. Next, enter 2 covers for a 4-top at 9:00 p.m. The application assigns the reservation to the same time slot (9:00 p.m.), where the seating capacity and cover count are both 2.
    
    Phone Number (optional)
    
    Enter the guest phone number to use in contacting the guest if questions arise regarding the reservation.
    
    Requested Table (optional)
    
    If the guest has a specific table request, select the table number. This does not guarantee the table for the guest, but increases the likelihood that the table will be available when the guest arrives for the reservation.
    
    Time
    
    Select the Time button to advance the reservation time using the Hour and Minute + or – buttons.
    
    Availability (optional)
    
    Select Availability to view a list of open reservation times (set by the property manager). Select the time you want to reserve.
    
    Email (optional)
    
    Enter the guest’s e-mail address to send future promotions from the property.
    
    Notes (optional)
    
    Enter special information for the staff working on the day of the reservation (for example, birthday, anniversary, allergic to shellfish).
    
    Revenue Center
    
    If the property supports reservations across multiple revenue centers (for example, a resort or hotel), a selection list appears. This allows hosting staff in the dining room to make a reservation for the guest in another revenue center at the property.
    
    If you change the revenue center after selecting Availability, you must re-select the Availability button to determine the open reservation times in the new revenue center.
    
    Preferences (optional)
    
    If the guest has a table preference (for example, smoking, patio, booth, or window), click the Edit button on the Add Reservation Entry dialog, and select the table preferences.
    
    Referral (optional)
    
    Enter referral sources, such as taxi services, hotel concierge, or advertisements.
    
4.  In some cases where the request values do not match the application’s allowable timeframes, the workstation prompts for reservation approval. If you have the Enable Reservation Approval permission, click No to save the request as unapproved, or click Yes to approve the reservation.
    
    Unapproved reservations appear in the Reservation List. You can approve the reservation, cancel a reservation, or manually control the quickness of seating the request versus other approved requests.
    
5.  After the reservation appears in the Reservation List, the application issues a confirmation number. The confirmation number appears in the summary area at the end of the Reservation List. Highlight the reservation request in the list to view details in the summary area.

**Related Topics**

-   [Reservation List](c_reservations_list.htm)
-   [Reservation List Icons](r_reservations_icons.htm)

**Parent topic:** [Dining Room Management](c_tms.htm)
