<template>
	<div class="m-4">
		<div class="my-4 flex flex-col space-y-2 w-full">
			<div class="m-auto grid grid-cols-12 gap-1">
				<div>
					<FormControl
						@change="updateStatusSell"
						type="select" :options="[							
							{
								label: 'Nueva',
								value: 'Nueva',
							},
							{
								label: 'Autorización',
								value: 'Autorización',
							},
							{
								label: 'Recuperada',
								value: 'Recuperada',
							},						
						]" 
						size="sm" 
						variant="subtle" 
						placeholder="Select" 
						:disabled="false" 
						label="Status Sell"
						v-model="data.statusSell.value"
					/>
					<ErrorMessage v-if="data.statusSell.error" :message="'* Document Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl
						@change="(e) => { if (e.target.value === '') { data.coverage.error = true } else { data.coverage.error = false } }"
						type="select" :options="[
							{
								label: 'Yes',
								value: 'Yes',
							},
							{
								label: 'No',
								value: 'No',
							},
							{
								label: 'Medicaid',
								value: 'Medicaid',
							},
							{
								label: 'Medicare',
								value: 'Medicare',
							},
						]"
						size="sm"
						variant="subtle"
						placeholder="Select"
						:disabled="false"
						label="Coverage"
						v-model="data.coverage.label"
					/>
					<ErrorMessage v-if="data.coverage.error" :message="'* Coverage Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl
						@input="formatFirstName"
						required 
						:type="'text'" 
						size="sm" 
						variant="subtle" 
						:disabled="false"
						label="First Name" 
						v-model="data.firstname.value"
					/>
					<ErrorMessage v-if="data.firstname.error" :message="'* First Name Empty'" class="mx-2" />
				</div>
				<div class="col-span-2">
					<FormControl			
						@input="formatMiddleName"
						@change="trimMiddleName"
						required 
						:type="'text'" 
						size="sm" 
						variant="subtle" 
						:disabled="false"
						label="Middle name" 
						v-model="data.middlename.value"
					/>
				</div>
				<div class="col-span-2">
					<FormControl
						@input="formatLastName"
						@change="trimLastName"
						required 
						:type="'text'" 
						size="sm" 
						variant="subtle"
						:disabled="false"
						label="Last Name" 
						v-model="data.lastname.value"
					/>
					<ErrorMessage v-if="data.lastname.error" :message="'* Last Name Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl 
						@input="formatSSN"
						required 
						:type="'text'" 
						size="sm" 
            			variant="subtle"
						:disabled="false" 
						label="SSN" 
						v-model="data.ssn.value"
					/>
					<ErrorMessage v-if="data.ssn.error" :message="'* SSN Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl
						@change="(e) => { if (e.target.value === '') { data.document.error = true } else { data.document.error = false } }"
						type="select" :options="[							
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
						v-model="data.document.value"
					/>
					<ErrorMessage v-if="data.document.error" :message="'* Migratory Status Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl 
						@input="formatPhoneNumber1"
						required 
						:type="'text'" 
						size="sm" 
						variant="subtle"
						:disabled="false" 
						label="Phone #1" 
						v-model="data.phone1.value" 
					/>
					<ErrorMessage v-if="data.phone1.error" :message="'* Phone #1 Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl 
						@input="formatPhoneNumber2"
						v-model="data.phone2.value" 
						required 
						:type="'text'" 
						size="sm" 
						variant="subtle"
						:disabled="false" 
						label="Phone #2" 
					/>
					<ErrorMessage v-if="data.phone2.error" :message="'* Phone #2 Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl 
						required 
						:type="'text'" 
						size="sm" 
						variant="subtle" 
						:disabled="false"
						label="Day of Birth" 
						v-model="data.dob.value" 
						@change="calcAge"
					/>
					<ErrorMessage v-if="data.dob.error" :message="'* DOB Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl 
						readonly 
						:type="'number'" 
						size="sm"
						:disabled="true" 
						label="Age"
						v-model="data.age.value"
					/>
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
						v-model="pobChange"
					/>
					<ErrorMessage v-if="data.pob.error" :message="'* POB Empty'" class="mx-2" />
				</div>
				<div class="col-span-2">
					<FormControl
						@input="formatAddress"
						@change="trimAddress"
						required 
						:type="'text'" 
						size="sm" 
						variant="subtle" 
						:disabled="false" 
						label="Address" 
						v-model="data.address.address.value"
					/>
					<ErrorMessage v-if="data.address.address.error" :message="'* Address Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl 
						@input="formatApt"
						@change="trimApt"
						required 
						:type="'text'" 
						size="sm" 
						variant="subtle" 
						:disabled="false" 
						label="Apt/Ste" 
						v-model="data.address.optional.value"
					/>
				</div>
				<div class="col-span-2">
					<FormControl
						@input="formatCity"
						@change="trimCity"
						required 
						:type="'text'" 
						size="sm" 
						variant="subtle"  
						:disabled="false"
						label="City" 
						v-model="data.address.city.value"
					/>
					<ErrorMessage v-if="data.address.city.error" :message="'* City Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl
						@change="(e) => { if (e.target.value === '') { data.address.state.error = true } else { data.address.state.error = false } }"
						type="select" :options="[
							{
								label: 'Florida',
								value: 'FL',
							},
							{
								label: 'Georgia',
								value: 'GA',
							},
							{
								label: 'Texas',
								value: 'TX',
							},
							{
								label: 'Tennessee',
								value: 'TN',
							},
							{
								label: 'Arizona',
								value: 'AZ',
							},
							{
								label: 'California',
								value: 'CA',
							},
							{
								label: 'Illinois',
								value: 'IL',
							},
							{
								label: 'Ohio',
								value: 'OH',
							},
							{
								label: 'N. Caroline',
								value: 'NC',
							},
							{
								label: 'S. Carolina',
								value: 'SC',
							},
							{
								label: 'Wisconsin',
								value: 'WI',
							},
							{
								label: 'Nevada',
								value: 'NV',
							},
							{
								label: 'Indianapolis',
								value: 'IN',
							},
							{
								label: 'Massachusetts',
								value: 'MSS',
							}
						]" 
						size="sm" 
						variant="subtle" 
						placeholder="Select" 
						:disabled="false" 
						label="State"
						v-model="data.address.state.value"
					/>
					<ErrorMessage v-if="data.address.state.error" :message="'* State Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl 
						@input="formatZipCode"
						required 
						:type="'text'" 
						size="sm" 
						variant="subtle" 
						:disabled="false" 
						label="Zipcode" 
						v-model="data.address.zipcode.value"
					/>
					<ErrorMessage v-if="data.address.zipcode.error" :message="'* ZipCode Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl 
						@input="formatCounty"
						@change="trimCounty"
						required 
						:type="'text'" 
						size="sm" 
						ariant="subtle" 
						:disabled="false" 
						label="County" 
						v-model="data.address.county.value"
					/>
				</div>
				<div class="col-span-2">
					<FormControl
						@input="formatEmail"
						required 
						:type="'email'" 
						size="sm" 
						variant="subtle" 
						:disabled="false" 
						label="Email" 
						v-model="data.email.value"
					/>
					<ErrorMessage v-if="data.email.error" :message="'* Email Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl
						@change="(e) => { if (e.target.value === '') { data.language.error = true } else { data.language.error = false } }"
						type="select" :options="[
							{
								label: 'Spanish',
								value: 'Spanish',
							},
							{
								label: 'English',
								value: 'English',
							},
						]" 
						size="sm" 
						variant="subtle" 
						placeholder="Select" 
						:disabled="false" 
						label="Language"
						v-model="data.language.value"
					/>
					<ErrorMessage v-if="data.language.error" :message="'* Language Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl
						@change="(e) => { if (e.target.value === '') { data.gender.error = true } else { data.gender.error = false } }"
						type="select" :options="[
							{
								label: 'Female',
								value: 'Female',
							},
							{
								label: 'Male',
								value: 'Male',
							}
						]" 
						size="sm" 
						ariant="subtle" 
						placeholder="Select" 
						:disabled="false" 
						label="Gender"
						v-model="data.gender.value"
					/>
					<ErrorMessage v-if="data.gender.error" :message="'* Gender Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl
						@change="(e) => { if (e.target.value === '') { data.smoke.error = true } else { data.smoke.error = false } }"
						type="select" :options="[
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
						v-model="data.smoke.value"
					/>
					<ErrorMessage v-if="data.smoke.error" :message="'* Smoke Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl
						@change="(e) => { if (e.target.value === '') { data.jail.error = true } else { data.jail.error = false } }"
						type="select" :options="[
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
						v-model="data.jail.value"
					/>
					<ErrorMessage v-if="data.jail.error" :message="'* Jail Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl
						@change="(e) => { if (e.target.value === '') { data.pregnant.error = true } else { data.pregnant.error = false } }"
						type="select" :options="[
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
						v-model="data.pregnant.value"
					/>
					<ErrorMessage v-if="data.pregnant.error" :message="'* Pregnant Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl
						@change="(e) => { if (e.target.value === '') { data.aor.error = true } else { data.aor.error = false } }"
						type="select" :options="[
							{
								label: 'Sent',
								value: 'sent',
							},
							{
								label: 'Signed',
								value: 'signed',
							}
						]" 
						size="sm" 
						variant="subtle" 
						placeholder="Select" 
						:disabled="false" 
						label="AOR"
						v-model="data.aor.value"
					/>
					<ErrorMessage v-if="data.aor.error" :message="'* AOR Empty'" class="mx-2" />
				</div>
				<div>
					<FormControl
						@change="(e) => { if (e.target.value === '') { data.broker.error = true } else { data.broker.error = false } }"
						type="select" :options="[
							{
								label: 'Beatriz Sierra',
								value: 'Beatriz Sierra',
							},
							{
								label: 'Ana Daniella Corrales',
								value: 'Ana Daniella Corrales',
							},
							{
								label: 'Juan Ramirez',
								value: 'Juan Ramirez',
							},
							{
								label: 'Autorización',
								value: 'Autorización',
							},
						]" 
						size="sm" 
						variant="subtle" 
						placeholder="Select" 
						:disabled="false" 
						label="Broker"
						v-model="data.broker.value"
					/>
					<ErrorMessage v-if="data.broker.error" :message="'* Broker Empty'" class="mx-2" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { FormControl, ErrorMessage } from 'frappe-ui'
