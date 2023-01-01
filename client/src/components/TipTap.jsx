import React, { useState, useRef, useEffect } from "react";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setWholeState } from "../reducers/blogSlice";
import Spinner from "./Spinner";
import axios from "axios";
import ErrorPage from "./ErrorPage";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="menu-bar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        Paragraph
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive("highlight") ? "is-active" : ""}
      >
        Highlight
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
      >
        Left
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
      >
        Center
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
      >
        Right
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={addImage}>Image(URL)</button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        Undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        Redo
      </button>
    </div>
  );
};

export default () => {
  let [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const tempContent = useSelector((state) => state.blog.content);
  const state = useSelector((state) => state);
  const [content, setContent] = useState(tempContent);
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.user.auth);

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

  const HandleBlogPost = async () => {
    setLoading(true);
    const title = titleRef.current.value;
    const description = descRef.current.value;
    const tags = [...tagsRef.current.value.split(" ")];
    const blog = { title, content, description, tags, userId: JSON.parse(id) };
    setBlog(blog);
    dispatch(setWholeState(blog));

    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/api/blog/posts",
        data: blog,
      })
      setLoading(false);
      console.log("posted: ",res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // check if content exists in database

  return (
    <>
      {Auth ? (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <Container>
              <div className="editor">
                <MenuBar editor={editor} />
                <input
                  placeholder="title..."
                  className="title-inp"
                  ref={titleRef}
                />
                <EditorContent editor={editor} />
                <textarea
                  rows="10"
                  placeholder="enter blog description here..."
                  ref={descRef}
                ></textarea>
                <input
                  placeholder="tags [technology - education - coding - lifestyle]"
                  className="editor-tags"
                  ref={tagsRef}
                />
                <div className="cal-sub">
                  <button className="blog-cancel">Cancel</button>
                  <button className="blog-submit" onClick={HandleBlogPost}>
                    Submit
                  </button>
                </div>
              </div>
            </Container>
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
  display: flex;
  justify-content: center;
  align-items: center;

  .editor {
    position: relative;
    top: 0.5rem;
    width: 85%;
  }

  .menu-bar {
    position: sticky;
    z-index: 2;
    top: 0;
  }

  /* Basic editor styles */
  .ProseMirror {
    min-height: 50vh;
    border: 2px solid black;
    border-radius: 10px;
    position: relative;
    z-index: 1;
    margin-top: 1rem;
    padding: 1rem;

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
    &:focus {
      outline: none;
    }
    padding: 0.2rem 0.5rem;
    border: 1.5px dashed #f40f0f;
    border-radius: 0.2rem;
    font-size: 1rem;
  }

  .editor-tags {
    width: 100%;
    height: 2rem;
    &:focus {
      outline: none;
    }
    padding: 0.2rem 0.5rem;
    border: 1px solid #36e38f;
    border-radius: 0.2rem;
    font-size: 1rem;
  }

  textarea {
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    margin-top: 1rem;
    width: 100%;
    height: 100%;
    &:focus {
      outline: none;
    }
    border-radius: 0.5rem;
    font-size: 1rem;
  }

  button {
    background-color: #0d0d0d;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    cursor: pointer;
    font-family: "JetBrainsMono", monospace;
    font-size: 1rem;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
        rgba(0, 0, 0, 0.23) 0px 6px 6px;
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
      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
        rgba(0, 0, 0, 0.23) 0px 6px 6px;
      transform: translateY(-1px);
    }
  }

  .blog-submit {
    background-color: rgb(73, 232, 73);
    color: black;
  }
  .blog-cancel {
    background-color: rgb(223, 47, 47);
    color: white;
  }
`;
