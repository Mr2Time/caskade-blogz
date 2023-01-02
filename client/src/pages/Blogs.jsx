import React from 'react';
import Create from '../components/Create';
import styled from 'styled-components';

const Blogs = ({data}) => {
    return (
        <Container>
            <Create />
            All blogs page, show every blog
        </Container>
    );
}


const Container = styled.div`

position: relative;
overflow: hidden;
width: 100%;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;

`;
export default Blogs;
