import { useState } from "react";
import api  from '../../services/axios-service';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import useAlert from "../../hooks/useAlert";
import { useQuery, useMutation, useQueryClient } from "react-query";
import CircularIndeterminate from '../../components/ui/CircularIndeterminate';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useGetVehicles,{useDeleteVehicle} from "../../services/VehicleService";
import { useNavigate, Link } from "react-router-dom";
import AddButton from "../../components/ui/AddButton";
import usePopup from "../../hooks/usePopup";
import {
    DataGrid,
    GridActionsCellItem,
    useGridApiRef
  } from '@mui/x-data-grid';



// Define the functional component Vehicles
function Vehicles() {
    // Initialize state and variables
    const navigate = useNavigate();
    const {setAlert} = useAlert();
    const endPoint = 'vehicles';
    const [page, setPage] = useState({page : 1, pageSize : 15});
    const endPointEdit ='vehicleform';
    const apiRef = useGridApiRef();
    const { data, isLoading, isError } = useGetVehicles(page);
    const {mutateAsync : deleteVehicle, isError : deleteError} = useDeleteVehicle();
    const {openPopup, setMessage, setYesAction, setNoAction} = usePopup();
    // Define columns for the DataGrid
    const vehicleColumns = [
        // { field: 'id',
        //   headerName: 'ID', 
        //   width: 90,
        //   editable: false,
        // },
        {
          field: 'brand',
          headerName: 'Marque',
          width: 200,
          editable: false
        },
        {
          field: 'model',
          headerName: 'Model',
          type: 'text',
          width: 200,
          editable: false,
        },
        {
          field: 'plateNumber',
          headerName: 'Matricule',
          sortable: true,
          editable: false,
          width: 200,
    
        },
        // {
        //   field: 'chassisNumber',
        //   headerName: 'Numero de chassis',//affichage de numero de chassis
        //   sortable: false,
        //   width: 200,
    
        // },
        {
            field: 'fuelType',
            headerName: 'Carburant',
            sortable: true,
            width: 200,
            editable: false,
          },
          {
            field: 'customerName',
            headerName: 'Client',
            width: 200,
            editable: true,
          },
          {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 100,
            getActions: (params) => [
              <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => handlEditClick(params.row)} />,
              <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleDeleteClick(params.row)}  />,
            ],
          }
      ];




    // Handle the click event for editing a customer
    const handlEditClick = (vehicle) => {
       
        navigate(`/${endPoint}/${endPointEdit}`, {state : vehicle});
    }

    const mutation = useMutation((id) => {
        return api.delete(`/${endPoint}/${id}`);
    });


    const handleDeleteClick =  ({id}) => {
            openPopup();
            setMessage('Êtes-vous sûr de bien vouloir supprimer cette Vehicule ?')
            setNoAction(() => () => {});
            setYesAction(() => () => { 
                                         deleteVehicle(id, {
                                            onSuccess:  () => {
                                                setAlert({active : true, type : 'success', message : 'Élément supprimé avec succès !'}); 
                                                apiRef.current.updateRows([{ id: id, _action: 'delete' }]);
                                            },
                                            onError: (error) => {
                                                // Handle error, like showing an error message
                                                if(error.response.status){
                                                    console.log(error)
                                                setAlert({active : true, type : "error" ,message : error.message});
                                                }
                                            },
                                        
                                        });
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
                                <h3 className="font-semibold text-base text-blueGray-700 dark:text-white ">Vehicules</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <AddButton link={endPointEdit} icon={<AddCircleOutlineIcon />} />
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <DataGrid 
                                columnVisibilityModel={{
                                    customerId: false,
                                  }}
                                paginationMode="server"
                                columns={vehicleColumns}
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
                    </div>
            </section>
                
    );

}

export default Vehicles;