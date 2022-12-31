import React from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom'

export default function Create() {
    const navigate = useNavigate();
  return (
    <CreateContainer>
      <div className="circles">
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>
        <button className="create-btn" onClick={() => navigate('/editor')}>
        CREATE+
        </button>
      </div>
    </CreateContainer>
  );
}

const CreateContainer = styled.div`
  .circles {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 25vmin;
    width: 25vmin;
    top: 75%;
    left: 87%;

    .create-btn {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        background-color: #59f1b9;
        color: #fff;
        border: none;
        z-index: 999;
        cursor: pointer;

        &:hover {
            transition: all 0.5s ease-in-out;
            transform: scale(1.05);
        }
    }

    .circle1, .circle2, .circle3 {
      animation: growAndFade 3s infinite ease-out;
      background-color: lightgreen;
      border-radius: 50%;
      height: 100%;
      opacity: 0;
      position: absolute;
      width: 100%;
    }

    .circle1 {
      animation-delay: 1s;
    }
    .circle2 {
      animation-delay: 2s;
    }
    .circle3 {
      animation-delay: 3s;
    }
  }

  @keyframes growAndFade {
    0% {
      opacity: 0.25;
      transform: scale(0);
    }
    100% {
      opacity: 0;
      transform: scale(1);
    }
  }
`;
