import styled from "styled-components";
import React, { useState } from "react";
import { prevpage, nextpage, tennextpage } from "../assets/images/logos/arrows";

export default function PageNumber() {
    const pageNumber = [1, 2, 3, 4, 5];

    const [page, setPage] = useState(1);

    return (
        <PageNumberForm>
            <img alt="prevlogo" src={prevpage} />
            {pageNumber.map((e) => (
                <PageNumbers active={e === page}>{e}</PageNumbers>
            ))}
            <img alt="nextlogo" src={nextpage} />
            <img alt="tennextlogo" src={tennextpage} />
        </PageNumberForm>
    )
}

const PageNumberForm = styled.div`
    width: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin: 40px 0 100px;
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