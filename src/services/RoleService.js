
import api  from './axios-service';
import { useQuery, useMutation } from 'react-query';


const endPointRoles = '/roles';
const useGetRoles = (page) => {

    return useQuery({
        queryKey: ['roles', page],
        queryFn: async () => {return await api.get(`${endPointRoles}?page=${page.page}&pageSize=${page.pageSize}`)},
        keepPreviousData : true
    });

}
export default useGetRoles;


export const usePostRole = () => {
    

    return useMutation({
        mutationFn : async (role) => { return await api.post(endPointRoles, role);}

    });

}

export const useUpdateRole = () => {
    

    return useMutation({
        mutationFn : async  ({id, role}) => { return   await api.patch(`${endPointRoles}\\${id}`, role);}

    });

}


export const useDeleteRole = () => {

    return useMutation({
        mutationFn : async (id) => {return await api.delete(`${endPointRoles}\\${id}`)}
    })
}
