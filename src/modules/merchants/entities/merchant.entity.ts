export class Merchant {
  id: number;
  userId: number;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  status: string;
  rejectedReason?: string;
  approvedAt?: Date;
  approvedBy?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
