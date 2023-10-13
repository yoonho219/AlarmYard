import { styled } from "styled-components";
import fileslogo from "../../assets/images/filelogo.svg";
import React, { useEffect, useMemo, useState } from "react";
import PostDetail from "../../components/post-detail";
import Pagination from "../../components/pagination";
import Title from "../../components/title";
import { useNavigate, useSearchParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Highlight from "../../components/highlight";

interface INotice {
  id: string;
  category: {
    id: string;
    name: string;
  };
  title: string;
  file: {
    id: string;
  };
  replyCount: number;
  author: {
    name: string;
  };
  createdAt: string;
  viewCnt: number;
  likeCnt: number;
}
interface INode {
  node: INotice;
}

const GET_NOTICES_DATA = gql`
  query NoticePosts(
    $first: Int
    $offset: Int
    $filter: [NoticePostFilterInput!]
  ) {
    noticePosts(first: $first, offset: $offset, filter: $filter) {
      totalCount
      edges {
        node {
          id
          likeCnt
          author {
            email
            name
            nickname
          }
          createdAt
          category {
            name
            id
          }
          title
          viewCnt
          replyCount
          files {
            id
            url
          }
        }
      }
    }
  }
`;
export default function Main() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [pageGroup, setPageGroup] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = parseInt(searchParams.get("page")!);
  const inputParam = searchParams.get("search")!;

  const { loading, data } = useQuery(GET_NOTICES_DATA, {
    variables: {
      first: 10,
      offset: 10 * (page - 1),
      filter: {
        title: inputParam
          ? [
              {
                value: `%${inputParam}%`,
                operator: "LIKE",
              },
            ]
          : [],
      },
    },
  });

  const edges = useMemo(() => {
    return data?.noticePosts?.edges;
  }, [data]);

  let pageArr: number[] = [];

  var encode = encodeURI(input);
  var decode = "";
  if (inputParam !== null) {
    decode = decodeURI(inputParam);
  }

  useEffect(() => {
    setInput(decode);
  }, [decode]);

  useEffect(() => {
    if (isNaN(pageParam)) {
      setPage(1);
    } else {
      setPage(pageParam);
    }
  }, [pageParam]);

  const setComment = (comments: number) => {
    if (comments > 99) {
      return 99 + "+";
    } else return comments;
  };

  const clickSearch = () => {
    if (input === "" || input === null) {
      navigate("/");
      return;
    }
    if (page !== 1) {
      searchParams.set("page", "1");
    }
    searchParams.set("search", encode);
    setSearchParams(searchParams);
  };

  const clickPage = (page: number) => {
    searchParams.set("page", `${page}`);
    setSearchParams(searchParams);
  };

  const clickPost = (id: string) => {
    navigate(`/${id}?${searchParams}`);
  };

  if (!loading && data.noticePosts) {
    for (let i = data.noticePosts.totalCount - (page - 1) * 10; i > 0; i--) {
      pageArr.push(i);
    }
  }

  return (
    <>
      {!loading && (
        <Title
          state={true}
          input={input}
          clickSearch={clickSearch}
          setInput={setInput}
        />
      )}
      <NotificationForm>
        {edges ? (
          edges.map((e: INode, i: number) => (
            <Notification onClick={() => clickPost(e.node.id)}>
              <Number>{pageArr[i]}</Number>
              <div className="noticeTitle">
                <Titles>
                  <div className="title">
                    {e.node.category ? [e.node.category.name] : null}
                    {inputParam
                      ? Highlight(e.node.title, inputParam)
                      : e.node.title}
                  </div>
                  {e.node.file ? <img alt="filelogo" src={fileslogo} /> : ""}
                  {e.node.replyCount ? (
                    <CommentNumber>
                      [{setComment(e.node.replyCount)}]
                    </CommentNumber>
                  ) : (
                    ""
                  )}
                </Titles>
                <PostDetail
                  writer={e.node.author.name}
                  createdAt={e.node.createdAt}
                  viewCnt={e.node.viewCnt}
                  likeCnt={e.node.likeCnt}
                />
              </div>
            </Notification>
          ))
        ) : (
          <div>로딩중</div>
        )}
      </NotificationForm>
      <PageNumberForm>
        {edges ? (
          <Pagination
            page={page}
            pageGroup={pageGroup}
            setPageGroup={setPageGroup}
            counts={data.noticePosts.totalCount}
            clickPage={clickPage}
          />
        ) : (
          ""
        )}
      </PageNumberForm>
    </>
  );
}
const NotificationForm = styled.div`
  margin: 0 auto;
  width: 1240px;
  border-top: solid 1px #333;
`;
const Notification = styled.div`
  width: 1240px;
  height: 120px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #d8dde5;
  > div {
    margin-left: 35px;
  }
  .noticeTitle {
    margin-left: 99px;
  }
`;
const Number = styled.div`
  color: #888;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 18px;
  position: absolute;
`;
const Titles = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  .title {
    cursor: pointer;
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 500;
    line-height: 20px;
    max-width: 1000px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const CommentNumber = styled.div`
  color: #193dd0;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
`;

const PageNumberForm = styled.div`
  margin: 40px 0 100px 0;
`;
