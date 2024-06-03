import frappe 

def update_related_contacts(doc, method):
    # Usar una bandera de contexto para evitar ciclos infinitos
    if frappe.flags.in_update_related_contacts:
        return
    
    # Establecer la bandera
    frappe.flags.in_update_related_contacts = True

    try:
        for relationship in doc.custom_relationship:
            try:
                related_contact = frappe.get_doc('Contact', relationship.contact)
                exists = False
                for rel in related_contact.custom_relationship:
                    if rel.contact == doc.name:
                        exists = True
                        if rel.relation != get_opposite_relation(relationship.relation):
                            rel.relation = get_opposite_relation(relationship.relation)
                            related_contact.save()
                        break
                
                if not exists:
                    related_contact.append('custom_relationship', {
                        'contact': doc.name,
                        'relation': get_opposite_relation(relationship.relation)
                    })
                    related_contact.save()
            except frappe.DoesNotExistError:
                frappe.log_error(f"Contact {relationship.contact} does not exist", "Contact Update Error")
    finally:
        # Resetear la bandera después de la operación
        frappe.flags.in_update_related_contacts = False

def get_opposite_relation(relation):
    opposite_relations = {
        "Spouse": "Spouse",
        "Father": "Other",
        "Mother": "Other",
        "Siblings": "Siblings",
        "Family": "Family"
    }
    return opposite_relations.get(relation)