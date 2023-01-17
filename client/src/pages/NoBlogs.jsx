import React from 'react';
import styled from 'styled-components';

const NoBlogs = () => {
    return (
        <NBlogs>
            <h1>No Blogs Found</h1>
        </NBlogs>
    );
}

export default NoBlogs;


const NBlogs = styled.div`
height: 93vh;
background: linear-gradient(
    to right top,
    rgb(40, 49, 59, 0.9),   rgb(72, 84, 97, 0.7)

  );
display: flex;
justify-content: center;
align-items: center;

`;