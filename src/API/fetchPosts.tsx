import { useQuery } from 'react-query';

const url = 'http://localhost:5000/posts/';


export const fetchPosts = async ():Promise <string> => {
    const resp = await fetch(url);
    return resp.json();
} 
const { data, isFetching, status } = useQuery('post', fetchPosts);