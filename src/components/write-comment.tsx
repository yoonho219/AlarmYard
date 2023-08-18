import styled from "styled-components";
import React, { useState } from "react";

interface ICommentProps {
    commentCnt: number;
    refetch: () => void;
}

export default function Commenting({ commentCnt, refetch }: ICommentProps) {
    const [input, setInput] = useState<string>('');

    const commentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value)
    }

    const postComment = () => {
        if (input === '') {
            alert('댓글을 작성해주세요.')
        }
        else {
            setInput('')
            alert("댓글이 등록되었습니다.")
            refetch();
        }
    }

    const updateComment = () => {
        alert('댓글을 수정하시겠습니까?')
    }
    const deleteComment = () => {
        alert('댓글을 삭제하시겠습니까?')
    }
    const reportCommnet = () => {
        alert('댓글을 신고하시겠습니까?')
    }

    return (
        <>
            <PostBottom>
                <PostCommentLayout>
                    <PostCommentCount>
                        <span>댓글 <span style={{ color: "blue" }}>{commentCnt}</span></span>
                    </PostCommentCount>
                    {commentCnt === 0 ? (
                        <PostComment>등록된 댓글이 없습니다.</PostComment>
                    ) : (
                        <PostCommentsForm>
                            <PostComments>
                                <div>
                                    <div className="sort">
                                        <span className="writer">작성자</span>
                                        <span className="date">2023.01.01</span>
                                        <CommentButton>
                                            <div onClick={() => updateComment()} className="update">수정</div>
                                            <div onClick={() => deleteComment()}>삭제</div>
                                        </CommentButton>
                                    </div>
                                    <p>도움이 되는 연구정보였습니다.감사합니다.</p>
                                </div>
                            </PostComments>
                            <PostComments>
                                <div>
                                    <div className="sort">
                                        <span className="writer">김**</span>
                                        <span className="date">2023.01.01</span>
                                        <CommentButton>
                                            <div onClick={() => reportCommnet()}>신고</div>
                                        </CommentButton>
                                    </div>
                                    <p>좋은 자료입니다.</p>
                                </div>
                            </PostComments>
                        </PostCommentsForm>
                    )}
                    <BoxLayout>
                        <CommentForm>
                            <textarea
                                value={input}
                                onChange={commentInput}
                                placeholder="댓글을 작성하세요."
                            />
                            <span onClick={postComment}>등록</span>
                        </CommentForm>
                    </BoxLayout>
                </PostCommentLayout>
            </PostBottom>
        </>
    )
}

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