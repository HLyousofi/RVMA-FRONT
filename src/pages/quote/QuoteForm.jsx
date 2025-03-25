import InputField from '../../components/ui/InpuField';
import AutocompleteField from '../../components/ui/AutocompleteField';
import { useEffect, useRef, useState } from 'react';
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


const QuoteForm = () => {
 
    const {mutateAsync : addQuote} = usePostQuote();
    const {mutateAsync : updateQuote} = useUpdateQuote();
    const {id} = useParams();

    const [page, setPage] = useState({page : 1, pageSize : 'all'});
    const queryClient = useQueryClient();
    const { data : workOrder, isLoading } = useGetQuote({id});
    const navigate = useNavigate();
    const location = useLocation();
    const dayjs = require('dayjs'); 
    const {  
        handleSubmit,
        control,
        reset, watch } = useForm();
    const [formTitle, setFormTitle] = useState('Nouveau Devis');
    const {setAlert} = useAlert();
    const [local, setLocal] = useState('fr-fr');
    const [quoteId, setQouteId] = useState(null);
   
    const { data : customers, isLoading : isLoadingCustomers, isError : fetchCustomersError } = useGetCustomersNames();

    const { data : vehicles, isLoading : isLoadingVehicles, isError : fetchVehiclesError} = useGetVehicles(page);


    useEffect(() => {
        if (id && workOrder) {
            console.log(workOrder)
          reset({
            customer: workOrder.data.customer || '',
             vehicle: workOrder.data.vehicle || '',
            // type: workOrder.data.type || 'quote',
            // orderDate: workOrder.data.orderDate || '',
            // deliveryDate: workOrder.data.deliveryDate || '',
            // status: workOrder.data.status || 'pending',
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
            status : "draft",
            type : "quote",
            expirationDate: dayjs(formData.expirationDate).format('YYYY-MM-DD HH:mm:ss'), // Adjust format as needed
            productsWorkOrder: formData.rows.map(row => ({
                productId: row.product.id,
                quantity: parseInt(row.quantity, 10), // Convert string to integer
                unitPrice: parseFloat(row.unitPrice) // Convert string to float
            }))
        };
    }

  


   
    const onSubmit = async (formData) => {
            // Transform the data
    const qouteData = prepareQuoteForApi(formData);
    console.log(qouteData);
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

    const selectedVehicle = watch("vehicle");

      // Filter vehicles based on the selected customer
      const filteredVehicles = vehicles?.data?.filter(
      
        (vehicle) => vehicle?.customerId === selectedCustomer?.id
    );
      
   

    return (
        <div className="w-full h-full  bg-white dark:bg-gray-800 rounded">
        <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-700 dark:text-gray-300">{ formTitle }</h3>
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
                            // minLength: {
                            //         value : 2,
                            //         message: 'Enter a valid name',
                            //         },
                            }}
                    />
                    <DatePickerField   
                        name="expirationDate" 
                        label="Expiration"
                        control={control}
                        rules={{ required: "La date est requise"}}
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
                <div className=" flex justify-end mt-4 gap-2">
                    <ResetButton  />
                    <SaveButton />
                </div>
            </form>
         </div>
        </div>
                    // <div className="w-full h-full  rounded">
                    //     <div className="px-6 py-6 lg:px-8 bg-white dark:bg-gray-800 rounded" >
                    //         <h3 className="mb-4 text-xl font-medium text-gray-700 dark:text-gray-300">{ formTitle }</h3>
                    //         <form 
                    //             className="space-y-10"
                    //             // onSubmit={handleSubmit}
                    //             >
                    //             <div className="flex justify-between w-full">
                    //                 <div className=" w-1/3">
                    //                     <Autocomplete
                    //                         fullWidth
                    //                         autoHighlight
                    //                         disabled={isLoading}
                    //                         disableClearable
                    //                         id="customer-name"
                    //                         options={data?.data}
                    //                         getOptionKey={(option) => option.id}
                    //                         inputValue={location?.state?.customerName}
                    //                         onChange={(event, newValue) => handleCustomerChange(newValue)}
                    //                         renderInput={(params) => <TextField
                    //                                                     inputRef={customerIdRef} 
                    //                                                     {...params} 
                    //                                                     label="Client"
                    //                                                     required
                    //                                                     variant="standard"
                    //                                                     error={nameError}
                    //                                                     InputProps={{
                    //                                                         ...params.InputProps,
                    //                                                         type: 'search',
                    //                                                       }} 
                                            
                    //                         />}
                    //                     />
                    //                     <div className="font-medium text-white dark:text-gray-300">
                    //                         {customerAdress}
                    //                     </div>
                    //                 </div>
                    //                 <div className="w-1/3">
                    //                     <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={local} >
                    //                         <DatePicker
                    //                             label="Expiration"
                    //                             slotProps={{ textField: { variant: "standard", helperText: 'DD/MM/YYYY' } }}
                    //                             size="small"
                    //                             minDate={moment()}
                    //                             //onChange={handleDateChange}
                    //                             renderInput={(params) => <input
                    //                                                         {...params}  
                    //                                                         />}
                    //                         />
                    //                     </LocalizationProvider>               
                    //                 </div>                               
                    //             </div>
                    //             <div className="flex justify-between">
                    //                  <div  className="w-1/3">
                                       
                    //                     <Autocomplete
                    //                             fullWidth
                    //                             autoHighlight
                    //                             disabled={isLoading2}
                    //                             disableClearable
                    //                             options={vehicleOption}
                    //                             getOptionKey={(option) => setVehicleId(option.id)}
                    //                             getOptionLabel={(option) => option?.plateNumber}
                    //                             onChange={(event, newValue) => handleVehicleChange(newValue)}
                                                
                    //                             key={ customerId }
                    //                             renderInput={(params) => <TextField
                    //                                                         inputRef={vehicleIdRef} 
                    //                                                         {...params} 
                    //                                                         label="Matricule"
                    //                                                         required
                    //                                                         variant="standard"
                    //                                                         error={nameError}
                    //                                                         InputProps={{
                    //                                                             ...params.InputProps,
                    //                                                             type: 'search',
                    //                                                         }} 
                                                
                    //                             />}
                    //                         />
                    //                     { selectedVehicle && <div className="font-medium text-gray-700 dark:text-gray-300"> 
                    //                      Marque :  {selectedVehicle.brand} <br/>
                    //                      Model :{ selectedVehicle.model} 
                    //                      </div> }
                    //                 </div>
                    //             </div>
                    //             {/* <div className=" flex justify-end mt-4 ">
                    //                 <Button variant="outlined" type="reset" color="secondary" sx={{marginRight: 4 }} >annuler</Button>
                    //                 <Button variant="outlined" type="submit" color="success" >{buttonAction}</Button>
                    //             </div> */}
                    //         </form>
                    //     </div>
                    // </div>
    )
};

export default QuoteForm;