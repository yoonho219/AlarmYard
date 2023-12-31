import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { styled } from "styled-components";
import { useQuery } from "@apollo/client";
import { CHECK_MESSAGE } from "../../api/data";
import { useSearchParams } from "react-router-dom";
import { DateTime } from "luxon";
import shared from "../../assets/images/shared.svg";
import download from "../../assets/images/download.svg";
import { Link } from "react-router-dom";

interface IState {
  state: boolean;
}

interface IMessage {
  node: {
    message: string;
    type: string;
    createdAt: string;
    unreadUserCount: number;
    channel: {
      participants: [
        {
          isMine: boolean;
          user: {
            id: string;
          };
        }
      ];
      lastMessage: {
        createdAt: string;
      };
      secondhand: {
        author: {
          name: string;
        };
      };
    };
    author: {
      id: string;
    };
  };
}

export default function Message({ state }: IState) {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id")!;

  const scrollRef = useRef<null | HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { data: checkMessage, fetchMore } = useQuery(CHECK_MESSAGE, {
    variables: {
      channelId: id,
      first: 10,
    },
  });
  const last = checkMessage?.businessChatMessages.pageInfo.endCursor;

  const messageEdges = useMemo(() => {
    return checkMessage?.businessChatMessages.edges;
  }, [checkMessage]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messageEdges]);

  //TODO: 시간 되면 마무리 하기
  const payloadData = () => {
    if (
      (messageEdges && messageEdges?.node.type === "FILE") ||
      "IMAGE" ||
      "VIDEO" ||
      "CARD"
    ) {
      const filePayload = messageEdges?.node.payload;
      return {
        fileUrl: filePayload.url,
        fileName: filePayload.name,
        fileSize: filePayload.size,
      };
    }
  };

  //FIX: 나와 상대 텍스트가 비슷하니까 하나로 묶기(&다듬기)
  const myText = (
    type: string,
    text: string,
    createdAt: string,
    unread: number,
    nextMessage: boolean,
    isLast: boolean,
    isMe: boolean
  ) => {
    const created = DateTime.fromISO(createdAt).toFormat("t");
    if (type === "TEXT") {
      return (
        <MyChatBoxForm isNextMessage={nextMessage}>
          <div className="myLastText">
            <div>
              {isLast &&
                (unread === 0 ? <span>읽음</span> : <span>안읽음</span>)}
              {!nextMessage && <div className="time">{created}</div>}
            </div>
            <MyChatBox>
              <div>{text}</div>
            </MyChatBox>
          </div>
        </MyChatBoxForm>
      );
    } else if (type === "LINK") {
      return (
        <MyChatBoxForm isNextMessage={nextMessage}>
          <div className="myLastText">
            <div>
              {isLast &&
                (unread === 0 ? <span>읽음</span> : <span>안읽음</span>)}
              {!nextMessage && <div className="time">{created}</div>}
            </div>
            <MyChatBox>
              <button type="button">
                <StyledLink
                  to="https://www.naver.com/"
                  target="_blank"
                  mine={isMe}
                >
                  link
                </StyledLink>
              </button>
            </MyChatBox>
          </div>
        </MyChatBoxForm>
      );
    } else if (type === "FILE" || "IMAGE" || "VIDEO" || "CARD") {
      return (
        <MySharedForm isNextMessage={nextMessage}>
          <div className="lastText">
            {isLast && (unread === 0 ? <span>읽음</span> : <span>안읽음</span>)}
            {!nextMessage && <div className="time">{created}</div>}
          </div>
          <MyShared>
            <div>
              <button
                type="button"
                className="imgBackground"
                onClick={() => alert("다운되었습니다.")}
              >
                <img alt="shared" src={shared} />
              </button>
              <div className="sharedText">
                <span className="fileName">{type}</span>
                <span className="fileSize">파일 크기</span>
              </div>
              <button type="button" onClick={() => alert("다운되었습니다.")}>
                <img alt="download" src={download} />
              </button>
            </div>
          </MyShared>
        </MySharedForm>
      );
    }
  };
  const opponentText = (
    type: string,
    name: string,
    text: string,
    createdAt: string,
    nextMessage: boolean,
    writer: boolean,
    isMe: boolean
  ) => {
    const created = DateTime.fromISO(createdAt).toFormat("t");
    if (type === "TEXT") {
      return (
        <OpponentChatBoxForm isNextMessage={nextMessage}>
          {writer && <span>{name}</span>}
          <div className="opponentLastText">
            <OpponentChatBox>
              <div>{text}</div>
            </OpponentChatBox>
            {!nextMessage && <div className="opponentTextTime">{created}</div>}
          </div>
        </OpponentChatBoxForm>
      );
    } else if (type === "LINK") {
      return (
        <OpponentChatBoxForm isNextMessage={nextMessage}>
          {writer && <span>{name}</span>}
          <div className="opponentLastText">
            <OpponentChatBox>
              <button type="button">
                <StyledLink
                  to="https://www.naver.com/"
                  target="_blank"
                  mine={isMe}
                >
                  link
                </StyledLink>
              </button>
            </OpponentChatBox>
            {!nextMessage && <div className="opponentTextTime">{created}</div>}
          </div>
        </OpponentChatBoxForm>
      );
    } else if (type === "FILE" || "IMAGE" || "VIDEO" || "CARD") {
      //   const filePayload = messageEdges?.node.payload;
      //   const fileUrl = filePayload.url;
      //   const fileName = filePayload.name;
      //   const fileSize = filePayload.size;
      //   const { fileUrl, fileName, fileSize } = payloadData();

      return (
        <OpponentSharedForm active={nextMessage}>
          <OpponentShared>
            <div>
              <button
                type="button"
                onClick={() => alert("다운되었습니다.")}
                className="imgBackground"
              >
                <img alt="shared" src={shared} />
              </button>
              <div className="sharedText">
                <span className="fileName">파일이름</span>
                <span className="fileSize">
                  파일 크기
                  {/* {fileSize ? (fileSize / 1024).toFixed(1) : 0}KB; */}
                </span>
              </div>
              <button type="button" onClick={() => alert("다운되었습니다.")}>
                <img alt="download" src={download} />
              </button>
            </div>
          </OpponentShared>
          <div className="lastText">
            {!nextMessage && <div className="time">{created}</div>}
          </div>
        </OpponentSharedForm>
      );
    } else {
      <OpponentOut>
        <div />
        <span>상대방이 대화를 종료하였습니다.</span>
        <div />
      </OpponentOut>;
    }
  };

  const observerProp = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const total = checkMessage?.businessChatMessages.totalCount;
      if (messageEdges === undefined) return;
      if (total > 10) {
        if (entries[0].isIntersecting) {
          fetchMore({
            variables: {
              after: last,
            },
            updateQuery: (prevData, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prevData;
              const existingIds = new Set(
                prevData.businessChatMessages.edges.map(
                  (edge: any) => edge?.node.id
                )
              );
              const updateEdges =
                fetchMoreResult.businessChatMessages.edges.filter(
                  (edge: any) => {
                    return !existingIds.has(edge?.node.id);
                  }
                );
              return {
                ...prevData,
                businessChatMessages: {
                  ...prevData.businessChatMessages,
                  edges: [
                    ...prevData.businessChatMessages.edges,
                    ...updateEdges,
                  ],
                },
              };
            },
          });
        }
      }
    },
    [
      messageEdges,
      last,
      checkMessage?.businessChatMessages.totalCount,
      fetchMore,
    ]
  );
  useEffect(() => {
    const observer = new IntersectionObserver(observerProp);
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [observerProp]);

  return (
    <ChatForm state={state}>
      <div className="chattingLayout" ref={scrollRef}>
        {!state && (
          <OpponentOut>
            <div />
            <span>상대방이 대화를 종료하였습니다.</span>
            <div />
          </OpponentOut>
        )}
        {messageEdges &&
          messageEdges.map((e: IMessage, i: number) => {
            const isLast = () => {
              if (i === 0) {
                return true;
              } else {
                return false;
              }
            };

            const nextMessage = () => {
              if (messageEdges[i - 1]?.node.author.id === e.node.author.id) {
                if (
                  messageEdges[i - 1]?.node.createdAt &&
                  DateTime.fromISO(messageEdges[i - 1]?.node.createdAt)
                    .minute === DateTime.fromISO(e.node.createdAt).minute
                ) {
                  return true;
                } else {
                  return false;
                }
              } else {
                return false;
              }
            };

            const writer = () => {
              if (
                messageEdges[i + 1]?.node?.createdAt &&
                DateTime.fromISO(messageEdges[i + 1]?.node.createdAt).minute ===
                  DateTime.fromISO(e.node.createdAt).minute
              ) {
                if (messageEdges[i - 1]?.node.author.id !== e.node.author.id) {
                  return true;
                }
                if (messageEdges[i - 1]?.node.author.id === e.node.author.id) {
                  return false;
                }
              } else {
                return false;
              }
              return false;
            };

            const isMe = e.node.channel.participants.filter(
              (i) => i.user.id === e.node.author.id
            )[0].isMine;

            if (isMe === false) {
              return opponentText(
                e.node.type,
                e.node.channel.secondhand.author.name,
                e.node.message,
                e.node.createdAt,
                nextMessage(),
                writer(),
                isMe
              );
            } else {
              return myText(
                e.node.type,
                e.node.message,
                e.node.createdAt,
                e.node.unreadUserCount,
                nextMessage(),
                isLast(),
                isMe
              );
            }
          })}
        <div ref={targetRef} />
      </div>
    </ChatForm>
  );
}

