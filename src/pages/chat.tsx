import React from "react";
import styled from "styled-components";
import Title from "../components/title";
import chatimage from "../assets/images/chat-image.svg";

export default function Chatting() {
  const myText = () => {
    return (
      <MyChatBoxForm>
        <div className="myLastText">
          <div>
            <span>안읽음</span>
            <div>오후 09:30</div>
          </div>
          <MyChatBox>
            <div>네 알겠습니다ㅠ</div>
          </MyChatBox>
        </div>
      </MyChatBoxForm>
    );
  };

  const opponentText = () => {
    return (
      <OpponentChatBoxForm>
        <span>강*민</span>
        <OpponentChatBox>
          <div>음...</div>
        </OpponentChatBox>
        <div className="opponentLastText">
          <OpponentChatBox>
            <div>네고 안됩니다...</div>
          </OpponentChatBox>
          <div className="opponentTextTime">오후 09:30</div>
        </div>
      </OpponentChatBoxForm>
    );
  };

  return (
    <Layout>
      <Title state={false} />
      <div>
        <ChatList>
          <div className="chatListTitle">
            <h4>진행중인 채팅 목록</h4>
            <div className="chatCount">4</div>
          </div>
          <Chats>
            <div>
              <div className="chatsTitleSort">
                <div>강*민</div>
                <div className="lastChatTime">오후 09:31</div>
              </div>
              <div className="lastChat">그렇게 해주세요</div>
            </div>
            <img alt="chatimage" src={chatimage} />
          </Chats>
        </ChatList>
        <ChatForm>
          <ChattingTitle>
            <div className="profile">&</div>
            <div className="name">name</div>
            <div className="functions">
              <div className="function">신고하기</div>
              <div className="line" />
              <div className="function">차단하기</div>
              <div className="line" />
              <div className="function">나가기</div>
            </div>
          </ChattingTitle>
          <SellProduct>
            <img alt="chatimage" src={chatimage} />
            <div className="sellProductTitle">
              <div className="explanation">
                <span className="selling">판매중</span>
                <span className="line">ㅣ</span>
                <span className="cutlery">식기도구</span>
                <span className="detail">
                  냉면그릇, 주방기기 최저가로 거래합니다.
                </span>
              </div>
              <div className="price">100,000원</div>
            </div>
          </SellProduct>
          {opponentText()}
          {myText()}
        </ChatForm>
      </div>
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 auto 100px;
  width: 1440px;

  > div:not(:first-child) {
    display: flex;
    margin: 0 100px;
    gap: 20px;
  }

  .chatListTitle {
    width: 100%;
    height: 60px;
    gap: 8px;
    display: flex;
    align-items: center;
    border-bottom: solid 1px #d8dde5;
  }
  h4 {
    font-size: 18px;
    font-weight: 700;
    line-height: 30px;
    margin: 0;
    margin-left: 24px;
  }
  .chatCount {
    color: #193dd0;
    font-size: 18px;
    font-weight: 700;
    line-height: 30px;
  }
`;

const ChatList = styled.div`
  width: 420px;
  height: 800px;
  border-radius: 10px;
  border: solid 1px #d8dde5;
`;
const Chats = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100px;
  padding: 20px;
  display: flex;
  border-bottom: solid 1px #d8dde5;

  font-size: 14px;
  font-weight: 400;
  line-height: 14px;

  > div {
    display: flex;
    flex-direction: column;
  }

  .chatsTitleSort {
    width: 310px;
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
  }

  .lastChat {
    margin-top: 12px;
  }
  .lastChat,
  .lastChatTime {
    color: #666;
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-left: 10px;
  }
`;

const ChatForm = styled.div`
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
    font-weight: 600;
    margin-left: 8px;
  }

  .functions {
    color: #666;
    display: flex;
    margin-left: 514px;
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
  width: 100%;
  height: 110px;
  padding: 25px;
  display: flex;
  margin-bottom: 20px;
  background: #fafbff;

  img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
  }

  .sellProductTitle {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
  }

  .selling {
    font-size: 16px;
    font-weight: 700;
    line-height: 18px;
  }
  .line {
    height: 10px;
    margin: 0 5px;
    color: #666;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
  }
  .cutlery {
    color: #06f;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
  }
  .detail {
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

const OpponentChatBoxForm = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  div {
    display: flex;
    align-items: end;
  }
  span {
    margin-bottom: 8px;
  }

  .opponentLastText {
    margin-top: 10px;
    margin-bottom: 25px;
  }
  .opponentTextTime {
    margin-left: 10px;
  }
`;
const OpponentChatBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    color: #666;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    padding: 20px;
    background: #edf3fd;
    border-radius: 0px 10px 10px 10px;
  }
`;

const MyChatBoxForm = styled.div`
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  div {
    display: flex;
    align-items: end;
  }
  span {
    margin-bottom: 8px;
  }

  .myLastText {
    margin-top: 10px;
    margin-bottom: 25px;
    gap: 8px;

    div:first-child {
      display: flex;
      flex-direction: column;
      span {
        color: #193dd0;
        font-size: 15px;
        font-weight: 500;
        line-height: 100%;
      }
    }
  }
`;
const MyChatBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    color: white;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    padding: 20px;
    background: #333;
    border-radius: 0px 10px 10px 10px;
  }
`;
