import React, { useEffect } from "react";
import Create from "../components/Create";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ErrorPage from "../components/ErrorPage";
import styled from "styled-components";
import MBlogs from "../components/MBlogs";

export default function MyBlogs() {
  const user = useSelector((state) => state.user);

  const firstImg =
    "<p>Cats are beloved pets all over the world, and it's easy to see why. <img src='facebook.com' alt='test'> These graceful, playful, and independent animals bring joy and companionship to many households.</p><p><img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-cat-photos-1593441022.jpg?crop=0.670xw:1.00xh;0.167xw,0&amp;resize=640:*'></p><p style='text-align: start'>One of the most endearing qualities of cats is their independence. They are perfectly content to spend hours alone, playing with toys or simply napping in a sunny spot. This makes them a great choice for people who work long hours or are frequently away from home. However, it's important to remember that cats still need love, attention, and care, so it's important to set aside time each day to interact with your feline friend.</p><p style='text-align: start'><img src='https://th-thumbnailer.cdn-si-edu.com/bZAar59Bdm95b057iESytYmmAjI=/1400x1050/filters:focal(594x274:595x275)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/95/db/95db799b-fddf-4fde-91f3-77024442b92d/egypt_kitty_social.jpg'></p><p style='text-align: start'>Another thing that makes cats so special is their agility and playfulness. Cats are natural hunters, and they love to chase toys and play games. This is great for keeping them entertained and active, and it";
  const imgTag = firstImg.match(/<img[^>]*>/)[0];

  const uri = "http://localhost:8000/api/users/myblogs";
  
  useEffect(() => {
    const getMyBlogs = async () => {
    const userId = localStorage.getItem("user");
      try {
        const res = user.auth && await axios.get(uri, {
          params: { id: userId },
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMyBlogs();
  
  }, [user.blogs]);

  console.log(user.blogs);

  return (
    <Container>
      {user.auth ? (
        <div>
          <MBlogs blogs={user.blogs} auth={user.auth} />
          <Create />
        </div>
      ) : (
        <ErrorPage />
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
