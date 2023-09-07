import styled from "styled-components";
import React, { useState } from "react";
import PostDetail from "../../components/post-detail";
import flielogo from "../../assets/images/filelogo.svg";
import download from "../../assets/images/downloadlogo.svg";
import { onlikelogo, offlikelogo, sharelogo, scraplogo } from "../../assets/images/logos/functions";
import WriteComment from "../../components/write-comment";
import Title from "../../components/title";
import PostButton from "../../components/post-button";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_NOTICE_DATA = gql`
    query NoticePost($noticePostId: ID!) {
        noticePost(id: $noticePostId) {
            id
            category {
                name
            }
            title
            author {
                name
            }
            createdAt
            viewCnt
            likeCnt
            content
            files {
                filename
            }
            isLike
            isPinned
            replyCount
        }
    }
`;

export default function Individual() {
    let { id } = useParams();
    const { loading, data } = useQuery(GET_NOTICE_DATA, {
        variables: {
            noticePostId: `${id}`,
        }
    })

    const [likes, setLikes] = useState<Boolean>(data?.noticePost.isLike);
    const [scraps, setScraps] = useState<Boolean>(data?.noticePost.isPinned);

    const likeStateChange = () => {
        if (!data) {
            alert("error!")
            return;
        }
        else setLikes(!likes);
    };
    const scrapStateChange = () => {
        if (!data) {
            alert("error!")
            return;
        }
        else setScraps(!scraps);
    };

    const setNumber = (cnt: number) => {
        return (
            new Intl.NumberFormat('en-US', {
                notation: 'compact',
                maximumFractionDigits: 1,
            }).format(cnt)
        )
    }

    const filedown = () => {
        alert(`${data.noticePost.file}` + " 파일이 다운로드 되었습니다.");
    }

    const sharePage = () => {
        if (navigator.share) {
            navigator.share({
                title: 'localhost',
                url: `${window.location.href}`
            }).then(() => {
                console.log("현재 페이지가 공유되었습니다.")
            }).catch(console.error)
        }
        else {
            alert('현재 브라우저에서 지원하지 않는 기능입니다!')
        }//TODO
    };

    return (
        <>
            <Title state={false} />
            <PostLayout>
                {!loading && data ? (
                    <>
                        <PostTitle>
                            <div className="postTitleForm">
                                <h5>공지사항</h5>
                                <h3>{[data.noticePost.category]} {data.noticePost.title}</h3>
                                <PostDetail
                                    writer={data.noticePost.author.name}
                                    createdAt={data.noticePost.createdAt}
                                    viewCnt={data.noticePost.viewCnt}
                                    likeCnt={data.noticePost.likeCnt}
                                />
                            </div>
                        </PostTitle>
                        <PostBody>
                            <div
                                dangerouslySetInnerHTML={{ __html: `${data.noticePost.content}` }}
                            ></div>
                            <FlieBoxForm>
                                {data.noticePost.file ?
                                    <FileBoxLayout>
                                        <span>첨부파일</span>
                                        <div>
                                            <img className="filelogo" alt="filelogo" src={flielogo} />
                                            <span onClick={filedown} className="filename">
                                                {data.noticePost.file}
                                            </span>
                                            <div onClick={filedown} className="downloadform">
                                                다운로드
                                                <img
                                                    className="downloadlogo"
                                                    alt="downloadlogo"
                                                    src={download}
                                                />
                                            </div>
                                        </div>
                                    </FileBoxLayout>
                                    : <div className="fileless">첨부된 파일이 없습니다.</div>}
                            </FlieBoxForm>
                            <Functions>
                                <div className="firstline" onClick={likeStateChange}>
                                    {likes ? (
                                        <img
                                            className="a"
                                            alt="likelogo"
                                            src={onlikelogo}
                                        />
                                    ) : (
                                        <img
                                            alt="likelogo"
                                            src={offlikelogo}
                                        />
                                    )}
                                    {setNumber(data.noticePost.likeCnt)}
                                </div>
                                <div onClick={sharePage}>
                                    <img alt="sharelogo" src={sharelogo} /> 공유하기
                                </div>
                                <div className="secondline" onClick={() => scrapStateChange()}>
                                    {scraps ? (
                                        <img
                                            alt="scraplogo"
                                            src={onlikelogo}
                                        />
                                    ) : (
                                        <img
                                            alt="scraplogo"
                                            src={scraplogo}
                                        />
                                    )}
                                    스크랩
                                </div>
                            </Functions>
                        </PostBody>
                        <WriteComment
                            commentCnt={data.noticePost.replyCount}
                        />
                        <PostButton postId={id} />
                    </>
                ) : (
                    <div>로딩중</div>
                )}
            </PostLayout >
        </>
    );
}
const PostLayout = styled.div`
  margin: 0 auto;
  width: 1240px;
  border-top: solid 2px black;
`;
const PostTitle = styled.div`
  border-bottom: solid 1px #d8dde5;
  .postTitleForm {
    margin: 30px 0 22px 24px;
  }
  h5 {
    color: #5a33be;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 700;
    margin: 0;
  }
  h3 {
    color: #333;
    font-family: Pretendard;
    font-size: 24px;
    font-weight: 500;
    line-height: 24px;
    margin: 18px 0 22px;
  }
`;

const PostBody = styled.div`
  margin: 50px 30px 35px;
`;

const FlieBoxForm = styled.div`
  width: 1180px;
  height: auto;
  margin: 60px 0 40px;
  border-radius: 3px;
  border: solid 1px #bfc3c8;
  .fileless{
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #626873;
  }
`;
const FileBoxLayout = styled.div`
  margin: 30px 0 0 34px;
  display: flex;
  flex-direction: column;
  > span {
    color: #333;
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
    margin-bottom: 19px;
  }

  > div {
    text-decoration: underline;
    width: 1112px;
  }
  div {
    display: flex;
    color: #666;
    font-size: 16px;
    font-weight: 400;
    line-height: 14px;
    position: relative;
    .filelogo {
      margin: 0 10px 0 0;
    }
    .filename {
      cursor: pointer;
      max-width: 90%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .downloadform {
      cursor: pointer;
      color: blue;
      float: right;
      position: absolute;
      right: 0;
      .downloadlogo {
        margin: 0 0 0 3px;
      }
    }
  }

  div:not(:last-child) {
    border-bottom: solid 1px #d8dde5;
    padding-bottom: 18px;
    margin-bottom: 18px;
  }
  div:last-child {
    margin-bottom: 30px;
  }
`;
const Functions = styled.div`
  margin: 0 auto;
  width: 420px;
  height: 60px;
  border-radius: 5px;
  border: 1px solid #d8dde5;
  display: flex;
  justify-content: space-around;
  margin-bottom: 35px;
  div {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2b2b2b;
    font-size: 14px;
    line-height: 14px;
    flex: 1;
  }
  img {
    margin-right: 6px;
  }
  .firstline {
    border-right: solid 1px #d8dde5;
  }
  .secondline {
    border-left: solid 1px #d8dde5;
  }
`;