const ChatForm = styled.div<{ state: boolean }>`
  height: 525px;
  padding-right: 10px;

  .chattingLayout {
    height: ${(props) => (props.state ? "525px" : "625px")};
    display: flex;
    flex-direction: column-reverse;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: #aab0bd;
      border-radius: 10px;
      height: 5px;
    }
  }

  .observer {
    height: 0;
  }
`;

const OpponentChatBoxForm = styled.div<{ isNextMessage: boolean }>`
  @media (max-width: 600px) {
    margin: ${(props) =>
      props.isNextMessage ? "10px 10px 10px 0" : "10px 10px 25px 0"};
  }
  margin: ${(props) =>
    props.isNextMessage ? "10px 20px 10px 30px;" : "10px 20px 25px 30px;"};
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  div {
    display: flex;
    align-items: end;
  }
  span {
    margin: 8px 0;
  }

  .opponentTextTime {
    margin-left: 10px;
    color: #898989;
    font-size: 14px;
    line-height: 100%;
  }
`;
const OpponentChatBox = styled.div`
  @media (max-width: 600px) {
    max-width: 180px;
  }
  max-width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

  div,
  button {
    border: none;
    background: none;
    color: #666;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    padding: 20px;
    background: #edf3fd;
    border-radius: 0px 10px 10px 10px;
    word-break: break-all;
  }
`;
const OpponentSharedForm = styled.div<{ active: boolean }>`
  margin: ${(props) => (props.active ? "8px 0 8px 30px" : "8px 0 25px 30px")};
  display: flex;
  justify-content: flex-start;
  align-items: end;

  .lastText {
    margin-left: 8px;
  }
  .time {
    color: #898989;
    font-size: 14px;
    line-height: 14px;
  }
`;
const OpponentShared = styled.div`
  @media (max-width: 600px) {
    padding: 15px;
  }
  width: 203px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #edf3fd;
  padding: 20px 25px;
  border-radius: 0 10px 10px;

  font-size: 14px;
  line-height: 14px;

  div:first-child {
    gap: 15px;
    display: flex;
    align-items: center;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
  }

  .imgBackground {
    cursor: pointer;
    width: 45px;
    height: 45px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    background: #193dd0;
  }

  .sharedText {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  span {
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .fileName {
    color: #333;
    font-weight: 500;
  }
  .fileSize {
    color: #7f8fa9;
    font-weight: 400;
  }
`;

