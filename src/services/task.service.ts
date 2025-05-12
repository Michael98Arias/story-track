import HttpService from './http.service';
import type { TaskData } from 'src/interfaces/task.interface';

class TaskService {
  async taskListS(): Promise<TaskData> {
    const url = '';
    return await HttpService.getTasks<TaskData>(url);
  }
}
export default new TaskService();
