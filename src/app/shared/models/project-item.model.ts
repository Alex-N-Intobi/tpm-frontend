export interface ProjectItem {
  id: number;
  projectId: number;
  name: string;
  description: string;
  type: string;
  status: string;
  priority: string;
  deliveryDate: Date;
  assignedUserId: number;
  timestamp: string;
  createdDate: Date;
}
