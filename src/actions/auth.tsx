import { Dispatch } from 'react';
import { NavigateFunction } from 'react-router';
import { AUTH } from '../constants/actionTypes';
import { formDataType } from '../Auth/Auth';

const url = 'https://memories-serverside.herokuapp.com/users/';

export const signin = (formData: formDataType, navigate: NavigateFunction) => async(dispatch: Dispatch<object>) =>{
    try {
        fetch(url+'signin', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(formData)
    
        })
        .then((resp) =>resp.json())
        .then((data) => {

            const payload = { user: { name: data?.user.firstName+' ' + data?.user.lastName, id: data?.user._id }, token: data?.token};
            dispatch({type: AUTH, payload })
            navigate('/');
        })
        
        .catch(()=>console.log)

        
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData: formDataType, navigate: NavigateFunction) => async(dispatch: Dispatch<object>) =>{
    try {
        fetch(url+'signup', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(formData)
    
        })
        .then((resp) =>resp.json())
        .then((data) => {
            const payload = { user: { name: data?.user.firstName+' ' + data?.user.lastName, id: data?.user._id }, token: data.token};
            dispatch({type: AUTH, payload })
            navigate('/');
        })
        .catch(()=>console.log)

    } catch (error) {
        console.log(error)
    }
}