import { Owner } from './person.interface';
import { countries } from './Dependent/country';
import { computed } from 'vue';

const pobChange = computed({
	get() {
		return data.value.pob.value
	},
	set(value) {
		if(value === null)
			data.value.pob.value = ''
		else
			data.value.pob.value = value['value']
		if(data.value.pob.value === '') data.value.pob.error = true
		else data.value.pob.error = false
	}
})

const data = defineModel<Owner>("data", {
	default: {
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
			label: '',
			bg_color: '',
			error: false
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
			addressOptional: {
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
		aor: {
			value: '',
			error: false
		},
		broker: {
			value: '',
			error: false
		},
	}
})

const formatFirstName = (event) => {
    const cleanedFirstName = event.target.value.replace(/[^a-zA-Z\s]/g, '');
	const trimmedFirstName = cleanedFirstName.trim();
    const upperCaseFirstName = trimmedFirstName.toUpperCase();
    event.target.value = upperCaseFirstName;
    data.value.firstname.value = upperCaseFirstName;

    if (upperCaseFirstName === '') {
        data.value.firstname.error = true;
    } else {
        data.value.firstname.error = false;
    }
};

const updateStatusSell = (e) => { 
	if (e.target.value === '') { 
		data.value.statusSell.error = true 
	} else {
		data.value.statusSell.error = false
	} 
}

const formatMiddleName = (event) => {
    const cleanedMiddleName = event.target.value.replace(/[^a-zA-Z\s]/g, '');
    const upperCaseMiddleName = cleanedMiddleName.toUpperCase();
    event.target.value = upperCaseMiddleName;
    data.value.middlename.value = upperCaseMiddleName;
};

const trimMiddleName = (event) => {
	const removeSpace = event.target.value.replace(/\s+/g, ' ');
    const trimmedMiddleName = removeSpace.trim();
    event.target.value = trimmedMiddleName;
    data.value.middlename.value = trimmedMiddleName;
};

const formatLastName = (event) => {
    const cleanedLastName = event.target.value.replace(/[^a-zA-Z\s]/g, '');
    const upperCaseLastName = cleanedLastName.toUpperCase();
    event.target.value = upperCaseLastName;
    data.value.lastname.value = upperCaseLastName;
};

const trimLastName = (event) => {
	const removeSpace = event.target.value.replace(/\s+/g, ' ');
    const trimmedLastName = removeSpace.trim();
    event.target.value = trimmedLastName;
    data.value.lastname.value = trimmedLastName;

	if (trimmedLastName === '') {
		data.value.lastname.error = true;
	} else {
		data.value.lastname.error = false;
	}
};

const formatSSN = (event) => {
	const cleanedSSN = event.target.value.replace(/\D/g, '');
	const limitedSSN = cleanedSSN.slice(0, 9);
	const formattedSSN = formatAsSSN(limitedSSN);
	event.target.value = formattedSSN;
	data.value.ssn.value = formattedSSN;

	if (formattedSSN !== '' && formattedSSN.length !== 11) {
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

const formatAsPhoneNumber = (value) => {
	return value.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})$/, (match, p1, p2, p3) => {
		let formattedNumber = '';
		if (p1) {
		formattedNumber += `(${p1}`;
		}
		if (p2) {
		formattedNumber += `) ${p2}`;
		}
		if (p3) {
		formattedNumber += ` ${p3}`;
		}
		return formattedNumber;
	});
};

