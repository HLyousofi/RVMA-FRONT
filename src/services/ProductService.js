
import api  from './axios-service';
import { useQuery, useMutation } from 'react-query';


const endPointProducts = '/products';





const useGetProducts = (page) => {

    return useQuery({
        queryKey: ['products', page],
        queryFn: async () =>{ return await api.get(`${endPointProducts}?page=${page.page}&pageSize=${page.pageSize}`)},
        keepPreviousData : true,
    });

}
export default useGetProducts;


export const usePostProduct = () => {
    

    return useMutation({
        mutationFn : (product) => { return   api.post(endPointProducts, product);}

    });

}

export const useUpdateProduct = () => {
    

    return useMutation({
        mutationFn : ({id, product}) => {    api.patch(`${endPointProducts}\\${id}`, product).then((res) => {return res});}

    });

}


export const useDeleteProduct = () => {

    return useMutation({
        mutationFn : async   (id)  => { return  await api.delete(`${endPointProducts}\\${id}`);
    }}) 
}
