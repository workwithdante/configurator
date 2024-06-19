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
                'category': 'gold',
                'plan_name': currentSalesOrder.items[0].item_name,
                'plan_code': currentSalesOrder.items[0].item_code,
                'plan_type': 'HMO',
                'company': "ambetter",
                'premium': "42.32",
                'total_premium': '644.33',
                'deductible': "0.0",
                'max_des': "1275",
                'owner': customer.name,
                'members': currentSalesOrder.custom_patient_relation,
                'status': currentSalesOrder.status,
                'effective': '3/1/2024',
                'expiration': '12/31/2024',
                'subscriber_id': '0017170496',
                'ffm_id': '5161521727',
                'carrier_phone': '(888) 200-0405',
                'payment_phone': '(877) 369-2199',
                'broker': 'BEATRIZ SIERRA',
                'npn': '8602276',
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