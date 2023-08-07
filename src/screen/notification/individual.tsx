import styled from "styled-components"
import React, { useState } from "react"
import PostDetail from "../../components/post-detail"
import postimage from "../../assets/images/postimage.svg"
import flielogo from "../../assets/images/filelogo.svg"
import download from "../../assets/images/downloadlogo.svg"
import { onlikelogo, offlikelogo, sharelogo, scraplogo, } from "../../assets/images/logos/functions"
import WriteComment from "../../components/write-comment"
import prevbutton from "../../assets/images/prevpostbutton.svg"
import nextbutton from "../../assets/images/nextpostbutton.svg"
import listbutton from "../../assets/images/list-checkbox.svg"

export default function Individual() {
    const [likes, setLikes] = useState<Boolean>(false);
    const [scraps, setScraps] = useState<Boolean>(false);

    const likeStateChange = () => {
        setLikes(!likes);
    };
    const scrapStateChange = () => {
        setScraps(!scraps)
    }

    return (
        <>
            <TopLayout>
                <span className="alarmyard">알림마당</span>
                <span className="notification">공지사항</span>
            </TopLayout>
            <PostLayout>
                <PostTitle>
                    <div className="postTitleForm">
                        <h5>공지사항</h5>
                        <h3>[KRBI] 2023년 1분기 외식산업경기전망지수</h3>
                        <PostDetail />
                    </div>
                </PostTitle>
                <PostBody>
                    <text>
                        1 ) 공모 대상
                        ∙ 국내2·4년제대학교 재학생 및 휴학생(팀 구성 참여 가능, 최대4인까지)

                        2 ) 공모 주제 외식업주 경영역량 강화방안
                        ∙ 포스트 코로나 이후 외식산업 비대면 서비스 활용방안
                        ∙ 외식산업의 매출·수익·생산성 제고 방안
                        ∙ 외식업의 식재료·인건비 절감 방안
                        ∙ 4차 산업혁명 기술이 접목된 외식산업 스마트스토어 모델 구축
                        ∙ 외식산업 스마트스토어를 활용한 비용 절감 및 생산성 제고 방안
                        ∙ 외식산업 푸드테크 활용 방안
                        ∙ 외식업 스타트업 비즈니스 모델 제안
                        ∙ 밀키트 활용방안
                        ∙ 외식업 폐기물(음식물 쓰레기, 배달 포장용기) 감축 실천방안

                        3 ) 공모 일정
                        ∙ 공모 기간: 2022년 9월 19일(월) ~ 2022년 10월 20일(목)
                        ∙ 1차 심사 합격자 개별통보: 2022년 10월 24일(월) 예정
                        ∙ 2차 발표 및 시상: 2022년 10월 28일(금) 오전 9시 30분 [변경됨]

                        4 ) 공모 접수
                        ∙ 제출방법: PDF파일(15분 발표분량, 2022외식경영스타_팀명_주제명)을 작성한 후
                        아래의 제출 서류와 함께 공모전 접수 담당자 이메일 (kfiri.org@gmail.com)로 제출
                        ∙ 제출서류
                        1. 참가신청서 1부
                        2. 개인정보 수집∙이용 동의서 1부
                        3. 참가자전원 재학증명서 각1부
                        (참가신청 양식은 한국외식산업연구원 홈페이지 www.kfiri.org 공지사항 참조)
                    </text>
                    {/* <div dangerouslySetInnerHTML={{ __html: "<p>asdasdasd</p>" }}>
                    </div> */}
                    <FlieBoxForm>
                        <FileBoxLayout>
                            <span>
                                첨부파일
                            </span>
                            <div>
                                <img className="filelogo" alt="filelogo" src={flielogo} />
                                <span className="filename">
                                    2022_외식경영스타_아이디어_공모전_참가신청서_2022외식경영스타_팀명_주제명.PDF
                                </span>
                                <div className="downloadform">
                                    다운로드
                                    <img className="downloadlogo" alt="downloadlogo" src={download} />
                                </div>
                            </div>
                            <div>
                                <img className="filelogo" alt="filelogo" src={flielogo} />
                                'files'
                                <div className="downloadform">
                                    다운로드
                                    <img className="downloadlogo" alt="downloadlogo" src={download} />
                                </div>
                            </div>
                        </FileBoxLayout>
                    </FlieBoxForm>
                    <Functions>
                        <div className="firstline">
                            {likes ? <img className="a" alt="likelogo" src={onlikelogo} onClick={likeStateChange} />
                                : <img alt="likelogo" src={offlikelogo} onClick={likeStateChange} />}
                            200</div>
                        <div>
                            <img alt="sharelogo" src={sharelogo} /> 공유하기</div>
                        <div className="secondline">
                            {scraps ? <img alt="scraplogo" src={onlikelogo} onClick={scrapStateChange} /> :
                                <img alt="scraplogo" src={scraplogo} onClick={scrapStateChange} />}
                            스크랩</div>
                    </Functions>
                </PostBody>
                <PostBottom>
                    <PostCommentLayout>
                        <PostCommentCount>
                            <span>댓글</span>
                        </PostCommentCount>
                        <PostComment>
                            등록된 댓글이 없습니다.
                        </PostComment>
                        {/* <PostCommentsForm>
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
                        </PostCommentsForm> */}
                        <WriteComment />
                    </PostCommentLayout>
                </PostBottom>
                <PostButtonForm>
                    <button><img alt="prevbutton" src={prevbutton} />이전글</button>
                    <button className="nextbutton">다음글<img alt="nextbutton" src={nextbutton} /></button>
                    <button className="listbutton"><img alt="listlogo" src={listbutton} /> 목록</button>
                </PostButtonForm>
            </PostLayout>
        </>
    )
};
const TopLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
    span{
        text-align: center;
        font-feature-settings: 'clig' off, 'liga' off;
        font-family: Pretendard;
        font-style: normal;
    }
    .alarmyard{
        margin-top: 60px;
        color: #666;
        font-size: 18px;
        font-weight: 500;
        line-height: 18px;
    }
    .notification{
        margin-top: 10px;
        color: #333;
        font-size: 30px;
        font-weight: 700;
        line-height: 30px;
    }
