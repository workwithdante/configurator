frappe.provide("rocky.setup");

frappe.pages["setup-wizard"].on_page_load = function (wrapper) {
	if (frappe.sys_defaults.company) {
		frappe.set_route("desk");
		return;
	}
};

frappe.setup.on("before_load", function () {
	rocky.setup.slides_settings.map(frappe.setup.add_slide);
});

rocky.setup.slides_settings = [
	{
		// Organization
		name: "organization",
		title: __("Setup your mother"),
		icon: "fa fa-building",
		fields: [
			{
				fieldname: "company_name",
				label: __("Company Name"),
				fieldtype: "Data",
				reqd: 1,
			}
		],

		onload: function (slide) {
			this.bind_events(slide);
			this.load_chart_of_accounts(slide);
			this.set_fy_dates(slide);
		}
	}
]