const formatPhoneNumber1 = (event) => {
	const cleannedPhone = event.target.value.replace(/\D/g, '');
	const limitedPhone = cleannedPhone.slice(0, 10);
	const formatPhone = formatAsPhoneNumber(limitedPhone);
	event.target.value = formatPhone;
	data.value.phone1.value = formatPhone;

	if (formatPhone.length !== 14) {
		data.value.phone1.error = true;
	} else {
		data.value.phone1.error = false;
	}
};

const formatPhoneNumber2 = (event) => {
	const cleannedPhone = event.target.value.replace(/\D/g, '');
	const limitedPhone = cleannedPhone.slice(0, 10);
	const formatPhone = formatAsPhoneNumber(limitedPhone);
	event.target.value = formatPhone;
	data.value.phone2.value = formatPhone;

	if (formatPhone !== '' && formatPhone.length !== 14) {
		data.value.phone2.error = true;
	} else {
		data.value.phone2.error = false;
	}
};

const formatAddress = (event) => {
	const upperCaseAddress = event.target.value.toUpperCase();
	event.target.value = upperCaseAddress;
	data.value.address.address.value = upperCaseAddress;
};

const trimAddress = (event) => {
	const removeSpace = event.target.value.replace(/\s+/g, ' ');
	const trimmedAddress = removeSpace.trim();
	event.target.value = trimmedAddress;
	data.value.address.address.value = trimmedAddress;

	if (trimmedAddress === '') {
		data.value.address.address.error = true;
	} else {
		data.value.address.address.error = false;
	}
};

