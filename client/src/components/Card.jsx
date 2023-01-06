import React from 'react';
import styled from 'styled-components';

const Card = ({img, title, description, tags}) => {
    return (
        <CardContainer>
            <div className='card-header'>
            <img src={img} alt="" />
            </div>
            <div className='card-body'>
                <h2>{title}</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <span>
                <p>{tags}</p>
                </span>
            </div>
        </CardContainer>
    );
}

const CardContainer = styled.div`
display: flex;
flex-direction: column;
max-width: 28rem;
height: 30rem;
margin-top: 2rem;


.card-body {
    width: 100%;
    height: 100%;
    h2 {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0.5rem 0;
        border-bottom: 1px solid black;
        padding-bottom: 0.5rem;
        width: 70%;
    }
    p {
        font-size: 0.9rem;
        font-weight: 400;
        width: 70%;
    }
    span {
        p {
            font-size: 0.8rem;
            font-weight: 100;
            color: #777;
            margin: 0.5rem 0;
            padding: 0;
        }
    }
}


img {
      width: 20rem;
      max-height: 10rem;
      margin-left: auto;
      margin-right: auto;
      border-radius: 0.5rem;
      object-fit: cover;
    }

`;

export default Card;
