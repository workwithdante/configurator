import frappe
from frappe import _
from erpnext.selling.doctype.customer.customer import Customer

class customCustomer(Customer): 
    @frappe.whitelist()
    def get_current_policy(customer):
        if not customer:
            frappe.throw(_("Customer name is required"))

        currentNameSalesOrder = frappe.get_all('Sales Order', filters={'customer' : customer.name}, fields=['name'])

        if currentNameSalesOrder:
            currentSalesOrder = frappe.get_doc("Sales Order", currentNameSalesOrder[0].name)
            return {
                #'base_url': frappe.urllib.get_base_url(),
                'category': 'Silver',
                'plan_name': currentSalesOrder.items[0].item_code,
                'company': "ambetter",
                'premium': "42.32",
                'deductible': "0.0",
                'max_des': "1275"
            }
        else:
            return None
        
        """ values = {
            #'base_url': frappe.urllib.get_base_url(),
            'category': "Silver",
            'plan_name': "Silver 666",
            'company': "ambetter",
            'premium': "42.32",
            'deductible': "0.0",
            'max_des': "1275"
        } """