import React, { useContext } from 'react';
import { DataContext } from './DataProvider';
import { Box, Typography, styled } from '@mui/material';
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Grid } from '@mui/material';
import HomeBanner from '../images/toy-bricks-table-with-word-blog.jpg';
import { categories } from './HomeCategorieData';
import { Link, useSearchParams } from 'react-router-dom';
import { Post } from './AllComponents';



const Image = styled(Box)`
    margin-top: 25px;
    background: url(${HomeBanner});
    width:100%;
    height: 40vh;
    object-fit: cover;
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: column;
    `;

const Header = styled(Typography)`

    margin-top:100px;
    font-size: 70px;
    color: rgb(210, 133, 55);
    line-height: 1.1;
`;

const SubHeader = styled(Typography)`
    font-size: 20px;
    background:rgb(210, 133, 55);
    border-radius: 5px;
    color: aqua;
    padding:5px
`;

const StyleTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;

const Stylebutton = styled(Button)`
    margin:20px;
    width:85%;
    background:#6495Ed;
    color:#ffff;
`;

const StyleLink = styled(Link)({

    textDecoration: 'none',
    color: 'inherit'
})



function Banner() {

    const [serachParams] = useSearchParams();
    const category = serachParams.get('category')

    const { account } = useContext(DataContext);

    return (
        <>
            <Image>
                <Header>Blogs</Header>
                <SubHeader>{account.name}</SubHeader>
            </Image>

            <Grid container>
                <Grid item lg={2} sm={2} xs={12}>

                    <StyleLink to={`/create?category=${category || 'all'}`}>
                        <Stylebutton variant="contained">Create Blog</Stylebutton>
                    </StyleLink>
                    <StyleTable>
                        <TableHead>
                            <TableRow>
                                <TableCell><StyleLink to='/'>All Categories</StyleLink></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map(category => (
                                <TableRow key={category.id}>
                                    <TableCell>
                                        <StyleLink to={`/?category=${category.type}`}> {category.type} </StyleLink>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </StyleTable>
                </Grid>

                <Grid container item xs={12} sm={10} xl={10}>
                    <Post />
                </Grid>
            </Grid>
        </>
    )
}

export default Banner
