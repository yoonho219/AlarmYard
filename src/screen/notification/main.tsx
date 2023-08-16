import { styled } from "styled-components";
import search from "../../assets/images/searchlogo.svg"
import fileslogo from "../../assets/images/filelogo.svg";
import React, { useMemo, useState } from "react";
import PostDetail from "../../components/post-detail";
import Pagination from "../../components/pagination";
import { useGetNotices } from "../../api";
import Title from "../../components/title";

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

export default function Main() {
    const { loading, data, error, query } = useGetNotices() as unknown as IUseNotices;
    const edges = useMemo(() => {
        return data?.edges;
    }, [data])

    const [input, setInput] = useState('')

    const [page, setPage] = useState(1);    // 페이지 초기 값은 1페이지
    const [limit, setLimit] = useState(10);     // 한 페이지에 보여줄 데이터의 개수
    /*useState 사용 안 하고 */
    const [pageGroup, setPageGroup] = useState(0);

    const setComment = (comments: number) => {
        if (comments > 99) {
            return 99 + "+"
        }
        else return comments;
    }

    const clickSearch = () => {
        setPage(1)
        setPageGroup(0)
        query({
            page: 1,
            search: `${input}`,
        })
    }

    const movePage = (page:number) => {
        setPage(page)
        query({
            page: page,
            search: `${input}`
        })
    }

    return (
        <>
            <Title
                input={input}
                clickSearch={clickSearch}
                setInput={setInput}
                state={true}
            />
            <NotificationForm>
                {!loading && edges ? edges.map((e: Notice) => ((
                    <Notification>
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
                {data ? 
                    <Pagination
                        limit={limit}
                        page={page}
                        pageGroup={pageGroup}
                        setPageGroup={setPageGroup}
                        counts={data?.totalCnt}
                        movePage={movePage}
                    /> : ""}
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