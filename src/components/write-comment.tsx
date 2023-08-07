import styled from "styled-components";
import React from "react";

export default function WriteComment() {
    return (
        <BoxLayout>
            <CommentForm>
                <textarea placeholder="댓글을 작성하세요." />
                <span>등록</span>
            </CommentForm>
        </BoxLayout>
    )
}

const BoxLayout = styled.div`
    margin: 0 auto;
    width: 1180px;
    height: 180px;
    border-radius: 3px;
    border: solid 1px #BFC3C8;
    textarea{
        width: 95%;
        height: 100%;
        border: none;
        resize: none;
        color: #666;
        font-family: Pretendard;
        font-size: 16px;
        font-weight: 400;
        line-height: 16px;
    }:focus{
        outline: none;
    }

    span{
        cursor: pointer;
        color: #193DD0;
        font-size: 18px;
        font-weight: 600;
        line-height: 14px;
        float: right;
    }
`
const CommentForm = styled.div`
    margin: 35px;
    height: calc(100% - 70px);
    ::-webkit-scrollbar{
        display: none;
    }
`