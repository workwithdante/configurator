<template>
    <Dialog v-model="visible" @close="setVisible">
        <template #body-title>
            <h3 v-if="rowIndex === 0">New Dependent</h3>
            <h3 v-if="rowIndex !== 0">Edit Dependent</h3>
        </template>
        <template #body-content>
            <div class="m-3 flex flex-data items-center justify-center">
                <div class="m-auto grid grid-cols-3 gap-1">
                    <div class="col-span-2">
                        <FormControl
                            @input="(e) => { dataCalc.firstname.value = dataCalc.firstname.value.toUpperCase(); if(e.target.value === '') { dataCalc.firstname.error = true} else { dataCalc.firstname.error = false} }"
                            required
                            :type="'text'"
                            size="sm"
                            variant="subtle"
                            :disabled="false"
                            label="First Name"
                            v-model="dataCalc.firstname.value" />
                        <ErrorMessage v-if="dataCalc.firstname.error" :message="'* First Name Empty'" class="mx-2" />
                    </div>
                    <div>
                        <FormControl
                            @input="dataCalc.middlename.value = dataCalc.middlename.value.toUpperCase();"
                            required
                            :type="'text'"
                            size="sm"
                            variant="subtle"
                            :disabled="false"
                            label="Middle Name"
                            v-model="dataCalc.middlename.value" />
                    </div>
                    <div class="col-span-3">
                        <FormControl
                            @input="(e) => { dataCalc.lastname.value = dataCalc.lastname.value.toUpperCase(); if(e.target.value === '') { dataCalc.lastname.error = true} else { dataCalc.lastname.error = false} }"
                            required
                            :type="'text'"
                            size="sm"
                            variant="subtle"
                            :disabled="false"
                            label="Last Name"
                            v-model="dataCalc.lastname.value" />
                            <ErrorMessage v-if="dataCalc.lastname.error" :message="'* Last Name Empty'" class="mx-2" />
                    </div>
                    <div>
                        <FormControl
                            @change="(e) => { calcAge(e.target.value) }"
                            required
                            :type="'text'"
                            size="sm"
                            variant="subtle"
                            :disabled="false"
                            label="Date of Birth"
                            v-model="dataCalc.dob.value" />
                        <ErrorMessage v-if="dataCalc.dob.error" :message="'* DOB Empty'" class="mx-2" />
                    </div>
                    <div>
                        <FormControl
                            type="autocomplete"
                            :options="countries"
                            size="sm"
                            variant="subtle"
                            placeholder="Select"
                            :disabled="false"
                            label="Place of Birth"
                            v-model="pobChange" />
                        <ErrorMessage v-if="data.pob.error" :message="'* POB Empty'" class="mx-2" />
                    </div>
                    <div>
                        <FormControl
                            @change="(e) => { if(e.target.value === '') { dataCalc.gender.error = true} else { dataCalc.gender.error = false} }"
                            type="select" 
                            :options="[
                                {
                                    label: 'Female',
                                    value: 'Female'
                                },
                                {
                                    label: 'Male',
                                    value: 'Male'
                                }
                            ]"
                            size="sm"
                            variant="subtle"
                            placeholder="Select"
                            :disabled="false"
                            label="Gender"
                            v-model="dataCalc.gender.value"
                        />
                        <ErrorMessage v-if="dataCalc.gender.error" :message="'* Gender Empty'" class="mx-2" />
                    </div>
                    <div>
                        <FormControl 
                            required 
                            :type="'text'" 
                            size="sm" 
                            variant="subtle"
                            :disabled="false" 
                            label="SSN" 
                            v-model="dataCalc.ssn.value" 
                            @input="formatSSN"
                        />
                        <ErrorMessage v-if="dataCalc.ssn.error" :message="'* SSN Empty'" class="mx-2" />
                    </div>
                    <div>
                        <FormControl
                            @change="(e) => { 
                                dataCalc.coverage.bg_color = dataCalc.coverage.label == 'Yes' ? 'bg-green-600' : 'bg-red-600' 
                                if(e.target.value === '') { dataCalc.coverage.error = true} else { dataCalc.coverage.error = false}
                            }"
                            type="select"
                            :options="[
                                {
                                    label: 'Yes',
                                    value: 'Yes'
                                },
                                {
                                    label: 'No',
                                    value: 'No'
                                },
                                {
                                    label: 'Medicaid',
                                    value: 'Medicaid'
                                }
                            ]"
                            size="sm"
                            variant="subtle"
                            placeholder="Select"
                            :disabled="false"
                            label="Coverage"
                            v-model="dataCalc.coverage.label"
                        />
                        <ErrorMessage v-if="dataCalc.coverage.error" :message="'* Coverage Empty'" class="mx-2" />
                    </div>
                    <div>
                        <FormControl
                            @change="(e) => { if(e.target.value === '') { dataCalc.relationship.error = true} else { dataCalc.relationship.error = false} }"
                            type="select" 
                            :options="[
                                {
                                    //Esposo-Esposa
                                    label: 'Spouse',
                                    value: 'Spouse'
                                },
                                {
                                    //Padre-Madre
                                    label: 'Parent',
                                    value: 'Parent'
                                },
                                {
                                    //Hijo-Hija
                                    label: 'Son/Daughter',
                                    value: 'Son/Daughter'
                                },
                                {
                                    //Abuelo-Abuela
                                    label: 'Grandparent',
                                    value: 'Grandparent'
                                },
                                {
                                    //Nieto-Nieta
                                    label: 'Grandchild',
                                    value: 'Grandchild'
                                },
                                {
                                    //Hermano-Hermana
                                    label: 'Sibling',
                                    value: 'Sibling'
                                },
                                {
                                    //Sobrino-Sobrina
                                    label: 'Nephew/Niece',
                                    value: 'Nephew/Niece'
                                },
                                {
                                    //Tío-Tía
                                    label: 'Aunt/Uncle',
                                    value: 'Aunt/Uncle'
                                },
                                {
                                    //Cuñado-Cuñada
                                    label: 'Brother/Sister in-law',
                                    value: 'Brother/Sister in-law'
                                },
                                {
                                    //Yerno-Nuera
                                    label: 'Son/Daughters in-law',
                                    value: 'Son/Daughter in-law'
                                },
                            ]"
                            size="sm"
                            variant="subtle"
                            placeholder="Select"
                            :disabled="false"
                            label="Relationship"
                            v-model="dataCalc.relationship.value"
                        />
                        <ErrorMessage v-if="dataCalc.relationship.error" :message="'* Relationship Empty'" class="mx-2" />
                    </div>
                    <div class="col-span-2">
                        <FormControl
                            @change="(e) => { if(e.target.value === '') { dataCalc.document.error = true} else { dataCalc.document.error = false} }"
                            type="select" 
                            :options="[	
                                {
                                    label: 'Citizen',
                                    value: 'Citizen',
                                },
                                {
                                    label: 'Resident',
                                    value: 'Resident',
                                },
                                {
                                    label: 'Authorization Work',
                                    value: 'Authorization Work',
                                },
                                {
                                    label: 'Action Notice',
                                    value: 'Action Notice',
                                },
                                {
                                    label: 'Visa',
                                    value: 'Visa',
                                },
                                {
                                    label: 'Passport',
                                    value: 'Passport',
                                },
                                {
                                    label: 'Political Asylum',
                                    value: 'Political Asylum',
                                }
                            ]"
                            size="sm"
                            variant="subtle"
                            placeholder="Select"
                            :disabled="false"
                            label="Migratory Status"
                            v-model="dataCalc.document.value"
                        />
                        <ErrorMessage v-if="dataCalc.document.error" :message="'* Migratory Status Empty'" class="mx-2" />
                    </div>
                    <div>
                        <FormControl
                            @change="(e) => {
                                if(e.target.value === '') { dataCalc.smoke.error = true} else { dataCalc.smoke.error = false}
                                dataCalc.smoke.color = dataCalc.smoke.value == 'Yes' ? 'red' : 'green' 
                            }" 
                            type="select"
                            :options="[
                                {
                                    label: 'Yes',
                                    value: 'Yes'
                                },
                                {
                                    label: 'No',
                                    value: 'No'
                                }
                            ]"
                            size="sm"
                            variant="subtle"
                            placeholder="Select"
                            :disabled="false"
                            label="Smoke"
                            v-model="dataCalc.smoke.value"
                        />
                        <ErrorMessage v-if="dataCalc.smoke.error" :message="'* Smoke Empty'" class="mx-2" />
                    </div>
                    <div>
                        <FormControl
                            @change="(e) => { if(e.target.value === '') { dataCalc.jail.error = true} else { dataCalc.jail.error = false} }"
                            type="select" 
                            :options="[
                                {
                                    label: 'Yes',
                                    value: 'Yes',
                                },
                                {
                                    label: 'No',
                                    value: 'No',
                                }
                            ]"
                            size="sm"
                            variant="subtle"
                            placeholder="Select"
                            :disabled="false"
                            label="Jail"
                            v-model="dataCalc.jail.value"
                        />
                        <ErrorMessage v-if="dataCalc.jail.error" :message="'* Jail Empty'" class="mx-2" />
                    </div>
                    <div>
                        <FormControl
                            @change="(e) => { if(e.target.value === '') { dataCalc.pregnant.error = true} else { dataCalc.pregnant.error = false} }"
                            type="select" 
                            :options="[
                                {
                                    label: 'Yes',
                                    value: 'Yes',
                                },
                                {
                                    label: 'No',
                                    value: 'No',
                                }
                            ]"
                            size="sm"
                            variant="subtle"
                            placeholder="Select"
                            :disabled="false"
                            label="Pregnant"
                            v-model="dataCalc.pregnant.value"
                        />
                        <ErrorMessage v-if="dataCalc.pregnant.error" :message="'* Pregnant Empty'" class="mx-2" />
                    </div>
                </div>
            </div>
        </template>
        <template #actions>
            <div class="flex flex-data items-center justify-center">
                <Button variant="solid" @click="saveDependent" v-if="rowIndex === 0">
                    Save
                </Button>
            </div>
            <div class="flex flex-data items-center justify-center">
                <Button variant="solid" @click="updateDependent" v-if="rowIndex !== 0">
                    Update
                </Button>
            </div>	
        </template>
    </Dialog>
