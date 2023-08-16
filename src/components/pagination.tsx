import styled from "styled-components";
import React from "react";
import { prevpage, nextpage, gofirst, golast } from "../assets/images/logos/arrows";

/** 
 * 페이지네이션 props 타입 
*/
interface IPaginationProps {
    /** 기본개수  */
    limit: number,
    /** 현재 페이지 */
    page: number,
    pageGroup: number,
    setPageGroup: (num:number)=>void,
    counts: number,
    movePage:(num:number)=>void,
}

/**
 * 페이지네이션 컴포넌트
 * @param {IPaginationProps} props  
 * @returns {React.ReactNode} node
 */
export default function Pagination({
    limit,
    page,
    pageGroup,
    setPageGroup,
    counts,
    movePage,
}: IPaginationProps) {
    const createArr = (n: number) => {
        const iArr:number[] = new Array(n);
        for (let i = 0; i < n; i++) iArr[i] = i + 1;
        return iArr;
    }

    const pageLimit = 5;
    const pageGroupIdx = pageGroup * pageLimit;

    const totalPage = Math.ceil(counts / limit);
    const totalPageArr = createArr(totalPage);

    let pArr = totalPageArr.slice(pageGroupIdx, pageLimit + pageGroupIdx);

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
            setPageGroup(pageGroup-1);
        }
        movePage(page - 1);
    }
    const nextPage = () => {
        if (page >= totalPage) {
            return;
        }
        if (pageLimit * (pageGroup + 1) < (page + 1)) {
            setPageGroup(pageGroup+1);
        }
        movePage(page + 1);
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