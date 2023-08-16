import styled from "styled-components";
import React, { useState } from "react";
import PostDetail from "../../components/post-detail";
import flielogo from "../../assets/images/filelogo.svg";
import download from "../../assets/images/downloadlogo.svg";
import { onlikelogo, offlikelogo, sharelogo, scraplogo } from "../../assets/images/logos/functions";
import WriteComment from "../../components/write-comment";
import prevbutton from "../../assets/images/prevpostbutton.svg";
import nextbutton from "../../assets/images/nextpostbutton.svg";
import listbutton from "../../assets/images/list-checkbox.svg";
import Title from "../../components/title";
import { useGetNotice } from "../../api";

interface Notice {
    id: string;
    title: string;
    content: string;
    category: string;
    writer: {
        id: string;
        name: string;
    };
    createdAt: number;
    viewCnt: number;
    likeCnt: number;
    commentCnt: number;
    file: [string] | null;
    isLike: boolean;
    isScrap: boolean;
}

interface IUseNotice {
    loading: boolean;
    data: Notice | null;
    error: null;
}

export default function Individual() {
    const { loading, data, error } = useGetNotice() as unknown as IUseNotice;
    const [likes, setLikes] = useState<Boolean>(false);
    const [scraps, setScraps] = useState<Boolean>(false);

    const likeStateChange = () => {
        setLikes(!likes);
        data && (data.isLike = !data.isLike);
        data && (data.isLike ? data.likeCnt += 1 : data.likeCnt -= 1)
    };  //ASK
    const scrapStateChange = () => {
        setScraps(!scraps);
        data && (data.isScrap = !data.isScrap);
    };

    const setNumber = (cnt: number) => {
        return (
            new Intl.NumberFormat('en-US', {
                notation: 'compact',
                maximumFractionDigits: 1,
            }).format(cnt)
        )
    }

    return (
        <>
            <Title state={false} />
            <PostLayout>
                {!loading && data ? (
                    <>
                        <PostTitle>
                            <div className="postTitleForm">
                                <h5>공지사항</h5>
                                <h3>{data.title}</h3>
                                <PostDetail
                                    writer={data.writer.name}
                                    createdAt={data.createdAt}
                                    viewCnt={data.viewCnt}
                                    likeCnt={data.likeCnt}
                                />
                            </div>
                        </PostTitle>
                        <PostBody>
                            <div
                                dangerouslySetInnerHTML={{ __html: `${data?.content}` }}
                            ></div>
                            <FlieBoxForm>
                                {data.file ?
                                    <FileBoxLayout>
                                        <span>첨부파일</span>
                                        <div>
                                            <img className="filelogo" alt="filelogo" src={flielogo} />
                                            <span className="filename">
                                                2022_외식경영스타_아이디어_공모전_참가신청서_2022외식경영스타_팀명_주제명.PDF
                                            </span>
                                            <div className="downloadform">
                                                다운로드
                                                <img
                                                    className="downloadlogo"
                                                    alt="downloadlogo"
                                                    src={download}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <img className="filelogo" alt="filelogo" src={flielogo} />
                                            'files'
                                            <div className="downloadform">
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
                                <div className="firstline">
                                    {data.isLike ? (
                                        <img
                                            className="a"
                                            alt="likelogo"
                                            src={onlikelogo}
                                            onClick={likeStateChange}
                                        />
                                    ) : (
                                        <img
                                            alt="likelogo"
                                            src={offlikelogo}
                                            onClick={likeStateChange}
                                        />
                                    )}
                                    {setNumber(data.likeCnt)}
                                </div>
                                <div>
                                    <img alt="sharelogo" src={sharelogo} /> 공유하기
                                </div>
                                <div className="secondline">
                                    {data.isScrap ? (
                                        <img
                                            alt="scraplogo"
                                            src={onlikelogo}
                                            onClick={scrapStateChange}
                                        />
                                    ) : (
                                        <img
                                            alt="scraplogo"
                                            src={scraplogo}
                                            onClick={scrapStateChange}
                                        />
                                    )}
                                    스크랩
                                </div>
                            </Functions>
                        </PostBody>
                        <PostBottom>
                            <PostCommentLayout>
                                <PostCommentCount>
                                    <span>댓글 <span style={{ color: "blue" }}>{data.commentCnt}</span></span>
                                </PostCommentCount>
                                {data.commentCnt === 0 ? (
                                    <PostComment>등록된 댓글이 없습니다.</PostComment>
                                ) : (
                                    <PostCommentsForm>
                                        <PostComments>
                                            <div>
                                                <div className="sort">
                                                    <span className="writer">작성자</span>
                                                    <span className="date">2023.01.01</span>
                                                    <CommentButton>
                                                        <div className="update">수정</div>
                                                        <div>삭제</div>
                                                    </CommentButton>
                                                </div>
                                                <p>도움이 되는 연구정보였습니다.감사합니다.</p>
                                            </div>
                                        </PostComments>
                                        <PostComments>
                                            <div>
                                                <div className="sort">
                                                    <span className="writer">작성자</span>
                                                    <span className="date">2023.01.01</span>
                                                    <CommentButton>
                                                        <div>신고</div>
                                                    </CommentButton>
                                                </div>
                                                <p>좋은 자료입니다.</p>
                                            </div>
                                        </PostComments>
                                    </PostCommentsForm>
                                )}
                                <WriteComment />
                            </PostCommentLayout>
                        </PostBottom>
                        <PostButtonForm>
                            <button>
                                <img alt="prevbutton" src={prevbutton} />
                                이전글
                            </button>
                            <button className="nextbutton">
                                다음글
                                <img alt="nextbutton" src={nextbutton} />
                            </button>
                            <button className="listbutton">
                                <img alt="listlogo" src={listbutton} />
                                목록
                            </button>
                        </PostButtonForm>
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
      width: 90%;
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

const PostBottom = styled.div`
  border-top: solid 1px #dcdcdc;
  border-bottom: solid 1px black;
`;
const PostCommentLayout = styled.div`
  margin: 35px 30px;
`;
const PostCommentCount = styled.div`
    font-size: 20px;
    font-weight: 600;
    line-height: 18px;
`;
const PostComment = styled.div`
  margin: 80px 0;
  display: flex;
  justify-content: center;
  color: #626873;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
`;
const PostCommentsForm = styled.div`
  margin-top: 29px;
  :last-child {
    margin-bottom: 20px;
  }
`;
const PostComments = styled.div`
  height: 152px;
  border-radius: 10px;
  background: #f4f8ff;
  margin-top: 10px;
  > div {
    padding: 34px;
  }
  div.sort {
    height: 14px;
    display: flex;
    position: relative;
  }
  span:first-child {
    height: 10px;
    border-right: solid 1px #d8dde5;
    margin-right: 12px;
    padding-right: 12px;
    font-weight: 500;
  }
  span {
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
  }
  .writer {
    color: #333;
  }
  .date {
    color: #6a768c;
  }
  p {
    width: 100%;
    height: 100%;
    color: #626873;
    margin-top: 15px;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
  }
`;
const CommentButton = styled.div`
  cursor: pointer;
  height: 14px;
  position: absolute;
  right: 0;
  color: #666;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  display: flex;
  .update {
    height: 10px;
    margin-right: 12px;
    padding-right: 12px;
    border-right: solid 1px #d8dde5;
  }
`;

const PostButtonForm = styled.div`
  margin: 30px 0 100px;
  display: flex;
  position: relative;
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
    border: solid 1px #dcdcdc;
    background-color: white;
  }
  .nextbutton {
    margin-left: 10px;
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
