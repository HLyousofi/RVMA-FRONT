
import api  from './axios-service';
import { useQuery, useMutation } from 'react-query';


const endPointInvoices = '/invoices';





const useGetInvoices = (page) => {

    return useQuery({
        queryKey: ['invoices', page],
        queryFn: async () =>{ return await api.get(`${endPointInvoices}?page=${page.page}&pageSize=${page.pageSize}`)},
        keepPreviousData : true
    });

}
export default useGetInvoices;


export const usePostInvoice = () => {
    

    return useMutation({
        mutationFn : async (invoice) => { return  await  api.post(endPointInvoices, invoice);}

    });

}

export const useUpdateInvoice = () => {
    

    return useMutation({
        mutationFn : async ({id, invoice}) => { return await api.patch(`${endPointInvoices}\\${id}`, invoice);}

    });

}


export const useDeleteInvoice = () => {

    return useMutation({
        mutationFn : async (id) => {return await api.delete(`${endPointInvoices}\\${id}`)}
    })
}
