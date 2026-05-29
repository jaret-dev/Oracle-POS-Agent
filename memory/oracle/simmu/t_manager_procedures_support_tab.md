---
source: simmu
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/simmu/t_manager_procedures_support_tab.htm
title: "Reviewing Workstation Services Security"
crawled_at: 2026-05-29T14:28:40.602Z
---
# Reviewing Workstation Services Security

[Previous](t_manager_tasks_run_ws_diagnostics.htm) [Next](t_manager_procedures_replay_checks.htm) JavaScript must be enabled to correctly display this content

Starting with the Simphony 19.6 release, some ServiceHost services now listen on separate HTTP and HTTPS ports. To help review your workstation’s services security and port settings, a few changes have been made to the Property Management Console’s (PMC) Support tab.

Running a Workstation Security Report

To generate a security report from a workstation:

1.  Select the Launch PMC function key.
    
2.  Select the Support tab.
    
3.  Under the Workstations heading, select the Security button to generate a report.
    
    Figure 2-2 PMC Workstation Services Security Button
    
      
    ![This figure shows the launched PMC’s workstation Security button.](img/pmc_general_tab.png "This figure shows the launched PMC’s workstation Security button.")  
    
    Here is an example of a workstation services security report:
    
    Figure 2-3 Workstation Services Security/Status Report
    
      
    ![This figure shows the workstation services security and status report.](img/pmc_general_security_report.png "This figure shows the workstation services security and status report.")  
    
4.  When you are finished reviewing the report, press Close to exit.
    

Updated the PMC Network Services Output

To access the Network Services button:

1.  Select the Launch PMC function key.
    
2.  Select the Support tab.
    
3.  Under the Network heading, select the Services button.
    
4.  When you are finished reviewing the workstation services, press Close to exit.
    

Figure 2-4 PMC Network Services

  
![This figure shows the launched PMC’s network Services button.](img/pmc_general_tab_1.png "This figure shows the launched PMC’s network Services button.")  

The PMC Services form has been updated to include Secure Port numbers and Secure URLs when the feature and your system is working as expected.

Note:

In case of any problems, a fallback to HTTP mode has been implemented, so the form shows the legacy HTTP ports and URLs when in this mode.

Figure 2-5 PMC Network/Workstation Services

  
![This figure shows the Network/Workstation services and all of the utilized port numbers (including secure ports and URLs).](img/pmc_support_services.png "This figure shows the Network/Workstation services and all of the utilized port numbers (including secure ports and URLs).")  

Updated the PMC Network Menu to Show the Web Server Log

Web Server log information can accessed via the PMC.

To access the Web Server log:

1.  Select the Launch PMC function key.
    
2.  Select the Support tab.
    
3.  Under the Network heading, select the Web Server Log button.
4.  When you are finished reviewing the log file, press Close to exit.
    

Figure 2-6 PMC Network Web Server Log

  
![This figure shows the launched PMC’s network Web Server Log button.](img/pmc_general_tab_2.png "This figure shows the launched PMC’s network Web Server Log button.")  

Figure 2-7 PMC Web Server Log

  
![This figure shows the Web Server log from the PMC.](img/pmc_general_web_server_log.png "This figure shows the Web Server log from the PMC.")  

**Parent topic:** [Manager Tasks for Workstation Reports and Procedures](c_manager_tasks_ws_reports_procedures.htm)
