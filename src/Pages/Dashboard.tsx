// import * as React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchAppBar from '../components/SearchBar';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Dashboard() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 , headerClassName: 'column-title',  },
    { field: 'name', headerName: ' Name', width: 300,  headerClassName: 'column-title', editable: true },
    { field: 'email', headerName: 'Email', width: 500, headerClassName: 'column-title',editable: true  },
    {
      field: 'role',
      headerName: 'Role',
      headerClassName: 'column-title', 
      width: 200,
      editable: true
    },
    {
      field: 'actions',
      headerName: 'Actions',
      headerClassName: 'column-title', 
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <button onClick={() => handleEdit(params.row.id)}>Edit</button>
          <button onClick={() => handleDelete(params.row.id)}>Delete</button>
        </div>
      ),
    },
  ];
  const [data, setData] = useState<UserData[]>([]);
  const [filteredData, setFilteredData] = useState<UserData[]>([]);
  // const [searchQuery, setSearchQuery] = useState<string>('');

useEffect(()=>{
   const fetchData = async() =>{
      // setLoading(true); 
      try{
         const{data: response} = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
         setData(response);
         setFilteredData(response);
      }catch (error: any) {
         console.log(error.message);
      }
      // setLoading(false);
   }
   fetchData();
},[]);
const handleEdit = (id: number) => {
  
  console.log(`Edit clicked for ID: ${id}`);
};

const handleDelete = (id: number) => {
  // Handle delete action, e.g., show a confirmation dialog and delete the item
  const updatedData = data.filter(item => item.id !== id);
  setData(updatedData);
  console.log(`Delete clicked for ID: ${id}`);
};

const handleSearch = (query: string) => {
  const filtered =data.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(query.toLowerCase())
    )
  );
  setFilteredData(filtered);
};


console.log(data);
  return (
    <div style={{ height: '100%', width: '100%' }}>
     <SearchAppBar onSearch={handleSearch} />
      <DataGrid
         rows={filteredData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection

      />
    </div>
  );
}