const formatApt = (event) => {
	const limitedApt = event.target.value.slice(0, 15);
	const upperCaseApt = limitedApt.toUpperCase();
	event.target.value = upperCaseApt;
	data.value.address.optional.value = upperCaseApt;
};

const trimApt = (event) => {
	const removeSpace = event.target.value.replace(/\s+/g, ' ');
	const trimmedApt = removeSpace.trim();
	event.target.value = trimmedApt;
	data.value.address.optional.value = trimmedApt;
};

const formatCity = (event) => {
	const cleanedCity = event.target.value.replace(/[^a-zA-Z\s]/g, '');
	const upperCaseCity = cleanedCity.toUpperCase();
	event.target.value = upperCaseCity;
	data.value.address.city.value = upperCaseCity;
};

const trimCity = (event) => {
	const removeSpace = event.target.value.replace(/\s+/g, ' ');
	const trimmedCity = removeSpace.trim();
	event.target.value = trimmedCity;
	data.value.address.city.value = trimmedCity;

	if (trimmedCity === '') {
		data.value.address.city.error = true;
	} else {
		data.value.address.city.error = false;

	}
};

const formatCounty = (event) => {
	const cleanedCounty = event.target.value.replace(/[^a-zA-Z\s]/g, '');
	const upperCaseCounty = cleanedCounty.toUpperCase();
	event.target.value = upperCaseCounty;
	data.value.address.county.value = upperCaseCounty;
};

const trimCounty = (event) => {
	const removeSpace = event.target.value.replace(/\s+/g, ' ');
	const trimmedCounty = removeSpace.trim();
	event.target.value = trimmedCounty;
	data.value.address.county.value = trimmedCounty;
};

const formatZipCode = (event) => {
	const cleanedZipCode = event.target.value.replace(/\D/g, '');
	const limitedZipCode = cleanedZipCode.slice(0, 5);
	event.target.value = limitedZipCode;
	data.value.address.zipcode.value = limitedZipCode;
	
	if (limitedZipCode.length !== 5) {
		data.value.address.zipcode.error = true;
	} else {
		data.value.address.zipcode.error = false;
	}
};

const formatEmail = (event) => {
    const trimmedEmail = event.target.value.trim();
    const upperCaseEmail = trimmedEmail.toUpperCase();
	event.target.value = upperCaseEmail;
	data.value.email.value = upperCaseEmail;
};

function calcAge(e) {
	formatDate(e.target.value)
	const now: Date = new Date();
	const dobCalc: Date = new Date(data.value.dob.value);
	let ageCalc: number = now.getFullYear() - dobCalc.getFullYear();
	const monthNow: number = now.getMonth() + 1;
	const monthDOB: number = dobCalc.getMonth() + 1;

	// Restar un año si el mes actual es anterior al mes de cumpleaños
	if (monthNow < monthDOB || (monthNow === monthDOB && now.getDate() < dobCalc.getDate())) {
		ageCalc--;
	}

	data.value.age.value = String(ageCalc)
	if (e.target.value === '') {
		data.value.age.error = true
	} else {
		data.value.age.error = false
	}
};

function isValidDateFormat(dateStr) {
	const regex = /^(0?[1-9]|1[0-2])[\/-](0?[1-9]|[12][0-9]|3[01])[\/-]\d{4}$|^((ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)\s|((Ene|Feb|Mar|Abr|May|Jun|Jul|Ago|Sep|Oct|Nov|Dic)\s)|((ene.|feb.|mar.|abr.|may.|jun.|jul.|ago.|sep.|oct.|nov.|dic.)\s)|((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s))([1-9]|[12][0-9]|3[01])\s\d{4}$/i;
	return regex.test(dateStr);
};

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
};
</script>