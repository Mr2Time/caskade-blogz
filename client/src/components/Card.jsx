import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import userpfp from  '../assets/user-profile-picture.png';

const Card = ({id, img, title, description, tags, author, date}) => {
    const navigate = useNavigate();
    return (
        <CardContainer onClick={() => navigate(`/blog/${id}`)}>
            <div className='card-header'>
            <img src={img} alt="card-header-image" />
            </div>
            <div className='card-body'>
                <span>
                <p>#{tags.join(' #').toLowerCase()}</p>
                </span>
                <h2>{title}</h2>
                <p className='description'>{description}</p>
                <div className='card-info'>
                    <div className='card-info-left'>
                        <img src={userpfp} alt='user default profile picture'/>
                        <p>{author}</p>
                    </div>
                    <div className='card-info-right'>
                        <p>{date}</p>
                    </div>
                </div>
            </div>
        </CardContainer>
    );
}

const CardContainer = styled.div`
    max-width: 400px;
    height: 100%;
    cursor: pointer;

    .card-header {
        width: 100%;
        height: 50%;
        img {
            width: 30rem;
            height: 100%;
            object-fit: cover;
            border-top-left-radius: 0.5rem;
            border-top-right-radius: 0.5rem;
        }
    }

    .card-body {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 40%;
        width: 100%;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        background-color: #fff;
        padding: 1rem;
        h2 {
            font-size: 1.4rem;
            font-family: 'Times New Roman', Times, serif;
            margin-bottom: 0.5rem;
            font-weight: bold;
        }
        .description {
            font-size: 1rem;
            margin-bottom: 0.5rem;
            font-weight: lighter;
            // how can I wrap text when it's too long?
            overflow-wrap: break-word;

        }
        span {
            border-radius: 1rem;
            width: fit-content;
            align-self: flex-end;
            background-color: #0f9bba;
            p {
                width: fit-content;
                padding: 0.2rem 0.5rem;
                font-size: 0.8rem;
                font-weight: lighter;
                color: #fff;
            }
        }
        hr {
            width: 100%;
        }
        .card-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .card-info-left {
                position: relative;
                right: 0.5rem;
                display: flex;
                align-items: center;
                img {
                    width: 2.5rem;
                }
                p {
                    margin-left: 0.3rem;
                }
            }
            .card-info-right {
                p {
                    font-size: 0.8rem;
                    font-weight: lighter;
                    color: #879194;
                }
            }
        }
    }

    &:hover {
        transform: scale(1.005);
        img {
            transition: all 0.3s ease;
            opacity: 1;
        }
    }
`;

export default Card;
