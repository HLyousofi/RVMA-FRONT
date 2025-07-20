import AutocompleteField from '../../components/ui/AutocompleteField';
import InputField from '../../components/ui/InpuField';
import { useEffect, useState } from 'react';
import useAlert from '../../hooks/useAlert';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient  } from "react-query";
import { useForm } from "react-hook-form";
import SaveButton from '../../components/ui/SaveButton';
import ResetButton from '../../components/ui/ResetButton';
import { useGetCustomersNames } from '../../services/CustomerService';
import  useGetVehicles from '../../services/VehicleService';
import QuoteOrderComponent from '../../components/ProductInvoiceTable';
import { usePostOrder, useUpdateOrder, useGetOrder } from '../../services/OrderService';
import CircularIndeterminate from '../../components/ui/CircularIndeterminate';


const OrderForm = () => {
 
    const {mutateAsync : addOrder} = usePostOrder();
    const {mutateAsync : updateOrder} = useUpdateOrder();
    const {id} = useParams();
    const [page, setPage] = useState({page : 1, pageSize : 'all'});
    const queryClient = useQueryClient();
    const { data : workOrder,isLoading : isLoadingWorkorder, isError : isErrorWorkorder } = useGetOrder({id});
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
            currentMileage : workOrder.data.currentMileage,
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
    function prepareOrderForApi(formData) {
        return {
            customerId: formData.customer.id,
            vehicleId: formData.vehicle.id,
            currentMileage :formData?.currentMileage ?? 0,
            status : workOrder?.data?.status ?? 'pending',
            type : "order",
            productsWorkOrder: formData.rows.map(row => ({
                productId: row.product.id,
                quantity: parseInt(row.quantity, 10), // Convert string to integer
                unitPrice: parseInt(row.unitPrice, 10) // Convert string to float
            }))
        };
    }
   
    const onSubmit = async (formData) => {
            // Transform the data
    const orderData = prepareOrderForApi(formData);
    if(id != null){
            try{
                await updateOrder({id, orderData},{
                                                    onSuccess : async () => {
                                                        queryClient.invalidateQueries(["orders"]); 
                                                        navigate('/orders');
                                                        setAlert({
                                                                    active  : true, 
                                                                    type    : "success", 
                                                                    message : 'Order Modifier avec Succes !'
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
            await addOrder({ orderData},{
                                                onSuccess : async () => {
                                                    queryClient.invalidateQueries(["orders"]); 
                                                    navigate('/orders');
                                                    setAlert({
                                                                active  : true, 
                                                                type    : "success", 
                                                                message : 'Order Ajouter avec Succes !'
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

    const selectedVehicle = watch("vehicle");

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
        <div className="w-full h-full  bg-white dark:bg-gray-800 rounded">
        <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-700 dark:text-gray-300">{ workOrder ? workOrder.data.workorderNumber : 'Nouveau'  }</h3>
            <form className="space-y-16" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-x-96 gap-y-3 grid-cols-2 md:grid-cols-2 ">
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
                    <InputField 
                    className="col-start-2"
                    label="Kilometrage"
                    name='currentMileage'
                    type="number"
                    variant="standard"
                    control={control}
                    rules={{
                      min: {
                        value: 1,
                        message: "current Mileage must be positive",
                      },
                    }}
                  />
                </div>
                <QuoteOrderComponent control={control} watch={watch} />
                <div className=" flex justify-end mt-4 gap-2">
                    <ResetButton  />
                    <SaveButton />
                </div>
            </form>
         </div>
        </div>
    )
};

export default OrderForm;