const MyChatBoxForm = styled.div<{ isNextMessage: boolean }>`
  @media (max-width: 600px) {
    margin: ${(props) =>
      props.isNextMessage ? "10px 10px 10px 0" : "10px 10px 25px 0"};
  }
  margin: ${(props) =>
    props.isNextMessage ? "5px 20px 10px 0" : "5px 20px 20px 0"};
  display: flex;
  justify-content: flex-end;

  div {
    display: flex;
    align-items: end;
  }
  span {
    margin-bottom: 8px;
  }

  .time {
    color: #898989;
    font-size: 14px;
    line-height: 100%;
  }
  .myLastText {
    gap: 8px;

    div:first-child {
      display: flex;
      flex-direction: column;
      span {
        @media (max-width: 600px) {
          font-size: 12px;
        }
        color: #193dd0;
        font-size: 15px;
        font-weight: 500;
        line-height: 100%;
      }
    }
  }
`;
const MyChatBox = styled.div`
  @media (max-width: 600px) {
    max-width: 180px;
  }
  max-width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

  div,
  button {
    border: none;
    color: white;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    padding: 20px;
    background: #333;
    border-radius: 10px 10px 0;
    word-break: break-all;
  }
`;
const MySharedForm = styled.div<{ isNextMessage: boolean }>`
  margin: ${(props) => (props.isNextMessage ? "8px 20px 8px 0" : "8px 20px 25px 0")};
  display: flex;
  justify-content: flex-end;
  align-items: end;
  margin-right: 20px;

  .lastText {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: end;
    margin-right: 8px;
    span {
      @media (max-width: 600px) {
        font-size: 12px;
      }
      color: #193dd0;
      font-size: 15px;
      font-weight: 500;
      line-height: 100%;
    }
  }
  .time {
    color: #898989;
    font-size: 14px;
    line-height: 100%;
  }
`;
const MyShared = styled.div`
  @media (max-width: 600px) {
    padding: 15px;
  }
  width: 203px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #edf3fd;
  padding: 20px 25px;
  border-radius: 10px 10px 0;

  font-size: 14px;
  line-height: 14px;

  div:first-child {
    gap: 15px;
    display: flex;
    align-items: center;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
  }

  .imgBackground {
    cursor: pointer;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    background: #193dd0;
  }

  .sort {
    display: flex;
    justify-content: space-between;
  }
  .sharedText {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  span {
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .fileName {
    color: #333;
    font-weight: 500;
  }
  .fileSize {
    color: #7f8fa9;
    font-weight: 400;
  }
`;

const OpponentOut = styled.div`
  @media (max-width: 600px) {
    margin: 50px 0 69px;
  }
  padding-left: 20px;
  margin: 66px 0 41px;
  display: flex;
  align-items: center;
  background-color: #fff;

  div {
    @media (max-width: 600px) {
      width: 60px;
    }
    width: 260px;
    height: 1px;
    background: #d8dde5;
  }
  span {
    @media (max-width: 600px) {
      margin: 0 10px;
    }
    color: #666;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    margin: 0 25px;
  }
`;

const StyledLink = styled(Link)<{ mine: boolean }>`
  color: ${(props) => (props.mine ? "white" : "#666")};
`;
