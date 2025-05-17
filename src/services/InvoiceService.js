
import api  from './axios-service';
import { useQuery, useMutation } from 'react-query';


const endPointInvoices = '/invoices';





const useGetInvoices = (page) => {

    return useQuery({
        queryKey: ['invoices', page],
        queryFn: async () => {
            try{
                const response = await api.get(`${endPointInvoices}?page=${page.page}&pageSize=${page.pageSize}`);
                return response.data;
            }catch(error){
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        },
        keepPreviousData : true
    });


}
export default useGetInvoices;


export const usePostInvoice = () => {
    return useMutation({
        mutationFn: async ({ invoiceData }) => {
            try {
                const response = await api.post(endPointInvoices, invoiceData);
                return response.data;
            } catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        }

    });

}

export const useGetInvoice = ({id}) => {

    return useQuery({
        queryKey: ['invoice', id ],
        queryFn: async () =>{ 
            try{
            const response =  await api.get(`${endPointInvoices}/${id}`);
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

export const useUpdateInvoice = () => {
    

    return useMutation({
        mutationFn: async ({ id, invoiceData }) => {
            try {
                const response = await api.patch(`${endPointInvoices}/${id}`, invoiceData);
                return response.data;
            } catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        }
    });

}


export const useDeleteInvoice = () => {

    return useMutation({
        mutationFn : async (id) => {return await api.delete(`${endPointInvoices}\\${id}`)}
    })
}

export const downloadInvoicePDF = async (id) => {
    try {
        const response = await api.post(`invoices/${id}/pdf`, {}, {
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

