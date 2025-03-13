import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";
import { CatalogData } from "./CatalogData";

export default function CategoriesTable() {
  const [rows, setRows] = React.useState(CatalogData);
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Kategoriler");
    XLSX.writeFile(workbook, "categories.xlsx");
  };
  const handleSave = (id) => {
    const row = rows.find((row) => row.id === id);
    console.log("Kaydedilen Satır:", row);
    alert(`"${row.Name}" başarıyla kaydedildi!`);
  };

  const handleDelete = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", type: "number", width: 80 },
    { field: "Name", headerName: "Ad", editable: true, flex: 1 },
    {
      field: "Published",
      headerName: "Yayınlandı",
      type: "boolean",
      editable: true,
      width: 120,
    },
    {
      field: "DisplayOrder",
      headerName: "Görüntüleme Sırası",
      type: "number",
      editable: true,
      width: 150,
    },
    {
      field: "save",
      headerName: "Kaydet",
      width: 100,
      renderCell: (params) => (
        <SaveIcon
          onClick={() => handleSave(params.id)}
          style={{ cursor: "pointer" }}
        />
      ),
    },
    {
      field: "delete",
      headerName: "Sil",
      width: 100,
      renderCell: (params) => (
        <DeleteIcon
          onClick={() => handleDelete(params.id)}
          style={{ cursor: "pointer" }}
        />
      ),
    },
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
      <Button
        variant="text"
        color="primary"
        startIcon={<FileDownloadIcon />}
        onClick={handleExportToExcel}
      >
        Excel'e Aktar
      </Button>
    </GridToolbarContainer>
  );

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={(newRow, oldRow) => {
          setRows((prevRows) =>
            prevRows.map((row) => (row.id === newRow.id ? newRow : row))
          );
          return newRow;
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        slots={{ toolbar: CustomToolbar }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
