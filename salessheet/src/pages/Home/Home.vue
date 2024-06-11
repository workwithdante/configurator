<template>
    <Toaster richColors position="bottom-right" :expand="true"/>
	<div class="grid grid-cols-12">
		<div class="col-span-12">
			<Tabs 
				@show-toast="(message) => toast.error(message)"
                v-model:family="family"
				v-model:basic-info="basicInfo"
				v-model:pay-info="payInfo"
                v-model:sell-info="sellInfo"
				v-model:rows-dependent-ref="rowsDependentRef"
				v-model:rows-help-desk-ref="rowsHelpDeskRef"
			/>
		</div>
	</div>
	<div class="m-3 flex flex-row items-center justify-center">
		<Button class="w-full p-5" variant="solid" @click="validation">
			<div class="w-8 text-lg font-mono">SEND</div>
		</Button>
	</div>
    <Dialog v-model="visibleConfirmation">
        <template #body-title>
            <h3>Validation</h3>
        </template>
        <template #body-content>
            <div class="flex items-center justify-between">
                <div class="flex flex-col items-center">
                    <FeatherIcon :name="'home'" class="w-8 mb-4" /> <!-- Utilizamos mb-1 para agregar margen inferior -->
                    <p class="text-xl font-bold">{{rowsDependentRef.length + 1}}</p>
                </div>
                <div class="flex flex-col items-center">
                    <FeatherIcon :name="'users'" class="w-8 mb-4" />
                    <p class="text-xl font-bold">{{rowsDependentRef.filter(dependent => dependent.coverage.label === 'Yes').length + 1}}</p>
                </div>
                <div class="flex flex-col items-center">
                    <FeatherIcon :name="'dollar-sign'" class="w-8 mb-4" />
                    <p class="text-xl font-bold">${{ payInfo.income.value }}</p>
                </div>
                <div class="flex flex-col items-center">
                    <FeatherIcon :name="'map-pin'" class="w-8 mb-4" />
                    <p class="text-xl font-bold">{{ basicInfo.address.zipcode.value }}</p>
                </div>
            </div> 
        </template>
        <template #actions>
            <div class="flex items-center">
                <Button :loading="createVtigerCRM.loading" class="w-full p-5" variant="solid" @click="createVtigerCRM.submit">
                    {{createVtigerCRM.loading ? 'Sending...' : 'Confirm'}}
                </Button>
            </div>
        </template>
    </Dialog>
    
</template>

