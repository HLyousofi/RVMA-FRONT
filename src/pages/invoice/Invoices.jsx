import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import useAlert from "../../hooks/useAlert";
import formatPrice from "../../utils/utility";
import CircularIndeterminate from "../../components/ui/CircularIndeterminate";
import useGetInvoices, { useDeleteInvoice, downloadInvoicePDF } from "../../services/InvoiceService";
import usePopup from "../../hooks/usePopup";
import Badge from "../../components/ui/Badge";
import {DataGrid,GridActionsCellItem,useGridApiRef} from '@mui/x-data-grid';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import dayjs from 'dayjs';



function Invoices() {
    const endPoint = 'invoices';
    const endPointEdit ='edit';
    const endPointShow ='show';
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
          width: 150,
          sortable: true,
          filterable: true,
          renderCell: (params) => {
            // Access the nested `label` field
            return params.row.customer?.label || "N/A";
          }
        },
        {
          // field: 'vehicle',
          headerName: 'Vehicule',
          width: 130,
          sortable: true,
          filterable: true,
          renderCell: (params) => {
            // Access the nested `label` field
            return params.row.vehicle?.brand.label || "N/A";
          }
        },
       
        {
          field: 'vehicle',
          headerName: 'Matricule',
          width: 150,
          sortable: true,
          filterable: true,
          renderCell: (params) => {
            // Access the nested `label` field
            return params.row.vehicle?.plateNumber || "N/A";
          }
        },
        {
          field: 'amount',
          headerName: 'Montant HT',
          width: 150,
          sortable: true,
          filterable: true,
          renderCell: params => formatPrice(params.row.amount)
        },
        {
          field: 'billedDate',
          headerName: 'Date de Facturation',
          type: 'date',
          width: 150,
          sortable: true,
          filterable: true,
          valueFormatter: (params) => 
            params ? dayjs(params).format('DD/MM/YYYY') : 'N/A',
        },
        {
          field: 'paidDate',
          headerName: 'Date de Paiement',
          width: 150,
          sortable: true,
          filterable: true,
          valueFormatter: (params) => {
            return params ? dayjs(params).format('DD/MM/YYYY') : 'N/A';
          }
        },
        
        {
          field: 'status',
          headerName: 'Status',
          width: 150,
          sortable: true,
          filterable: true,
          align: 'center',
          headerAlign: 'center',
          renderCell: (params) => {
            // Access the nested `label` field
            return <Badge type='invoice' status={params?.row?.status} /> ;
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

    const handleShowClick = (invoice) => {
      navigate(`/${endPoint}/${invoice.id}/${endPointShow}`);
    }
  
    const downloadInvoice = async ({id}) => {
      try{
        downloadInvoicePDF(id);
      }catch(error){
        console.error(error.message);
      }
    };

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