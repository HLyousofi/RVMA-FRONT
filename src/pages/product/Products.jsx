import { useState } from "react";
import api  from '../../services/axios-service';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import useAlert from "../../hooks/useAlert";
import CircularIndeterminate from '../../components/ui/CircularIndeterminate';
import useGetProducts,{useDeleteProduct} from "../../services/ProductService";
import { useNavigate } from "react-router-dom";
import usePopup from "../../hooks/usePopup";
import  Dialog  from '../../components/Dialog';
import useDialog from "../../hooks/useDialog";
import {
    DataGrid,
    GridActionsCellItem,
    useGridApiRef
  } from '@mui/x-data-grid';
import ProductForm from "./ProductForm";
import { Button } from "@mui/material";



// Define the functional component Vehicles
function Products() {
    // Initialize state and variables
    const {setAlert} = useAlert();
    const endPoint = 'products';
    const [page, setPage] = useState({page : 1, pageSize : 15});
    const endPointEdit ='productform';
    const apiRef = useGridApiRef();
    const { data : products, isLoading, isError } = useGetProducts(page);
    const {mutateAsync : deleteProduct, isError : deleteError} = useDeleteProduct();
    const {openPopup, setMessage, setYesAction, setNoAction} = usePopup();
    // Define columns for the DataGrid
    const productColumns = [
          {
            field: 'name',
            headerName: 'Nom',
            flex: 0.5,
            editable: false,
          },
          {
            field: 'brand',
            headerName: 'Marque',
            flex: 0.5,
            editable: false,
          },
          {
              field: 'category',
              headerName: 'Categorie',
              flex: 0.5,
                renderCell: (params) => {
                // Access the nested `label` field
                return params.row.category?.label || "N/A";
              },
          },
          {
            field: 'oemReference',
            headerName: 'Ref Marque ',
            type: 'text',
            flex: 0.5,
            editable: false,
          },
          {
            field: 'manufacturerReference',
            headerName: 'Ref Fabriquant  ',
            type: 'text',
            flex: 0.5,
            editable: false,
          },
          {
            field: 'model',
            headerName: 'Model ',
            type: 'text',
            flex: 0.5,
            editable: false,
          },
          {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            flex: 0.5,
            getActions: (params) => [
              <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => handlEditClick(params.row)} />,
              <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleDeleteClick(params.row)}  />,
            ],
          }
      ];

      const [product, setProduct] = useState({});
      const { isOpen, openDialog, closeDialog } = useDialog();



    // Handle the click event for editing a customer
    const handlEditClick = (product) => {
      setProduct(product);
      openDialog();
        // navigate(`/${endPoint}/${endPointEdit}`, {state : vehicle});
        
    }

    const closeDialogForm = () => {
      setProduct({});
      closeDialog();
    }



    const handleDeleteClick =  ({id}) => {
            openPopup();
            setMessage('Êtes-vous sûr de bien vouloir supprimer ce Produit ?')
            setNoAction(() => () => {});
            setYesAction(() => async () => { 
              try {
                await deleteProduct(id); // Utilisation correcte de mutateAsync
        
                setAlert({ active: true, type: 'success', message: 'Élément supprimé avec succès !' }); 
                apiRef.current.updateRows([{ id: id, _action: 'delete' }]);
        
              } catch (error) {
                console.error("Erreur suppression :", error.response?.data || error);
                setAlert({ 
                    active: true, 
                    type: "error", 
                    message: error.response?.data?.message || "Erreur lors de la suppression !" 
                });
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
      <>
            <Dialog
              isOpen={isOpen} 
              onClose={closeDialogForm} 
            >
             <ProductForm  product={product} handleCloseDialog={closeDialog}/>
            </Dialog>
            <section >
                    <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-800 w-full mb-6  shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.21)] rounded-xl ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700 dark:text-white ">Produits</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <Button  variant="contained" color="success" onClick={openDialog} >Nouveau</Button>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <DataGrid 
                                columnVisibilityModel={{
                                    customerId: false,
                                  }}
                                paginationMode="server"
                                columns={productColumns}
                                rows={products?.data}
                                initialState={{
                                    pagination: {
                                      paginationModel: {
                                        pageSize: 15,
                                      },
                                    },
                                }}
                                rowCount={products?.meta?.total}
                                pageSizeOptions={[15, 25, 50, 100]}  
                                apiRef={apiRef}
                                onPaginationModelChange={(params) => setPage({page : params.page +1,pageSize : params.pageSize})}
                                //onRowClick={(params) => {handlRowClick(params)}}
                            />
                        </div>
                    </div>
            </section>
      </>
                
    );

}

export default Products;