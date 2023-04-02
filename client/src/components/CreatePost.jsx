import React, { useState, useEffect, useContext } from 'react';
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material';
import BlogImageBanner from '../images/Banner.jpg'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLocation } from 'react-router-dom';
import {DataContext} from './DataProvider';

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
})

const Container = styled(Box)`
    margin: 60px 50px;
`;

const StyleFormControl = styled(FormControl)`

    margin-top:10px;
    display:flex;
    flex-direction:row;
`;

const StyleInput = styled(InputBase)`
    flex:1;
    margin: 0 10px;
    font-size:25px
`;

const StyleTextArea = styled(TextareaAutosize)`
    width:100%;
    margin-top : 20px;
    font-size:18px;
    border:none;
    &:focus-visible{
        outline:none;
    }
`;

function CreatePost() {

    const [post, setPost] = useState({
        title: '',
        description: '',
        picture: '',
        userName: '',
        categories: '',
        createDate: new Date()
    })

    const [img, setImg] = useState('');

    const {account} = useContext(DataContext);

    const location = useLocation();

    useEffect(() => {
        const getImg = () => {
            if (img) {
                const data = new FormData();
                data.append('name', img.name);
                data.append('file', img);
                 
                post.picture=data;
            }
        }
        getImg();
        post.categories=location.search?.split('=')[1]||'All';
        post.userName = account.userName;

    }, [img])

    const ControlledData = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }
    console.log(post,)

    return (
        <Container>
            <Image src={BlogImageBanner} alt="banner"/>
            <StyleFormControl>

                <label htmlFor='fileInput'><AddCircleIcon fontSize='large' color='action' /></label>

                <input type="file" id='fileInput' style={{ display: 'none' }} 
                onChange={(e) => setImg(e.target.files[0])} />

                <StyleInput placeholder='Title' name='title' onChange={ControlledData} />

                <Button variant='contained'>Publish</Button>

            </StyleFormControl>
            <StyleTextArea minRows={5} placeholder='Tell you Story....'
                name='description' onChange={ControlledData} />
        </Container>
    )
}

export default CreatePost
