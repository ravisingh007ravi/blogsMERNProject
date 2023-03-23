import React, { useState } from 'react'
import Logo from '../images/blogger.png';
import { Box, TextField, Button, styled } from '@mui/material';


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


function LogIn() {

    const [account, setaccount] = useState('login')

    function toggleSignUp() {

        account === 'SignUp' ? setaccount('login') : setaccount('SignUp')
    }

    return (
        <Components>
            <Box>
                <Image src={Logo} alt="LogoSignUp" />

                {account === 'login' ?

                    <Wrapper>
                        <TextField id="standard-basic" label="Enter UserName" variant="standard" />
                        <TextField id="standard-basic" label="Enter Password" variant="standard" />
                        <LoginButton variant="contained">LogIn</LoginButton>
                        <SignButton onClick={() => toggleSignUp()} >CREATE AN ACCOUNT</SignButton>
                    </Wrapper>

                    :
                    
                    <Wrapper>
                        <TextField id="standard-basic" label="Enter Name" variant="standard" />
                        <TextField id="standard-basic" label="Enter UserName" variant="standard" />
                        <TextField id="standard-basic" label="Enter Password" variant="standard" />
                        <LoginButton variant="contained">SignUp</LoginButton>
                        <SignButton onClick={() => toggleSignUp()} >Already have an account</SignButton>
                    </Wrapper>
                }
            </Box>
        </Components>
    )
}

export default LogIn
