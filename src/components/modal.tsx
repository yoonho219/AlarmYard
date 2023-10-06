import React from "react";
import { styled } from "styled-components";

export default function Modal() {
  return (
    <Layout>
      <h5>나가기</h5>
      <div>
        채팅방을 나가면 채팅 목록 및 대화내용이
        <br />
        삭제되며 복구하실 수 없습니다.
        <br />
        채팅방에서 나가시겠습니까?
      </div>
      <div>
        <button type="button" className="noBtn">
          아니오
        </button>
        <button type="button" className="yesBtn">
          예
        </button>
      </div>
    </Layout>
  );
}

const Layout = styled.div`
  display: none;
  width: 340px;
  height: 192px;
  padding: 36px 40px;
  border-radius: 15px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;

  button {
    width: 200px;
    height: 60px;
    border: solid 1px #d8dde5;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .noBtn {
    color: black;
    background-color: white;
  }
  .yesBtn {
    color: white;
    background-color: #5a33be;
  }
`;
