# setup_wizard_stages = "rocky.setup_wizard.get_setup_stages"

import frappe

def get_setup_stages():
    return [
        {
            "name": "my_custom_step",
            "label": "My Custom Step",
            "icon": "fa fa-user",
            "fields": [
                {
                    "fieldname": "custom_field",
                    "label": "Custom Field",
                    "fieldtype": "Data",
                    "reqd": 1
                }
            ],
            "onload": onload,
            "validate": validate,
            "action": action
        }
    ]

def onload(data):
    # Lógica para manejar el evento onload del paso personalizado
    pass

def validate(data):
    # Lógica para validar los datos del paso personalizado
    if not data.get('custom_field'):
        frappe.throw(_('Please fill the custom field'))
    return True

@frappe.whitelist()
def action(data):
    # Lógica para manejar la acción del paso personalizado
    custom_field_value = data.get('custom_field')
    if custom_field_value:
        # Realiza alguna acción con custom_field_value
        frappe.log_error(custom_field_value, 'Custom Field Value')
    # Puedes agregar más lógica según sea necesario
    return {'status': 'success'}
