interface Header {
  text: string;
  dataField: string;
  styles?: React.CSSProperties;
}

// Define dynamic data with TypeScript interface
interface DataRow {
  [key: string]: {
    value: string | number;
    components?: JSX.Element[];
    styles?: React.CSSProperties;
  };
}

// Props interface for DynamicTableExample component
interface DynamicTableProps {
  headers: Header[];
  dataWithCellStyles: DataRow[];
}

export interface DialogOptions {
  cancelText?: string;
  okText?: string;
  title?: string;
  body?: any;
  actionType?: string;
  showFooter?: boolean;
}

export interface apiResponseType {
  data: [];
  totalCount: number;
}

export interface ModelProps {
  okText?: string; // Button text
  title?: string; // Modal title
  body?: React.ReactNode; // Content of the modal body (which can be a component)
  actionType?: string; // Action type, e.g., 'addSubject'
  showFooter?: boolean;
}
