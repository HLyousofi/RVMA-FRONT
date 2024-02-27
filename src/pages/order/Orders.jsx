import { useState } from "react";
import api  from '../../services/axios-service';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import useAlert from "../../hooks/useAlert";
import { Chip } from "@mui/material";
import formatPrice from "../../utils/utility";
import { useQuery, useMutation, useQueryClient } from "react-query";
import CircularIndeterminate from '../../components/ui/CircularIndeterminate';
import SearchBar from "../../components/SearchBar";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate, Link } from "react-router-dom";
import {
    DataGrid,
    GridActionsCellItem,
    useGridApiRef
  } from '@mui/x-data-grid';



// Define the functional component Orders
function Orders() {
    // Initialize state and variables
    const [orders, setOrders] = useState();
    const [vehicleId, setVehicleId] = useState();
    const [enable, setEnable] = useState(false);
    const {setAlert} = useAlert();
    const endPoint = 'orders';
    const endPointEdit ='orderform';
    const queryClient = useQueryClient();
    const apiRef = useGridApiRef();
    const [customerId, setCustomerId] = useState();
    const [page, setPage] = useState({page : 1, pageSize : 15});

    const ordersColumns = [
        { field: 'id',
          headerName: 'ID', 
          width: 90 
        },
        {
          field: 'name',
          headerName: 'Nature',
          width: 150,
          editable: true,
        },
        {
          field: 'description',
          headerName: 'Description',
          sortable: false,
          width: 200,
    
        },
          {
            field: 'vehicle',
            headerName: 'vehicule',
            type: 'text',
            width: 200,
            editable: true,
          },
          {
            field: 'plateNumber',
            headerName: 'Matricule',
            type: 'text',
            width: 150,
            editable: true,
          },
          {
            field: 'price',
            headerName: 'Prix',
            sortable: false,
            width: 150,
            renderCell: params => formatPrice(params.row.price)
      
          },
          {
            field: 'status',
            headerName: 'Status',
            width: 150,
            editable: true,
            renderCell: params => <Chip label={status[params.row.status].faild} color={status[params.row.status].color} variant="outlined" />
            
          },
          {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 100,
            getActions: ({id}) => [
              <GridActionsCellItem icon={<EditIcon />} label="Edit"  />,
              ///*<GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handlDeleteClick({id})} />,
            ],
          },
      ];
      const status = {
        "E" : {
            faild : "En attend",
            color : "default"
        },
        "C" : {
            faild : "En cours",
            color : "error"
        },
        "T" : {
            faild : "Cloturé",
            color : "success"
        },
        "F" : {
            faild : "Facturé",
            color : "primary"
        },
        "P" : {
            faild : "Facturé",
            color : "primary"
        },
        "D" : {
            faild : "Facturé",
            color : "primary"
        }
    
    }  

    const fetchOrders  =  () => api.get(`/${endPoint}?page=all&customerId[eq]=${customerId}`).then((res) =>{ return res});

    const result = useQuery({
        queryKey: ['orders', customerId],
        queryFn: () => fetchOrders(),
        keepPreviousData : true,
        //enabled: enable,
    });
    const { data, isLoading, isError } = result;

    const handelFetchData = (id) => {
        
        setCustomerId(id);

    }
    

    
    
    const handlEditClick = (id) => {
        //  navigate('/vehicles');
    }
  
   
   return (
            <section >
                <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-800 w-full mb-6 shadow-lg  ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700 dark:text-white ">Orders</h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <Link to={`/${endPoint}/${endPointEdit}`} ><AddCircleOutlineIcon color="success" /></Link>
                            </div>
                        </div>
                    </div>
                    <SearchBar handelFetchData={handelFetchData} />
                    {customerId && 
                        <div className="block w-full overflow-x-auto">
                                <DataGrid 
                                    columnVisibilityModel={{
                                        customerId: false,
                                    }}
                                    paginationMode="server"
                                    columns={ordersColumns}
                                    rows={data?.data?.data}
                                    initialState={{
                                        pagination: {
                                        paginationModel: {
                                            pageSize: 15,
                                        },
                                        },
                                    }}
                                    rowCount={data?.data?.meta?.total}
                                    pageSizeOptions={[15, 25, 50, 100]}  
                                    apiRef={apiRef}
                                    onPaginationModelChange={(params) => setPage({page : params.page +1,pageSize : params.pageSize})}
                                    //onRowClick={(params) => {handlRowClick(params)}}
                                />
                            </div>
                        }

                </div>
            </section>
                
    );

}

export default Orders;