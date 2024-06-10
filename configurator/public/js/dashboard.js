frappe.provide("configurator");

configurator.templates = class Orders {
	constructor(opts) {
		$.extend(this, opts);
	}

	refresh() {
        console.log("Configurator Refresh")
    }
}