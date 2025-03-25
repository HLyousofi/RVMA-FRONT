
import api  from './axios-service';
import { useQuery, useMutation } from 'react-query';


const endPointQuotes = '/workOrder';





const useGetQuotes = (page) => {

    return useQuery({
        queryKey: ['quotes', page],
        queryFn: async () =>{ 
            try{
            const response =  await api.get(`${endPointQuotes}?page=${page.page}&pageSize=${page.pageSize}?type=quote`);
            return response.data;
            }catch(error){
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        },
        keepPreviousData : true,
    });

}
export default useGetQuotes;

export const useGetQuote = ({id}) => {

    return useQuery({
        queryKey: ['quotes', id ],
        queryFn: async () =>{ 
            try{
            const response =  await api.get(`${endPointQuotes}/${id}`);
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


export const usePostQuote = () => {
    return useMutation({
        mutationFn: async ({ qouteData }) => {
            try {
                const response = await api.post(endPointQuotes, qouteData);
                return response.data;
            } catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        }

    });
}

export const useUpdateQuote = () => {
    

    return useMutation({
        mutationFn: async ({ id, qouteData }) => {
            try {
                const response = await api.patch(`${endPointQuotes}/${id}`, qouteData);
                return response.data;
            } catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        }
    });
}


export const useDeleteQuote = () => {

    return useMutation({
        mutationFn : async   (id)  => { 
            try {
                const response =  await api.delete(`${endPointQuotes}\\${id}`);
                return response.data;
            }catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`

            }
    }}) 
}
