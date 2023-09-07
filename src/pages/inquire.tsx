import { styled } from "styled-components";
import React, { useState } from "react";
import search from "../assets/images/searchlogo.svg"
import lock from "../assets/images/lock.svg"
import PageNumber from "../components/pagination";
import openlogo from "../assets/images/openlogo.svg"
import closelogo from "../assets/images/closelogo.svg"
import writelogo from "../assets/images/writelogo.svg"
import Title from "../components/title";

interface InquireProps {
    number: number,
    title: string,
    writer: string,
    date: string,
    situation: boolean,
    texts?: string,
    answer?: string,
}

const inquireInfo = [
    {
        number: 50,
        title: "안녕하세요. 문의드립니다.",
        writer: "김**",
        date: "2023.01.01",
        situation: true,
        texts: "관리자만 확인이 가능합니다"
    },
    {
        number: 51,
        title: "안녕하세요. 문의드립니다.",
        writer: "이**",
        date: "2023.01.01",
        situation: false,
        texts: "어떻게 해야 하나요?"
    },
    {
        number: 52,
        title: "안녕하세요. 문의드립니다.",
        writer: "박**",
        date: "2023.01.01",
        situation: true,
    },
]

export default function Inquire() {
    const [state, setState] = useState<Boolean>(true);

    const inquireState = () => {
        setState(!state);
    }

    return (
        <>
            <Title
                state={true}
            />
            <InquiryForm>
                {inquireInfo.map((e: InquireProps) => (
                    <>
                        <Inquirys>
                            <Number>{e.number}</Number>
                            <div className="inquiryTitle">
                                <InquireTitle>
                                    <p>Q.</p>
                                    <h4>{e.title}</h4>
                                    <img alt="locklogo" src={lock} />
                                </InquireTitle>
                                <InquiryInfo>
                                    <span className="writer">{e.writer}</span>
                                    <span className="date">{e.date}</span>
                                </InquiryInfo>
                            </div>
                            <div className="states">
                                {e.situation ? <AnswerState className="answered">답변완료</AnswerState>
                                    : <AnswerState className="waiting">답변대기중</AnswerState>}
                                {state ? <img alt="openlogo" src={openlogo} onClick={() => inquireState()} />
                                    : <img alt="closelogo" src={closelogo} onClick={() => inquireState()} />}
                            </div>
                        </Inquirys>
                        <div style={{ height: !state ? "100px" : "0px", transition: !state ? ".3s ease-out" : ".6s ease-out" }}>
                            {!state ? "adaaaa" : ""}
                        </div>
                    </>

                ))}
            </InquiryForm >
            {/*data? <PageNumber
                limit={limit}        
            page={page}
            pageGroup={pageGroup}
            setPageGroup={setPageGroup}
            counts={data?.totalCnt}
            movePage={movePage}
            /> : ""*/}
            <WriteInquiry>
                <img alt="writelogo" src={writelogo} />
                작성하기
            </WriteInquiry>
        </>
    )
}

const TopLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
    h2,h3{
        margin: 0;
    }
    span{
        margin: 0;
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
    .inquiry{
        margin-top: 10px;
        color: #333;
        font-size: 30px;
        font-weight: 700;
        line-height: 30px;
    }
`
const SearchBox = styled.div`
    position: relative;
    width: 460px;
    height: 50px;
    margin-top: 30px;
    border: 1px solid #838383;
    border-radius: 100px;
    display: inline-flex;
    justify-content: center;
    flex-direction: column;
    img{
        cursor: pointer;
        width: 24px;
        position: absolute;
        right: 24px;
    }
`
const Search = styled.input`
    width: 80%;
    height: 100%;
    gap: 10px;
    font-size: 18px;
    border: 0;
    outline: none;
    margin: 13px 0 13px 24px;
`

const InquiryForm = styled.div`
    margin: 0 auto;
    width: 1240px;
    border-top: solid 1px #333;
`
const Inquirys = styled.div`
    width: 1240px;
    height: 120px;
    display: flex;
    align-items: center;
    border-bottom: solid 1px #D8DDE5;
    >div:first-child{
        margin-left: 35px;
    }
    .inquiryTitle{
        margin-left: 99px;
    }

    .states{
        display: flex;
        margin-left: 688px;
        .waiting{
            border: solid 1px #333;
            background: #FFF;
            color: #333;
            width: 118px;
        }
        .answered{
            background: #888;
            color: #FEF9FF;
            width: 120px;
        }
        img{
            cursor: pointer;
            margin-left: 30px;
        }
    }
`
const Number = styled.div`
    color: #888;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    position: absolute;
`
const InquireTitle = styled.div`
    display: flex;
    gap: 5px;
    p{
        margin: 0;
        color: #193DD0;
        font-family: Pretendard;
        font-size: 20px;
        font-weight: 500;
        line-height: 20px;
    }
    h4{
        cursor: pointer;
        margin: 0;
        color: #333;
        font-family: Pretendard;
        font-size: 20px;
        font-weight: 500;
        line-height: 20px;
    }
    img{
        margin-left: 5px;
        padding-bottom: 3px;
    }
`
const InquiryInfo = styled.div`
    height: 10px;
    margin-top: 23px;
    display: flex;
    .writer{
        color: #333;
        font-weight: 500;
        border-right: solid 1px #D8DDE5;
        margin-right: 12px;
        padding-right: 12px;
    }
    .date{
        color: #666;
        font-weight: 400;
    }
    span{
        font-family: Pretendard;
        font-size: 14px;
        line-height: 14px;
    }
`

const AnswerState = styled.div`
    cursor: pointer;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
    line-height: 13px;
`

const WriteInquiry = styled.button`
    cursor: pointer;
    width: 117px;
    height: 46px;

    position: relative;
    bottom: 120px;
    left: 1223px;
    display: flex;
    align-items: center;
    color: #666;
    font-size: 16px;
    font-weight: 500;
    line-height: 18px;
    border-radius: 4px;
    border: solid 1px #DCDCDC;
    background-color: white;
    img{
        margin: 0 4px 0 8px;
    }
`
