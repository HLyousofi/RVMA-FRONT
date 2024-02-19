
import api  from './axios-service';
import { useQuery, useMutation } from 'react-query';


const endPointCustomers = '/customers';





const useGetCustomers = (page) => {

    return useQuery({
        queryKey: ['customers', page],
        queryFn: async () => {return await api.get(`${endPointCustomers}?page=${page.page}&pageSize=${page.pageSize}`)},
        keepPreviousData : true
    });

}
export default useGetCustomers;


export const usePostCustomer = () => {
    

    return useMutation({
        mutationFn : async (customer) => { return await api.post(endPointCustomers, customer);}

    });

}

export const useUpdateCustomer = () => {
    

    return useMutation({
        mutationFn : async  ({id, customer}) => { return   await api.patch(`${endPointCustomers}\\${id}`, customer);}

    });

}


export const useDeleteCustomer = () => {

    return useMutation({
        mutationFn : async (id) => {return await api.delete(`${endPointCustomers}\\${id}`)}
    })
}
