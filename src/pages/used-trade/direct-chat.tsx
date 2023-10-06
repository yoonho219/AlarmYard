import React, { useMemo, useState } from "react";
import { styled } from "styled-components";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { CHECK_CHANNEL } from "../../api/data";
import userIcon from "../../assets/images/user.svg";
import sharing from "../../assets/images/sharing.svg";
import Message from "./message";

export default function DirectChat() {
  const [state, setState] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id")!;
  const accessToken = sessionStorage.getItem("accessToken");

  const { data } = useQuery(CHECK_CHANNEL, {
    variables: {
      businessChatChannelId: id,
    },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
  const channelEdges = useMemo(() => {
    return data?.businessChatChannel.secondhand;
  }, [data]);

  const changeState = () => {
    //TODO: 방 나갈지 재확인 경고창
    // setState(false);
  };

  const clickSentBtn = () => {
    //TODO: 전송 버튼 클릭 시 기능
    alert("전송되었습니다.");
  };

  return (
    //첫 렌더링 때 채팅방 리스트의 첫 번재 채팅방 불러오기
    <ChatLayout>
      <ChattingTitle>
        <img src={userIcon} alt="useIcon" className="profile" />
        <div className="name">{channelEdges?.author?.name}</div>
        <div className="functions">
          <div className="function" onClick={() => alert("신고되었습니다.")}>
            신고하기
          </div>
          <div className="line" />
          <div className="function">차단하기</div>
          <div className="line" />
          <div className="function" onClick={() => changeState()}>
            나가기
          </div>
        </div>
      </ChattingTitle>
      <SellProduct>
        {channelEdges && (
          <>
            <img alt="chatimage" src={channelEdges?.images?.url} />
            <div className="sellProductTitle">
              <div className="explanation">
                <span className="selling">{channelEdges?.state}</span>
                <span className="line">ㅣ</span>
                <span className="object">{channelEdges?.category?.name}</span>
                <span className="detail">{channelEdges?.content}</span>
              </div>
              <div className="price">
                {Number(channelEdges?.price).toLocaleString()}원
              </div>
            </div>
          </>
        )}
      </SellProduct>
      <Message state={state} />
      {state && (
        <OpponentIn>
          <div className="inputForm">
            <div className="inputBox">
              <button type="button">
                <img
                  alt="share"
                  src={sharing}
                  onClick={() => alert("무엇을 공유하시겠습니까?")}
                />
              </button>
              <textarea placeholder="메세지를 입력해주세요." />
            </div>
            <button
              type="button"
              className="sendBtn"
              onClick={() => clickSentBtn()}
            >
              전송
            </button>
          </div>
        </OpponentIn>
      )}
    </ChatLayout>
  );
}

const ChatLayout = styled.div`
  width: 800px;
  height: 800px;
  border-radius: 10px;
  border: solid 1px #d8dde5;
`;
const ChattingTitle = styled.div`
  width: 800px;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #d8dde5;
  position: relative;

  font-size: 14px;
  font-weight: 400;
  line-height: 14px;

  .profile {
    width: 12px;
    height: 12px;
    margin-left: 24px;
  }
  .name {
    color: #555;
    max-width: 100px;
    font-weight: 600;
    margin-left: 8px;
  }

  .functions {
    color: #666;
    display: flex;
    position: absolute;
    left: 590px;
  }
  .function {
    cursor: pointer;
  }
  .line {
    height: 10px;
    margin: 0 12px;
    border-right: solid 1px #d8dde5;
  }
`;

const SellProduct = styled.div`
  width: calc(100%-50px);
  height: 60px;
  padding: 25px;
  display: flex;
  background: #fafbff;

  img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
  }

  .sellProductTitle {
    margin-left: 15px;
  }

  .explanation {
    display: flex;
  }
  .selling {
    font-size: 16px;
    font-weight: 700;
    line-height: 18px;
  }
  .line {
    margin: 0 5px;
    color: #666;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
  }
  .object {
    color: #06f;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
  }
  .detail {
    width: 480px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #666;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    margin-left: 4px;
  }

  .price {
    color: #444;
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
    margin-top: 18px;
  }
`;

const OpponentIn = styled.div`
  width: 800px;
  height: 105px;
  display: flex;
  align-items: center;
  border-top: solid 1px #d8dde5;

  .inputForm {
    display: flex;
    padding: 0 25px;
    gap: 18px;
  }
  .inputBox {
    width: 640px;
    height: 60px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    background: #f2f2f2;
  }

  img {
    width: 26px;
    height: 26px;
    margin: auto 20px;
  }
  textarea {
    width: 550px;
    height: 22.5px;
    color: #767676;
    background: #f2f2f2;
    font-size: 17px;
    font-weight: 400;
    line-height: 17px;
    border: none;
    resize: none;
    outline: none;
  }
  button {
    cursor: pointer;
    border: none;
    background: none;
  }

  .sendBtn {
    width: 90px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: #004ef9;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    line-height: 17px;
  }
`;
