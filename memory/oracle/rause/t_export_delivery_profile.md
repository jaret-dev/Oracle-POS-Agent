---
source: rause
url: https://docs.oracle.com/en/industries/food-beverage/back-office/rause/t_export_delivery_profile.htm
title: "Adding a Delivery Profile"
crawled_at: 2026-05-29T14:28:45.710Z
---
# Adding a Delivery Profile

[Previous](t_export_add_loc_group.htm) [Next](t_export_add_schedule.htm) JavaScript must be enabled to correctly display this content

Specify delivery through SFTP or HTTPS, define destination settings such as the server location for SFTP or the URL for HTTPS, specify authentication details. A delivery profile must be added before adding an export schedule.

Required system privileges: Export Schedules, Add/Edit/View/Delete Delivery Profiles, and either View Schedules or Add/Edit/View/Delete Schedules.

Additional system privilege to transfer ownership of the delivery profile: Transfer Ownership of Delivery Profiles.

You need to select a delivery profile when you add an export schedule. Add the delivery profile before adding the export schedule.

1.  In Reporting and Analytics, click the side navigation menu, click Reports, click Exports, click Schedules, and then click Manage Delivery Profiles.
2.  On the Manage Delivery Profiles page, click Add Delivery Profile.
3.  Enter a profile name and specify if the profile is public or private.
    
    Only the owner of a private delivery profile can add it to a schedule or change the assignment in a schedule.
    
4.  Select the delivery type.
    
    For delivery through SFTP, specify the destination server and folder path on the server. If you authenticate with a certificate, paste the certificate in the SSH Private Key text box. If you edit the profile at a later time, the key value does not show in the text box, only text that mentions a key exists shows in the text box. To change the public key, paste the new public key in the text box and then click Save. If you authenticate with credentials, specify the user name and password.
    
    For delivery through posting to a URL, specify the URL and then specify header parameters. Include header attributes in the post using token. Enter line breaks between each header parameter
    

**Parent topic:** [Export Data from Reporting and Analytics](c_export_data.htm "Set up the data export process and run exports to an endpoint to manage data.")
