// Import necessary React and external dependencies
import {  useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import useAlert from "../../hooks/useAlert";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useGetCustomers, { useDeleteCustomer } from "../../services/CustomerService";
import CircularIndeterminate from '../../components/ui/CircularIndeterminate';
import AddButton from "../../components/ui/AddButton";
import usePopup from "../../hooks/usePopup";
import {
    DataGrid,
    GridActionsCellItem,
    useGridApiRef
  } from '@mui/x-data-grid';

// Define the functional component Customers
function Customers() {
    // Initialize state and variables
    const navigate = useNavigate();
    const {setAlert} = useAlert();
    const {openPopup, setYesAction, setNoAction, setMessage} = usePopup();
    const endPoint = 'customers';
    const [page, setPage] = useState({page : 1, pageSize : 15});
    const endPointEdit ='customerform';
    const apiRef = useGridApiRef();
    const { data, isLoading, isError } = useGetCustomers(page);
    const {mutateAsync : deleteCustomer} = useDeleteCustomer();

    // Define columns for the DataGrid
    const customerColumns = [
        {
          field: 'name',
          headerName: 'Name',
          flex: 1,
          editable: false,
          sortable: true
        },
        {
          field: 'adress',
          headerName: 'Adresse',
          flex: 1.5,
          editable: false,
        },
        {
          field: 'email',
          headerName: 'Email',
          type: 'email',
          flex: 1,
          editable: false,
        },
        {
          field: 'phoneNumber',
          headerName: 'Telephone',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          flex: 1,
    
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            flex: 1,
            getActions: (params) => [
              <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => handlEditClick(params.row)} />,
              <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleDeleteClick(params.row)} />
            ],
          },
      ];
  
     
    const handlEditClick = (customer) => {
    
        navigate(`/${endPoint}/${endPointEdit}`, {state : customer});
    }


    const handlRowClick = (params) => {
        console.log(params.row.id);


    }


    const handleDeleteClick =  ({id}) => {
      
        
        openPopup();
        setNoAction(() => () => {});
        setMessage('Êtes-vous sûr de bien vouloir supprimer ce Client?')
        setYesAction(() =>  () => {
                                try {
                                     deleteCustomer(id,{
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
                    <div className="relative flex flex-col  shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.21)] min-w-0 break-words  dark:bg-gray-800 w-full mb-6  rounded-xl ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0 ">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                  <h3 className="font-semibold text-base text-blueGray-700 dark:text-white ">Clients</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <AddButton link={endPointEdit} icon={<AddCircleOutlineIcon />} />
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <DataGrid 
                                paginationMode="server"
                                columns={customerColumns}
                                rows={data?.data?.data}
                                initialState={{
                                    pagination: {
                                      paginationModel: {
                                        pageSize: 15, page :0
                                      },
                                    },
                                  }}
                                  rowCount={data?.data?.meta?.total}
                                  pageSizeOptions={[15, 25, 50, 100]}  
                                  apiRef={apiRef}
                                  onPaginationModelChange={(params) => setPage({page : params.page +1,pageSize : params.pageSize})}
                                  onRowClick={(params) => {handlRowClick(params)}}
                               />
                        </div>
                    </div>
                    <Outlet />
            </section>
                
    );

}

export default Customers;