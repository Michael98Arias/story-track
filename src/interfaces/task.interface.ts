import type { Priority } from 'src/enums/priority.enum';
import type { Status } from 'src/enums/status.enum';

export interface TaskData {
  id: number;
  title: string;
  status: Status;
  dueDate: string;
  priority: Priority;
  createdAt?: string;
  assignedTo: string;
  department: string;
  description: string;
  storyPoints: number;
  companyLogos: string;
}
