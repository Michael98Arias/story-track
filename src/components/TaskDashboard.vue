<template>
    <q-page>
        <div class="q-gutter-md row">
            <TaskColumn :title="Status.ToDo" :tasks="toDoTasks" />
            <TaskColumn :title="Status.InProgress" :tasks="inProgressTasks" />
            <TaskColumn :title="Status.Done" :tasks="doneTasks" />
            <TaskColumn :title="Status.InReview" :tasks="inReviewTasks" />
            <TaskColumn :title="Status.Blocked" :tasks="blockedTasks" />
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { useTasks } from 'src/composables/useTasks';
import TaskColumn from 'src/components/TaskColumn.vue';
import { onMounted } from 'vue';
import { Status } from 'src/enums/status.enum';

const { taskList, toDoTasks, inProgressTasks, doneTasks, inReviewTasks, blockedTasks } = useTasks();

onMounted(() => {
    void taskList();
});
</script>


<style lang="scss" src="../css/TaskDashboard.scss" scoped />
