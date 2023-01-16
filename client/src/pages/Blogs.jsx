import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import { setWholeState } from '../reducers/blogSlice';
import Card from '../components/Card';
import styled from 'styled-components';
import Spinner from './../components/Spinner';
import placeholder01 from '../assets/placeholder-01.png';


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

const Blogs = ({navFilterLoading}) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    
    const uri  = 'http://localhost:8000/api/blogs/posts';
    
    useEffect(() => {
      const  getBlogs = async () => {
          setLoading(true);
          try {
              const res = await axios.get(uri);
              // decontruct
              dispatch(setWholeState({...res.data.blog}));
              setLoading(false);
            } catch (error) {
                setLoading(true);
                console.log(error);
            }
        }
        getBlogs();
    }, []);

    const blogs = useSelector(state => state.blog);

    return (
        <Container>
            {loading || navFilterLoading ?  <Spinner  /> : (
                <AllBlogs>
                {
                    Object.keys(blogs).map((key, index) => {
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
        </Container>
    );
}

const Container = styled.div`
    margin-top:  5rem;
`;


const AllBlogs = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  margin-top: 5rem;
  justify-items: center;
  align-items: center;
  grid-gap: 1.5rem 0;uto;
  @media (max-width: 1500px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export default Blogs;
