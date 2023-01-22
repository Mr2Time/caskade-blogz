// create a new component called BlogPage that will be used to render a single blog post and all its content
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "./../components/Spinner";
import parse from "html-react-parser";

const BlogPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState({});

  const uri = `http://localhost:8000/api/blogs/posts/${id}`;

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await axios.get(uri);
        setBlog(res.data.blog);
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchBlog();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Container>
            <div className="blog-header">
              <div className="blog-header-left">
                <p>{blog.tags.join(" ")}</p>
              </div>
              <div className="blog-header-center">
                <h1>
                  {blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}
                </h1>
              </div>
              <div className="blog-header-right">
                <p>{blog.author.slice(0, blog.author.indexOf("@"))}</p>
                <p>{blog.createdAt.slice(0, 10)}</p>
              </div>
            </div>
            <div className="blog-content">{parse(blog.content)}</div>
          </Container>
          <Comments>
            <h3>Comments</h3>
            <div className="comments">
              <p className="blog-comment">
                yasinadan1: Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Debitis mollitia modi iusto possimus doloremque
                perferendis voluptate soluta tempore, a fugit.
              </p>
              <p className="blog-comment">
                yasinadan1: Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Debitis mollitia modi iusto possimus doloremque
                perferendis voluptate soluta tempore, a fugit.
              </p>
              <p className="blog-comment">
                yasinadan1: Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Debitis mollitia modi iusto possimus doloremque
                perferendis voluptate soluta tempore, a fugit.
              </p>
              <div className="view-all">
                <button className="view-all-btn">view all</button>
              </div>
            </div>
          </Comments>
          <CommentInput>
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </CommentInput>
          <SCButtons>
            <button className="c-btn">Cancel</button>
            <button className="s-btn">Submit</button>
          </SCButtons>
        </>
      )}
    </>
  );
};

export default BlogPage;

const Container = styled.div`
  width: 55%;
  margin: 0 auto;
  height: 100%;
  min-height: 100vh;
  // neuromorphic design
  border-radius: 11px;
  background: #ffffff;
  box-shadow: 13px -13px 3px #7f7e7e, -13px 13px 3px #9e9d9d;
  padding: 2rem;
  margin-top: 2rem;
  @media (max-width: 768px) {
    width: 90%;
  }
  color: #000000;
  .blog-header {
    height: 5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* background: #c9b7b7; */
    .blog-header-left {
      background: #c9b7b7;
      padding: 0.5rem;
      border-radius: 5px;
      p {
        font-size: 1rem;
        font-weight: 600;
        color: #000000;
        margin: 0 1rem;
      }
    }
    .blog-header-center {
      h1 {
        font-size: 2rem;
        font-weight: 600;
        // font-face elianto-regular in assets folder
        font-family: "Elianto-Regular", "lobster";
        // make border bottom span half the width of the title
        position: relative;
        &::after {
          content: "";
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 50%;
          height: 0.2rem;
          background: #000000;
        }
      }
    }
    .blog-header-right {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      left: 3rem;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -1.5rem;
        width: 0.2rem;
        height: 100%;
        background: #bcb9b9;
      }

      p {
        font-size: 1rem;
        font-weight: 600;
        color: #6164bc;
        margin: 0 1rem;
      }
    }
  }
  .blog-content {
    margin-top: 2rem;
    p {
      font-size: 1rem;
      font-weight: 400;
      color: #000000;
      line-height: 2;
    }
    img {
      width: 100%;
      height: 60vh;
      object-fit: cover;
      margin: 1.5rem 0;
    }
  }
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const Comments = styled.div`
  margin: 2rem auto 0 auto;
  width: 57%;
  min-height: 20vh;
  border-radius: 10px;
  background: #e0e0e0;
  box-shadow: -5px 5px 0px #5a5a5a, 5px -5px 0px #ffffff;

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #000000;
    line-height: 2;
    margin: 1rem 1rem 0;
    position: relative;
    ::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 10%;
      height: 3px;
      background: #000000;
    }
  }

  .comments {
    padding: 1rem;
    .blog-comment {
      font-size: 1rem;
      font-weight: 400;
      color: #000000;
      line-height: 2;
      margin-top: 1rem;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        bottom: -0.5rem;
        left: 0;
        width: 10%;
        height: 1px;
        background: #969696;
      }
    }
  }
  .view-all {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;

    button {
      border: none;
      background: transparent;
      color: #000000;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }
  }
`;

const CommentInput = styled.div`
  margin: 1rem auto;
  width: 57%;
  height: 10rem;
  border-radius: 10px;
  background: #e0e0e0;
  box-shadow: -5px 5px 0px #5a5a5a, 5px -5px 0px #ffffff;
  padding: 1rem;

  // center the input

  textarea {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    font-size: 1rem;
    font-weight: 400;
    color: #000000;
    line-height: 2;
    resize: none;
    outline: none;
  }
`;

const SCButtons = styled.div`
  width: 57%;
  margin: 1rem auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .c-btn {
    border: none;
    background: transparent;
    color: #c17e7e;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-right: 1rem;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: translateY(-3px);
    }
  }

  .s-btn {
    border: none;
    background: transparent;
    // green color
    color: #7ec17e;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;

    transition: all 0.3s ease-in-out;

    &:hover {
      transform: translateY(-3px);
    }
  }
`;
