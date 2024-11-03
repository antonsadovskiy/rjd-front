import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridSortModel,
} from '@mui/x-data-grid';

type TablePropsType = {
  rows: GridRowsProp;
  columns: GridColDef[];
  setSelectedRow: (id: number) => void;
  minWidth?: number;
  sortModel?: GridSortModel;
  setSortModel?: (newSortModel: GridSortModel) => void;
};

export const Table = ({
  rows,
  columns,
  setSelectedRow,
  minWidth,
  sortModel,
  setSortModel,
}: TablePropsType) => {
  return (
    <DataGrid
      density={'compact'}
      sx={{ minWidth, width: '100%' }}
      rows={rows}
      columns={columns}
      checkboxSelection
      sortModel={sortModel}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10, 25, 50, 100]}
      onSortModelChange={setSortModel}
      disableMultipleRowSelection={true}
      onRowSelectionModelChange={(ids) => {
        const id = ids[0] as number;
        setSelectedRow(id);
      }}
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
