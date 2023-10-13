import React, { useMemo } from "react";
import styled from "styled-components";
import Title from "../../components/title";
import DirectChat from "./direct-chat";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CHAT_DATA, READ_MESSAGES } from "../../api/data";
import { DateTime } from "luxon";
import { useSearchParams } from "react-router-dom";

interface IChatNode {
  node: IChatListData;
}

interface IChatListData {
  id: string;
  lastMessage: {
    createdAt: string;
    message: string;
  };
  unreadMessageCount: number;
  images: {
    url: string;
  };
  secondhand: {
    author: {
      name: string;
    };
  };
}

export default function Chatting() {
  //FIX: 작은 프로젝트에서 파라미터 사용은 좋지 않음
  const [searchParams, setSearchParams] = useSearchParams();
  const roomIdx = searchParams.get("room");
  const currentId = searchParams.get("id");

  const { data } = useQuery(GET_CHAT_DATA);
  const [readMessage] = useMutation(READ_MESSAGES);

  //FIX: 여기서 불러온 데이터를 채팅방과 메세지에 props로 전달
  const edges = useMemo(() => {
    return data?.myBusinessChatChannels?.edges;
  }, [data]);

  //FIX: 아래와 같은 함수는 다양한 이유로 처리가 안 될 수도 있기 때문에 await 사용(다른 페이지에도)
  const changeRoom = async (id: string, num: number) => {
    if (id === currentId) return;
    await readMessage({
      variables: {
        channelId: id,
      },
      refetchQueries: [GET_CHAT_DATA],
    });
    searchParams.set("id", id);
    searchParams.set("room", (num + 1).toString());
    setSearchParams(searchParams);

    // Mobile
    if (matchMedia("(max-width: 600px)").matches) {
    }
  };

  return (
    <Layout>
      <Title state={false} />
      <div>
        <ChatList>
          <div className="chatListTitle">
            <h4>진행중인 채팅 목록</h4>
            <div className="chatCount">
              {data && data.myBusinessChatChannels.totalCount}
            </div>
          </div>
          <ChatRoomLay>
            {edges &&
              edges.map((e: IChatNode, i: number) => (
                <ChatRoom
                  key={i}
                  onClick={() => changeRoom(e?.node?.id, i)}
                  $active={roomIdx === (i + 1).toString()}
                >
                  <div>
                    <div className="chatsTitleSort">
                      <div>{e?.node?.secondhand?.author?.name}</div>
                      <div className="lastChatTime">
                        {DateTime.fromISO(
                          e?.node?.lastMessage?.createdAt
                        ).toFormat("t")}
                        {/* TODO: 하루 지난 건 '어제', 오래 되면 "날짜" */}
                      </div>
                    </div>
                    <div className="chatsBodySort">
                      <div className="lastChat">
                        {e?.node?.lastMessage?.message}
                      </div>
                      {e?.node?.unreadMessageCount > 0 && (
                        <div className="unread">
                          {e.node.unreadMessageCount}
                        </div>
                      )}
                    </div>
                  </div>
                  <img alt="chatimage" src={e?.node?.images?.url} />
                </ChatRoom>
              ))}
          </ChatRoomLay>
        </ChatList>
        <DirectChat />
      </div>
    </Layout>
  );
}
const Layout = styled.div`
  @media (max-width: 600px) {
    width: 100%;
    height: 100;
    margin: 0;
  }
  margin: 0 auto 100px;
  width: 1440px;

  > div:not(:first-child) {
    @media (max-width: 600px) {
      margin: 0;
    }
    display: flex;
    margin: 0 100px;
    gap: 20px;
  }
`;

const ChatList = styled.div`
  @media (max-width: 600px) {
    display: none;
    width: 100%;
    height: 100%;
    border: none;
  }
  width: 420px;
  height: 800px;
  border-radius: 10px;
  border: solid 1px #d8dde5;

  .chatListTitle {
    @media (max-width: 600px) {
      height: 50px;
    }
    width: 100%;
    height: 60px;
    gap: 8px;
    display: flex;
    align-items: center;
    border-bottom: solid 1px #d8dde5;
  }
  h4 {
    @media (max-width: 600px) {
      font-size: 16px;
      line-height: 16px;
      margin-left: 20px;
    }
    font-size: 18px;
    font-weight: 700;
    line-height: 30px;
    margin: 0;
    margin-left: 24px;
  }
  .chatCount {
    @media (max-width: 600px) {
      font-size: 16px;
      line-height: 16px;
    }
    color: #193dd0;
    font-size: 18px;
    font-weight: 700;
    line-height: 30px;
  }
`;

const ChatRoomLay = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: scroll;
`;
const ChatRoom = styled.div<{ $active: boolean }>`
  cursor: pointer;
  width: calc(100%-40px);
  height: 60px;
  padding: 20px;
  display: flex;
  border-bottom: solid 1px #d8dde5;
  background: ${(prop) => prop.$active && "#eef5ff"};

  font-size: 14px;
  font-weight: 400;
  line-height: 14px;

  > div {
    display: flex;
    flex-direction: column;
  }

  .chatsTitleSort {
    @media (max-width: 600px) {
      width: 265px;
    }
    width: 290px;
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
  }
  .lastChat,
  .lastChatTime {
    color: #666;
  }

  .chatsBodySort {
    @media (max-width: 600px) {
      width: 265px;
    }
    width: 290px;
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .lastChat {
    width: 250px;
    margin: 3px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .unread {
    width: 20px;
    height: 20px;
    padding-top: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    color: white;
    background: #004ef9;
    text-align: right;
    font-size: 13px;
    font-weight: 600;
    line-height: normal;
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-left: 10px;
  }
`;
