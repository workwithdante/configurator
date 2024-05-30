<template>
    <Dialog v-model="visible" @close="setVisible">
        <template #body-title>
            <h3 v-if="row.id === 0">New HelpDesk</h3>
            <h3 v-if="row.id !== 0">Edit HelpDesk</h3>
        </template>
        <template #body-content>
            <div class="m-3 flex flex-row items-center justify-center">
                <div class="m-auto grid grid-cols-3 gap-1">
                    <div class="col-span-1">
                        <FormControl
                            @change="(e) => { if(e.target.value !== '') { subjectValidate = true } else { subjectValidate = false } }"
                            type="select" 
                            :options="[
                                {
                                    label: 'Dating',
                                    value: 'Dating'
                                },
                                {
                                    label: 'Listing',
                                    value: 'Listing'
                                },
                                {
                                    label: 'Customer',
                                    value: 'Customer'
                                },
                                {
                                    label: 'Life Change',
                                    value: 'Life Change'
                                },
                                {
                                    label: 'Campaign Problem',
                                    value: 'Campaign Problem'                                
                                },
                                {
                                    label: 'Payment',
                                    value: 'Payment'                                
                                },
                                {
                                    label: 'Payment Problem',
                                    value: 'Payment Problem'                                
                                },
                                {
                                    label: 'Billing',
                                    value: 'Billing'                                
                                },
                                {
                                    label: 'Documents',
                                    value: 'Documents'                                
                                }
                            ]"
                            size="sm"
                            variant="subtle"
                            placeholder="Select"
                            :disabled="false"
                            label="Subject"
                            v-model="row.subject.label"
                        />
                        <ErrorMessage v-if="!subjectValidate" :message="'* Empty'" class="mx-2" />
                    </div>
                    <div class="col-span-1">
                        <FormControl
                            @change="(e) => { if(e.target.value !== '') { assignValidate = true} else { assignValidate = false} }"
                            type="select" 
                            :options="[
                                {
                                    label: 'Doña Yoly',
                                    value: 'Doña Yoly'
                                },
                                {
                                    label: 'Margarita Mesa',
                                    value: 'Margarita Mesa'
                                },
                                {
                                    label: 'Carolina Gomez',
                                    value: 'Carolina Gomez'
                                },
                                {
                                    label: 'Valentina Carvajal',
                                    value: 'Valentina Carvajal'
                                },
                                {
                                    label: 'Notificación',
                                    value: 'Notificación'
                                }
                            ]"
                            size="sm"
                            variant="subtle"
                            placeholder="Select"
                            :disabled="false"
                            label="Assign"
                            v-model="row.assign.label"
                        />
                        <ErrorMessage v-if="!assignValidate" :message="'* Assign Empty'" class="mx-2" />
                    </div>
                    <div class="col-span-1">
                        <FormControl
                            @change="(e) => { if(e.target.value !== '') { statusValidate = true} else { statusValidate = false} }"
                            type="select" 
                            :options="[
                                {
                                    label: 'Open',
                                    value: 'Open'
                                },
                                {
                                    label: 'In progress',
                                    value: 'In progress'
                                },
                                {
                                    label: 'Waiting for response',
                                    value: 'Waiting for response'
                                },
                                {
                                    label: 'Red Flag',
                                    value: 'Red Flag'
                                },
                                {
                                    label: 'Closed',
                                    value: 'Closed'
                                }
                            ]"
                            size="sm"
                            variant="subtle"
                            placeholder="Select"
                            :disabled="false"
                            label="Status"
                            v-model="row.status"
                        />
                        <ErrorMessage v-if="!statusValidate" :message="'* Status Empty'" class="mx-2" />
                    </div>
                    <div class="col-span-3">
                        <FormControl
                            @input="(e) => { if(e.target.value !== '') { titleValidate = true} else { titleValidate = false} }"
                            required
                            :type="'text'"
                            size="sm"
                            variant="subtle"
                            :disabled="false"
                            label="Title"
                            v-model="row.title" />
                        <ErrorMessage v-if="!titleValidate" :message="'* Title Empty'" class="mx-2" />
                    </div>
                    <div class="col-span-3">
                        <FormControl
                            @input="(e) => { if(e.target.value !== '') { descriptionValidate = true} else { descriptionValidate = false} }"
                            required
                            :type="'textarea'"
                            size="sm"
                            variant="subtle"
                            :disabled="false"
                            label="Description"
                            v-model="row.description" />
                        <ErrorMessage v-if="!descriptionValidate" :message="'* Description Empty'" class="mx-2" />
                    </div>
                </div>
            </div>
        </template>
        <template #actions>
            <div class="flex flex-row items-center justify-center">
                <Button variant="solid" @click="saveHelpDesk">
                    Save
                </Button>
            </div>	
        </template>
    </Dialog>
</template>
<script setup lang="ts">
    import { Dialog, FormControl, ErrorMessage } from 'frappe-ui'
    import { ref } from 'vue'

    function setVisible() {
        visible.value = false;
        subjectValidate.value = true;
        assignValidate.value = true;
        titleValidate.value = true;
        statusValidate.value = true;
        descriptionValidate.value = true;
    }

    let row = defineModel<Row>("row", { default: {} });
    const visible = defineModel<boolean>("visible", {
        default: false,
        required: true
    })
    let rowsRef = defineModel<Array<Row>>("rowsRef", 
        { 
            default: []
        }
    )

    const emit = defineEmits(['showToast'])

    const subjectValidate = ref(true);
    const assignValidate = ref(true);
    const statusValidate = ref(true);
    const titleValidate = ref(true);
    const descriptionValidate = ref(true);

    interface Row {
        id: number;
        subject: {
            label: string,
            bg_color: string
        };
        title: string
        assign: {
            label: string,
            color: string
        };
        status: string;
        description: string;
    }

    function saveHelpDesk() {
        if(validate(row.value)) {
            row.value.id = rowsRef.value.length + 1;
            row.value.subject.bg_color = row.value.subject.label == 'Yes' ? 'bg-green-600' : 'bg-red-600';
            row.value.assign.color = row.value.assign.label == 'Yes' ? 'red' : 'green'
            rowsRef.value.push({
                ...row.value,
                subject: { ...row.value.subject },
                assign: { ...row.value.assign },
            });
            visible.value = false
        }
	}

    function validate(row: Row): boolean {
        if(row.subject.label !== '') subjectValidate.value = true
        else subjectValidate.value = false

        if(row.assign.label !== '') assignValidate.value = true
        else assignValidate.value = false

        if(row.title !== '') titleValidate.value = true
        else titleValidate.value = false

        if(row.status !== '') statusValidate.value = true
        else statusValidate.value = false

        if(row.description !== '') descriptionValidate.value = true
        else descriptionValidate.value = false
        
        if(
            !subjectValidate.value ||
            !assignValidate.value ||
            !titleValidate.value ||
            !statusValidate.value ||
            !descriptionValidate.value
        ) {
            emit('showToast', 'Fill All Fields')
            return false
        } else {
            return true
        }
        
    }

</script>