`

const PostLayout = styled.div`
    margin: 0 auto;
    width: 1240px;
    border-top: solid 2px black;
`
const PostTitle = styled.div`
    border-bottom: solid 1px #D8DDE5;
    .postTitleForm{
        margin: 30px 0 22px 24px;
    }
    h5{
        color: #5A33BE;
        font-family: Pretendard;
        font-size: 16px;
        font-weight: 700;
        margin: 0;
    }
    h3{
        color: #333;
        font-family: Pretendard;
        font-size: 24px;
        font-weight: 500;
        line-height: 24px;
        margin: 18px 0 22px;
    }
`

const PostBody = styled.div`
    margin: 50px 30px 35px;
`

const FlieBoxForm = styled.div`
    width: 1180px;
    height: auto;
    margin: 60px 0 40px;
    border-radius: 3px;
    border: solid 1px #BFC3C8;
`
const FileBoxLayout = styled.div`
    margin: 30px 0 0 34px;
    display: flex;
    flex-direction: column;
    >span{
        color: #333;
        font-size: 18px;
        font-weight: 600;
        line-height: 18px;
        margin-bottom: 19px;
    }

    >div{
        text-decoration: underline;
        width: 1112px;
    }
    div{
        display: flex;
        color: #666;
        font-size: 16px;
        font-weight: 400;
        line-height: 14px;
        position: relative;
        .filelogo{
            margin: 0 10px 0 0;
        }
        .filename{
            cursor: pointer;
            width: 90%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .downloadform{
            cursor: pointer;
            color: blue;
            float: right;
            position: absolute;
            right: 0;
            .downloadlogo{
                margin: 0 0 0 3px;
            }
        }
    }

    div:not(:last-child){
        border-bottom: solid 1px #D8DDE5;
        padding-bottom: 18px;
        margin-bottom: 18px;
    }
    div:last-child{
        margin-bottom: 30px;
    }
`
const Functions = styled.div`
    margin: 0 auto;
    width: 420px;
    height: 60px;
    border-radius: 5px;
    border: 1px solid #D8DDE5;
    display: flex;
    justify-content: space-around;
    margin-bottom: 35px;
    div{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #2B2B2B;
        font-size: 14px;
        line-height: 14px;
        flex: 1;
    }
    img{
        margin-right: 6px;
    }
    .firstline{
        border-right: solid 1px #D8DDE5;
    }
    .secondline{
        border-left: solid 1px #D8DDE5;
    }
`

const PostBottom = styled.div`
    border-top: solid 1px #DCDCDC;
    border-bottom: solid 1px black;
`
const PostCommentLayout = styled.div`
    margin: 35px 30px;
`
const PostCommentCount = styled.div`
    span{
        font-size: 20px;
        font-weight: 600;
        line-height: 18px;
    }
`
const PostComment = styled.div`
    margin: 80px 0;
    display: flex;
    justify-content: center;
    color: #626873;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
`
const PostCommentsForm = styled.div`
    margin-top: 29px;
    :last-child{
        margin-bottom: 20px;
    }
`
const PostComments = styled.div`
    height: 152px;
    border-radius: 10px;
    background: #F4F8FF;
    margin-top: 10px;
    >div{
        padding: 34px;
    }
    div.sort{
        height: 14px;
        display: flex;
        position: relative;
    }
    span:first-child{
        height: 10px;
        border-right: solid 1px #D8DDE5;
        margin-right: 12px;
        padding-right: 12px;
        font-weight: 500;
    }
    span{
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 14px;
    }.writer{
        color: #333;
    }.date{
        color: #6A768C;
    }
    p{
        width: 100%;
        height: 100%;
        color: #626873;
        margin-top: 15px;
        font-family: Pretendard;
        font-size: 16px;
        font-weight: 400;
        line-height: 28px;
    }
`
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
    .update{
        height: 10px;
        margin-right: 12px;
        padding-right: 12px;
        border-right: solid 1px #D8DDE5;
    }
`

const PostButtonForm = styled.div`
    margin: 30px 0 100px;
    display: flex;
    position: relative;
    button:not(:last-child){
        width: 107px;
    }
    button{
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
        border: solid 1px #DCDCDC;
        background-color: white;
    }
    .nextbutton{
        margin-left: 10px;
    }
    .listbutton{
        width: 99px;
        position: absolute;
        right: 0;
        img{
            padding-right: 11px;
        }
    }
`