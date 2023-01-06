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

  //   

  return (
    <Container>
      {auth && blogs ? blogs.map((blog) => {
        let img;
        checkIfImageExists(blog.headerImg, (exists) => {
          if (exists) {
            img = blog.headerImg;
            console.log('exists', img);
          } else {
            console.log('does not exist', img);
          }
        });
        return (
          <Card
            img={img ? img : placeholder01}
            title={blog.title}
            description={blog.description}
            tags={blog.tags}
            key={blog._id}
          />
        );
      }) : (
        <div>500 - Server Side Error</div>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  background: #f5f5f5;



  img {
      width: 20rem;
      max-height: 20rem;
      margin-left: auto;
      margin-right: auto;
      border-radius: 0.5rem;
      object-fit: cover;
    }

`;