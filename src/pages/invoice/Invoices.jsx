import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import useAlert from "../../hooks/useAlert";
import formatPrice from "../../utils/utility";
import CircularIndeterminate from "../../components/ui/CircularIndeterminate";
import useGetInvoices, { useDeleteInvoice, downloadInvoicePDF } from "../../services/InvoiceService";
import usePopup from "../../hooks/usePopup";
import Badge from "../../components/ui/Badge";
import {DataGrid,GridActionsCellItem,useGridApiRef} from '@mui/x-data-grid';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';





function Invoices() {
    const endPoint = 'invoices';
    const endPointEdit ='edit';
    const navigate = useNavigate();
    const apiRef = useGridApiRef();
    const [page, setPage] = useState({page : 1, pageSize : 15});
    const {setAlert} = useAlert();
    const { data , isLoading, isError } = useGetInvoices(page);
    const {mutateAsync : deleteInvoice} = useDeleteInvoice();
    const {openPopup, setMessage, setYesAction, setNoAction} = usePopup();
    const invoiceColumns = [
        {
          field: 'invoiceNumber',
          headerName: 'Facture N',
          width: 100,
          sortable: true,
        },
        {
          field: 'customerName',
          headerName: 'Client',
          width: 200,
          renderCell: (params) => {
            // Access the nested `label` field
            return params.row.customer?.label || "N/A";
          }
        },
        {
          // field: 'vehicle',
          headerName: 'Vehicule',
          width: 150,
          renderCell: (params) => {
            // Access the nested `label` field
            return params.row.vehicle?.brand.label || "N/A";
          }
        },
       
        {
          field: 'vehicle',
          headerName: 'Matricule',
          width: 150,
          renderCell: (params) => {
            // Access the nested `label` field
            return params.row.vehicle?.plateNumber || "N/A";
          }
        },
        {
          field: 'amount',
          headerName: 'Montant',
          width: 150,
          editable: true,
          renderCell: params => formatPrice(params.row.amount)
        },
        {
          field: 'billedDate',
          headerName: 'Date de Facturation',
          type: 'date',
          width: 100,
          sortable: true,
          filterable: true,
          valueGetter: (params) => params?.value ? new Date(params?.value) : null,
          valueFormatter: (params) => params?.value ? params?.value.toLocaleDateString('fr-FR') : 'N/A',
        },
        {
          field: 'paidDate',
          headerName: 'Date de Paiement',
          type: 'date',
          width: 100,
          sortable: true,
          filterable: true,
          valueGetter: (params) => params?.value ? new Date(params?.value) : null,
          valueFormatter: (params) => params?.value ? params?.value.toLocaleDateString('fr-FR') : 'N/A',
        },
        
        {
          field: 'status',
          headerName: 'Status',
          width: 150,
          align: 'center',
          headerAlign: 'center',
          renderCell: (params) => {
            // Access the nested `label` field
            return <Badge type='order' status={params?.row?.status} /> ;
          }
        },
        {
          field: 'actions',
          headerName: 'Actions',
          type: 'actions',
          width: 130,
          getActions: (params) => {
            const actions = [
              <GridActionsCellItem
                key="show"
                icon={<ContentPasteSearchIcon />}
                label="Voir"
                onClick={() => handleShowClick(params.row)}
              />,
              <GridActionsCellItem
                key="pdf"
                icon={<PictureAsPdfIcon />}
                label="PDF"
                onClick={() => downloadInvoice(params.row)}
              />,
            ];
        
            // Show edit button only for 'draft' or 'pending' status
            if (params.row.status === 'draft' || params.row.status === 'pending') {
              actions.push(
                <GridActionsCellItem
                  key="edit"
                  icon={<EditIcon />}
                  label="Modifier"
                  onClick={() => handleEditClick(params.row)}
                />
              );
            }
        
            // Show delete button only for 'draft' status
            if (params.row.status === 'draft') {
              actions.push(
                <GridActionsCellItem
                  key="delete"
                  icon={<DeleteIcon />}
                  label="Supprimer"
                  onClick={() => handleDeleteClick(params.row)}
                />
              );
            }
        
            return actions;
          },
        }
      ];



    const handleShowClick = () => {

    }
  
    const downloadInvoice = async ({id}) => {
      try{
        downloadInvoicePDF(id);
      }catch(error){
        console.error(error.message);
      }
    };

    const handleEditClick = (invoice) => {
      console.log('📍 Invoices.jsx: invoice:', invoice);
      navigate(`/${endPoint}/${invoice.id}/${endPointEdit}`);
    }

    const handleDeleteClick =  ({id}) =>{
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