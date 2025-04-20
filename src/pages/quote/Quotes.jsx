import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import useAlert from "../../hooks/useAlert";
import CircularIndeterminate from '../../components/ui/CircularIndeterminate';
import formatPrice from "../../utils/utility";
import { useQueryClient } from "react-query";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddButton from "../../components/ui/AddButton";
import useGetQuotes,{useDeleteQuote, downloadQuotePDF} from "../../services/QuoteService";
import Badge from "../../components/ui/Badge";
import { useNavigate } from "react-router-dom";
import { calculateTTC } from "../../utils/utility";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import usePopup from "../../hooks/usePopup";
import {
    DataGrid,
    GridActionsCellItem,
    useGridApiRef
  } from '@mui/x-data-grid';

const Quote = () => {
    
    const {setAlert} = useAlert();
    const navigate = useNavigate();
    const endPoint = 'quotes';
    const endPointEdit ='edit';
    const endPointCreate = 'create';
    const endPointShow = 'show'
    const queryClient = useQueryClient();
    const apiRef = useGridApiRef();
    const [page, setPage] = useState({page : 1, pageSize : 15});
    const { data : workOrder, isLoading, isError } = useGetQuotes(page);
    const {mutateAsync : deleteQuote} = useDeleteQuote();
    const {openPopup, setYesAction, setNoAction, setMessage} = usePopup();


    const quotesColumns = [
        {
          field: 'workorderNumber',
          headerName: 'Nomber',
          width: 100,
          sortable: true,
        },
        {
          field: 'createdAt',
          headerName: 'Date de creation',
          sortable: true,
          width: 200,
        },
        {
          field: 'customer',
          headerName: 'Client',
          width: 150,
          renderCell: (params) => {
            // Access the nested `label` field
            return params.row.customer?.label || "N/A";
          }
        },
        {
          field: 'vehicle',
          headerName: 'Vehicle',
          type: 'text',
          width: 150,
          renderCell: (params) => {
            // Access the nested `label` field
            return params.row.vehicle?.plateNumber || "N/A";
          }
        },
        {
          field: 'total',
          headerName: 'Total',
          sortable: false,
          width: 150,
          align: 'right', // Alignement du contenu des cellules à droite
          headerAlign: 'right', // Alignement de l’en-tête à droite
          renderCell: params => formatPrice(calculateTTC(+params.row.total))
    
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 150,
          align: 'center',
          headerAlign: 'center',
          renderCell: (params) => {
            // Access the nested `label` field
            return <Badge type='quote' status={params.row.status} /> ;
          }
        },
        {
          field: 'expirationDate',
          headerName: 'Date de d\'experation',
          sortable: true,
          width: 200,
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
                onClick={() => handlShowClick(params.row)}
              />,
              <GridActionsCellItem
                key="pdf"
                icon={<PictureAsPdfIcon />}
                label="PDF"
                 onClick={() => downloadQuote(params.row)}
              />,
            ];
      
            // Show edit button only for 'draft' status
            if (params.row.status !== 'approved' ) {
              actions.push(
                <GridActionsCellItem
                  key="edit"
                  icon={<EditIcon />}
                  label="Modifier"
                  onClick={() => handlEditClick(params.row)}
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
        },

        // {
        //   field: 'actions',
        //   headerName: 'Actions',
        //   type: 'actions',
        //   width: 100,
        //   getActions: (params) => [
        //     <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => handlEditClick(params.row)}  />,
        //     <GridActionsCellItem icon={<ContentPasteSearchIcon />} label="show" onClick={() => handlShowClick(params.row)}  />,
        //   ],
        // },
      ];
    
    const handlEditClick = (quote) => {
      navigate(`/${endPoint}/${quote.id}/${endPointEdit}`);
    }

    const handlShowClick = (quote) => {
      navigate(`/${endPoint}/${quote.id}/${endPointShow}`);
    }

    const downloadQuote = async ({id}) => {
      try{
        downloadQuotePDF(id);
      }catch(error){
        console.error(error.message);
      }
    };

    const handleDeleteClick =  ({id}) => {
      openPopup();
      setNoAction(() => () => {});
      setMessage('Êtes-vous sûr de bien vouloir supprimer ce Devis?')
      setYesAction(() =>  () => {
                              try {
                                   deleteQuote({id},{
                                      onSuccess : () => {
                                          apiRef.current.updateRows([{ id: id, _action: 'delete' }]);
                                          setAlert({active : true, type : 'success', message : 'Élément supprimé avec succès !'});
                                      }
                                  })

                              } catch(error){
                                  console.log(error);

                              }
    })

  
  };

  
    if(isLoading){
      return <CircularIndeterminate />
  }
  else if(isError)  {
      return <p>Error fetching data</p>;
  }
   // Render the main content with the DataGrid
  else return (
            <section >
                <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-800 w-full mb-6 rounded-xl  shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.21)] ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700 dark:text-white ">Devis</h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                              <AddButton link={endPointCreate} icon={<AddCircleOutlineIcon />} />
                            </div>
                        </div>
                    </div>
                    {/* <SearchBar handelFetchData={handelFetchData} /> */}
                        <div className="block w-full overflow-x-auto">
                                <DataGrid 
                                    columnVisibilityModel={{
                                        customerId: false,
                                    }}
                                    paginationMode="server"
                                    columns={quotesColumns}
                                    rows={workOrder?.data}
                                    initialState={{
                                        pagination: {
                                        paginationModel: {
                                            pageSize: 15,
                                        },
                                        },
                                    }}
                                    rowCount={workOrder?.meta?.total}
                                    pageSizeOptions={[15, 25, 50, 100]}  
                                    apiRef={apiRef}
                                    onPaginationModelChange={(params) => setPage({page : params.page +1,pageSize : params.pageSize})}
                                    //onRowClick={(params) => {handlRowClick(params)}}
                                />
                            </div>
                </div>
            </section>
        );

  
}

export default Quote;