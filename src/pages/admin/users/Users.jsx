import { useState } from "react";
import useGetUsers, {useDeleteUser} from "../../../services/UserService";
import CircularIndeterminate from "../../../components/ui/CircularIndeterminate";
import InputField from "../../../components/ui/InpuField"
import { useForm } from "react-hook-form";
import useDialog from "../../../hooks/useDialog";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Dialog from "../../../components/Dialog";
import UserForm from "./UserForm";
import {DataGrid, GridActionsCellItem, useGridApiRef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import {AddButton} from "../../../components/ui/AddButton";
import usePopup from "../../../hooks/usePopup";
import useAlert from "../../../hooks/useAlert";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';




 const Users = () => {

    const [page, setPage] = useState({page : 1, pageSize : 15});
    const { data : users, isLoading, isError } = useGetUsers(page);
    const { handleSubmit, control, reset } = useForm();
    const { isOpen, openDialog, closeDialog } = useDialog();
    const [user, setUser] = useState();
    const apiRef = useGridApiRef();
    const {mutateAsync : deleteUser} = useDeleteUser();
    const {openPopup, setYesAction, setNoAction, setMessage} = usePopup();
    const {setAlert} = useAlert();




     // Handle the click event for editing a customer
     const handlEditClick = (user) => {
      setUser(user);
      openDialog();
    }
    const closeDialogForm = () => {
      setUser({});
      closeDialog();
    }
    const userColumns = [
      {
        field: 'lastName',
        headerName: 'Nom',
        flex: 1,
        editable: false,
        sortable: true
      },
      {
        field: 'firstName',
        headerName: 'Prenom',
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
        field: 'createdAt',
        headerName: 'Date de creation',
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

    const handleDeleteClick =  ({id}) => {
      openPopup();
      setNoAction(() => () => {});
      setMessage('Êtes-vous sûr de bien vouloir supprimer ce Client?')
      setYesAction(() =>  () => {
                              try {
                                   deleteUser({id},{
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
    }else 
    return (
      <>
        <Dialog
          isOpen={isOpen} 
          onClose={closeDialogForm} 
          width='max-w-[40rem]'
        >
        <UserForm  user={user} handleCloseDialog={closeDialog}/>
        </Dialog>
        <div className="relative flex flex-col shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.21)] min-w-0 break-words dark:bg-gray-700 w-full mb-6 rounded-xl">
        {/* Search Input */}
          <div className="flex   justify-between h-10 mb-4 ">
            <InputField name="" sx={{width : '30%'}} label="Recherche"   type="text" control={control} />
            <AddButton  onClick={openDialog} icon={<AddCircleOutlineIcon />}/>
          </div>
     

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          
          <DataGrid 
              paginationMode="server"
              columns={userColumns}
              rows={users?.data}
              initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 15, page :0
                    },
                  },
                }}
                rowCount={users?.meta?.total}
                pageSizeOptions={[15, 25, 50, 100]}  
                apiRef={apiRef}
                onPaginationModelChange={(params) => setPage({page : params.page +1,pageSize : params.pageSize})}
                // onRowClick={(params) => {handlRowClick(params)}}
            />
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center px-4">
          {/* <button
            // disabled={page.page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button> */}
        </div>
        </div>
      </>
                
        
    );
}

                    
export default Users;