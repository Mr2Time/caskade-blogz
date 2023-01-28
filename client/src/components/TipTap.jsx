import React, { useState, useRef, useEffect } from "react";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setWholeState } from "../reducers/blogSlice";
import Spinner from "./Spinner";
import axios from "axios";
import ErrorPage from "./ErrorPage";
import ErrorModal from "./ErrorModal";
import TTMenuBar from "./TTMenuBar";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <TTMenuBar editor={editor} />
  );
};

export default () => {
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const tempContent = useSelector((state) => state.blog.content);
  const [error, setError] = useState();
  const [content, setContent] = useState(tempContent);
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.user.auth);
  const navigate = useNavigate();

  const titleRef = useRef();
  const descRef = useRef();
  const tagsRef = useRef();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: "" || content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  const escapeDoubleQuotes = (string) => {
    return string.replace(/"/g, '\\"');
  };

  const id = localStorage.getItem("user");

  const handleOnChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  }

  const HandleBlogPost = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const title = blog.title;
    const description = blog.description;
    const tags = blog.tags.split(" ");
    const sendBlog = { title, content, description, tags, userId: JSON.parse(id) };
    dispatch(setWholeState(sendBlog));

    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/api/blogs/posts",
        data: sendBlog,
      })
      
     if(res.data.status == 400) {
        setError(res.data.message)
        setLoading(false);
     } else {
        setLoading(false);
        navigate("/my-blogs");
     }
     } catch (error) {
      setLoading(false);
      setError(error.response.data);
    }
  };

  return (
    <>
      {Auth ? (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <>
            <ErrorModal err={error} setError={setError}/>
            <Container error={error}>
              <div className="editor">
                <input
                  placeholder="title..."
                  className="title-inp"
                  name="title"
                  value={blog.title}
                  onChange={(e) => handleOnChange(e)}
                  />
                <MenuBar editor={editor} />
                <EditorContent editor={editor} />
                <textarea
                  rows="10"
                  placeholder="description..."
                  value={blog.description}
                  name="description"
                  onChange={(e) => handleOnChange(e)}
                  ></textarea>
                <input
                  placeholder="tags [technology education coding lifestyle] space separated"
                  className="editor-tags"
                  name="tags"
                  value={blog.tags}
                  onChange={(e) => handleOnChange(e)}
                />
                <div className="cal-sub">
                  <button className="blog-cancel">Cancel</button>
                  <button className="blog-submit" onClick={(e) => HandleBlogPost(e)}>
                    Submit
                  </button>
                </div>
              </div>
            </Container>
          </>
          )}
        </>
      ) : (
        <ErrorPage />
        )}
    </>
  );
};



const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;

  .editor {
    position: relative;
    top: 0.5rem;
    width: 85%;
  }

  .menu-bar {
    margin-top: 1rem;
    position: sticky;
    z-index: 2;
    top: 0;
    border: 1px solid #aba9a9;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;

  }

  /* Basic editor styles */
  .ProseMirror {
    min-height: 70vh;
    // give the editor a neuromorphic look
    color: #000000;
    font-family: "JetBrainsMono", monospace;
    line-height: 1.5;
    outline: none;
    position: relative;
    z-index: 1;
    padding: 1rem;
    border-bottom: 1px solid #aba9a9;
    border-right: 1px solid #aba9a9;
    border-left: 1px solid #aba9a9;
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;

    > * + * {
      margin-top: 0.75em;
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

    img {
      display: block;
      width: 50%;
      height: 50%;
      margin-left: auto;
      margin-right: auto;
      border-radius: 0.5rem;
      object-fit: cover;
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
  }

  .view {
    position: relative;
    margin-top: 20%;
  }

  img {
    display: block;
    width: 50%;
    height: 50%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 0.5rem;
    object-fit: cover;
  }

  .title-inp {
    width: 100%;
    height: 2rem;
    outline: none;
    padding: 0.2rem 0.5rem;
    margin-top: 1rem;
    border-radius: 0.2rem;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #000c06;
    transition: all 0.3s ease-in-out;
    &:focus {
      border-bottom: 1px solid #04cefb;
    }
  }

  .editor-tags {
    width: 100%;
    height: 2rem;
    outline: none;
    padding: 0.2rem 0.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.2rem;
    font-size: 1rem;
    border: none;
    border-radius: 0px;
box-shadow:  -5px 5px 10px #bab8b8,
             5px -5px 10px #ffffff;

  }

  textarea {
    width: 100%;
    height: 10rem;
    outline: none;
    padding: 0.5rem;
    margin-top: 1rem;
    border-radius: 0.2rem;
    font-size: 1rem;
    border: none;
    border-top: 1px solid #000c06;
    border-bottom: 1px solid #000c06;
    transition: all 0.3s ease-in-out;
    &:focus {
      border-top: 1px solid #04cefb;
      border-bottom: 1px solid #04cefb;

    }

  }

  button {
    color: #000;
    border: none;
    border-bottom: 1px solid #000c06;
    border-top: 1px solid #000c06;
    border-radius: 0.5rem;
    padding: 0.5rem 0.5rem;
    margin: 0.5rem;
    cursor: pointer;
    font-family: "JetBrainsMono", monospace;
    font-size: 1rem;
    background-color: #fff;
    
    &:hover {
      transform: translateY(-2px);
    }
  }

  .cal-sub {
    display: flex;
    justify-content: flex-end;
  }

  .cal-sub button {
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    cursor: pointer;
    font-family: "JetBrainsMono", monospace;
    font-size: 1rem;
    &:hover {
      transform: translateY(-1px);
    }
  }

  .blog-submit {
    background-color: rgb(116, 244, 116);
    color: black;
  }
  .blog-cancel {
    background-color: rgb(255, 45, 45);
    color: white;
  }

`;
