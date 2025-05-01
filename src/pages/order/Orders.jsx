import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import useAlert from "../../hooks/useAlert";
import CircularIndeterminate from '../../components/ui/CircularIndeterminate';
import formatPrice from "../../utils/utility";
import { useQueryClient } from "react-query";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddButton from "../../components/ui/AddButton";
import useGetOrders,{useDeleteOrder, downloadOrderPDF} from "../../services/OrderService";
import Badge from "../../components/ui/Badge";
import { useNavigate } from "react-router-dom";
import { calculateTTC } from "../../utils/utility";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import usePopup from "../../hooks/usePopup";
import dayjs from 'dayjs';
import {
    DataGrid,
    GridActionsCellItem,
    useGridApiRef
  } from '@mui/x-data-grid';

const Order = () => {
    
    const {setAlert} = useAlert();
    const navigate = useNavigate();
    const endPoint = 'orders';
    const endPointEdit ='edit';
    const endPointCreate = 'create';
    const endPointShow = 'show'
    const queryClient = useQueryClient();
    const apiRef = useGridApiRef();
    const [page, setPage] = useState({page : 1, pageSize : 15});
    const { data : orders, isLoading, isError } = useGetOrders(page);
    const {mutateAsync : deleteOrder} = useDeleteOrder();
    const {openPopup, setYesAction, setNoAction, setMessage} = usePopup();

   

    const ordersColumns = [
        {
          field: 'workorderNumber',
          headerName: 'Order N',
          width: 100,
          sortable: true,
        },
        {
          field: 'createdAt',
          headerName: 'Date de creation',
          sortable: true,
          type: 'date',
          width: 150,
          valueFormatter: (params) => 
            params ? dayjs(params).format('DD/MM/YYYY') : 'N/A',
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
          // field: 'vehicle',
          headerName: 'Marque',
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
          field: 'currentMileage',
          headerName: 'Kilometrage',
          align: 'right', // Alignement du contenu des cellules à droite
          headerAlign: 'right', // Alignement de l’en-tête à droite
          width: 120,
          renderCell: (params) => {
            // Access the nested `label` field
            return (params.row.currentMileage || 0)+' km';
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
          width: 120,
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
                onClick={() => handlShowClick(params.row)}
              />,
              <GridActionsCellItem
                key="pdf"
                icon={<PictureAsPdfIcon />}
                label="PDF"
                 onClick={() => downloadOrder(params.row)}
              />,
            ];
      
            // Show edit button only for 'draft' status
            if (params.row.status !== 'completed' && params.row.status !== 'to_invoice' ) {
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

      const downloadOrder = async ({id}) => {
        try{
          downloadOrderPDF(id);
        }catch(error){
          console.error(error.message);
        }
      };
    const handlEditClick = (order) => {
      navigate(`/${endPoint}/${order.id}/${endPointEdit}`);
    }

    const handlShowClick = (order) => {
      navigate(`/${endPoint}/${order.id}/${endPointShow}`);
    }

    const handleDeleteClick =  ({id}) => {
      openPopup();
      setNoAction(() => () => {});
      setMessage('Êtes-vous sûr de bien vouloir supprimer cet Order?')
      setYesAction(() =>  () => {
                              try {
                                   deleteOrder({id},{
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
                            <h3 className="font-semibold text-base text-blueGray-700 dark:text-white ">Orders</h3>
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
                                    columns={ordersColumns}
                                    rows={orders?.data}
                                    initialState={{
                                        pagination: {
                                        paginationModel: {
                                            pageSize: 15,
                                        },
                                        },
                                    }}
                                    rowCount={orders?.meta?.total}
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

export default Order;