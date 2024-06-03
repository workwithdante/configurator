frappe.ui.form.on("Customer", {
	refresh(frm) {
		frm.trigger("show_status_policy");
	},
    show_status_policy(frm) {
        $(
            `
            <div class="section-head collapsible">
                Plan 2024
                <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <div class="flex justify-between items-center mb-4">
                        <h1 class="text-xl font-bold">Planes 2024</h1>
                        <button class="text-blue-500 hover:underline">Ver historial de planes</button>
                    </div>
                    <div class="">
                        <div class="w-2/3 p-4 border rounded-lg bg-blue-50">
                            <h2 class="text-lg font-semibold mb-4 flex items-center">
                                Médico plan
                            </h2>
                            <div class="border p-4 rounded-lg bg-white shadow-md">
                                <div class="flex items-center justify-between mb-4">
                                    <div class="flex items-center">
                                        <img src="https://via.placeholder.com/50" alt="Logo" class="w-8 h-8 mr-2">
                                        <span class="text-gray-700">CATEGORÍA PLATA</span>
                                        <span class="bg-yellow-200 text-yellow-800 text-xs font-semibold ml-2 px-2.5 py-0.5 rounded">CSR</span>
                                    </div>
                                </div>
                                <p class="text-gray-700 mb-4">Silver 5: Aetna network of doctors & hospitals + $0 MinuteClinic + $0 CVS Health Virtual Care 24/7 - HMO</p>
                                <div class="flex justify-between mb-4">
                                    <div>
                                        <p class="text-2xl font-semibold">$42.32</p>
                                        <p class="text-sm text-gray-500">Prima</p>
                                        <p class="text-xs text-red-500 line-through">$2,796.32</p>
                                    </div>
                                    <div>
                                        <p class="text-2xl font-semibold">$0</p>
                                        <p class="text-sm text-gray-500">Deducible</p>
                                    </div>
                                    <div>
                                        <p class="text-2xl font-semibold">$1,275</p>
                                        <p class="text-sm text-gray-500">POO máx.</p>
                                    </div>
                                </div>
                                <div class="flex justify-between">
                                    <a href="#" class="text-blue-500 hover:underline">Ver detalles completos del plan</a>
                                    <a href="#" class="text-blue-500 hover:underline">Ver resumen de beneficios</a>
                                </div>
                            </div>
                        </div>
                        <div class="w-1/3 p-4 ml-4 border rounded-lg bg-white shadow-md">
                            <div class="mb-4">
                                <h3 class="text-lg font-semibold mb-2">Estado</h3>
                                <p class="text-red-500">🔴 Pago inicial sin realizar</p>
                            </div>
                            <div class="mb-4">
                                <h3 class="text-lg font-semibold mb-2">Vigente</h3>
                                <p>6/1/2024</p>
                            </div>
                            <div class="mb-4">
                                <h3 class="text-lg font-semibold mb-2">Vencimiento</h3>
                                <p>12/31/2024</p>
                            </div>
                            <div class="mb-4">
                                <h3 class="text-lg font-semibold mb-2">Miembros</h3>
                                <p>JOSE CRAWFORD, ALBA CRAWFORD, JENNIFER CRAWFORD, JACQUELYN CRAWFORD</p>
                            </div>
                            <div class="mb-4">
                                <h3 class="text-lg font-semibold mb-2">ID de suscriptor</h3>
                                <p>0018049023</p>
                            </div>
                            <div class="mb-4">
                                <h3 class="text-lg font-semibold mb-2">ID de FFM</h3>
                                <p>5143836919</p>
                            </div>
                            <div class="mb-4">
                                <h3 class="text-lg font-semibold mb-2">Teléfono de la aseguradora</h3>
                                <p>1 (844) 383-6129</p>
                            </div>
                            <div class="mb-4">
                                <h3 class="text-lg font-semibold mb-2">Teléfono de pago</h3>
                                <p>1 (844) 383-6130</p>
                            </div>
                            <div class="mb-4">
                                <h3 class="text-lg font-semibold mb-2">Agente registrado</h3>
                                <p>BEATRIZ SIERRA (NPN: 8602276)</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 flex justify-between">
                        <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Cambiar de plan</button>
                        <button class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Cancelar plan</button>
                    </div>
                </div>
            </div>
            `
        ).appendTo(frm.dashboard.stats_area_row);        
        if (false) {
            frm.dashboard.add_indicator(
                __("Appraisees: {0}", [r.message.appraisees]),
                "blue",
            );
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