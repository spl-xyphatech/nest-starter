export class Category {
  id: number;
  code: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
