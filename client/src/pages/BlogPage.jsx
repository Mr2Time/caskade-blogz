// create a new component called BlogPage that will be used to render a single blog post and all its content
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Spinner from "./../components/Spinner";
import parse from "html-react-parser";
import ViewComments from "./../components/ViewComments";
import PostComments from "../components/PostComments";

const BlogPage = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState({});
  const commentRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  let email = JSON.parse(localStorage.getItem("email"));

  const uri = `http://localhost:8000/api/blogs/posts/${id}`;

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await axios.get(uri);
        setBlog(res.data.blog);
        setComments(res.data.blog.comments);
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchBlog();
  }, []);

  console.log("blog", blog);

  const handleCommentSubmit = async () => {
    const newComment = {
      author: email.slice(0, email.indexOf("@")),
      comment: commentRef.current.value,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setComments([...comments, newComment]);

    // make a post request to the server to save the comment
    const res = await axios.put(uri, newComment);

    // clear the input field
    commentRef.current.value = "";

    setViewAll(true);

    // scroll to the bottom of the comments section
    const commentsSection = document.querySelector(".comments");
    commentsSection.scrollTop = commentsSection.scrollHeight;
  };

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
          <ViewComments
            comments={comments}
            setComments={setComments}
            viewAll={viewAll}
            setViewAll={setViewAll}
          />
          <PostComments
            commentRef={commentRef}
            handleCommentSubmit={handleCommentSubmit}
          />
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
    // wrap text
    word-wrap: break-word;
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

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  mark {
    background-color: #faf594;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;
