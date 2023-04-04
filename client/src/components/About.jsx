import { Typography, Grid, styled, Button } from '@mui/material';
import Ravi from '../images/ravi.jpg';
import { Link } from 'react-router-dom';

const ContainerMain = styled(Grid)`
    margin: 100px 100px 0 0;
`;

const Images = styled('img')({
  borderRadius: '20px',
  marginLeft: '50px'
});

const Header = styled(Typography)`
    font-size: 55px;
    font-weight: 600;
    text-align: center;
`;

const SubHeader = styled(Typography)`
    text-align: center;
    color: #878787;
    font-size: 35px;
    margin-top: 20px;
`;

const BioData = styled(Typography)`
    text-align: center;
    font-size: 25px;
    margin-top: 50px;
`;

const HomeButton = styled(Link)({
  marginLeft:'360px'
});

function About() {
  return (
    <ContainerMain container>

      <Grid item lg={5} sm={10} xs={12}>
        <Images src={Ravi} alt="me" />
      </Grid>

      <Grid item lg={6} sm={10} xs={12}>
        <Header>About Us</Header>
        <SubHeader>MERN Developer</SubHeader>
        <BioData>Trained in Backend Development using Nodes with ReactJs, Express and MongoDB
          Proficient in JavaScript. Hands-on in ES6
          Understand caching fundamentals and hands-on with Redis
          Hands-on experience with AWS S3 file upload and read Experienced in Agile methodology - Daily scrum, Sprint planning. Sprint review.
          Participated in FunctionUp Coding competitions on HackerRank and LeetCode</BioData>
        <HomeButton to='/' style={{ textDecoration: 'none', textAlign: 'center' }}>
          <Button variant="outlined">HOME</Button>
        </HomeButton>
      </Grid>

    </ContainerMain>
  )
}

export default About
