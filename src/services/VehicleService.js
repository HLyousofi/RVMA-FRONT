
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
        mutationFn : (vehicle) => { return   api.post(endPointVehicles, vehicle);}

    });

}

export const useUpdateVehicle = () => {
    

    return useMutation({
        mutationFn : ({id, vehicle}) => {    api.patch(`${endPointVehicles}\\${id}`, vehicle).then((res) => {return res});}

    });

}


export const useDeleteVehicle = () => {

    return useMutation({
        mutationFn : async   (id)  => { return  await api.delete(`${endPointVehicles}\\${id}`);
    }}) 
}
