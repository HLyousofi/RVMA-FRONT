import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api  from '../../services/axios-service';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import useAlert from "../../hooks/useAlert";
import formatPrice from "../../utils/utility";
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
  } from '@mui/x-data-grid';





function Invoices() {
    const navigate = useNavigate();
    const {setAlert} = useAlert();
    const endPoint = 'invoices';
    const invoiceColumns = [
        { field: 'id',
          headerName: 'ID', 
          width: 90 
        },
        {
          field: 'customerName',
          headerName: 'Name',
          width: 200,
          editable: true,
        },
        {
          field: 'amount',
          headerName: 'Montant',
          width: 200,
          editable: true,
          renderCell: params => formatPrice(params.row.amount)
        },
        {
          field: 'billedDate',
          headerName: 'Date de Facturation',
          type: 'date',
          width: 250,
          editable: true,
          valueGetter: ({ value }) => value && new Date(value)
        },
        {
          field: 'paidDate',
          headerName: 'Date de Paiement',
          description: 'This column has a value getter and is not sortable.',
          type : 'date',
          sortable: false,
          width: 160,
          valueGetter: ({ value }) => value && new Date(value)
    
        },
        {
            field: 'status',
            headerName: 'Status',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
      
          },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 100,
            getActions: ({id}) => [
              <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => handlEditClick} />,
              <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handlDeleteClick({id})} />
            ],
          },
      ];
    const [invoices, setInvoices] = useState({});


    const fetchData = async () =>{
        try {
            const response = await api.get(`/${endPoint}`);
            if(response.data){
                setInvoices(response.data.data);
               
            }else {
                
            }
        }catch(error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        fetchData();
    }, [])


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
                                <h3 className="font-semibold text-base text-blueGray-700 dark:text-white ">Clients</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <DataGrid 
                                columns={invoiceColumns}
                                rows={invoices}
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

export default Invoices;