</template>
<script setup lang="ts">
    import { Dialog, FormControl, ErrorMessage } from 'frappe-ui'
    import { DependentI } from '../person.interface';
    import { computed, ref } from 'vue';
    import { countries } from './country';

    const emit = defineEmits(["showToast"]);
    function setVisible() {
        visible.value = false;
        data.value.firstname.error = false;
        data.value.lastname.error = false;
        data.value.dob.error = false;
        data.value.pob.error = false;
        data.value.gender.error = false;
        data.value.ssn.error = false;
        data.value.coverage.error = false;
        data.value.document.error = false;
        data.value.relationship.error = false;
        data.value.smoke.error = false;
    }

    const data = ref<DependentI>({
        id: 0,
        firstname:  {
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
        email: {
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
        relationship: {
            value: '',
            error: false 
        },
    })

    const pobChange = computed({
        get() {
            return data.value.pob.value
        },
        set(value) {
            if(value === null)
                data.value.pob.value = ''
            else
                data.value.pob.value = value
            if(data.value.pob.value === '') data.value.pob.error = true
            else data.value.pob.error = false
        }
    })
    const dataCalc = computed({
        get() {
            if( rowIndex.value === 0 ) {
                return data.value
            } else {
                return rowsRef.value.find(row => row.id === rowIndex.value)
            }
        },
        set(value) {
            if(value) {
                if( rowIndex.value === 0 ) {
                    data.value = value
                } else {
                    rowsRef.value[rowIndex.value] = value
                }
            }
        }
     })

    const visible = defineModel<boolean>("visible", {
        default: false,
        required: true
    })

    let rowIndex = defineModel<number>("rowIndex", {
        default: 0
    });

    let rowsRef = defineModel<Array<DependentI>>("rowsRef", 
        { 
            default: []
        }
    )

    function calcAge(dobStr: any): string {
        formatDate(dobStr)
        if(dataCalc.value && dobStr !== '') {
            const dob = new Date(dobStr)
            const now: Date = new Date();
            const nowMonth: number = now.getMonth();
            const nowDay: number = now.getDate();
            const dobMonth: number = dob.getMonth();
            const dobDay: number = dob.getDate();
            let age = now.getFullYear() - dob.getFullYear();
            if (nowMonth < dobMonth || (nowMonth === dobMonth && nowDay < dobDay)) {
                age--;
            }

            if(dataCalc.value) {
                dataCalc.value.age.value = String(age)
                data.value.dob.error = false
            }
            return String(age);
        } else {
            data.value.dob.error = true
            return ''
        }
	}

    function validate(): boolean {
        if(data.value.firstname.value === '') data.value.firstname.error = true
        else data.value.firstname.error = false
        if(data.value.lastname.value === '') data.value.lastname.error = true
        else data.value.lastname.error = false
        if(data.value.dob.value === '') data.value.dob.error = true
        else data.value.dob.error = false
        if(data.value.pob.value === '') data.value.pob.error = true
        else data.value.pob.error = false
        if(data.value.gender.value === '') data.value.gender.error = true
        else data.value.gender.error = false        
        if(data.value.ssn.value !== '' && data.value.ssn.value.length !== 11) {
            data.value.ssn.error = true;
        } else {
            data.value.ssn.error = false
        }
        if(data.value.coverage.label === '') data.value.coverage.error = true
        else data.value.coverage.error = false
        if(data.value.relationship.value === '') data.value.relationship.error = true
        else data.value.relationship.error = false
        if(data.value.document.value === '') data.value.document.error = true
        else data.value.document.error = false
        if(data.value.smoke.value === '') data.value.smoke.error = true
        else data.value.smoke.error = false
        if(data.value.jail.value === '' || data.value.jail.value === 'Yes') {
            emit('showToast', 'Unable to register')
            data.value.jail.error = true
        }
        else data.value.jail.error = false
        if(data.value.pregnant.value === '') data.value.pregnant.error = true
        else data.value.pregnant.error = false
        
        if(
            !data.value.firstname.error &&
            !data.value.lastname.error &&
            !data.value.dob.error &&
            !data.value.pob.error &&
            !data.value.gender.error &&
            !data.value.ssn.error &&
            !data.value.coverage.error &&
            !data.value.relationship.error &&
            !data.value.document.error &&
            !data.value.smoke.error &&
            !data.value.jail.error &&
            !data.value.pregnant.error
        ) {
            return true
        } else {
            emit('showToast', 'Fill All Fields')
            return false
        }
        
    }

    function saveDependent() {
        if(validate()) {
            data.value.id = rowsRef.value.length + 1;
            data.value.age.value = calcAge(data.value.dob.value);
            data.value.coverage.bg_color = data.value.coverage.label == 'Yes' ? 'bg-green-600' : 'bg-red-600';
            data.value.smoke.color = data.value.smoke.value == 'Yes' ? 'red' : 'green'
            rowsRef.value.push({
                id: data.value.id,
                age: { ...data.value.age },
                coverage: { ...data.value.coverage },
                dob: { ...data.value.dob },
                document: { ...data.value.document },
                email: { ...data.value.email },
                firstname: { ...data.value.firstname },
                gender: { ...data.value.gender },
                jail: { ...data.value.jail },
                lastname: { ...data.value.lastname },
                middlename: { ...data.value.middlename },
                phone1: { ...data.value.phone1 },
                phone2: { ...data.value.phone2 },
                pob: { ...data.value.pob },
                pregnant: { ...data.value.pregnant },
                relationship: { ...data.value.relationship },
                smoke: { ...data.value.smoke },
                ssn: { ...data.value.ssn },
            });
            visible.value = false
            rowIndex.value = 0
            data.value = {
                id: 0,
                firstname:  {
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
                email: {
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
                relationship: {
                    value: '',
                    error: false 
                },
            }
	    }
    }


const formatSSN = (event) => {
	// Obtener el valor actual del input
	let inputValue = event.target.value;

	// Eliminar cualquier carácter que no sea un número
	let numbersOnly = inputValue.replace(/\D/g, '');

	// Limitar la longitud del SSN a 9 dígitos
	if (numbersOnly.length > 9) {
		numbersOnly = numbersOnly.slice(0, 9);
	}

	// Aplicar la máscara
	const formattedSSN = formatAsSSN(numbersOnly);

	// Actualizar el valor del input con la máscara aplicada
	event.target.value = formattedSSN;

	// Actualizar el valor del modelo ssn
	data.value.ssn.value = formattedSSN;

	if (inputValue === '') {
		data.value.ssn.error = false;
	} else if (inputValue.length !== 11) {
		data.value.ssn.error = true;
	} else {
		data.value.ssn.error = false;
	}
};

const formatAsSSN = (value) => {
	// Aplicar la máscara
	return value.replace(/^(\d{0,3})(\d{0,2})(\d{0,4})$/, (match, p1, p2, p3) => {
		let formattedSSN = '';
		if (p1) {
			formattedSSN += `${p1}`;
		}
		if (p2) {
			formattedSSN += `-${p2}`;
		}
		if (p3) {
			formattedSSN += `-${p3}`;
		}
		return formattedSSN;
	});
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
                data.value.dob.value = formattedDate
            } else {
                data.value.dob.value = ''
            }
        } else {
            data.value.dob.value = ''
        }
    }
</script>