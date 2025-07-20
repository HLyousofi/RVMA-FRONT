
import api  from './axios-service';
import { useQuery, useMutation } from 'react-query';


const endPointOrders = '/workOrder';





const useGetOrders = (page) => {

    return useQuery({
        queryKey: ['orders', page],
        queryFn: async () =>{ 
            try{
            const response =  await api.get(`${endPointOrders}?page=${page.page}&pageSize=${page.pageSize}&type=order`);
            return response.data;
            }catch(error){
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        },
        keepPreviousData : true,
    });

}
export default useGetOrders;

export const useGetOrder = ({id}) => {

    return useQuery({
        queryKey: ['orders', id ],
        queryFn: async () =>{ 
            try{
            const response =  await api.get(`${endPointOrders}/${id}`);
            return response.data;
            }catch(error){
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        },
        keepPreviousData : true,
        enabled: !!id,
    });

}


export const usePostOrder = () => {
    return useMutation({
        mutationFn: async ({ orderData }) => {
            try {
                const response = await api.post(endPointOrders, orderData);
                return response.data;
            } catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        }

    });
}

export const useUpdateOrder = () => {
    

    return useMutation({
        mutationFn: async ({ id, orderData }) => {
            try {
                const response = await api.patch(`${endPointOrders}/${id}`, orderData);
                return response.data;
            } catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        }
    });
}


export const useDeleteOrder = () => {

    return useMutation({
        mutationFn : async   ({id})  => { 
            try {
                const response =  await api.delete(`${endPointOrders}/${id}`);
                return response.data;
            }catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`

            }
    }}) 
}

export const downloadOrderPDF = async (orderId) => {
    try {
        const response = await api.post(`workorders/${orderId}/pdf`, {}, {
            responseType: 'blob',
        });
        // const url = window.URL.createObjectURL(new Blob([response.data]));
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))

        window.open(url, '_blank');
        window.URL.revokeObjectURL(url);
       
    } catch (error) {
        console.error('Error downloading PDF:', error);
        alert('Failed to download order');
    }
};
