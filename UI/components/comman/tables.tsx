import React from 'react';
import { Table } from 'react-bootstrap'; // Assuming you're using Bootstrap Table component

// Define dynamic headers with TypeScript interface

const DynamicTableExample: React.FC<DynamicTableProps> = ({
  headers,
  dataWithCellStyles,
}) => {
  const renderCell = (cellData: {
    value: string | number;
    components?: JSX.Element[];
    styles?: React.CSSProperties;
  }) => {
    if (cellData.components && cellData.components.length > 0) {
      return (
        <React.Fragment>
          {cellData.components.map((component, index) => (
            <span key={index} className="mr-2">
              {component}
            </span>
          ))}
        </React.Fragment>
      );
    }
    return cellData.value;
  };

  return (
    <div>
      <h2>Dynamic Table Example</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} style={header.styles}>
                {header.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataWithCellStyles.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <td key={cellIndex}>{renderCell(row[header.dataField])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DynamicTableExample;
