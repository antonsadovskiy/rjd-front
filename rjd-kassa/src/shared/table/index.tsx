import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRowsProp,
} from '@mui/x-data-grid';

type TablePropsType = {
  rows: GridRowsProp;
  columns: GridColDef[];
  setSelectedRow: (id: number) => void;
  setPaginationModel: (newPaginationModel: GridPaginationModel) => void;
  page: number;
  perPage: number;
};

export const Table = ({
  rows,
  columns,
  setSelectedRow,
  perPage,
  page,
  setPaginationModel,
}: TablePropsType) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      checkboxSelection
      pageSizeOptions={[10, 25, 50, 100]}
      disableMultipleRowSelection={true}
      onRowSelectionModelChange={(ids) => {
        const id = ids[0] as number;
        setSelectedRow(id);
      }}
      initialState={{
        pagination: { paginationModel: { page, pageSize: perPage } },
      }}
      paginationModel={{ page, pageSize: perPage }}
      onPaginationModelChange={setPaginationModel}
      localeText={{
        footerRowSelected: (count) => `${count} строк выбрано`,
        MuiTablePagination: {
          labelDisplayedRows: ({ from, to, count }) => (
            <span style={{ userSelect: 'none' }}>
              {from} - {to} из {count}
            </span>
          ),
          labelRowsPerPage: <span>Строк на</span>,
        },
      }}
    />
  );
};
