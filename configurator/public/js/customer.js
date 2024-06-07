frappe.ui.form.on("Customer", {
	refresh(frm) {
        frappe.templates["dashboard_link_doctype"] = `
            <div class="col-sm-12 frappe-control my-2">
                <div class="p-4 address-box row">
                    <div class="col-sm-6">
                        <div class="p-4 bg-white rounded-lg">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center">
                                    <img src="/assets/configurator/img/ambetter.png" alt="Logo" style="width: 2rem; height: 2rem; margin-right: 0.5rem;">
                                    <div class="row">
                                        <span class="col-sm-12" mx-4>{{company}}</span>
                                        <span class="col-sm-12 mx-4 indicator-pill green filterable no-indicator-dot ellipsis">{{category}}</span>
                                    </div>
                                </div>
                            </div>
                            <p class="text-gray-700 mb-4">{{plan_name}}</p>
                            <div class="flex justify-between mb-4">
                                <div>
                                    <p class="font-semibold">{{premium}}</p>
                                    <p class="document-link-badge">Prima</p>
                                </div>
                                <div>
                                    <p class="font-semibold">{{deductible}}</p>
                                    <p class="text-sm text-gray-500">Deducible</p>
                                </div>
                                <div>
                                    <p class="font-semibold">{{max_des}}</p>
                                    <p class="text-sm text-gray-500">POO máx.</p>
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <a href="#" class="text-blue-500 hover:underline">Ver lll55l66l completos del plan</a>
                                <a href="#" class="text-blue-500 hover:underline">Ver 1111111 de beneficios</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="p-4 bg-white rounded-lg">
                            
                        </div>
                    </div>
                </div>
            </div>

        `;
        frm.trigger("show_status_policy");
	},
    show_status_policy(frm) {
        values = {
            category: "Silver",
            plan_name: "Silver 5",
            company: "Aetna",
            premium: "42.32",
            deductible: "0.0",
            max_des: "1275"
        }
        frm.dashboard.stats_area_row.append(frappe.render_template(frappe.templates.dashboard_link_doctype, values))
        //frm.dashboard.stats_area.df.collapsible = 0
        frm.dashboard.stats_area.show();
        console.log(frm.dashboard.stats_area)
        if (false) {
            
            frm.dashboard.add_indicator(
                __("Self Appraisal Pending: {0}", [r.message.self_appraisal_pending]),
                "orange",
            );
            frm.dashboard.add_indicator(
                __("Employees without Feedback: {0}", [r.message.feedback_missing]),
                "orange",
            );
            frm.dashboard.add_indicator(
                __("Employees without Goals: {0}", [r.message.goals_missing]),
                "orange",
            );
        }
    }
})