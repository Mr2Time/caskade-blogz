import React from 'react';
import styled from 'styled-components';

const PostComments = ({commentRef, handleCommentSubmit}) => {
    return (
        <>
            <CommentInput>
            <textarea cols="30" rows="10" ref={commentRef}></textarea>
          </CommentInput>
          <SCButtons>
            <button className="c-btn">Cancel</button>
            <button className="s-btn" onClick={handleCommentSubmit}>
              Submit
            </button>
          </SCButtons>
        </>
    );
}

export default PostComments;


const CommentInput = styled.div`
  margin: 1rem auto;
  width: 57%;
  height: 10rem;
  border-radius: 10px;
  background: #e0e0e0;
  box-shadow: -5px 5px 0px #5a5a5a, 5px -5px 0px #ffffff;
  padding: 1rem;

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
