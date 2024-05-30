<template>
    <NewDependent
        v-model:rowIndex="rowIndex"
        v-model:visible="visible"
        v-model:rowsRef="rowsRef"
        @show-toast="(message) => $emit('showToast', message)" />
    <ListView
        class="h-auto min-h-32"
        :columns="custom_columns"
        :rows="rowsRef"
        :options="{
            onRowClick: onRowClick,
            selectable: state.selectable,
            showTooltip: state.showTooltip,
            resizeColumn: state.resizeColumn,
        }"
        row-key="id"
    >
        <ListHeader>
            <ListHeaderItem
                v-for="column in custom_columns"
                :key="column.key"
                :item="column"
            >
                <template #prefix="{ item }">
                <FeatherIcon :name="item.icon" class="h-4 w-4" />
                </template>
            </ListHeaderItem>
        </ListHeader>
        <ListRows>
            <ListRow
                v-for="row in rowsRef"
                :key="row.id"
                v-slot="{ column, item }"
                :row="{
                        id: row.id,
                        age: row.age.value,
                        coverage: row.coverage,
                        dob: row.dob.value,
                        document: row.document.value,
                        firstname: row.firstname.value,
                        lastname: row.lastname.value,
                        smoke: row.smoke,
                        gender: row.gender.value,
                        ssn: row.ssn.value,
                        relationship: row.relationship.value,
                }"
            >
                <ListRowItem :item="item" :align="column.align">
                <template #prefix>
                    <div
                        v-if="column.key == 'coverage'"
                        class="h-3 w-3 rounded-full"
                        :class="item.bg_color"
                    />
                </template>
                <Badge
                    v-if="column.key == 'smoke'"
                    variant="subtle"
                    :theme="item.color"
                    size="md"
                    :label="item.value"
                />
                </ListRowItem>
            </ListRow>
        </ListRows>
        <ListSelectBanner>
            <template #actions="{ unselectAll, selections }">
                <div class="flex gap-2">
                <Button variant="ghost" label="Delete" @click="() => deleteSelect(selections, unselectAll)" />
                <Button
                    variant="ghost"
                    label="Unselect all"
                    @click="unselectAll"
                />
                </div>
            </template>
        </ListSelectBanner>
    </ListView>
</template>
<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import { DependentI } from '../person.interface' 
    import {
        Badge,
        FeatherIcon,
        ListHeader,
        ListHeaderItem,
        ListRow,
        ListRowItem,
        ListRows,
        ListSelectBanner,
        ListView
    } from 'frappe-ui'
    import NewDependent from './NewDependent.vue';

    const emit = defineEmits(['showToast'])
    const visible = defineModel<boolean>("visible", {
        default: false,
        required: true
    })

    let rowsRef = defineModel<DependentI[]>("rowsRef", 
        { 
            default: []
        }
    )

    let rowIndex = defineModel<number>("rowIndex", {
        default: 0
    });

    function onRowClick(rowSelect) {
        rowIndex.value = rowSelect.id
        visible.value = true
    }

    function deleteSelect(selections:  any, unselectAll: any) {
        const selectionsArray = [...selections];
        const rows = rowsRef.value;
        for(const selection of selectionsArray) {
            const indexToRemove = rows.findIndex(row => row.id === selection);
            if (indexToRemove !== -1) {
                rows.splice(indexToRemove, 1);
            }
        }
        unselectAll()
    }

    const state = reactive({
        selectable: true,
        showTooltip: false,
        resizeColumn: false
    })

    const custom_columns = reactive([
        {
            label: 'Age',
            key: 'age',
            icon: 'user',
            width: '80px',
        },
        {
            label: 'First Name',
            key: 'firstname',
            icon: 'user'
        },
        {
            label: 'Last Name',
            key: 'lastname',
            icon: 'user'
        },
        {
            label: 'Date of Birth',
            key: 'dob',
            icon: 'calendar',
            width: '130px',
        },
        {
            label: 'Gender',
            key: 'gender',
            icon: 'triangle',
            width: '100px',
        },
        {
            label: 'SSN',
            key: 'ssn',
            icon: 'clipboard',
            width: '120px',
        },
        {
            label: 'Coverage',
            key: 'coverage',
            icon: 'users',
            width: '100px',
        },
        {
            label: 'Document',
            key: 'document',
            icon: 'map',
            width: '120px',
        },
        {
            label: 'Smoke',
            key: 'smoke',
            icon: 'check-circle',
            width: '90px',
        },
        {
            label: 'Relationship',
            key: 'relationship',
            icon: 'activity',
            width: '130px',
        }
    ])
</script>