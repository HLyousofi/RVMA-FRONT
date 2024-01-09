import { useEffect, useState } from "react";
import api  from '../../services/axios-service';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Chip } from "@mui/material";
import formatPrice from "../../utils/utility";
import useAlert from "../../hooks/useAlert";
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
  } from '@mui/x-data-grid';





function Orders() {
    const [orders, setOrders] = useState({});
    const [loading, setLoading] = useState('');
    const {setAlert} = useAlert();
    const endPoint = 'orders';
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
              <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handlDeleteClick({id})} />,
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

    const fetchData = async () =>{
        try {
            const response = await api.get('/orders');
            if(response.data){
                setOrders(response.data.data);
                setLoading(false);
               
            }else {
                
            }
        }catch(error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        setLoading(true);
        fetchData();

    }, []);

    const handlEditClick = (id) => {
        //  navigate('/vehicles');
      }
  
      const handlDeleteClick = async ({id}) =>{
  
          try{
          const response = await api.delete(`/${endPoint}/${id}`);
          setAlert({active : true, type : 'success', message : 'Élément supprimé avec succès !'});
          fetchData();
  
           
          }
          catch(error){
              setAlert({active : true, type : "error" ,message : error.message});
          }
      }
      
    return (
            <section >
                <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-800 w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700 dark:text-white ">Orders</h3>
                            </div>
                        </div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                        <DataGrid 
                            columns={ordersColumns}
                            rows={orders}
                            loading={loading}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                    pageSize: 7,
                                    },
                                },
                                }}
                                pageSizeOptions={[7, 10, 25]}
                            />
                    </div>
                </div>
            </section>
                
    );

}

export default Orders;