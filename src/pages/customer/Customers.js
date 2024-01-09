// Import necessary React and external dependencies
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import api  from '../../services/axios-service';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import useAlert from "../../hooks/useAlert";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useQuery, useMutation, useQueryClient } from "react-query";
import CircularIndeterminate from '../../components/ui/CircularIndeterminate';
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
    const endPoint = 'customers';
    const [page, setPage] = useState({page : 1, pageSize : 15});
    const endPointEdit ='customerform';
    const queryClient = useQueryClient();
    const apiRef = useGridApiRef();
    // Define columns for the DataGrid
    const customerColumns = [
        { field: 'id',
          headerName: 'ID', 
          width: 90 
        },
        {
          field: 'name',
          headerName: 'Name',
          width: 200,
          editable: true,
        },
        {
          field: 'adress',
          headerName: 'Adresse',
          width: 400,
          editable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          type: 'email',
          width: 250,
          editable: true,
        },
        {
          field: 'phoneNumber',
          headerName: 'Telephone',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
    
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 100,
            getActions: (params) => [
              <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => handlEditClick(params.row)} />,
              <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleDeleteClick(params.row)} />
            ],
          },
      ];
  
     // Define a function to fetch customer data
    const fetchCustomers  =  (page) => api.get(`/${endPoint}?page=${page.page}&pageSize=${page.pageSize}`).then((res) =>{ return res});
    
   

    // Use React Query to fetch customer data and manage the state
    const result = useQuery({
        queryKey: ['customers', page],
        queryFn: () => fetchCustomers(page),
        keepPreviousData : true
    });
    const { data, isLoading, isError } = result;
    
    // Handle the click event for editing a customer
    const handlEditClick = (customer) => {
        let item = encodeURIComponent(JSON.stringify(customer))
    
        navigate(`/${endPoint}/${endPointEdit}/${item}`);
    }

     // Handle the click event for deleting a customer

    const mutation = useMutation((id) => {
        return api.delete(`/${endPoint}/${id}`);
    });

    const handlRowClick = (params) => {
        console.log(params.row.id);


    }


    const handleDeleteClick =  ({id}) => {
        mutation.mutate(id, {
            onSuccess:  () => {
                setAlert({active : true, type : 'success', message : 'Élément supprimé avec succès !'}); 
                apiRef.current.updateRows([{ id: id, _action: 'delete' }]);
            },
            onError: (error) => {
                // Handle error, like showing an error message
                setAlert({active : true, type : "error" ,message : error.message});
            },
            onSettled: () => {
                queryClient.invalidateQueries('customers')
              },
        });
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
                    <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-800 w-full mb-6  rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700 dark:text-white ">Clients</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <Link to={`/${endPoint}/${endPointEdit}/new`} ><AddCircleOutlineIcon color="success" /></Link>
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
            </section>
                
    );

}

export default Customers;