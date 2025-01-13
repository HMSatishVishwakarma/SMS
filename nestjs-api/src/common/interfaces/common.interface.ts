export interface fileInterFace {
  profile: string;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  filename: string;
  size: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationResponse<T> {
  data: T[];
  totalCount: number;
}

interface Header {
  name: string;
  visible: boolean;
  select?: string;
  search?: boolean;
}

interface ActionList {
  edit: boolean;
  delete: boolean;
  status: boolean;
}

export interface Setting {
  name: string;
  headers: Header[];
  actionList: ActionList;
  pageLimit: number;
}
