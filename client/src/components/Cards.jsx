import React, { useState } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Card from "./Card";
import placeholder01 from "../assets/placeholder-01.png";
import NoBlogs from "../pages/NoBlogs";

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

export default function Cards({ blogs, auth }) {
  const user = useSelector((state) => state.user);
  const author = user.email.slice(0, user.email.indexOf("@"));

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = blogs.slice(firstPostIndex, lastPostIndex);

  // change page
  const paginate = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(blogs.length / postsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  if (currentPosts.length === 0) {
    return (
      <NoBlogs />
    );
  }

  return (
    <>
      <Container>
        {auth && blogs ? (
          currentPosts.map((blog) => {
            let img;
            checkIfImageExists(blog.headerImg, (exists) => {
              if (exists) {
                img = blog.headerImg;
              } else {
              }
            });
            return (
              <>
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
              </>
            );
          })
        ) : (
          <div>500 - Server Side Error</div>
        )}
      </Container>
      {auth && currentPosts ? (
        <Pagination>
          <button onClick={() => paginate(currentPage - 1)}>&lt;</button>
          <p className="page-num">{currentPage}</p>
          <button onClick={() => paginate(currentPage + 1)}>&gt;</button>
        </Pagination>
      ) : (
        <div>500 - Server Side Error</div>
      )}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  // center the cards
  margin-top: 5rem;
  justify-items: center;
  align-items: center;
  grid-gap: 1.5rem 0;

  @media (max-width: 1700px) {
    grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 2fr);
  grid-template-rows: repeat(2, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(2, 1fr);
  }
  
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 1rem 0;
  button {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    background-color: #fff;
  }
  .page-num {
    margin: 0 1rem;
    color: #fff;
  }
`;
