import React, { useState, ChangeEvent } from 'react';
import { createPost } from '../actions/posts';
import { useDispatch } from 'react-redux';
import { TextField, Button, Typography, Paper, Container, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';

const Form: React.FC = () => {

    const dispatch = useDispatch();

    const [ postData, setPostData ] = useState({
        creator: '',
        title: '',
        message: '',
        tags: [] as string[],
        selectedFile: ''
    })
    const [ err, setErr ] = useState(false);
    const [ submitStatus, setSubmitStatus ] = useState(false)

    const useStyles = makeStyles({
    TextField: {
        marginBottom: '10px'
    }
    });

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();

        const { creator, message, title, tags, selectedFile } = postData;
        if(creator && message && title && tags.length && selectedFile ){
            setErr(false);
            dispatch(createPost(postData));
            setSubmitStatus(true);
            handleClear();
        }else{
            setSubmitStatus(false);
            setErr(true);
        }
    }

    const handleClear = () =>{
        setPostData({
            title: '',
            creator: '',
            message:'',
            tags:[],
            selectedFile: ''

        })

        const inp = document.getElementById('img-input') as HTMLInputElement;
        inp.value = '';
    }

    const getBase64 = (e: ChangeEvent<HTMLInputElement>, cb: Function) => {

        const file = e.target.files![0] as Blob;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const classes = useStyles();

    return (
        <div style={{marginTop:'10px'}}>
            <Paper elevation={6}>

            {err?<Alert variant='filled' severity="error" style={{borderRadius:'0'}}>Please fill out all the fields</Alert>: null}
            {submitStatus?<Alert variant='filled' severity="success" style={{borderRadius:'0'}}>Post submitted successfully!</Alert>: null}

                <Container style={{paddingTop: '20px', paddingBottom: '20px', overflow:"auto"}}>
                    <Typography variant='h6' style={{padding:'5px'}} align='center'>CREATE POST</Typography>
                    <form noValidate onSubmit={handleSubmit}>

                        <TextField 
                        className={classes.TextField} 
                        id="outlined-basic" 
                        fullWidth 
                        label="Creator"
                        variant="outlined"
                        onChange={(e) =>setPostData({...postData, creator: e.target.value})}
                        value={postData.creator} />

                        <TextField 
                        className={classes.TextField}
                        id="outlined-basic"
                        fullWidth
                        label="Title" 
                        variant="outlined" 
                        onChange={(e) =>setPostData({...postData, title: e.target.value})}
                        value={postData.title}/>

                        <TextField 
                        className={classes.TextField}
                        id="filled-multiline-flexible"
                        fullWidth label="Message"
                        variant="outlined"
                        onChange={(e) =>setPostData({...postData, message: e.target.value})}
                        value={postData.message} 
                        multiline 
                        maxRows={3}/>

                        <TextField 
                        className={classes.TextField} 
                        id="outlined-basic" 
                        fullWidth 
                        label="Tags(comma separated)"
                        variant="outlined" 
                        onChange={(e) =>e.target.value?setPostData({...postData, tags: e.target.value.split(',')}): setPostData({...postData, tags: []})} 
                        value={postData.tags.length?postData.tags.map((tag)=>tag):''}/>

                        <input id='img-input' type="file" accept='image/*' onChange={(e)=>getBase64(e, (imageString:string)=>setPostData({...postData, selectedFile: imageString}))}/> 

                        <Button 
                        variant='contained'
                        size='large'
                        color='primary'
                        disableElevation
                        style={{display:'block', width:'100%', marginTop:'15px', marginBottom:'5px'}} 
                        type='submit'>
                            Submit
                        </Button>

                        <Button 
                        onClick={()=>handleClear()} 
                        size='small'
                        variant='contained' 
                        color='error'
                        disableElevation 
                        style={{display:'block', width:'100%'}}>
                            Clear
                        </Button>

                    </form>
                </Container>
            </Paper>
        </div>
    )
}

export default Form
