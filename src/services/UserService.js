
import api  from './axios-service';
import { useQuery, useMutation } from 'react-query';


const endPointUsers = '/users';





const useGetUsers = (page) => {

    return useQuery({
        queryKey: ['users', page],
        queryFn: async () => {return await api.get(`${endPointUsers}?page=${page.page}&pageSize=${page.pageSize}`)},
        keepPreviousData : true
    });

}
export default useGetUsers;


export const usePostUser = () => {
    

    return useMutation({
        mutationFn : async (user) => { return await api.post(endPointUsers, user);}

    });

}

export const useUpdateUser = () => {
    

    return useMutation({
        mutationFn : async  ({id, user}) => { return   await api.patch(`${endPointUsers}\\${id}`, user);}

    });

}


export const useDeleteUser = () => {

    return useMutation({
        mutationFn : async (id) => {return await api.delete(`${endPointUsers}\\${id}`)}
    })
}
