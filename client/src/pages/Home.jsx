import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Wave } from "./../components/Wave";
import { titleAnim, fade, photoAnim, pageAnimation  } from "../animations";
import { Link } from "react-router-dom";
import homeImg from "../assets/home-img.jpg";

const Home = () => {
  return (
    <motion.div variants={pageAnimation} initial='hidden' animate='show' exit='exit'>
      <Container>
        <Description>
          <motion.div>
            <Hide>
              <motion.h2 variants={titleAnim}>
                <span className="highlight-1">Explore</span> a variety
              </motion.h2>
            </Hide>
            <Hide>
              <motion.h2 variants={titleAnim}>
                of topics. <span className="highlight-2">Share</span> your
              </motion.h2>
            </Hide>
            <Hide>
              <motion.h2 variants={titleAnim}>
                thoughts with the <span className="highlight-3">world</span>.
              </motion.h2>
            </Hide>
          </motion.div>
          <motion.p variants={fade}>
            Unleash your creativity and share your ideas with a global audience.
            Sign up now to start your own blog, explore a variety of topics, and
            be a part of our vibrant community.
          </motion.p>
          <Link to="blogs">
          <motion.button>
            Explore
          </motion.button>
          </Link>
        </Description>
        <Image>
          <motion.img
            variants={photoAnim}
            src={homeImg}
            alt="blog image"
            initial="hidden"
            animate="show"
          />
        </Image>
        <Wave />
      </Container>
      </motion.div>
  );
};

const Container = styled.div`
  min-height: 93vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10rem;
  color: white;

  @media (max-width: 1300px) {
    display: block;
    text-align: center;
    padding: 2rem 2rem;
  }
`;

const Description = styled.div`
  flex: 1;
  padding-right: 5rem;
  h2 {
    font-weight: lighter;
    font-size: 4rem;
  }
  .highlight-1 {
    font-weight: bold;
    color: #e99b9b;
  }
  .highlight-2 {
    font-weight: bold;
    color: #23d997;
  }
  .highlight-3 {
    font-weight: bold;
    color: #f263ed;
  }
  z-index: 2;

  p {
    padding: 3rem 0rem;
    font-size: 1.4rem;
    line-height: 150%;
  }

  button {
    font-size: 1.5rem;
    padding: 1rem 4rem;
    border: 4px solid #23d997;
    background: transparent;
    color: white;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
        background-color: #23d997;
        color: white;
    }

    a {
        text-decoration: none;
        color: white;
    }
  }

  @media (max-width: 1300px) {
    padding: 0;
    button {
      margin: 2rem 0rem 5rem 0rem;
    }
  }
`;

const Image = styled.div`
  flex: 1;
  overflow: hidden;
  img {
    width: 100%;
    height: 80vh;
    object-fit: cover;
  }
  z-index: 2;
`;

const Hide = styled.div`
  overflow: hidden;
`;

export default Home;
