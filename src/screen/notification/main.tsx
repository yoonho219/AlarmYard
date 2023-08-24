import { styled } from "styled-components";
import fileslogo from "../../assets/images/filelogo.svg";
import React, { useMemo, useState } from "react";
import PostDetail from "../../components/post-detail";
import Pagination from "../../components/pagination";
import { useGetNotices } from "../../api";
import Title from "../../components/title";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { inputState, pageState } from "../../atoms";
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

    let pageArr: number[] = [];

    const [input, setInput] = useRecoilState(inputState)
    const [page, setPage] = useRecoilState(pageState);
    const [limit, setLimit] = useState(10);
    const [pageGroup, setPageGroup] = useState(0);
    const [searched, setSearched] = useState(false);

    const pageAtom = useSetRecoilState(pageState);

    const inputAtom = useSetRecoilState(inputState);
    const setInputAtom = (e?: string) => inputAtom(() => [e]);
    const onInput = useRecoilValue(inputState)

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
        setSearched(true);
    }

    const callPage = (page: number) => {
        setPage(page)
        pageAtom(page)
        searched
            ? navigate(`?page=${page}&search=${input}`)
            : navigate(`?page=${page}`)
        if (searched) {
            query({
                page: page,
                search: `${input}`
            })
        }
        else {
            query({
                page: page,
            })
        }
    }

    const clickPost = (id: string) => {
        window.location.href = `/post/:?${id}`
        if (!searched) {
            setInputAtom()
        }
    }

    if (data?.totalCnt) {
        for (let i = data?.totalCnt; i > 0; i--) {
            pageArr.push(i)
        }
    }
    
    return (
        <>
            {!loading &&
                <Title
                    input={input}
                    clickSearch={clickSearch}
                    setInput={setInput}
                    state={true}
                />}
            <NotificationForm>
                {edges ? edges.map((e: Notice, i: number) => ((
                    <Notification onClick={() => clickPost(e.id)}>
                        <Number>{pageArr[i]}</Number>
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
                        callPage={callPage}
                        navigate={navigate}
                        input={input}
                        searched={searched}
                    />
                    : ""}
            </PageNumberForm>
        </>
    )
}
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