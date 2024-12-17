export interface fileInterFace {
  profile: string;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  filename: string;
  size: number;
}

export interface DialogOptions {
  cancelText?: string;
  okText?: string;
  title?: string;
  body?: string;
  actionType?: string;
}
