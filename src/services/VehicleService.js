
import api  from './axios-service';
import { useQuery, useMutation } from 'react-query';


const endPointVehicles = '/vehicles';





const useGetVehicles = (page) => {

    return useQuery({
        queryKey: ['vehicles', page],
        queryFn: async () =>{ return await api.get(`${endPointVehicles}?page=${page.page}&pageSize=${page.pageSize}`)},
        keepPreviousData : true,
    });

}
export default useGetVehicles;


export const usePostVehicle = () => {
    return useMutation({
        mutationFn: async ({ vehicle }) => {
            try {
                const response = await api.post(endPointVehicles, vehicle);
                return response.data;
            } catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        }

    });
}

export const useUpdateVehicle = () => {

    return useMutation({
        mutationFn: async ({ id, vehicle }) => {
            try {
                const response = await api.patch(`${endPointVehicles}/${id}`, vehicle);
                return response.data;
            } catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        }
    });
}

export const useDeleteVehicle = () => {

    return useMutation({
        mutationFn : async   ({id})  => { 
            try {
                const response =  await api.delete(`${endPointVehicles}\\${id}`);
                return response.data;
            }catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`

            }
    }}) 
}
