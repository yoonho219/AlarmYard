import { gql } from "@apollo/client";

//채팅 데이터
export const GET_CHAT_DATA = gql`
  query {
    myBusinessChatChannels {
      totalCount
      pageInfo {
        endCursor
      }
      edges {
        node {
          id
          secondhand {
            author {
              name
            }
          }
          lastMessage {
            createdAt
            message
          }
          unreadMessageCount
          images {
            url
          }
        }
      }
    }
  }
`;

//채널 조회
export const CHECK_CHANNEL = gql`
  query BusinessChatChannel($businessChatChannelId: ID!) {
    businessChatChannel(id: $businessChatChannelId) {
      state
      secondhand {
        state
        category {
          name
        }
        content
        price
        images {
          url
        }
        author {
          name
        }
      }
    }
  }
`;

//메세지 목록 조회
export const CHECK_MESSAGE = gql`
  query ($channelId: ID!, $after: String, $first: Int) {
    businessChatMessages(channelId: $channelId, after: $after, first: $first) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          message
          type
          createdAt
          unreadUserCount
          channel {
            participants {
              isMine
              user {
                id
              }
            }
            lastMessage {
              createdAt
            }
            secondhand {
              author {
                name
              }
            }
          }
          author {
            id
          }
          payload {
            ... on ChatMessageFileTypePayload {
              url
              size
              filename
            }
          }
        }
      }
    }
  }
`;

//메세지 읽음 처리
export const READ_MESSAGES = gql`
  mutation ($channelId: ID!) {
    readBusinessChatMessages(channelId: $channelId)
  }
`;

//메세지 생성 및 전송
export const SEND_MESSAGE = gql`
  mutation ($data: BusinessChatMessageCreateInput!) {
    sendBusinessChatMessage(data: $data) {
      id
    }
  }
`;

//메세지 수신
export const RECEIVE_MESSAGE = gql`
  subscription ($channelId: ID!) {
    receiveBusinessChatMessage(channelId: $channelId) {
      id
      message
    }
  }
`;
