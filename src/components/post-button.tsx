import React from "react";
import prevbutton from "../assets/images/prevpostbutton.svg"
import nextbutton from "../assets/images/nextpostbutton.svg"
import listbutton from "../assets/images/list-checkbox.svg"
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const NAVIGATE_POST = gql`
query NoticePostNavigation(
    $noticePostNavigationId: ID!, $params: NoticePostNavigationParamsInput
    ) {
        noticePostNavigation(id: $noticePostNavigationId, params: $params) {
            prePostId
            nextPostId
            params{
                search
            }
        }
    }
`
interface IPost {
    postId: string | undefined;
}

export default function PostButton(id: IPost) {
    const { data } = useQuery(NAVIGATE_POST, {
        variables: {
            noticePostNavigationId: `${id.postId}`,
            params: {
                search: "as",
            }
        }
    })
    const prePostId = data?.noticePostNavigation.prePostId;
    const nextPostId = data?.noticePostNavigation.nextPostId;
    const param = data?.noticePostNavigation.params.search
    const prePostIsNone = prePostId === null;
    const nextPostIsNone = nextPostId === null;

    const navigate = useNavigate();

    const navPrevPost = () => {
        if (prePostIsNone) {
            return;
        }
        navigate(`/${prePostId}`)
    }
    const navNextPost = () => {
        if (nextPostIsNone) {
            return;
        }
        if (param !== "") {
            navigate(`/${nextPostId}?${param}`)
        }
    }
    const navList = () => {
        //TODO : 목록버튼 클릭 시 공지 클릭한 페이지로 이동
        navigate(`/`)
    }

    return (
        <>
            <PostButtonForm prevPost={prePostIsNone} nextPost={nextPostIsNone}>
                <button onClick={() => navPrevPost()} className="prevPostBtn">
                    <img alt="prevbutton" src={prevbutton} />
                    이전글
                </button>
                <button onClick={() => navNextPost()} className="nextPostBtn">
                    다음글
                    <img alt="nextbutton" src={nextbutton} />
                </button>
                <button className="listbutton" onClick={() => navList()}>
                    <img alt="listlogo" src={listbutton} />
                    목록
                </button>
            </PostButtonForm>
        </>
    )
}

const PostButtonForm = styled.div<{ prevPost: boolean, nextPost: boolean }>`
  margin: 30px 0 100px;
  display: flex;
  position: relative;
  button:first-child {
    margin-right: 10px;
  }
  button:not(:last-child) {
    width: 107px;
  }
  button {
    height: 46px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    color: #666;
    font-size: 16px;
    font-weight: 500;
    line-height: 18px;
    border-radius: 4px;
    border: solid 1px #DDDDDD;
    background-color: white;
  }
  .prevPostBtn{
    opacity: ${props => props.prevPost && ".9"};
    cursor: ${props => props.prevPost && "default"};
    color: ${props => props.prevPost ? "#777" : "#666"};
    background-color: ${props => props.prevPost ? "#EEEEEE" : "white"};
  }
  .nextPostBtn{
    opacity: ${props => props.nextPost && ".9"};
    cursor: ${props => props.nextPost && "default"};
    color: ${props => props.nextPost ? "#777" : "#666"};
    background-color: ${props => props.nextPost ? "#EEEEEE" : "white"};
  }
  .listbutton {
    width: 99px;
    position: absolute;
    right: 0;
    img {
        padding-right: 11px;
    }
}
`;