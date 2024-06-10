<template>
    <Card class="m-4">
        <div class="flex justify-end">
            <div class="mx-8 flex justify-between">
                <div class="flex-end">
                    <Button
                        :letiant="'outline'"
                        theme="gray"
                        @click="initialDependent"
                        v-if="state.index === 1"
                        class="m-2">New Dependent</Button>
                </div>
                <div class="flex-end">
                    <Button
                        :letiant="'outline'"
                        theme="gray"
                        @click="resetRowHelpDeskValues"
                        v-if="state2.index === 2"
                        class="m-2">New HelpDesk</Button>
                </div>
            </div>
            <div class="flex-end">
                <FormControl
                    @change="(e) => formatDate(e.target.value)"
                    required
                    :type="'text'"
                    size="sm"
                    letiant="subtle"
                    :disabled="false"
                    label="Sell Date"
                    v-model="basicInfo.selldate.value" />
            </div>
        </div>
        <Tabs v-model="state.index" :tabs="state.tabs_with_icon">
            <div class="col-span-12" v-if="state.index === 0">
                <Owner v-model:data="basicInfo"/>
            </div>
            <div class="col-span-12" v-if="state.index === 1">
                <Dependent
                    v-model:visible="visibleDependent"
                    v-model:row-index="rowIndex"
                    v-model:rows-ref="rowsDependentRef"
                    @show-toast="(message) => $emit('showToast', message)"/>
            </div>
        </Tabs>
        <Tabs v-model="state2.index" :tabs="state2.tabs_with_icon">
            <div class="col-span-12" v-if="state2.index === 0">
                <Pay
                    v-model:family="family"
                    :data="payInfo"
                    :fullname="fullnameCalc"
                    :fulladdress="fulladdressCalc"
                    :authorization="basicInfo.statusSell"
                    />
            </div>
            <div class="col-span-12" v-if="state2.index === 1">
                <Sell v-model:data="sellInfo"/>
            </div>
            <div class="col-span-12" v-if="state2.index === 2">
                <HelpDesk
                    :row="rowHelpDesk"
                    v-model:visible="visibleHelpDesk"
                    v-model:rowsRef="rowsHelpDeskRef"
                    @show-toast="(message) => emit('showToast', message)" />
            </div>
        </Tabs>
    </Card>
</template>

<script lang="ts" setup>
    import { computed, h, ModelRef, reactive, ref, Ref, watch } from 'vue'
    import {Card, Tabs, FeatherIcon, FormControl } from 'frappe-ui'
    import Owner from './Family/Owner.vue';
	import Dependent from './Family/Dependent/Dependent.vue';
    import Pay from './Additional/Pay.vue';
    import Sell from './Additional/Sell.vue';
    import HelpDesk from './Additional/HelpDesk/HelpDesk.vue';
    import { DependentI, OwnerI } from './Family/person.interface';
    import { pay } from './Additional/pay.interface';
    import { sell } from './Additional/sell.interface';

    const visibleDependent: Ref<boolean> = ref(false)
    const visibleHelpDesk: Ref<boolean> = ref(false)

    function initialDependent() {
        visibleDependent.value = true
        rowIndex.value = 0
    }

    const emit = defineEmits(['showToast'])
    let rowIndex = ref(0);
    const family: ModelRef<string> = defineModel('family', {
        default: '1X1'
    })

    const basicInfo: ModelRef<OwnerI | undefined> = defineModel('basicInfo')

    const sellInfo: ModelRef<sell | undefined> = defineModel("sellInfo")

    const payInfo: ModelRef<pay | undefined> = defineModel('payInfo')

    const fullnameCalc = computed({
        get() {
            return `${basicInfo.value?.firstname.value} ${basicInfo.value?.lastname.value}`;
        },
        set(value) {
            if(payInfo.value) {
                payInfo.value.ownerPay.value = value
            }
        }
    })
    
    const fulladdressCalc = computed({
        get() {
            if(basicInfo.value && (basicInfo.value.address.address.value || basicInfo.value.address.city.value || basicInfo.value.address.state.value || basicInfo.value.address.zipcode.value)) {
                if(basicInfo.value.address.optional.value && Number(basicInfo.value.address.optional.value) > 0) {
                    return `${basicInfo.value.address.address.value} #${basicInfo.value.address.optional.value}, ${basicInfo.value.address.city.value}, ${basicInfo.value.address.state.value}, ${basicInfo.value.address.zipcode.value}`
                } else {
                    return `${basicInfo.value.address.address.value}, ${basicInfo.value.address.city.value}, ${basicInfo.value.address.state.value}, ${basicInfo.value.address.zipcode.value}`
                }
            } else {
                return ''
            }
        },
        set(value) {
            if(payInfo.value) {
                payInfo.value.addressPay.value = value
            }
        }
    })


    function resetRowHelpDeskValues() {
        rowHelpDesk.value.id = 0;
        rowHelpDesk.value.status = '';
        rowHelpDesk.value.title = '';
        rowHelpDesk.value.description = '';
        rowHelpDesk.value.assign.label = '';
        rowHelpDesk.value.assign.color = '';
        rowHelpDesk.value.subject.label = '';
        rowHelpDesk.value.subject.bg_color = '';
        rowHelpDesk.value = {...rowHelpDesk.value};
        visibleHelpDesk.value = true;
    }

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

    const rowsDependentRef: ModelRef<DependentI[]> = defineModel('rowsDependentRef', {
        default: []
    });

    const rowsHelpDeskRef: ModelRef<RowHelpDesk[]> = defineModel('rowsHelpDeskRef', {
        default: []
    });
    const rowHelpDesk: Ref<RowHelpDesk> = ref({
        id: 0,
        subject: {
            label: '',
            bg_color: ''
        },
        assign: {
            label: '',
            color: ''
        },
        title: '',
        status: '',
        description: ''
    })

    const state = reactive({
        index: 0,
        tabs_with_icon: [
            {
                label: 'Owner',
                content:
                    'Github is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.',
                icon: h(FeatherIcon, { class: 'w-4 h-4', name: 'user' }),
            },
            {
                label: 'Dependent',
                content:
                    'Twitter is an American microblogging and social networking service on which users post and interact with messages known as "tweets".',
                icon: h(FeatherIcon, { class: 'w-4 h-4', name: 'users' }),
            }
        ],
    })

    const state2 = reactive({
        index: 0,
        tabs_with_icon: [
            {
                label: 'Pay',
                content:
                    'Github is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.',
                icon: h(FeatherIcon, { class: 'w-4 h-4', name: 'dollar-sign' }),
            },
            {
                label: 'Sell',
                content:
                    'Twitter is an American microblogging and social networking service on which users post and interact with messages known as "tweets".',
                icon: h(FeatherIcon, { class: 'w-4 h-4', name: 'info' }),
            },
            {
                label: 'HelpDesk',
                content:
                    'Twitter is an American microblogging and social networking service on which users post and interact with messages known as "tweets".',
                icon: h(FeatherIcon, { class: 'w-4 h-4', name: 'edit-3' }),
            }
        ],
    })

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
                if(basicInfo.value) basicInfo.value.selldate.value = formattedDate
            } else {
                if(basicInfo.value) basicInfo.value.selldate.value = ''
            }
        } else {
            if(basicInfo.value) basicInfo.value.selldate.value = ''
        }
    }

</script>