import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import useAlert from "../../hooks/useAlert";
import formatPrice from "../../utils/utility";
import CircularIndeterminate from "../../components/ui/CircularIndeterminate";
import useGetInvoices, { useDeleteInvoice } from "../../services/InvoiceService";
import usePopup from "../../hooks/usePopup";

import {
    DataGrid,
    GridActionsCellItem,
    useGridApiRef
  } from '@mui/x-data-grid';





function Invoices() {
    const navigate = useNavigate();
    const apiRef = useGridApiRef();
    const [page, setPage] = useState({page : 1, pageSize : 15});
    const {setAlert} = useAlert();
    const { data , isLoading, isError } = useGetInvoices(page);
    const {mutateAsync : deleteInvoice} = useDeleteInvoice();
    const {openPopup, setMessage, setYesAction, setNoAction} = usePopup();
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




    const handlEditClick = (id) => {
      //  navigate('/vehicles');
    }

    const handlDeleteClick =  ({id}) =>{
        openPopup();
        setMessage('Êtes-vous sûr de bien vouloir supprimer cette Facture');
        setNoAction(() => () => {});
        setYesAction(() => () => {
                                try{
                                     deleteInvoice(id, { onSuccess : 
                                                                        () =>  { 
                                                                            apiRef.current.updateRows([{ id: id, _action: 'delete' }]);
                                                                            setAlert({active : true, type : 'success', message : 'Élément supprimé avec succès !'});
                                
                                                                                }
                                                            })
                                }
                                catch(error){
                                    setAlert({active : true, type : "error" ,message : error.message});
                                }
                            })
    }

     // Display a loading spinner while data is being fetched
     if(isLoading){
        return <CircularIndeterminate />
    }
    else if(isError)  {
        return <p>Error fetching data</p>;
    }
     // Render the main content with the DataGrid
    else return (
            <section >
                    <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-800 w-full mb-6  shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.21)] rounded-xl ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700 dark:text-white ">Factures</h3>
                                </div>
                                {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                                </div> */}
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <DataGrid 
                                paginationMode="server"
                                columns={invoiceColumns}
                                rows={data?.data?.data}
                                initialState={{
                                    pagination: {
                                      paginationModel: {
                                        pageSize: 15, page : 0
                                      },
                                    },
                                  }}
                                  apiRef={apiRef}
                                  onPaginationModelChange={(params) => setPage({page : params.page +1,pageSize : params.pageSize})}
                                  rowCount={data?.data?.meta?.total}
                                  pageSizeOptions={[15, 25, 50, 100]}  
                                  
                               />
                        </div>
                    </div>
            </section>
                
    );

}

export default Invoices;