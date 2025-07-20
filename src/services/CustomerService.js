import api  from './axios-service';
import { useQuery, useMutation } from 'react-query';


const endPointCustomers = '/customers';

const useGetCustomers = (page) => {

    return useQuery({
        queryKey: ['customers', page],
        queryFn: async () => {
            try{
                const response = await api.get(`${endPointCustomers}?page=${page.page}&pageSize=${page.pageSize}`);
                return response.data;
            }catch(error){
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        },
        keepPreviousData : true
    });

}
export default useGetCustomers;

export const useGetCustomersNames = () => {

    return useQuery({
        queryKey: ['customersName'],
        queryFn: async () => {
            try{
                const response = await api.get(`${endPointCustomers}?pageSize=all`);
                return response.data;
            }catch(error){
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }

        },
        keepPreviousData : true
    });
}


export const usePostCustomer = () => {
    return useMutation({
        mutationFn: async ({ customer  }) => {
            try {
                const response = await api.post(endPointCustomers, customer);
                return response.data;
            } catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        }

    });

}

export const useUpdateCustomer = () => {
    return useMutation({
        mutationFn: async ({ customer, id }) => {
            try {
                const response =  await api.patch(`${endPointCustomers}\\${id}`, customer);
                return response.data;
            } catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        }
    });

}


export const useDeleteCustomer = () => {
    return useMutation({
        mutationFn : async   ({id})  => { 
            try {
                const response =  await api.delete(`${endPointCustomers}\\${id}`);
                return response.data;
            }catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`

            }
    }}) 
}
