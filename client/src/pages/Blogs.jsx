import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import { setWholeState } from '../reducers/blogSlice';
import Card from '../components/Card';
import styled from 'styled-components';
import Spinner from './../components/Spinner';
import placeholder01 from '../assets/placeholder-01.png';
import NoBlogs from './NoBlogs';
import { pageAnimation  } from "../animations";
import {motion} from "framer-motion";


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

const Blogs = ({navFilterLoading, FBlogs, setFBlogs, errorFiltering}) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    
    const uri  = 'http://localhost:8000/api/blogs/posts';
    const ABlogs = useSelector((state) => state.blog);

    let blogs = FBlogs ? FBlogs : ABlogs;

    // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  let currentPosts = Object.keys(blogs).slice(firstPostIndex, lastPostIndex);

  // change page
  const paginate = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(Object.keys(blogs).length / postsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  };


    useEffect(() => {

      const  getBlogs = async () => {
          setLoading(true);
          try {
              const res = await axios.get(uri);
              dispatch(setWholeState({...res.data.blog}));
              setFBlogs(res.data.blog);
              setLoading(false);
            } catch (error) {
                setLoading(true);
            }
        }
        getBlogs();
    }, []);

    useEffect(() => {
      currentPosts = Object.keys(blogs).slice(firstPostIndex, lastPostIndex);
      setCurrentPage(1);
    }, [FBlogs]);

    return (
      <>
    <motion.div variants={pageAnimation} initial='hidden' animate='show' exit='exit'>
          <Container>
              {loading || navFilterLoading ?  <Spinner  /> : (
                <>
                  {errorFiltering.status || Object.values(blogs).length === 0 ? <NoBlogs /> : (
                    <AllBlogs>
                      {
                        Object.keys(blogs).slice(firstPostIndex, lastPostIndex).map((key, index) => {
                          let img;
                          checkIfImageExists(blogs[key].headerImg, (exists) => {
                            if(exists && blogs[key].headerImg) {
                              img = blogs[key].headerImg;
                            }
                            if (exists) {
                              img = blogs[key].headerImg;
                            } else {
                              img = placeholder01;
                            }
                          });
                          return (
                          <Card 
                          key={index}
                          id={blogs[key]._id}
                          img={img ? img : placeholder01}
                          title={blogs[key].title}
                          description={blogs[key].description}
                          tags={blogs[key].tags}
                          author={blogs[key].author.slice(0, blogs[key].author.indexOf("@"))}
                          date={blogs[key].createdAt.slice(0, 10)}
                          />
                          )
                        })
                      }
                  </AllBlogs>
                  )}
              </>
              )}
          </Container>
          
          {Object.values(currentPosts) ? (
            <Pagination>
                  <button onClick={() => paginate(currentPage - 1)}>&lt;</button>
                  <p className="page-num">{currentPage}</p>
                  <button onClick={() => paginate(currentPage + 1)}>&gt;</button>
              </Pagination>
          ) : <span></span>}
          </motion.div>
      </>
      );

}

const Container = styled.div`
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

const AllBlogs = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
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
export default Blogs;
