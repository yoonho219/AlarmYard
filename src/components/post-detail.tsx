import styled from "styled-components";
import React from "react";
import viewerlogo from "../assets/images/viewer.svg";
import likeslogo from "../assets/images/likes.svg";

export default function PostDetail(details: any) {
    const { DateTime } = require("luxon");

    const setNumber = (nums: number) => {
        if (nums >= 1000 && nums < 1000000) {
            return Math.round(nums / 100) / 10 + "k";
        }
        else if (nums >= 1000000 && nums < 1000000000) {
            return Math.round(nums / 100000) / 10 + "m";
        }
        else if (nums >= 1000000000) {
            return Math.round(nums / 100000000) / 10 + "b";
        }
        else return nums;
    }

    return (
        <Details>
            <div>{details.writer}</div>
            <div>{DateTime.fromMillis(details.createdAt).toFormat('yyyy.MM.dd')}</div>
            <div className="sort">
                <img alt="viewer" src={viewerlogo} />
                {details.viewCnt ? <div>{setNumber(details.viewCnt)}</div> : 0}
            </div>
            <div className="sort">
                <img alt="likes" src={likeslogo} />
                {details.likeCnt ? <div>{setNumber(details.likeCnt)}</div> : 0}
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