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
}
