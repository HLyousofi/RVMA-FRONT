
import api  from './axios-service';
import { useQuery, useMutation } from 'react-query';


const endPointUsers = '/users';





const useGetUsers = (page) => {
    return useQuery({
        queryKey: ['users', page],
        queryFn: async () =>{ 
            try{
            const response =  await api.get(`${endPointUsers}?page=${page.page}&pageSize=${page.pageSize}`);
            return response.data;
            }catch(error){
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        },
        keepPreviousData : true,
    });

}
export default useGetUsers;


export const usePostUser = () => {
    

    return useMutation({
        mutationFn: async ({ userData }) => {
            try {
                const response = await api.post(endPointUsers, userData);
                return response.data;
            } catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        }

    });

}

export const useUpdateUser = () => {
    return useMutation({
        mutationFn: async ({ userId, userData }) => {
            try {
                const response = await api.patch(`${endPointUsers}/${userId}`, userData);
                return response.data;
            } catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        }
    });
    

   

}


export const useDeleteUser = () => {

    return useMutation({
        mutationFn : async   ({id})  => { 
            try {
                const response =  await api.delete(`${endPointUsers}\\${id}`);
                return response.data;
            }catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`

            }
    }}) 
}
