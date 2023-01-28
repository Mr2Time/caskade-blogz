import React from 'react';
import styled from 'styled-components';

const ViewComments = ({comments, setViewAll, viewAll, }) => {
    console.log("comments are: ", comments)
    return (
        <Comments>
            <h3>Comments</h3>
            <div className="comments">
              {comments.length ? (
                <>
                  <p className={`blog-comment ${comments.length >= 1 ? "active" : 'hidden'}`}>
                    {comments[0]?.author} -- {comments[0].createdAt} :{" "}
                    {comments[0].comment}
                  </p>
                  <p className={`blog-comment ${comments.length >= 2 ? "active" : 'hidden'}`}>
                  {comments[1]?.author} -- {comments[1]?.createdAt} :{" "}
                    {comments[1]?.comment}
                  </p>
                  <p className={`blog-comment ${comments.length >= 3 ? "active" : 'hidden'}`}>
                  {comments[2]?.author} -- {comments[2]?.createdAt} :{" "}
                    {comments[2]?.comment}
                  </p>
                 {
                    // skip the first 3 comments and map the rest
                    comments.slice(3).map((comment, index) => {
                      return (
                        <p key={index} className={`blog-comment ${viewAll ? "active" : 'hidden'}`}>
                          {comment.author} -- {comment.createdAt} : {comment.comment}
                        </p>
                      );
                    })
                 }
                </>
              ) : (
                <p style={{ textAlign: "center" }}>No comments yet</p>
              )}
              {comments.length > 3 ? (
                <div className="view-all">
                  <button className="view-all-btn" onClick={() => setViewAll(!viewAll)}>{viewAll ? "Hide" : "View All"}</button>
                </div>
              ) : null}

            </div>
          </Comments>
    );
}

export default ViewComments;

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
      width: 100%;
      font-size: 1rem;
      // wrap on text overflow
      word-wrap: break-word;
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

    .active {
      display: block;
    }

    .hidden {
      display: none;
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