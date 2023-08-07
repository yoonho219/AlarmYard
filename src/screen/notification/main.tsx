import { styled } from "styled-components";
import search from "../../assets/images/searchlogo.svg"
import fileslogo from "../../assets/images/filelogo.svg";
import React from "react";
import PostDetail from "../../components/post-detail";
import PageNumber from "../../components/pagenumber";

interface NoticeProps {
    number: number,
    title: string,
    writer: string,
    date: string,
    viewer: number,
    likes: number,
    file: string,
}

const noticeInfo = [
    {
        number: 50,
        title: "[공고] [서울]",
        writer: "KFIRI",
        date: "2023.01.01",
        viewer: 88,
        likes: 88,
        file: "[99+]",
    },
    {
        number: 51,
        title: "[공고] [경기]",
        writer: "KFIRIs",
        date: "2023.01.01",
        viewer: 88,
        likes: 88,
        file: "[1]",
    }, {
        number: 52,
        title: "[공고] [수원]",
        writer: "KFIRISES",
        date: "2023.01.01",
        viewer: 88,
        likes: 88,
        file: "[11]",
    },
]

export default function Main() {
    return (
        <>
            <TopLayout>
                <span className="alarmyard">알림마당</span>
                <span className="notification">공지사항</span>
                <SearchBox>
                    <Search placeholder="검색어를 입력해주세요." />
                    <img alt="searchlogo" src={search} />
                </SearchBox>
            </TopLayout>
            <NotificationForm>
                {noticeInfo.map((e: NoticeProps) => (
                    <Notification>
                        <Number>{e.number}</Number>
                        <div className="noticeTitle">
                            <Title>
                                <h4>{e.title}</h4>
                                <img alt="filelogo" src={fileslogo} />
                                <FileNumber>{e.file}</FileNumber>
                            </Title>
                            <PostDetail />
                        </div>
                    </Notification>
                ))}
            </NotificationForm >
            <PageNumber />
        </>
    )
}

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

const NotificationForm = styled.div`
    margin: 0 auto;
    width: 1240px;
    border-top: solid 1px #333;
    flex-shrink: 0;
`
const Notification = styled.div`
    width: 1240px;
    height: 120px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    border-bottom: solid 1px #D8DDE5;
    >div{
        margin-left: 35px;
    }
    .noticeTitle{
        margin-left: 99px;
    }
    h4{
        cursor: pointer;
        margin: 0;
        color: #333;
        font-family: Pretendard;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
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
const Title = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    img{
        cursor: pointer;
    }
`
const FileNumber = styled.div`
    color: #193DD0;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
`