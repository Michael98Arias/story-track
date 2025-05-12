<template>
    <q-card>
        <q-card-section :class="columnClass">
            <q-icon :name="icon" class="q-mr-sm" size="20px" />
            <span>{{ title }}</span>
        </q-card-section>
        <q-card v-for="task in tasks" :key="task.id" class="q-mb-xs">
            <q-card-section>
                <q-avatar>
                    <img :src="task.companyLogos" alt="Company logo" />
                </q-avatar>
                <div class="text-h6">{{ task.title }}</div>
                <div class="text-caption">{{ task.assignedTo }} | {{ task.dueDate }}</div>
                <div>{{ task.description }}</div>
            </q-card-section>
            <q-separator></q-separator>
        </q-card>
    </q-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Status } from 'src/enums/status.enum';
import type { TaskData } from 'src/interfaces/task.interface';

const props = defineProps<{
    title: Status;
    tasks: TaskData[];
}>();

const iconMap = {
    [Status.ToDo]: 'checklist',
    [Status.InProgress]: 'autorenew',
    [Status.Done]: 'check_circle',
    [Status.InReview]: 'visibility',
    [Status.Blocked]: 'do_not_disturb',
};

const colorMap = {
    [Status.ToDo]: 'blue',
    [Status.InProgress]: 'amber',
    [Status.Done]: 'green',
    [Status.InReview]: 'orange',
    [Status.Blocked]: 'red',
};

const icon = iconMap[props.title];
const columnClass = `bg-${colorMap[props.title]}-5 text-white q-pa-xs q-mb-sm`;
</script>

<style lang="scss" src="../css/TaskColumn.scss" scoped />
