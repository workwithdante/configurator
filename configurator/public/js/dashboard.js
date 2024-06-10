frappe.provide("configurator");

configurator.templates = class Templates {
	constructor(opts) {
		$.extend(this, opts);
	}

	refresh() {
        console.log("Configurator Refresh")
    }
}