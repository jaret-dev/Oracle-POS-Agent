---
source: sipou
url: https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/t_checks_apply_menu_item_tax_class_override.htm
title: "Applying a Menu Item Tax Class Override"
crawled_at: 2026-05-29T14:28:36.290Z
---
# Applying a Menu Item Tax Class Override

[Previous](t_cc_voucher_reprint.htm) [Next](c_menu_items_add.htm) JavaScript must be enabled to correctly display this content

## Applying a Menu Item Tax Class Override

The Menu Item Tax Class Override allows you to modify the tax rate applied to a certain group of menu items. This modification of the tax rate is predicated on a quantity threshold, and if the threshold value is met or exceeded, the tax class override will be applied to the tax rate of an item or items.

To apply a menu item tax class override:

1.  Begin a check.
2.  Add the menu items (from the configured menu item group) in the check until the quantity threshold is met.
    
    If a check is split, the threshold only applies to each individual check, and not to the total amount between the checks. For example, if there are 7 total items added between two checks, and one check has 3 items and the other has 4 items with the threshold set to 4, the tax override will only apply to the check that has 4 items.
    
    Similarly, if there are 4 total items added between two checks, and the threshold was set to 4 items—but each check took half of each item—the threshold would not apply because each check would only have 2 total items.
    
3.  The tax class of the menu items will be modified as the quantity of the items in the check meets or exceeds the quantity threshold. This indicates that the tax class is overridden.
    
    The tax class override modifies the tax rates in different ways. The tax rates affected by this modification are Add-on taxes and Inclusive taxes.
    
    -   For Add-on taxes, the total amount a customer pays will be affected by the tax class override.
        
    -   For Inclusive taxes, only the tax rate is overridden. In other words, the ratio of the tax to revenue is changed, while the menu item price remains the same.
        
    

**Parent topic:** [Guest Checks](c_checks.htm)
