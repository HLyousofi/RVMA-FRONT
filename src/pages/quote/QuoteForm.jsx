import AutocompleteField from '../../components/ui/AutocompleteField';
import { useEffect, useState } from 'react';
import DatePickerField from '../../components/ui/DatePickerField';
import useAlert from '../../hooks/useAlert';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient  } from "react-query";
import { useForm } from "react-hook-form";
import SaveButton from '../../components/ui/SaveButton';
import ResetButton from '../../components/ui/ResetButton';
import { useGetCustomersNames } from '../../services/CustomerService';
import  useGetVehicles from '../../services/VehicleService';
import QuoteOrderComponent from '../../components/ProductInvoiceTable';
import { usePostQuote, useUpdateQuote, useGetQuote } from '../../services/QuoteService';
import CircularIndeterminate from '../../components/ui/CircularIndeterminate';


const QuoteForm = () => {
 
    const {mutateAsync : addQuote} = usePostQuote();
    const {mutateAsync : updateQuote} = useUpdateQuote();
    const {id} = useParams();
    const [page, setPage] = useState({page : 1, pageSize : 'all'});
    const queryClient = useQueryClient();
    const { data : workOrder,isLoading : isLoadingWorkorder, isError : isErrorWorkorder } = useGetQuote({id});
    const navigate = useNavigate();
    const dayjs = require('dayjs'); 
    const { handleSubmit, control, reset, watch } = useForm();
    const [formTitle, setFormTitle] = useState('Nouveau Devis');
    const {setAlert} = useAlert();
   
    const { data : customers, isLoading : isLoadingCustomers, isError : fetchCustomersError } = useGetCustomersNames();
    const { data : vehicles, isLoading : isLoadingVehicles, isError : fetchVehiclesError} = useGetVehicles(page);

    useEffect(() => {
        if (id && workOrder) {
          reset({
            customer: workOrder.data.customer || '',
             vehicle: workOrder.data.vehicle || '',
             expirationDate: workOrder.data.expirationDate ,
            // comment: workOrder.data.comment || '',
            rows: workOrder.data.products
              ? workOrder.data.products.map((p) => ({
                  product : { id: p.id, label: p.name },
                  quantity: p.quantity,
                  unitPrice: p.unitPrice,
                }))
              : [],
          });
        }
      }, [id, workOrder, reset]);

        // Function to transform the data
    function prepareQuoteForApi(formData) {
        return {
            customerId: formData.customer.id,
            vehicleId: formData.vehicle.id,
            status : workOrder?.data?.status ?? 'draft',
            type : "quote",
            expirationDate: dayjs(formData.expirationDate).format('YYYY-MM-DD HH:mm:ss'), // Adjust format as needed
            productsWorkOrder: formData.rows.map(row => ({
                productId: row.product.id,
                quantity: parseInt(row.quantity, 10), // Convert string to integer
                unitPrice: parseInt(row.unitPrice, 10) // Convert string to float
            }))
        };
    }
   
    const onSubmit = async (formData) => {
            // Transform the data
    const qouteData = prepareQuoteForApi(formData);
    if(id != null){
            try{
                await updateQuote({id, qouteData},{
                                                    onSuccess : async () => {
                                                        queryClient.invalidateQueries(["quotes"]); 
                                                        navigate('/quotes');
                                                        setAlert({
                                                                    active  : true, 
                                                                    type    : "success", 
                                                                    message : 'Devis Modifier avec Succes !'
                                                                });
                                                    },onError : async (error) => {
                                                        setAlert({
                                                                    active  : true, 
                                                                    type    : "error", 
                                                                    message : error.response?.data?.message
                                                                });
                        }
                    }
        );
                }catch(error){
                setAlert({
                            active : true, 
                            type : "error", 
                            message : error.response?.data?.message
                        });
                }
    }else {
        try{
            await addQuote({ qouteData},{
                                                onSuccess : async () => {
                                                    queryClient.invalidateQueries(["quotes"]); 
                                                    navigate('/quotes');
                                                    setAlert({
                                                                active  : true, 
                                                                type    : "success", 
                                                                message : 'Devis Ajouter avec Succes !'
                                                            });
                                                }

            });
            }catch(error){
            setAlert({
                        active : true, 
                        type : "error", 
                        message : error.response?.data?.message
                    });
            }
            
    }  
    }


    // Watch the selected customer
    const selectedCustomer = watch("customer");


      // Filter vehicles based on the selected customer
      const filteredVehicles = vehicles?.data?.filter(
      
        (vehicle) => vehicle?.customerId === selectedCustomer?.id
    );
    if(isLoadingWorkorder){
        return <CircularIndeterminate />
    }
    else if(isErrorWorkorder)  {
        return <p>Error fetching data</p>;
    }
     // Render the main content with the DataGrid
    else  return (
        <div className="w-full h-full bg-white dark:bg-gray-800 rounded">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
            <h3 className="mb-4 text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300">
                Devis : {workOrder ? workOrder.data.workorderNumber : 'Nouveau'}
            </h3>
            <form className="space-y-8 sm:space-y-12" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-x-32 gap-y-4 grid-cols-1 sm:grid-cols-2">
                    <AutocompleteField
                        name="customer"
                        options={customers?.data}
                        control={control}
                        isLoading={isLoadingCustomers.toString()}
                        label="Client"
                        variant="standard"
                        rules={{
                            required: 'Customer is required',
                        }}
                    />
                    <DatePickerField
                        name="expirationDate"
                        label="Expiration"
                        control={control}
                        rules={{ required: "La date est requise" }}
                    />
                    <AutocompleteField
                        name="vehicle"
                        options={filteredVehicles}
                        control={control}
                        isLoading={isLoadingVehicles.toString()}
                        label="Véhicule"
                        variant="standard"
                        rules={{
                            required: 'Vehicle is required',
                        }}
                    />
                </div>
                <QuoteOrderComponent control={control} watch={watch} />
                <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-4 gap-2">
                    <ResetButton />
                    <SaveButton />
                </div>
            </form>
        </div>
    </div>
    )
};

export default QuoteForm;