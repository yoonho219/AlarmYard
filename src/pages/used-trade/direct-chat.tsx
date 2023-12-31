import React, { useMemo, useRef, useState } from "react";
import { styled } from "styled-components";
import { useMutation, useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import {
  GET_CHAT_DATA,
  CHECK_CHANNEL,
  CHECK_MESSAGE,
  SEND_MESSAGE,
} from "../../api/data";
import userIcon from "../../assets/images/user.svg";
import sharing from "../../assets/images/sharing.svg";
import closeBtn from "../../assets/images/closeButton.svg";
import goOutBtn from "../../assets/images/go-out-chat.svg";
import Message from "./message";
import { upload } from "../../api/axios";

export default function DirectChat() {
  //TODO: graphql로 변경(나간 방 구분)
  const [state, setState] = useState<boolean>(true);
  // 모달창
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 채팅 input
  const [input, setInput] = useState<string>("");

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id")!;

  const { data } = useQuery(CHECK_CHANNEL, {
    variables: {
      businessChatChannelId: id,
    },
  });
  const channelEdges = useMemo(() => {
    return data?.businessChatChannel.secondhand;
  }, [data]);

  const [sendMessages] = useMutation(SEND_MESSAGE);

  const changeChatInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const fileInput = useRef<HTMLInputElement>(null);

  const clickShareFile = () => {
    fileInput.current?.click();
  };

  const clickSentBtn = (input: string) => {
    //FIX: useCallBack으로
    if (input === "" || id === "") return;
    sendMessages({
      variables: {
        data: {
          message: input,
          channelId: id,
          type: "TEXT",
        },
      },
      refetchQueries: [GET_CHAT_DATA, CHECK_MESSAGE],
    });
    setInput("");
    searchParams.set("room", "1");
    setSearchParams(searchParams);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const goOutChat = () => {
    setState(false);
    setIsOpen(false);
  };

  return (
    //TODO: 첫 렌더링 때 채팅방 리스트의 첫 번째 채팅방 불러오기
    <ChatLayout>
      <ChattingTitle>
        <img alt="outButton" src={goOutBtn} className="goOutBtn" />
        <img src={userIcon} alt="useIcon" className="profile" />
        <div className="name">{channelEdges?.author?.name}</div>
        <div className="functions">
          <div className="function" onClick={() => alert("신고되었습니다.")}>
            신고하기
          </div>
          <div className="line" />
          <div className="function">차단하기</div>
          <div className="line" />
          <div className="function" onClick={() => openModal()}>
            나가기
          </div>
        </div>
      </ChattingTitle>
      <SellProduct>
        {channelEdges && (
          <>
            <img
              alt="chatimage"
              src={channelEdges?.images?.url}
              className="userProfile"
            />
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
              <button type="button" onClick={() => clickShareFile()}>
                <img alt="share" src={sharing} />
                <input
                  type="file"
                  ref={fileInput}
                  onChange={async (e) => {
                    const list: File[] = [];
                    const files = e.target.files;
                    if (files === null) return;

                    for (const file of files) {
                      list.push(file);
                    }
                    const res = await upload(list);
                    if (res === undefined) return;
                    const fileData = await JSON.stringify(res[0]);
                    if (fileData !== undefined) {
                      await sendMessages({
                        variables: {
                          data: {
                            channelId: id,
                            type: "FILE",
                            payload: fileData,
                          },
                        },
                        refetchQueries: [GET_CHAT_DATA, CHECK_MESSAGE],
                      });
                    }
                  }}
                />
              </button>
              <textarea
                placeholder="메세지를 입력해주세요."
                value={input}
                onChange={(e) => changeChatInput(e)}
              />
            </div>
            <button
              type="button"
              className="sendBtn"
              onClick={() => clickSentBtn(input)}
            >
              전송
            </button>
          </div>
        </OpponentIn>
      )}
      {isOpen && (
        //FIX: 방을 나갔을 때 어떻게 할지(ex:채팅 부분에 채팅방을 골라달라고 글을 띄운다.
        <Modal>
          <div className="header">
            <h5 onClick={() => setState(false)}>나가기</h5>
            <button type="button" className="closeBtn">
              <img
                alt="close"
                src={closeBtn}
                className="closeImage"
                onClick={() => setIsOpen(false)}
              />
            </button>
          </div>
          <p>
            채팅방을 나가면 채팅 목록 및 대화내용이
            <br />
            삭제되며 복구하실 수 없습니다.
            <br />
            채팅방에서 나가시겠습니까?
          </p>
          <div className="btnForm">
            <button
              type="button"
              className="noBtn"
              onClick={() => setIsOpen(false)}
            >
              아니오
            </button>
            <button
              type="button"
              className="yesBtn"
              onClick={() => goOutChat()}
            >
              예
            </button>
          </div>
        </Modal>
      )}
    </ChatLayout>
  );
}

const ChatLayout = styled.div`
  @media (max-width: 600px) {
    /* display: none; */
    width: 100vw;
    height: 100vh;
    border: none;
  }
  width: 800px;
  height: 800px;
  border-radius: 10px;
  border: solid 1px #d8dde5;
`;
const ChattingTitle = styled.div`
  @media (max-width: 600px) {
    width: 100%;
    height: 50px;
  }
  width: 800px;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #d8dde5;
  position: relative;

  font-size: 14px;
  font-weight: 400;
  line-height: 14px;

  .goOutBtn {
    @media (max-width: 600px) {
      margin: 0 20px;
    }
    width: 8px;
    height: 14px;
  }
  .profile {
    @media (max-width: 600px) {
      margin: 0;
    }
    width: 12px;
    height: 12px;
    margin-left: 24px;
  }
  .name {
    color: #555;
    max-width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 600;
    margin-left: 8px;
  }

  .functions {
    @media (max-width: 600px) {
      right: 20px;
    }
    color: #666;
    display: flex;
    position: absolute;
    right: 25px;
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
  @media (max-width: 600px) {
    width: calc(100% - 40px);
    padding: 20px;
  }
  width: calc(100% - 50px);
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
    @media (max-width: 600px) {
      margin-right: 4px;
      font-weight: 400;
    }
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
    @media (max-width: 600px) {
      width: 135px;
    }
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
    @media (max-width: 600px) {
      font-size: 16px;
    }
    color: #444;
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
    margin-top: 18px;
  }
`;

const OpponentIn = styled.div`
  @media (max-width: 600px) {
    width: 100%;
    align-items: baseline;
  }
  width: 800px;
  height: 105px;
  display: flex;
  align-items: center;
  border-top: solid 1px #d8dde5;

  .inputForm {
    @media (max-width: 600px) {
      padding: 0 15px;
      gap: 7px;
      margin-top: 15px;
    }
    display: flex;
    padding: 0 25px;
    gap: 18px;
  }
  .inputBox {
    @media (max-width: 600px) {
      width: 270px;
    }
    width: 640px;
    height: 60px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    background: #f2f2f2;
  }

  input {
    display: none;
  }
  img {
    width: 29px;
    height: 29px;
  }
  button {
    @media (max-width: 600px) {
      margin: 0 8px 0 15px;
    }
    cursor: pointer;
    border: none;
    background: none;
    margin: 0 20px;
    padding: 0;
  }
  textarea {
    @media (max-width: 600px) {
      width: 200px;
    }
    width: 550px;
    height: 17px;
    color: #767676;
    background: #f2f2f2;
    font-size: 17px;
    font-weight: 400;
    line-height: 17px;
    border: none;
    resize: none;
    outline: none;
  }

  .sendBtn {
    @media (max-width: 600px) {
      width: 70px;
      height: 60px;
    }
    width: 90px;
    height: 60px;
    margin: 0;
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

const Modal = styled.div`
  @media (max-width: 600px) {
    width: 277px;
    height: 224px;
    padding: 24px;
  }
  display: none;
  width: 420px;
  height: 264px;
  padding: 36px 40px;
  border-radius: 15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background-color: white;

  border: solid 0.5px black;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  h5 {
    @media (max-width: 600px) {
      font-size: 18px;
    }
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;
    margin: 0;
  }
  .closeBtn {
    @media (max-width: 600px) {
      width: 24px;
      height: 24px;
    }
    width: 40px;
    height: 40px;
    background-color: white;
    border: none;
  }

  p {
    @media (max-width: 600px) {
      font-size: 16px;
      line-height: 22px;
    }
    color: #555;
    font-size: 20px;
    font-weight: 400;
    line-height: 28px;
    margin: 40px 0;
  }

  button {
    @media (max-width: 600px) {
      width: 134px;
      height: 54px;
    }
    cursor: pointer;
    width: 200px;
    height: 60px;
    padding: 0;
    margin: 0;
    border: solid 1px #d8dde5;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #555;
    font-size: 20px;
    font-weight: 500;
    line-height: 20px;
  }

  .btnForm {
    @media (max-width: 600px) {
      gap: 10px;
    }
    display: flex;
    gap: 20px;
  }
  .noBtn {
    background-color: white;
  }
  .yesBtn {
    color: white;
    background-color: #5a33be;
  }
`;
