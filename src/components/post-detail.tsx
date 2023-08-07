import styled from "styled-components";
import React from "react";
import viewerlogo from "../assets/images/viewer.svg";
import likeslogo from "../assets/images/likes.svg";

export default function PostDetail() {
    return (
        <Details>
            <div>KFIRI</div>
            <div>2023.01.01</div>
            <div className="sort">
                <img alt="viewer" src={viewerlogo} />
                <div>88</div>
            </div>
            <div className="sort">
                <img alt="likes" src={likeslogo} />
                <div>88</div>
            </div>
        </Details>
    );
}

const Details = styled.div`
    margin-top: 22px;
    display: flex;
    align-items: center;
    color: #666666;
    img{
        margin-right: 4px;
    }
    .sort{
        display: flex;
    }
    >div:not(:first-child){
        border-left: solid 1px #D8DDE5;
        line-height: 10px;
        float: left;
        margin-left: 12px;
        padding-left: 12px;
    }
`