<script lang="ts" setup>
	import { computed, ref, Ref } from 'vue';
	import Tabs from './components/Tabs.vue';
	import { createResource, Dialog, FeatherIcon } from 'frappe-ui';
    import { getLocal, saveLocal, deleteLocal } from 'frappe-ui/src/resources/local';
    import { getCacheKey } from 'frappe-ui/src/resources/resources';
	import { Toaster, toast } from 'vue-sonner';
    import { Owner, DependentI } from './components/Family/person.interface';
    import { pay } from './components/Additional/pay.interface';
    import { sell } from './components/Additional/sell.interface';

    getLocal(getCacheKey('basicInfo')).then(cacheValue => {if(cacheValue) basicInfo.value = cacheValue})
    //"{\"firstname\":{\"value\":\"LETICIA\",\"error\":false},\"middlename\":{\"value\":\"B\",\"error\":false},\"lastname\":{\"value\":\"BASTIDAS\",\"error\":false},\"coverage\":{\"value\":\"Yes\",\"bg_color\":\"\",\"error\":false},\"ssn\":{\"value\":\"771-36-1382\",\"error\":false},\"document\":{\"value\":\"Citizen\",\"error\":false},\"phone1\":{\"value\":\"(786) 317 3897\",\"error\":false},\"phone2\":{\"value\":\"(305) 297 7285\",\"error\":false},\"address\":{\"address\":{\"value\":\"18601 SW 177TH AVE\",\"error\":false},\"optional\":{\"value\":\"\",\"error\":false},\"city\":{\"value\":\"MIAMI\",\"error\":false},\"state\":{\"value\":\"FL\",\"error\":false},\"zipcode\":{\"value\":\"33187\",\"error\":false},\"county\":{\"value\":\"\",\"error\":true}},\"email\":{\"value\":\"LETICIA_BASTIDAS@YAHOO.COM\",\"error\":false},\"language\":{\"value\":\"Spanish\",\"error\":false},\"gender\":{\"value\":\"Female\",\"error\":false},\"age\":{\"value\":\"46\",\"error\":false},\"dob\":{\"value\":\"1977-10-27\",\"error\":false},\"pob\":{\"value\":\"ECUADOR\",\"error\":false},\"smoke\":{\"value\":\"No\",\"error\":false,\"color\":\"\"},\"selldate\":{\"value\":\"2024-04-23\",\"error\":false},\"jail\":{\"value\":\"No\",\"error\":false},\"pregnant\":{\"value\":\"No\",\"error\":false}}"
    getLocal(getCacheKey('dependentInfo')).then(cacheValue => {if(cacheValue) rowsDependentRef.value = cacheValue})
    //"[{\"id\":1,\"age\":{\"value\":\"17\",\"error\":false},\"coverage\":{\"value\":\"Yes\",\"bg_color\":\"bg-green-600\",\"error\":false},\"dob\":{\"value\":\"2006-06-10\",\"error\":false},\"document\":{\"value\":\"Citizen\",\"error\":false},\"email\":{\"value\":\"\",\"error\":false},\"firstname\":{\"value\":\"ARIELA\",\"error\":false},\"gender\":{\"value\":\"Female\",\"error\":false},\"jail\":{\"value\":\"No\",\"error\":false},\"lastname\":{\"value\":\"PUENTES\",\"error\":false},\"middlename\":{\"value\":\"\",\"error\":false},\"phone1\":{\"value\":\"\",\"error\":false},\"phone2\":{\"value\":\"\",\"error\":false},\"pob\":{\"value\":\"USA\",\"error\":false},\"pregnant\":{\"value\":\"No\",\"error\":false},\"relationship\":{\"value\":\"Children\",\"error\":true},\"smoke\":{\"value\":\"No\",\"error\":true,\"color\":\"green\"},\"ssn\":{\"value\":\"\",\"error\":false}},{\"id\":2,\"age\":{\"value\":\"13\",\"error\":false},\"coverage\":{\"value\":\"Yes\",\"bg_color\":\"bg-green-600\",\"error\":false},\"dob\":{\"value\":\"2011-02-21\",\"error\":false},\"document\":{\"value\":\"Citizen\",\"error\":false},\"email\":{\"value\":\"\",\"error\":false},\"firstname\":{\"value\":\"AYLIN\",\"error\":false},\"gender\":{\"value\":\"Female\",\"error\":false},\"jail\":{\"value\":\"No\",\"error\":false},\"lastname\":{\"value\":\"PUENTES\",\"error\":false},\"middlename\":{\"value\":\"\",\"error\":false},\"phone1\":{\"value\":\"\",\"error\":false},\"phone2\":{\"value\":\"\",\"error\":false},\"pob\":{\"value\":\"USA\",\"error\":false},\"pregnant\":{\"value\":\"No\",\"error\":false},\"relationship\":{\"value\":\"Children\",\"error\":true},\"smoke\":{\"value\":\"No\",\"error\":true,\"color\":\"green\"},\"ssn\":{\"value\":\"\",\"error\":false}}]"
    getLocal(getCacheKey('payInfo')).then(cacheValue => {if(cacheValue) payInfo.value = cacheValue})
    //"{\"planid\":{\"value\":\"18628FL0160029\",\"error\":false},\"company\":{\"value\":\"Aetna\",\"error\":false},\"premium\":{\"value\":\"34.71\",\"error\":false},\"family\":{\"value\":\"\",\"error\":false},\"income\":{\"value\":\"40000\",\"error\":false},\"typeIncome\":{\"value\":\"W2\",\"error\":false},\"pay\":{\"value\":\"2004-04-15\",\"error\":false},\"autopay\":{\"value\":\"Yes\",\"error\":false},\"cardPay\":{\"value\":\"\",\"error\":true},\"accountPay\":{\"value\":\"102957237\",\"error\":false},\"codePay\":{\"value\":\"\",\"error\":true},\"routePay\":{\"value\":\"072-000-326\",\"error\":false},\"expirationPay\":{\"value\":\"\",\"error\":true},\"ownerPay\":{\"value\":\"F & J HOLDINGS\",\"error\":false},\"addressPay\":{\"value\":\"18601 SW 177TH AVE, MIAMI, FL, 33187\",\"error\":false},\"sameAddress\":{\"value\":true,\"error\":false},\"sameOwner\":{\"value\":false,\"error\":false},\"checkboxAccount\":{\"value\":true,\"error\":false},\"checkboxCard\":{\"value\":false,\"error\":true},\"typeCard\":{\"value\":\"\",\"error\":true},\"typeAccount\":{\"value\":\"NEGOCIO\",\"error\":false},\"bankAccount\":{\"value\":\"Chase Bank\",\"error\":false},\"autoPayDay\":{\"value\":\"15\",\"error\":false}}"
    getLocal(getCacheKey('sellInfo')).then(cacheValue => {if(cacheValue) sellInfo.value = cacheValue})
    //"{\"vicidial\":{\"value\":false,\"error\":false},\"polycom\":{\"value\":true,\"error\":false},\"whatsapp\":{\"value\":false,\"error\":false},\"extension\":{\"value\":\"123\",\"error\":false},\"phone\":{\"value\":\"(000) 000 0000\",\"error\":false},\"whatsapp_phone\":{\"value\":\"\",\"error\":false}}"
    getLocal(getCacheKey('helpDeskInfo')).then(cacheValue => {if(cacheValue) rowsHelpDeskRef.value = cacheValue})
    //"[]"


    

    function validation() {
        const validation1 = validationBasicInfo();
        const validation2 = validationPayInfo();
        const validation3 = validationSellInfo();
        if(validation1 && validation2 && validation3) {
            createVtigerCRM.params = { 
                basicInfo: basicInfo.value,
                dependentInfo: rowsDependentRef.value,
                payInfo: payInfo.value,
                helpDeskInfo: rowsHelpDeskRef.value,
                sellInfo: sellInfo.value
            }
            visibleConfirmation.value = true
        } else {
            toast.error('Fill all fields')
        }
    }

    function validationSellInfo(): boolean {
        if(sellInfo.value.vicidial.value === true || sellInfo.value.polycom.value === true  || sellInfo.value.whatsapp.value === true) {
            sellInfo.value.vicidial.error = false
            sellInfo.value.polycom.error = false
            sellInfo.value.whatsapp.error = false
        }
        else {
            sellInfo.value.vicidial.error = true
            sellInfo.value.polycom.error = true
            sellInfo.value.whatsapp.error = true
        }
        if(sellInfo.value.extension.value === '' || sellInfo.value.extension.value.length !== 3) sellInfo.value.extension.error = true
        else sellInfo.value.extension.error = false
        if(sellInfo.value.phone.value === '' || sellInfo.value.phone.value.length !== 14) sellInfo.value.phone.error = true
        else sellInfo.value.phone.error = false
        if(sellInfo.value.whatsapp_phone.value !== '' && sellInfo.value.whatsapp_phone.value.length !== 14) sellInfo.value.whatsapp_phone.error = true
        else sellInfo.value.whatsapp_phone.error = false

        if(
            !(sellInfo.value.vicidial.error ||
            sellInfo.value.polycom.error ||
            sellInfo.value.whatsapp.error) &&
            !sellInfo.value.extension.error &&
            !sellInfo.value.phone.error &&
            !sellInfo.value.whatsapp_phone.error
        ) {
            return true
        } else {
            return false
        }
    }

    function validationBasicInfo(): boolean {                
        if(basicInfo.value.statusSell.value === '') basicInfo.value.statusSell.error = true
        else basicInfo.value.statusSell.error = false
        if(basicInfo.value.coverage.label === '') basicInfo.value.coverage.error = true
        else basicInfo.value.coverage.error = false
        if(basicInfo.value.firstname.value === '') basicInfo.value.firstname.error = true
        else basicInfo.value.firstname.error = false
        if(basicInfo.value.lastname.value === '') basicInfo.value.lastname.error = true
        else basicInfo.value.lastname.error = false
        if(basicInfo.value.ssn.value !== '' && basicInfo.value.ssn.value.length !== 11) basicInfo.value.ssn.error = true;
        else basicInfo.value.ssn.error = false        
        if(basicInfo.value.document.value === '') basicInfo.value.document.error = true
        else basicInfo.value.document.error = false
        if(basicInfo.value.phone1.value.length !== 14) basicInfo.value.phone1.error = true
        else basicInfo.value.phone1.error = false
        if(basicInfo.value.phone2.value !== '' && basicInfo.value.phone2.value.length !== 14) basicInfo.value.phone2.error = true
        else basicInfo.value.phone2.error = false        
        if(basicInfo.value.pob.value === '') basicInfo.value.pob.error = true
        else basicInfo.value.pob.error = false
        if(basicInfo.value.dob.value === '') basicInfo.value.dob.error = true
        else basicInfo.value.dob.error = false
        if(basicInfo.value.address.address.value === '') basicInfo.value.address.address.error = true
        else basicInfo.value.address.address.error = false
        if(basicInfo.value.address.city.value === '') basicInfo.value.address.city.error = true
        else basicInfo.value.address.city.error = false
        if(basicInfo.value.address.state.value === '') basicInfo.value.address.state.error = true
        else basicInfo.value.address.state.error = false        
        if(basicInfo.value.address.zipcode.value.length !== 5) basicInfo.value.address.zipcode.error = true
        else basicInfo.value.address.zipcode.error = false
        if(basicInfo.value.address.county.value === '') basicInfo.value.address.county.error = true
        else basicInfo.value.address.county.error = false
        if(basicInfo.value.language.value === '') basicInfo.value.language.error = true
        else basicInfo.value.language.error = false
        if(basicInfo.value.gender.value === '') basicInfo.value.gender.error = true
        else basicInfo.value.gender.error = false
        if(basicInfo.value.smoke.value === '') basicInfo.value.smoke.error = true
        else basicInfo.value.smoke.error = false
        if(basicInfo.value.jail.value === '' || basicInfo.value.jail.value === 'Yes') {
            toast.warning("Unable to register")
            basicInfo.value.jail.error = true
        }
        else basicInfo.value.jail.error = false
        if(basicInfo.value.pregnant.value === '') basicInfo.value.pregnant.error = true
        else basicInfo.value.pregnant.error = false
        if(basicInfo.value.aor.value === '') basicInfo.value.aor.error = true
        else basicInfo.value.aor.error = false
        if(basicInfo.value.broker.value === '') basicInfo.value.broker.error = true
        else basicInfo.value.broker.error = false

        if(
            !basicInfo.value.statusSell.error &&
            !basicInfo.value.coverage.error &&
            !basicInfo.value.firstname.error &&
            !basicInfo.value.lastname.error &&
            !basicInfo.value.ssn.error &&
            !basicInfo.value.document.error &&
            !basicInfo.value.phone1.error &&
            !basicInfo.value.phone2.error &&
            !basicInfo.value.pob.error &&
            !basicInfo.value.dob.error &&
            !basicInfo.value.address.address.error &&
            !basicInfo.value.address.city.error &&
            !basicInfo.value.address.state.error &&
            !basicInfo.value.address.zipcode.error &&
            !basicInfo.value.language.error &&
            !basicInfo.value.gender.error &&
            !basicInfo.value.smoke.error &&
            !basicInfo.value.jail.error &&
            !basicInfo.value.pregnant.error &&
            !basicInfo.value.aor.error &&
            !basicInfo.value.broker.error
        ) {
            return true
        } else {
            return false
        }
    }

    function validationPayInfo(): boolean {
        if( payInfo.value.mpid.value.length !== 10) payInfo.value.mpid.error = true
        else payInfo.value.mpid.error = false
        if( payInfo.value.planid.value.length !== 14) payInfo.value.planid.error = true
        else payInfo.value.planid.error = false
        if(payInfo.value.company.value === '') payInfo.value.company.error = true
        else payInfo.value.company.error = false
        if(payInfo.value.premium.value.length >= 4 && payInfo.value.premium.value.length <= 7) payInfo.value.premium.error = false
        else payInfo.value.premium.error = true
        if(payInfo.value.typeIncome.value === '') payInfo.value.typeIncome.error = true
        else payInfo.value.typeIncome.error = false
        if(payInfo.value.income.value === '' || Number(payInfo.value.income.value) < 14580) payInfo.value.income.error = true
        else payInfo.value.income.error = false
        if(payInfo.value.premium.value !== '0.00') {
            if(payInfo.value.checkboxAccount.value === false) payInfo.value.checkboxAccount.error = true
            else payInfo.value.checkboxAccount.error = false
            if(payInfo.value.checkboxCard.value === false) payInfo.value.checkboxCard.error = true
            else payInfo.value.checkboxCard.error = false
            if(payInfo.value.bankAccount.value === '') payInfo.value.bankAccount.error = true
            else payInfo.value.bankAccount.error = false
            if(payInfo.value.typeAccount.value === '') payInfo.value.typeAccount.error = true
            else payInfo.value.typeAccount.error = false
            if(payInfo.value.typeCard.value === '') payInfo.value.typeCard.error = true
            else payInfo.value.typeCard.error = false
            if(payInfo.value.pay.value === '') payInfo.value.pay.error = true
            else payInfo.value.pay.error = false
            if(payInfo.value.autopay.value === '') payInfo.value.autopay.error = true
            else payInfo.value.autopay.error = false
            if(payInfo.value.autoPayDay.value === '' || isNaN(Number(payInfo.value.autoPayDay.value))) payInfo.value.autoPayDay.error = true
            else payInfo.value.autoPayDay.error = false
            if(payInfo.value.ownerPay.value === '') payInfo.value.ownerPay.error = true
            else payInfo.value.ownerPay.error = false
            if(payInfo.value.addressPay.value === '') payInfo.value.addressPay.error = true
            else payInfo.value.addressPay.error = false
            if(payInfo.value.accountPay.value.length >= 9 && payInfo.value.accountPay.value.length <= 12) payInfo.value.accountPay.error = false
            else payInfo.value.accountPay.error = true
            if(payInfo.value.cardPay.value === '' || payInfo.value.cardPay.value.length !== 19) payInfo.value.cardPay.error = true
            else payInfo.value.cardPay.error = false
            if(payInfo.value.codePay.value.length !== 3 && payInfo.value.codePay.value.length !== 4 ) payInfo.value.codePay.error = true
            else payInfo.value.codePay.error = false
            if(payInfo.value.routePay.value === '' || payInfo.value.routePay.value.length !== 11) payInfo.value.routePay.error = true
            else payInfo.value.routePay.error = false
            if(payInfo.value.expirationPay.value === '' || payInfo.value.expirationPay.value.length !== 5) payInfo.value.expirationPay.error = true
            else payInfo.value.expirationPay.error = false
        }
                
        if(
            !payInfo.value.planid.error &&
            !payInfo.value.company.error &&
            !payInfo.value.premium.error &&
            !payInfo.value.typeIncome.error &&
            !payInfo.value.income.error &&
            !payInfo.value.pay.error &&
            !payInfo.value.autopay.error &&
            !payInfo.value.autoPayDay.error &&
            !payInfo.value.ownerPay.error &&
            !payInfo.value.addressPay.error &&
            !payInfo.value.typeCard.error &&
            !payInfo.value.cardPay.error &&
            !payInfo.value.codePay.error &&
            !payInfo.value.expirationPay.error
        ) {
            return true
        } else {
            return false
        }
    }

    const visibleConfirmation = ref(false)

	interface RowHelpDesk {
        id: number;
        subject: {
            label: string,
            bg_color: string
        };
        title: string,
        assign: {
            label: string,
            color: string
        };
        status: string;
        description: string;
    }
    
	const family = computed({
        get() {
            payInfo.value.family.value = `${rowsDependentRef.value.length + 1}x${rowsDependentRef.value.filter(dependent => dependent.coverage.label === 'Yes').length + 1}`
            return payInfo.value.family.value
        },
        set() { }
    })
	const rowsDependentRef: Ref<DependentI[]> = ref([]);
    const rowsHelpDeskRef: Ref<RowHelpDesk[]> = ref([]);
	const basicInfo: Ref<Owner> = ref({
        firstname: {
            value: '',
            error: false
        },
	    middlename: {
            value: '',
            error: false
        },
	    lastname: {
            value: '',
            error: false
        },
        statusSell: {
            value: '',
            error: false
        },
	    coverage: {
            bg_color: '',
            error: false,
            label: ''
        },
	    ssn: {
            value: '',
            error: false
        },
        document: {
            value: '',
            error: false
        },
	    phone1: {
            value: '',
            error: false
        },
	    phone2: {
            value: '',
            error: false
        },
        address: {
            address: {
                value: '',
                error: false
            },
            optional: {
                value: '',
                error: false
            },
            city: {
                value: '',
                error: false
            },
            state: {
                value: '',
                error: false
            },
            zipcode: {
                value: '',
                error: false
            },
            county: {
                value: '',
                error: false
            }
        },
	    email: {
            value: '',
            error: false
        },
	    language: {
            value: '',
            error: false
        },
	    gender: {
            value: '',
            error: false
        },
	    age: {
            value: '',
            error: false
        },
	    dob: {
            value: '',
            error: false
        },
	    pob: {
            value: '',
            error: false
        },
        selldate: {
            value: formatDate(new Date().toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric'
            })),
            error: false
        },
        smoke: {
            value: '',
            error: false,
            color: ''
        },
        jail: {
            value: '',
            error: false
        },
        pregnant: {
            value: '',
            error: false
        },
        aor: {
            value: '',
            error: false
        },
        broker: {
            value: '',
            error: false
        },
    })

    const payInfo: Ref<pay> = ref({
        mpid: {
            value: '',
            error: false
        },
        planid: {
            value: '',
            error: false
        },
        company: {
            value: '',
            error: false
        },
        premium: {
            value: '0.00',
            error: false
        },
        family: {
            value: '',
            error: false
        },
        income: {
            value: '',
            error: false
        },
        typeIncome: {
            value: '',
            error: false
        },
        pay: {
            value: '',
            error: false
        },
        autopay: {
            value: '',
            error: false
        },
        cardPay: {
            value: '',
            error: false
        },
        accountPay: {
            value: '',
            error: false
        },
        codePay: {
            value: '',
            error: false
        },
        routePay: {
            value: '',
            error: false
        },
        expirationPay: {
            value: '',
            error: false
        },
        ownerPay: {
            value: '',
            error: false
        },
        addressPay: {
            value: '',
            error: false
        },
        sameAddress: {
            value: false,
            error: false
        },
        sameOwner: {
            value: false,
            error: false
        },
        checkboxAccount: {
            value: false,
            error: false
        },
        checkboxCard: {
            value: true,
            error: false
        },
        typeCard: {
            value: '',
            error: false
        },
        typeAccount: {
            value: '',
            error: false
        },
        bankAccount: {
            value: '',
            error: false
        },
        autoPayDay: {
            value: '',
            error: false
        },
    })

	const sellInfo: Ref<sell> = ref({
        vicidial: {
            value: false,
            error: false
        },
        polycom: {
            value: false,
            error: false
        },
        whatsapp: {
            value: false,
            error: false
        },
        extension: {
            value: '',
            error: false
        },
        phone: {
            value: '',
            error: false
        },
        whatsapp_phone: {
            value: '',
            error: false
        }
    })

    const createVtigerCRM = createResource({
        url: 'configurator.api.vtigercrm.create',
        cache: ['policyInfo'],
        beforeSubmit: () => {
            basicInfo.value.phone1.value = basicInfo.value.phone1.value.replace(/\D/g, "");
            basicInfo.value.phone2.value = basicInfo.value.phone2.value.replace(/\D/g, "");
            basicInfo.value.dob.value = basicInfo.value.dob.value.replace('.', '');
            basicInfo.value.selldate.value = basicInfo.value.selldate.value.replace('.', '');
            payInfo.value.pay.value = payInfo.value.pay.value.replace('.', '');
            setTimeout(() => {
                if(createVtigerCRM.data !== 'Created') {
                    createVtigerCRM.error = true
                    createVtigerCRM.loading = false
                    saveLocal(getCacheKey('Error'), createVtigerCRM.data)
                    saveLocal(getCacheKey('basicInfo'), basicInfo.value)
                    saveLocal(getCacheKey('dependentInfo'), rowsDependentRef.value)
                    saveLocal(getCacheKey('payInfo'), payInfo.value)
                    saveLocal(getCacheKey('sellInfo'), sellInfo.value)
                    saveLocal(getCacheKey('helpDeskInfo'), rowsHelpDeskRef.value)
                }
            }, 10000);
        },
        onError(error) {
            saveLocal(getCacheKey('Error'), error)
            saveLocal(getCacheKey('basicInfo'), basicInfo.value)
            saveLocal(getCacheKey('dependentInfo'), rowsDependentRef.value)
            saveLocal(getCacheKey('payInfo'), payInfo.value)
            saveLocal(getCacheKey('sellInfo'), sellInfo.value)
            saveLocal(getCacheKey('helpDeskInfo'), rowsHelpDeskRef.value)
            toast.error('' + error)
        },
        onSuccess(data) {
            deleteLocal(getCacheKey('basicInfo'))
            deleteLocal(getCacheKey('dependentInfo'))
            deleteLocal(getCacheKey('payInfo'))
            deleteLocal(getCacheKey('sellInfo'))
            deleteLocal(getCacheKey('helpDeskInfo'))
            toast.success('' + data)
        },
        validate(params) {
            //console.log(params);
        }
    })

    function formatDate(value): string {
        let date = new Date(value);
        if (isValidDateFormat(value) && !isNaN(date.getTime())) {
            let month = date.toLocaleString('default', { month: 'short' });
            let day = date.getDate();
            let year = date.getFullYear();
            let formattedDate = month + ' ' + day + ' ' + year;
            //if(basicInfo.value) basicInfo.value.selldate.value = formattedDate
            return formattedDate
        } else {
            return ''
            //if(basicInfo.value) basicInfo.value.selldate.value = ''
        }
    }

    function isValidDateFormat(dateStr) {
        const regex = /^(0?[1-9]|1[0-2])[\/-](0?[1-9]|[12][0-9]|3[01])[\/-]\d{4}$|^((ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)\s|((Ene|Feb|Mar|Abr|May|Jun|Jul|Ago|Sep|Oct|Nov|Dic)\s)|((ene.|feb.|mar.|abr.|may.|jun.|jul.|ago.|sep.|oct.|nov.|dic.)\s)|((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s))([1-9]|[12][0-9]|3[01])\s\d{4}$/i;
        return regex.test(dateStr);
    }

</script>