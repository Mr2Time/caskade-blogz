import React from 'react';
import Create from '../components/Create';
import styled from 'styled-components';

const Blogs = ({data}) => {
    return (
        <Container>
            <Create />
            <img src="https://cdn.gobankingrates.com/wp-content/uploads/2019/07/Beautiful-luxury-home-exterior-iStock-1054759884.jpg?quality=75&amp;w=500" />
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
