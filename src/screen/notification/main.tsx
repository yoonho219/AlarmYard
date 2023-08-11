import { styled } from "styled-components";
import search from "../../assets/images/searchlogo.svg"
import fileslogo from "../../assets/images/filelogo.svg";
import React, { useMemo, useState } from "react";
import PostDetail from "../../components/post-detail";
import Pagination from "../../components/pagination";
import { useGetNotices } from "../../api";

interface Notice {
    id: string;
    title: string;
    category: string;
    writer: {
        id: string;
        name: string;
    },
    createdAt: number,//Milliseconds
    viewCnt: number,
    likeCnt: number,
    commentCnt: number,
    file: [string] | null,
}

interface INotices {
    edges: Notice[], //검색된 공지
    totalCnt: number, //총 공지 개수
}

interface IQueryParams {
    page?: number;
    search?: string;
}

interface IUseNotices { loading: boolean, data: INotices | null, error: null, query: (params: IQueryParams) => void }

export default function TestMain() {
    const { loading, data, error, query } = useGetNotices() as unknown as IUseNotices;
    const edges = useMemo(() => {
        return data?.edges;
    }, [data])

    // 1. const edges = data.edges;
    // 2. const edges = data -> edges;
    // 3. const edges = null -> edges...??? 에러가 난다
    // 4. const edges = data == null ? ... : ...
    // 5. const edges = data?.edges = null;
    // 6. const edges = data?.edges ?? []; 

    const setComment = (comments: number) => {
        if (comments > 99) {
            return 99 + "+"
        }
        else return comments;
    }

    const [input, setInput] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const searching = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }
    return (
        <>
            <TopLayout>
                <span className="alarmyard">알림마당</span>
                <span className="notification">공지사항</span>
                <SearchBox>
                    <Search
                        value={input}
                        onChange={searching}
                        placeholder="검색어를 입력해주세요."
                    />
                    <img onClick={() => {
                        query({
                            page: 3,
                        })
                    }} alt="searchlogo" src={search} />
                </SearchBox>
            </TopLayout>
            <NotificationForm>
                {!loading && edges ? edges.map((e: Notice) => ((
                    < Notification >
                        <Number>{e.id}</Number>
                        <div className="noticeTitle">
                            <Titles>
                                <div className="title">[{e.category}]{e.title}</div>
                                {e.file ? <img alt="filelogo" src={fileslogo} /> : ""}
                                {e.commentCnt ?
                                    <CommentNumber>[{setComment(e.commentCnt)}]</CommentNumber> : ""}
                            </Titles>
                            <PostDetail
                                writer={e.writer.name}
                                createdAt={e.createdAt}
                                viewCnt={e.viewCnt}
                                likeCnt={e.likeCnt}
                            />
                        </div>
                    </Notification>)))
                    : <div>로딩중</div>}
            </NotificationForm >
            <PageNumberForm>
                <Pagination
                    query={query}
                    total={data?.edges.length}
                    postCount={data?.totalCnt}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </PageNumberForm>
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
`
const Number = styled.div`
    color: #888;
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
    position: absolute;
`
const Titles = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    .title{
        cursor: pointer;
        font-family: Pretendard;
        font-size: 20px;
        font-weight: 500;
        line-height: 20px;
        max-width: 1000px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`
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
const CommentNumber = styled.div`
    color: #193DD0;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
`

const PageNumberForm = styled.div`
    margin: 40px 0 100px 0;
`