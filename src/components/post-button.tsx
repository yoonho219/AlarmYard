import React, { useEffect } from "react";
import prevbutton from "../assets/images/prevpostbutton.svg"
import nextbutton from "../assets/images/nextpostbutton.svg"
import listbutton from "../assets/images/list-checkbox.svg"
import { styled } from "styled-components";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
    const navigate = useNavigate();

    const [params, setParams] = useSearchParams();
    const searched = params.get('search');
    const { data } = useQuery(NAVIGATE_POST, {
        variables: {
            noticePostNavigationId: `${id.postId}`,
            // params: searched && {
            //     search: `${searched}`,
            // }
        },
    })
    const prePostId = data?.noticePostNavigation.prePostId;
    const nextPostId = data?.noticePostNavigation.nextPostId;
    const prePostIsNone = prePostId === null;
    const nextPostIsNone = nextPostId === null;

    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])

    const navPrevPost = () => {
        if (prePostIsNone) {
            return;
        }
        if (searched !== "") {
            navigate(`/${prePostId}?${params}`)
        }
        else navigate(`/${prePostId}`)
    }
    const navNextPost = () => {
        if (nextPostIsNone) {
            return;
        }
        if (searched !== "") {
            navigate(`/${nextPostId}?${params}`)
        }
        else navigate(`/${nextPostId}`)
    }
    const navList = () => {
        navigate(`/?${params}`)
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
                <button onClick={() => navList()} className="listbutton" >
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