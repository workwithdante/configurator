<template>
    <NewHelpDesk
        :row="row"
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
            :row="row"
        >
            <ListRowItem :item="item" :align="column.align">
            <template #prefix>
                <div
                v-if="column.key == 'applies'"
                class="h-3 w-3 rounded-full"
                :class="item.bg_color"
                />
            </template>
            <Badge
                v-if="column.key == 'smoke'"
                variant="subtle"
                :theme="item.color"
                size="md"
                :label="item.label"
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
    import { reactive } from 'vue'
    import NewHelpDesk from './NewHelpDesk.vue';
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

    const emit = defineEmits(['showToast'])
    interface Row {
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
    let row = defineModel<Row>("row", 
        { 
            default: {
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
            }
        }
    )
    function onRowClick(rowSelect) {
        row.value = rowSelect
        visible.value = true
        console.log(rowSelect)
    }
    const custom_columns = reactive([
        {
            label: 'Subject',
            key: 'subject',
            icon: 'user'
        },
        {
            label: 'Assign to',
            key: 'assign',
            icon: 'user'
        },
        {
            label: 'Status',
            key: 'status',
            icon: 'user'
        },
        {
            label: 'Title',
            key: 'title',
            icon: 'user',
            width: 4,
        },
    ])

    const state = reactive({
        selectable: true,
        showTooltip: true,
        resizeColumn: true
    })
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
    const visible = defineModel<boolean>("visible", {
        default: false,
        required: true
    })

    let rowsRef = defineModel<Array<Row>>("rowsRef", 
        { 
            default: []
        }
    )

</script>