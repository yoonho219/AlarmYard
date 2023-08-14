import styled from "styled-components";
import React from "react";
import { prevpage, nextpage, gofirst, golast } from "../assets/images/logos/arrows";

export default function Paginations({
    limit,
    page,
    pageGroup,
    setPageGroup,
    counts,
    movePage,
}: {
    limit: number,
    page: number,
    pageGroup: number,
    setPageGroup: Function,
    counts: number,
    movePage:Function,
}) {
    const createArr = (n: number) => {
        const iArr: number[] = new Array(n);
        for (let i = 0; i < n; i++) iArr[i] = i + 1;
        return iArr;
    }   //새로운 배열 만들 함수

    const pageLimit = 5;
    const totalPage = Math.ceil(counts / limit);
    const pageGroupIdx = Number(pageGroup * pageLimit);   //페이지네이션 개수 구역

    const totalPageArr = createArr(Number(totalPage));  // totalPageArr 함수에 전체 페이지의 개수를 배열로
    let pArr = totalPageArr.slice(pageGroupIdx, Number(pageLimit) + pageGroupIdx);

    const firstPage = () => {
        if (page <= 1) {
            return;
        }
        movePage(1);
        setPageGroup(0);
    }
    const lastPage = () => {
        if (page >= totalPage) {
            return;
        }
        movePage(totalPage);
        setPageGroup(Math.ceil(totalPage / pageLimit) - 1);
    }

    const prevPage = () => {
        if (page <= 1) {
            return;
        }
        if (page - 1 <= pageLimit * pageGroup) {
            setPageGroup((n: number) => n - 1);
        }
        movePage((n: number) => n - 1);
    }
    const nextPage = () => {
        if (page >= totalPage) {
            return;
        }
        if (pageLimit * Number(pageGroup * 1) < Number(page + 1)) {
            setPageGroup((n: number) => n + 1);
        }
        movePage((n: number) => n + 1);
    }

    return (
        <PageNumberForm>
            <img onClick={() => firstPage()} alt="gofirstlogo" src={gofirst} />
            <img onClick={() => prevPage()} alt="prevlogo" src={prevpage} />
            {pArr.map((n:number) => (
                <PageNumbers onClick={() => movePage(n)} active={n === page}>{n}</PageNumbers>
            ))}
            <img onClick={() => nextPage()} alt="nextlogo" src={nextpage} />
            <img onClick={() => lastPage()} alt="golastlogo" src={golast} />
        </PageNumberForm>
    )
}
const PageNumberForm = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    img{
        cursor: pointer;
    }
`
const PageNumbers = styled.div<{ active: boolean }>`
    cursor: pointer;
    width: 40px;
    height: 40px;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-underline-position: under;
    color:${props => props.active ? "#5A33BE" : "#9A9A9A"};
    font-weight: ${props => props.active ? "800" : "600"};
    text-decoration-line: ${props => props.active ? "underline" : "none"};
    &:hover{
        color: #5A33BE;
        font-weight: 800;
    }
`