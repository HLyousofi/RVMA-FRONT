
import api  from './axios-service';
import { useQuery, useMutation } from 'react-query';


const endPointCompany = '/settings';





const useGetCompany = () => {

    return useQuery({
        queryKey: ['company'],
        queryFn: async () =>{ 
            try{
            const response =  await api.get(`${endPointCompany}`);
            return response.data;
            }catch(error){
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        },
        keepPreviousData : true,
    });

}
export default useGetCompany;

export const useGetQuote = ({id}) => {

    return useQuery({
        queryKey: ['company', id ],
        queryFn: async () =>{ 
            try{
            const response =  await api.get(`${endPointCompany}/${id}`);
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


export const usePostCompany = () => {
    return useMutation({
        mutationFn: async ({ companyData }) => {
            try {
                const response = await api.post(endPointCompany, companyData);
                return response.data;
            } catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        }

    });
}

export const useUpdateCompany = () => {
    

    return useMutation({
        mutationFn: async ({ companyData }) => {
            try {
                const response = await api.post(`${endPointCompany}`, companyData , {
                    headers: {
                      "Content-Type": "multipart/form-data", // Indispensable pour les fichiers
                    },
                  });
                return response.data;
            } catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        }
    });
}


// export const useDeleteQuote = () => {

//     return useMutation({
//         mutationFn : async   (id)  => { 
//             try {
//                 const response =  await api.delete(`${endPointCompany}\\${id}`);
//                 return response.data;
//             }catch (error) {
//                 console.error("Erreur API :", error.response?.data || error);
//                 throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`

//             }
//     }}) 
// }

