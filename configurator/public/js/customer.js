frappe.ui.form.on("Customer", {
	refresh(frm) {
        frm.trigger("show_status_policy");
	},
    show_status_policy(frm) {
        values = {
            base_url: frappe.urllib.get_base_url(),
            category: "Silver",
            plan_name: "Silver 5",
            company: "fb",
            premium: "42.32",
            deductible: "0.0",
            max_des: "1275"
        }
        frm.dashboard.stats_area_row.append(frappe.render_template(frappe.templates.dashboard, values))
        //frm.dashboard.stats_area.df.collapsible = 0
        frm.dashboard.stats_area.show();
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