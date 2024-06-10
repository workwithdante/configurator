<template>
    <div class="m-4">
        <div class="flex justify-end">
            <div class="flex-end m-2">
                <FormControl
                    type="checkbox"
                    size="sm"
                    variant="subtle"
                    :disabled="data.premium.value === '0.00'"
                    label="Card"
                    v-model="data.checkboxCard.value"
                    @change="(check) => {data.checkboxAccount.value = !check; if(check) data.checkboxAccount.error = false; data.checkboxCard.error = false;} "
                />
                <ErrorMessage v-if="data.checkboxCard.error && data.checkboxAccount.error" :message="'* Check?'" class="mx-2" />
            </div>
            <div class="flex-end m-2">
                <FormControl
                    type="checkbox"
                    size="sm"
                    variant="subtle"
                    :disabled="data.premium.value === '0.00'"
                    label="Account"
                    v-model="data.checkboxAccount.value"
                    @change="(check) => {data.checkboxCard.value = !check; if(check) data.checkboxAccount.error = false; data.checkboxCard.error = false;}"
                />
                <ErrorMessage v-if="data.checkboxCard.error && data.checkboxAccount.error" :message="'* Check?'" class="mx-2" />
            </div>
            <div class="flex-end m-2">
                <FormControl
                    type="checkbox"
                    size="sm"
                    variant="subtle"
                    placeholder="Placeholder"
                    :disabled="data.premium.value === '0.00'"
                    label="Same Owner"
                    v-model="data.sameOwner.value"
                    @change="() => {
                        data.sameOwner.value ? data.ownerPay.value = fulladdress : data.ownerPay.value = '';
                        data.sameOwner.value ? data.ownerPay.error = false : data.ownerPay.error = true;
                    }"
                />
            </div>
            <div class="flex-end m-2">
                <FormControl
                    type="checkbox"
                    size="sm"
                    variant="subtle"
                    :disabled="data.premium.value === '0.00'"
                    label="Same Address"
                    v-model="data.sameAddress.value"
                    @change="() => {
                        data.sameAddress.value ? data.addressPay.value = fulladdress : data.addressPay.value = '';
                        data.sameAddress.value ? data.addressPay.error = false : data.addressPay.error = true;
                    }"
                />
            </div>
        </div>
		<div class="my-4 flex flex-col space-y-2 w-full">
			<div class="m-auto grid grid-cols-12 gap-1">
                <div class="col-span-2">
                    <FormControl
                        required
                        :type="'text'"
                        size="sm"
                        variant="subtle"
                        :disabled="false"
                        label="MP ID"
                        v-if="authorization.value === 'Autorización'"
                        v-model="data.mpid.value"
                    />
                    <ErrorMessage v-if="authorization.error" :message="'* MP ID Empty'" class="mx-2" />
                    <FormControl
                        @input="formatPlanID"
                        required
                        :type="'text'"
                        size="sm"
                        variant="subtle"
                        :disabled="false"
                        v-if="authorization.value !== 'Autorización'"
                        label="Plan ID"
                        v-model="data.planid.value"
                    />
                    <ErrorMessage v-if="authorization.error" :message="'* Plan ID Empty'" class="mx-2" />
                </div>
                <div class="col-span-2">
                    <FormControl
                        @change="(e) => { if(e.target.value === '') { data.company.error = true} else { data.company.error = false} }"
                        type="select" 
                        :options="[
                            {
                                label: 'Aetna',
                                value: 'Aetna',
                            },
                            {
                                label: 'Oscar',
                                value: 'Oscar',
                            },
                            {
                                label: 'Ambetter',
                                value: 'Ambetter',
                            },
                            {
                                label: 'Florida Blue',
                                value: 'Florida Blue',
                            },
                            {
                                label: 'Molina',
                                value: 'Molina',
                            },
                            {
                                label: 'Blue Cross',
                                value: 'Blue Cross',
                            },
                            {
                                label: 'United',
                                value: 'United',
                            },
                            {
                                label: 'Cigna',
                                value: 'Cigna',
                            },
                            {
                                label: 'Avmed Private',
                                value: 'Avmed Private',
                            },
                            {
                                label: 'Avmed',
                                value: 'Avmed',
                            },
                            {
                                label: 'Florida Blue Private',
                                value: 'Florida Blue Private',
                            },
                        ]"
                        size="sm"
                        variant="subtle"
                        placeholder="Select"
                        :disabled="false"
                        label="Company"
                        v-model="data.company.value"
                    />
                    <ErrorMessage v-if="data.company.error" :message="'* Company Empty'" class="mx-2" />
                </div>
                <div class="col-span-1">
                    <FormControl
                        @input="formatPremium"
                        @change="floatPremium"
                        required
                        :type="'text'"
                        size="sm"
                        variant="subtle"
                        placeholder="$0.00"
                        :disabled="false"
                        label="Premium"
                        v-model="data.premium.value"
                    />
                    <ErrorMessage v-if="data.premium.error" :message="'* Premium Empty'" class="mx-2" />
                </div>
                <div class="col-span-1">
                    <FormControl
                        readonly
                        :type="'text'"
                        size="sm"
                        variant="subtle"
                        :disabled="true"
                        label="FxF"
                        v-model="family"
                    />
                </div>
                <div class="col-span-1">
                    <FormControl
                        @change="(e) => { if(e.target.value === '') { data.typeIncome.error = true} else { data.typeIncome.error = false} }"
                        type="select" 
                        :options="[
                            {
                                label: 'W2',
                                value: 'W2',
                            },
                            {
                                label: '1099',
                                value: '1099',
                            },
                        ]"
                        size="sm"
                        variant="subtle"
                        placeholder="Select"
                        :disabled="false"
                        label="Type of Income"
                        v-model="data.typeIncome.value"
                    />
                    <ErrorMessage v-if="data.typeIncome.error" :message="'* Type Income Empty'" class="mx-2" />
                </div>
                <div class="col-span-1">
                    <FormControl
                        @input="formatIncome"
                        required
                        :type="'text'"
                        size="sm"
                        variant="subtle"
                        placeholder="$0.00"
                        :disabled="false"
                        label="Income Gross"
                        v-model="data.income.value"
                    />
                    <ErrorMessage v-if="data.income.error" :message="'* Income Empty'" class="mx-2" />
                </div>
                <div class="col-span-2">
                    <FormControl
                        @change="(e) => { if(e.target.value === '') { data.pay.error = true} else { data.pay.error = false} formatDate(e.target.value) }"
                        required
                        :type="'text'"
                        size="sm"
                        variant="subtle"
                        :disabled="data.premium.value === '0.00'"
                        label="First Pay"
                        v-model="data.pay.value"
                    />
                    <ErrorMessage v-if="data.pay.error" :message="'* First Pay Empty'" class="mx-2" />
                </div>
                <div class="col-span-1">
                    <FormControl 
                        @change="(e) => { if(e.target.value === '' && data.autopay.value === 'Yes') { data.autopay.error = true} else { data.autopay.error = false} }"
                        type="select" 
                        :options="[
                            {
                                label: 'Yes',
                                value: 'Yes',
                            },
                            {
                                label: 'No',
                                value: 'No',
                            },
                        ]"
                        size="sm"
                        variant="subtle"
                        placeholder="Select"
                        :disabled="data.premium.value === '0.00'"
                        label="Autopay"
                        v-model="data.autopay.value"
                    />
                    <ErrorMessage v-if="data.autopay.error" :message="'* Auto Pay Empty'" class="mx-2" />
                </div>
                <div class="col-span-1">
                    <FormControl
                        @input="formatAutoPay"
                        required
                        :type="'text'"
                        size="sm"
                        variant="subtle"
                        :disabled="data.premium.value === '0.00'"
                        label="Autopay Day"
                        v-if="data.autopay.value == 'Yes'"
                        v-model="data.autoPayDay.value"
                    />
                    <ErrorMessage v-if="data.autoPayDay.error" :message="'* Pay Empty'" class="mx-2" />
                </div>
                <div class="col-span-2">
                    <FormControl
                        @input="(e) => { if(e.target.value === '') { data.ownerPay.error = true } else { data.ownerPay.error = false} }"
                        required
                        :readonly="data.sameOwner.value"
                        :type="'text'"
                        size="sm"
                        variant="subtle"
                        :disabled="data.premium.value === '0.00'"
                        label="Owner"
                        v-model="ownerRef" 
                    />
                    <ErrorMessage v-if="data.ownerPay.error" :message="'* Owner Pay Empty'" class="mx-2" />
                </div>
                <div class="col-span-3">
                    <FormControl
                        @input="(e) => { if(e.target.value === '') { data.addressPay.error = true} else { data.addressPay.error = false} }"
                        required
                        :readonly="data.sameAddress.value"
                        :type="'text'"
                        size="sm"
                        variant="subtle"
                        :disabled="data.premium.value === '0.00'"
                        label="Billing Address"
                        v-model="ownerAddressRef"
                    />
                    <ErrorMessage v-if="data.addressPay.error" :message="'* Address Pay Empty'" class="mx-2" />
                </div>
                <div class="col-span-2" v-if="data.checkboxAccount.value">
                    <FormControl
                        required
                        @change="(e) => { if(e.target.value === '') { data.bankAccount.error = true} else { data.bankAccount.error = false} }"
                        type="select" 
                        :options="[
                            {
                                label: 'Chase Bank',
                                value: 'Chase Bank',
                            },
                            {
                                label: 'Wells Fargo',
                                value: 'Wells Fargo',
                            },
                            {
                                label: 'Bank Of America',
                                value: 'Bank Of America',
                            },
                            {
                                label: 'Sun Trust',
                                value: 'Sun Trust',
                            },
                            {
                                label: 'Citibank',
                                value: 'Citibank',
                            }
                        ]"
                        size="sm"
                        variant="subtle"
                        placeholder="Select"
                        :disabled="data.premium.value === '0.00'"
                        label="Bank Name"
                        v-model="data.bankAccount.value"
                        v-if="data.checkboxAccount.value"
                    />
                    <ErrorMessage v-if="data.bankAccount.error && data.checkboxAccount.value" :message="'* Bank Name Empty'" class="mx-2" />
                </div>
                <div class="col-span-1">
                    <FormControl
                        required
                        @change="(e) => { if(e.target.value === '') { data.typeCard.error = true} else { data.typeCard.error = false} }"
                        type="select" 
                        :options="[
                            {
                                label: 'Débito',
                                value: 'Debito',
                            },
                            {
                                label: 'Crédito',
                                value: 'Crédito',
                            },
                        ]"
                        size="sm"
                        variant="subtle"
                        placeholder="Select"
                        :disabled="data.premium.value === '0.00'"
                        label="Type"
                        v-model="data.typeCard.value"
                        v-if="data.checkboxCard.value"
                    />
                    <ErrorMessage v-if="data.typeCard.error && data.checkboxCard.value" :message="'* Type Card Empty'" class="mx-2" />
                    <FormControl
                        @change="(e) => { if(e.target.value === '') { data.typeAccount.error = true} else { data.typeAccount.error = false} }"
                        required
                        type="select" 
                        :options="[
                            {
                                label: 'Personal',
                                value: 'Personal',
                            },
                            {
                                label: 'Business',
                                value: 'Negocio',
                            },
                        ]"
                        size="sm"
                        variant="subtle"
                        placeholder="Select"
                        :disabled="data.premium.value === '0.00'"
                        label="Type"
                        v-model="data.typeAccount.value"
                        v-if="data.checkboxAccount.value"
                    />
                    <ErrorMessage v-if="data.typeAccount.error && data.checkboxAccount.value" :message="'* Type Account Empty'" class="mx-2" />
                </div>
                <div class="col-span-2">
                    <FormControl                    
                        @input="formatCardNumber"
                        required
                        :type="'text'"
                        size="sm"
                        variant="subtle"
                        :disabled="data.premium.value === '0.00'"
                        label="Card"
                        v-model="data.cardPay.value"
                        v-if="data.checkboxCard.value"
                    />
                    <ErrorMessage v-if="data.cardPay.error && data.checkboxCard.value" :message="'* Card Empty'" class="mx-2" />
                    <FormControl
                        @input="formatAccountNumber"
                        required
                        :type="'text'"
                        size="sm"
                        variant="subtle"
                        :disabled="data.premium.value === '0.00'"
                        label="Account"
                        v-model="data.accountPay.value"
                        v-if="data.checkboxAccount.value"
                    />
                    <ErrorMessage v-if="data.accountPay.error && data.checkboxAccount.value" :message="'* Account Empty'" class="mx-2" />
                </div>
                <div class="col-span-1">
                    <FormControl
                        required
                        :type="'text'"
                        size="sm"
                        variant="subtle"
                        :disabled="data.premium.value === '0.00'"
                        label="Code"
                        v-model="data.codePay.value"
                        v-if="data.checkboxCard.value"
                        @input="formatCVCNumber" 
                    />
                    <ErrorMessage v-if="data.codePay.error && data.checkboxCard.value" :message="'* Code Empty'" class="mx-2" />
                    <FormControl                
                        required
                        :type="'text'"
                        size="sm"
                        variant="subtle"
                        :disabled="data.premium.value === '0.00'"
                        label="Route"
                        v-model="data.routePay.value"
                        v-if="data.checkboxAccount.value"
                        @input="formatRouteNumber"
                    />
                    <ErrorMessage v-if="data.routePay.error && data.checkboxAccount.value" :message="'* Route Empty'" class="mx-2" />
                </div>
                <div class="col-span-1">
                    <FormControl
                        required
                        :type="'text'"
                        size="sm"
                        variant="subtle"
                        :disabled="data.premium.value === '0.00'"
                        label="Expiration"
                        v-model="data.expirationPay.value"
                        v-if="data.checkboxCard.value"
                        @input="formatEXPNumber"/>
                    <ErrorMessage v-if="data.expirationPay.error && data.checkboxCard.value" :message="'* Expiration Pay Empty'" class="mx-2" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { FormControl, ErrorMessage } from 'frappe-ui';
    import { ModelRef, computed } from 'vue';
    import { pay } from './pay.interface';

    const family: ModelRef<string> = defineModel('family', {
        default: '1x1'
    })

    const authorization: ModelRef<{value: string, error: boolean}> = defineModel('authorization', {
        default: ''
    })

    const data = defineModel<pay>("data", {
        default: {
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
                value: '',
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
                value: false,
                error: false
            },
		}
    })

    const formatPlanID = (event) => {
        const changePlanID = event.target.value.replace(/[^a-zA-Z0-9]/g, '');
        const limitedChain = changePlanID.slice(0, 14);
        const mayusPlanID = limitedChain.toUpperCase();
        event.target.value = mayusPlanID;
        data.value.planid.value = mayusPlanID;
        if(mayusPlanID === '' || mayusPlanID.length !== 14) {
            mpid.value = 'Te falta info.';
        } else {
            mpid.value = 'Muy bien';
        }
    };

    const formatPremium = (event) => {
        const cleanedPremium = event.target.value.replace(/[^0-9.]/g, '');
        const limitedPremium = cleanedPremium.slice(0, 7);
        event.target.value = limitedPremium;
        data.value.premium.value = limitedPremium;
    };

    const floatPremium = (event) => {
        const floatValPremium = parseFloat(event.target.value).toFixed(2);
        const limitedPremium = floatValPremium.slice(0, 7);
        event.target.value = limitedPremium;
        data.value.premium.value = limitedPremium;
        
        if(limitedPremium.length >= 4 && limitedPremium.length <= 7) {
            data.value.premium.error = false;
        } else {
            data.value.premium.error = true;
        }
    };

    const formatIncome = (event) => {
        const changeIncome = event.target.value.replace(/[^0-9.]/g, '');
        const limitedChain = changeIncome.slice(0, 6);
        event.target.value = limitedChain;
        data.value.income.value = limitedChain;
        if(Number(limitedChain >= 14580)) {
            data.value.income.error = false;
        } else {
            data.value.income.error = true;
        }
    };

    const formatAutoPay = (event) => {
        const changeAutoPay = event.target.value.replace(/\D/g, '');        
        const limitedChain = changeAutoPay.slice(0, 2);
        const limitedNumber = Math.max(1, Math.min(31, parseInt(limitedChain)));
        event.target.value = limitedNumber.toString();
        data.value.autoPayDay.value = limitedNumber.toString();

        if (isNaN(limitedNumber)) {
            data.value.autoPayDay.error = true;
        } else {        
            data.value.autoPayDay.error = false;    
        }
    };

    const fullname = defineModel<string>("fullname", {
        default: ''
    });

	const fulladdress = defineModel<string>("fulladdress", {
        default: ''
    });

    const ownerRef = computed({
        get() {
            if(data.value.sameOwner.value) {
                data.value.ownerPay.value = fullname.value
            } 
            return data.value.ownerPay.value
        },
        set(value) {
            data.value.ownerPay.value = value
        }
    });

    const ownerAddressRef = computed({
        get() {
            if(data.value.sameAddress.value) {
                data.value.addressPay.value = fulladdress.value
            } 
            return data.value.addressPay.value
        },
        set(value) {
            data.value.addressPay.value = value
        }
    });

    const formatCardNumber = (event) => {
        const changeCardNumber = event.target.value.replace(/\D/g, '');
        const formattedCardNumber = changeCardNumber.replace(/(.{4})/g, '$1-');
        const finalFormattedCardNumber = formattedCardNumber.replace(/-$/, '');
        const limitedChain = finalFormattedCardNumber.slice(0, 19);
        event.target.value = limitedChain;
        data.value.cardPay.value = limitedChain;        
        if(limitedChain === '' || limitedChain.length !== 19) {
            data.value.cardPay.error = true;
        } else { 
            data.value.cardPay.error = false;
        }
    };    

    const formatCVCNumber = (event) => {
        const changeCVC = event.target.value.replace(/\D/g, '');
        const limitedChain = changeCVC.slice(0, 4);
        event.target.value = limitedChain;
        data.value.codePay.value = limitedChain;
        if(limitedChain.length !== 3 && limitedChain.length !== 4) {
            data.value.codePay.error = true;
        } else {
            data.value.codePay.error = false;
        }
    };

    const formatEXPNumber = (event) => {
        let formattedNumber = event.target.value.replace(/\D/g, '');

        // Aplicar el formato (##/##) solo si ya se han ingresado al menos dos dígitos
        if (formattedNumber.length >= 2) {
            formattedNumber = formattedNumber.replace(/^(\d{2})(\d{0,2})/, '$1/$2');
        }

        // Si solo quedan dos dígitos y un carácter de barra, permitir borrar el carácter de barra
        if (formattedNumber.length === 3 && event.inputType === 'deleteContentBackward') {
            formattedNumber = formattedNumber.slice(0, 2);
        }

        // Limitar el número de dígitos a 5
        const limitedDigits = formattedNumber.slice(0, 5);

        // Asignar el valor al evento y al modelo de datos
        event.target.value = limitedDigits;
        data.value.expirationPay.value = limitedDigits;
        if(limitedDigits === '' || limitedDigits.length !== 5) {
            data.value.expirationPay.error = true;
        } else {
            data.value.expirationPay.error = false;
        }
    };

    const formatAccountNumber = (event) => {
        const changeCardNumber = event.target.value.replace(/\D/g, '');
        const limitedChain = changeCardNumber.slice(0, 12);
        event.target.value = limitedChain;
        data.value.accountPay.value = limitedChain;        
        if(limitedChain.length >= 9 && limitedChain.length <= 12) {
            data.value.accountPay.error = false;
        } else { 
            data.value.accountPay.error = true;
        }
    };

    const formatRouteNumber = (event) => {
        const changeCardNumber = event.target.value.replace(/\D/g, '');
        const formattedRouteNumber = changeCardNumber.replace(/(.{3})/g, '$1-');
        const finalFormattedRouteNumber = formattedRouteNumber.replace(/-$/, '');
        const limitedChain = finalFormattedRouteNumber.slice(0, 11);
        event.target.value = limitedChain;
        data.value.routePay.value = limitedChain;        
        if(limitedChain === '' || limitedChain.length !== 11) {
            data.value.routePay.error = true;
        } else { 
            data.value.routePay.error = false;
        }
    };

    function isValidDateFormat(dateStr) {
        const regex = /^(0?[1-9]|1[0-2])[\/-](0?[1-9]|[12][0-9]|3[01])[\/-]\d{4}$|^((ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)\s|((Ene|Feb|Mar|Abr|May|Jun|Jul|Ago|Sep|Oct|Nov|Dic)\s)|((ene.|feb.|mar.|abr.|may.|jun.|jul.|ago.|sep.|oct.|nov.|dic.)\s)|((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s))([1-9]|[12][0-9]|3[01])\s\d{4}$/i;
        return regex.test(dateStr);
    }

    function formatDate(value) {
        if (isValidDateFormat(value)) {
            let date = new Date(value);
            if (!isNaN(date.getTime())) {
                let month = date.toLocaleString('default', { month: 'short' });
                let day = date.getDate();
                let year = date.getFullYear();
                let formattedDate = month + ' ' + day + ' ' + year;
                data.value.pay.value = formattedDate
            } else {
                data.value.pay.value = ''
            }
        } else {
            data.value.pay.value = ''
        }
    };
</script>