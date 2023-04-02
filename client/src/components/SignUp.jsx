import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Logo from '../images/blogger.png';
import { Box, TextField, Button, styled } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Components = styled(Box)`
    border-radius: 14px;
    background-color:white;
    width:400px;
    margin:auto;
    margin-top: 120px;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6)
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    paddingTop: '50px'
})

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform:none;
    background:#FB641B;
`

const SignButton = styled(Button)`
    text-transform:none;
    background:#fff;
    color:#2874f0;
    box-shadow: 0px 2px 4px 0px rgb(0 0 0/ 20%)
`
const LogInLink = styled(Link)({
    color: '#2874f0',
    textTransform: 'none',
    textDecoration: 'none'
})

function SignUp() {

    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({ name: "", userName: "", password: "" })


    const ChangeSignUpData = (e) => {
        e.preventDefault()
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value })
    }
    
    const SignUpDataBase = async (e) => {
        e.preventDefault()
        try {
            const user = await axios.post('/authors', signUpData)
            if (user.status === false) window.alert("invalid data")
            else { navigate('/LogIn') }
        }
        catch (err) {window.alert(err.response.data.msg)}
    }


    return (
        <Components>
            <Box>
                <Image src={Logo} alt="LogoSignUp" />
                <Wrapper>
                    <TextField id="standard-basic" name='name' onChange={ChangeSignUpData} label="Enter Name" variant="standard" />
                    <TextField id="standard-basic" name='userName' onChange={ChangeSignUpData} label="Enter UserName" variant="standard" />
                    <TextField id="standard-basic" name='password' onChange={ChangeSignUpData} label="Enter Password" variant="standard" />
                    <LoginButton variant="contained" onClick={SignUpDataBase}>SignUp</LoginButton>
                    <SignButton ><LogInLink to='/LogIn'>Already have an account</LogInLink></SignButton>
                </Wrapper>
            </Box>
        </Components>
    )
}

export default SignUp
