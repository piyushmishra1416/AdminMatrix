// import * as React from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchAppBar from "../components/SearchBar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { Grid, Pagination } from "@mui/material";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Dashboard() {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerClassName: "column-title",
    },
    {
      field: "name",
      headerName: " Name",
      width: 300,
      headerClassName: "column-title",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 500,
      headerClassName: "column-title",
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      headerClassName: "column-title",
      width: 200,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id as number)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id as number)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id as number)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id as number)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  const [data, setData] = useState<UserData[]>([]);
  const [filteredData, setFilteredData] = useState<UserData[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const pageSize = 10; // Set the number of rows per page
  const [currentPage, setCurrentPage] = useState(1);

  // ... (previous useEffect)

  const handleEditClick = (id: number) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: number) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: number) => () => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    setFilteredData(updatedData);
  };

  const handleCancelClick = (id: number) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setData(response);
        setFilteredData(response);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  const handleSearch = (query: string) => {
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate the start and end index of the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filter the data based on the current page
  const currentPageData = filteredData.slice(startIndex, endIndex);

  console.log(data);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <SearchAppBar onSearch={handleSearch} />
      <DataGrid
        rows={currentPageData}
        columns={columns}
        rowModesModel={rowModesModel}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
     <Grid container justifyContent="center">
        <Pagination
          count={Math.ceil(filteredData.length / pageSize)}
          page={currentPage}
          onChange={(_event, page) => handlePageChange(page)}
          showFirstButton
          showLastButton
          sx={{ '& .MuiPaginationItem-root': { fontSize: '1.2rem' } }} 
        />
      </Grid>
    </div>
  );
}
