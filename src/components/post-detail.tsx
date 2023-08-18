import styled from "styled-components";
import React from "react";
import viewerlogo from "../assets/images/viewer.svg";
import likeslogo from "../assets/images/likes.svg";
import { DateTime } from "luxon";
interface detailType {
    writer: string;
    createdAt: number;
    viewCnt: number;
    likeCnt: number;
}

export default function PostDetail({
    writer,
    createdAt,
    viewCnt,
    likeCnt,
}: detailType) {
    const setNumber = (cnt: number) => {
        return (
            new Intl.NumberFormat('en-US', {
                notation: 'compact',
                maximumFractionDigits: 1,
            }).format(cnt)
        )
    }

    return (
        <Details>
            <div>{writer}</div>
            <div>{DateTime.fromMillis(createdAt).toFormat('yyyy.MM.dd')}</div>
            <div className="sort">
                <img alt="viewer" src={viewerlogo} />
                <div>{setNumber(viewCnt)}</div>
            </div>
            <div className="sort">
                <img alt="likes" src={likeslogo} />
                <div>{setNumber(likeCnt)}</div>
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