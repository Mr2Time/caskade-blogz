import React from "react";
import styled  from 'styled-components';
import parse from 'html-react-parser';


export default function MBlogs({ blogs,  auth }) {
  return (
    <Container>
      {auth && blogs ? blogs.map((blog) => (
        <div key={blog._id}>
          <h1>{blog.title}</h1>
          {parse(blog.content)}
          <p>{blog.description}</p>
          <p>{blog.tags}</p>
        </div>
      )) : <div>500 - Server Side Error</div>}
    </Container>
  );
}

const Container = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Sanchez', serif;
  font-weight: lighter;

  img {
      display: block;
      width: 50%;
      height: 50%;
      margin-left: auto;
      margin-right: auto;
      border-radius: 0.5rem;
      object-fit: cover;
    }

`;