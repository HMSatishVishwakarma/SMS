export interface DataItem {
  createdAt?: string;
  description?: string;
  name: string;
  status?: number;
  updatedAt?: string;
  _id: string;
}

export interface Option {
  name: string;
  id: string;
}

export interface FormValues {
  className: string;
  status: number;
  subjects: Option[];
  createdAt: Date;
  updatedAt: Date;
}
