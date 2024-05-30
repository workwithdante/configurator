<template>
    <div class="m-4 flex flex-col space-y-2">
        <div class="grid grid-cols-12 gap-1">
            <div class="col-span-4">
                <FormControl
                    @change="(check) => {if(check) {data.vicidial.error = false; data.polycom.error = false; data.whatsapp.error = false;}}"
                    type="checkbox"
                    size="sm"
                    variant="subtle"
                    :disabled="false"
                    label="Vicidial"
                    v-model="data.vicidial.value"
                />
                <ErrorMessage v-if="data.vicidial.error" :message="'* Check?'" class="mx-2" />
            </div>
            <div class="col-span-4">
                <FormControl
                    @change="(check) => {if(check) {data.vicidial.error = false; data.polycom.error = false; data.whatsapp.error = false;}}"
                    type="checkbox"
                    size="sm"
                    variant="subtle"
                    :disabled="false"
                    label="Polycom"
                    v-model="data.polycom.value"
                />
                <ErrorMessage v-if="data.polycom.error" :message="'* Check?'" class="mx-2" />
            </div>
            <div class="col-span-4">
                <FormControl
                    @change="(check) => {if(check) {data.vicidial.error = false; data.polycom.error = false; data.whatsapp.error = false;}}"
                    type="checkbox"
                    size="sm"
                    variant="subtle"
                    :disabled="false"
                    label="WhatsApp"
                    v-model="data.whatsapp.value"
                />
                <ErrorMessage v-if="data.whatsapp.error" :message="'* Check?'" class="mx-2" />
            </div>
            <div class="col-span-2">
                <FormControl
                    type="text"
                    size="sm"
                    variant="subtle"
                    :disabled="false"
                    label="Extension"
                    v-model="data.extension.value"
                    @input="formatExtension"
                />
                <ErrorMessage v-if="data.extension.error" :message="'* Empty Extension'" class="mx-2" />
            </div>
            <div class="col-start-5 col-span-2">
                <FormControl
                    type="text"
                    size="sm"
                    variant="subtle"
                    :disabled="false"
                    label="Phone"
                    v-model="data.phone.value"
                    @input="formatPhone"
                />
                <ErrorMessage v-if="data.phone.error" :message="'* Empty Phone'" class="mx-2" />
            </div>
            <div class=" col-start-9 col-span-2">
                <FormControl
                    type="text"
                    size="sm"
                    variant="subtle"
                    :disabled="false"
                    label="WhatsApp Number"
                    v-model="data.whatsapp_phone.value"
                    @input="formatWhatsapp"
                />
                <ErrorMessage v-if="data.whatsapp_phone.error" :message="'* WhatsApp Empty'" class="mx-2" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { FormControl, ErrorMessage } from 'frappe-ui';
    import { sell } from './sell.interface';

    const data = defineModel<sell>("data", {
        default: {
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
		}
    })

    const formatExtension = (event) => {
        const inputValueReset = event.target.value.replace(/\D/g, '');
        const limitedChain = inputValueReset.slice(0, 3);
        event.target.value = limitedChain;

        if(event.target.value === '' || event.target.value.length !== 3) { 
            data.value.extension.error = true
        } else { 
            data.value.extension.error = false
        }
	};

    const formatPhone = (event) => {
        const inputValueReset = event.target.value.replace(/\D/g, '');
		const limitedChain = inputValueReset.slice(0, 10);
		const formattedPhoneNumber = formatAsPhoneNumber(limitedChain);
		event.target.value = formattedPhoneNumber;

        if(event.target.value === '' || event.target.value.length !== 14) { 
            data.value.phone.error = true
        } else { 
            data.value.phone.error = false
        }
	};

    const formatWhatsapp = (event) => {
        const inputValueReset = event.target.value.replace(/\D/g, '');
		const limitedChain = inputValueReset.slice(0, 10);
		const formattedPhoneNumber = formatAsPhoneNumber(limitedChain);
		event.target.value = formattedPhoneNumber;

        if(event.target.value === '' || event.target.value.length !== 14) { 
            data.value.whatsapp_phone.error = true
        } else { 
            data.value.whatsapp_phone.error = false
        }
	};

    const formatAsPhoneNumber = (value) => {
	// Aplicar la máscara
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
</script>