import React from "react";
import styled  from 'styled-components';
import parse from 'html-react-parser';
import {useDispatch,  useSelector} from 'react-redux';
import {userData} from '../reducers/userSlice';
import Card from './Card';
import placeholder01 from '../assets/placeholder-01.png';


// CHECK IF IMAGE EXISTS
function checkIfImageExists(url, callback) {
  const img = new Image();
  img.src = url;
  
  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };
    
    img.onerror = () => {
      callback(false);
    };
  }
  
}

export default function Cards({ blogs,  auth }) {

  const user = useSelector((state) => state.user);
  const author = user.email.slice(0, user.email.indexOf('@'));
  return (
    <Container>
      {auth && blogs ? blogs.map((blog) => {
        let img;
        checkIfImageExists(blog.headerImg, (exists) => {
          if (exists) {
            img = blog.headerImg;
          } else {
          }
        });
        return (
          <Card
            id={blog._id}
            img={img ? img : placeholder01}
            title={blog.title}
            description={blog.description}
            tags={blog.tags}
            key={blog._id}
            author={author}
            date={blog.createdAt.slice(0, 10)}
          />
        );
      }) : (
        <div>500 - Server Side Error</div>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  // center the cards
  margin-top: 5rem;
  justify-items: center;
  align-items: center;
  grid-gap: 1.5rem 0;
  @media (max-width: 1500px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

