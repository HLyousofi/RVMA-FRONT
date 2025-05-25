
import api  from './axios-service';
import { useQuery, useMutation } from 'react-query';


const endPointFuelTypes = '/fueltypes';







const useGetFuelTypes = () => {

    return useQuery({
        queryKey: ['fuelTypes'],
        queryFn: async () => {
            try{
                const response = await api.get(`${endPointFuelTypes}?pageSize=all`);
                return response.data;
            }catch(error){
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }

        },
        keepPreviousData : true
    });
}

export default useGetFuelTypes;

export const usePostFuelType = () => {
    return useMutation({
        mutationFn: async ({ vehicle }) => {
            try {
                const response = await api.post(endPointFuelTypes, vehicle);
                return response.data;
            } catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        }

    });
}

export const useUpdateFuelType = () => {

    return useMutation({
        mutationFn: async ({ id, vehicle }) => {
            try {
                const response = await api.patch(`${endPointFuelTypes}/${id}`, vehicle);
                return response.data;
            } catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        }
    });
}

export const useDeleteFuelType = () => {

    return useMutation({
        mutationFn : async   ({id})  => { 
            try {
                const response =  await api.delete(`${endPointFuelTypes}\\${id}`);
                return response.data;
            }catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`

            }
    }}) 
}
