import React from "react";
import prevbutton from "../assets/images/prevpostbutton.svg"
import nextbutton from "../assets/images/nextpostbutton.svg"
import listbutton from "../assets/images/list-checkbox.svg"
import { styled } from "styled-components";

interface IRefetchProp {
    refetch: () => void;
}

export default function PostButton({ refetch }: IRefetchProp) {
    return (
        <>
            {refetch &&
                <PostButtonForm>
                    <button onClick={() => refetch()}>
                        <img alt="prevbutton" src={prevbutton} />
                        이전글
                    </button>
                    <button onClick={() => refetch()}>
                        다음글
                        <img alt="nextbutton" src={nextbutton} />
                    </button>
                    <button className="listbutton">
                        {/* //TODO:클릭 시 리스트페이지로 */}
                        <img alt="listlogo" src={listbutton} />
                        목록
                    </button>
                </PostButtonForm>
            }
        </>
    )
}

const PostButtonForm = styled.div`
  margin: 30px 0 100px;
  display: flex;
  position: relative;
  button:not(:last-child) {
    width: 107px;
  }
  button {
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
    border: solid 1px #dcdcdc;
    background-color: white;
  }
  button:first-child {
    margin-right: 10px;
  }
  .listbutton {
    width: 99px;
    position: absolute;
    right: 0;
    img {
      padding-right: 11px;
    }
  }
`;