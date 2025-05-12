import { useQuasar } from 'quasar';
import { Status } from 'src/enums/status.enum';
import type { TaskData } from 'src/interfaces/task.interface';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import TaskService from '../services/task.service';
import type { IHttpError } from 'src/interfaces/http.interface';

export function useTasks() {
  const $q = useQuasar();
  const { t } = useI18n();
  const tasks = ref<TaskData[]>([]);

  const toDoTasks = ref<TaskData[]>([]);
  const inProgressTasks = ref<TaskData[]>([]);
  const doneTasks = ref<TaskData[]>([]);
  const inReviewTasks = ref<TaskData[]>([]);
  const blockedTasks = ref<TaskData[]>([]);

  async function taskList() {
    $q.loading.show({ message: t('globalMessages.wait') });

    try {
      const tasksResponse = await TaskService.taskListS();

      tasks.value = tasksResponse as unknown as TaskData[];
    } catch (err) {
      if (err instanceof Error) {
        const httpError = err as unknown as IHttpError;
        if (httpError.statusCode === 401) {
          $q.notify({
            type: 'negative',
            message: t('mainLayout.task.messages.errorTaskData'),
            actions: [
              {
                icon: 'close',
                color: 'white',
                round: true,
              },
            ],
          });
        } else {
          $q.notify({
            type: 'negative',
            message: t('mainLayout.task.messages.errorGeneric'),
            actions: [
              {
                icon: 'close',
                color: 'white',
                round: true,
              },
            ],
          });
        }
      } else {
        $q.notify({
          type: 'negative',
          message: t('mainLayout.task.messages.errorGeneric'),
          actions: [
            {
              icon: 'close',
              color: 'white',
              round: true,
            },
          ],
        });
      }
    } finally {
      $q.loading.hide();
    }
  }

  watch(
    () => tasks.value,
    (newTasks) => {
      toDoTasks.value = newTasks.filter((task) => task.status === Status.ToDo);
      inProgressTasks.value = newTasks.filter((task) => task.status === Status.InProgress);
      doneTasks.value = newTasks.filter((task) => task.status === Status.Done);
      inReviewTasks.value = newTasks.filter((task) => task.status === Status.InReview);
      blockedTasks.value = newTasks.filter((task) => task.status === Status.Blocked);
    },
    { immediate: true },
  );

  return {
    tasks,
    toDoTasks,
    inProgressTasks,
    doneTasks,
    inReviewTasks,
    blockedTasks,
    taskList,
  };
}
