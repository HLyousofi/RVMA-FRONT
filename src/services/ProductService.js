
import api  from './axios-service';
import { useQuery, useMutation } from 'react-query';


const endPointProducts = '/products';





const useGetProducts = (page) => {

    return useQuery({
        queryKey: ['products', page],
        queryFn: async () =>{ 
            try{
            const response =  await api.get(`${endPointProducts}?page=${page.page}&pageSize=${page.pageSize}`);
            return response.data;
            }catch(error){
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        },
        keepPreviousData : true,
    });

}
export default useGetProducts;


export const usePostProduct = () => {
    return useMutation({
        mutationFn: async ({ productData }) => {
            try {
                const response = await api.post(endPointProducts, productData);
                return response.data;
            } catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        }

    });
}

export const useUpdateProduct = () => {
    

    return useMutation({
        mutationFn: async ({ productId, productData }) => {
            try {
                const response = await api.patch(`${endPointProducts}/${productId}`, productData);
                return response.data;
            } catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`
            }
        }
    });
}


export const useDeleteProduct = () => {

    return useMutation({
        mutationFn : async   (id)  => { 
            try {
                const response =  await api.delete(`${endPointProducts}\\${id}`);
                return response.data;
            }catch (error) {
                console.error("Erreur API :", error.response?.data || error);
                throw error; // Relancer l'erreur pour qu'elle soit capturée dans `catch`

            }
    }}) 
}
