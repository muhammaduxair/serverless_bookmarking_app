import { Grid, Button } from "@material-ui/core";
import React, { useState } from "react";
import TextInputField from "../components/TextField";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_BOOKMARKS,
  ADD_BOOKMARK,
  DEL_BOOKMARK,
} from "../client-config/queries";
import { UserInputINT, BookmarksINT } from "../client-config/interfaces";
import FadeMenu from "../components/Menu";
import Animations from "../components/Skeleton";

const Home = () => {
  // ============================================================
  // ==================== State Area =============================
  // ============================================================
  const [bookmarkList, setBookmarkList] = React.useState<BookmarksINT[]>([]);
  const [userInput, setUserInput] = React.useState<UserInputINT>({
    title: "",
    url: "",
    bg: "",
  });
  const [deletingIndecator, setDelIndecator] = useState<string>("");
  const [newIndecator, setNewIndecator] = useState<boolean>(false);
  // ==============================================================
  // ==================== Graphql Area =============================
  // ==============================================================
  const { loading, error, data } = useQuery(GET_BOOKMARKS);
  const [addBookmark] = useMutation(ADD_BOOKMARK);
  const [deleteBookmark] = useMutation(DEL_BOOKMARK);
  // ==============================================================
  // ===================== UseEffect Area ==============================
  // ==============================================================
  React.useEffect(() => {
    let arr = [];
    data &&
      data.allBookmarks.map((obj) => {
        const id = JSON.parse(obj.ref)["@ref"].id;
        const title = obj.data.title;
        const url = obj.data.url;
        const bg = obj.data.bg;
        arr.unshift({ id, title, url, bg });
      });
    setBookmarkList(arr);
    setNewIndecator(false);
    setDelIndecator("");
  }, [data]);
  React.useEffect(() => {
    document.title = "Bookmarking App";
  }, []);
  // ==============================================================
  // ===================== Functions Area ==============================
  // ==============================================================
  const add = () => {
    if (userInput.url && userInput.title) {
      addBookmark({
        variables: {
          title: userInput.title,
          url: userInput.url,
          bg: userInput.bg,
        },
        refetchQueries: [{ query: GET_BOOKMARKS }],
      });
      setUserInput({ title: "", url: "", bg: "" });
      setNewIndecator(true);
    } else {
      alert("Please Enter Details");
    }
  };
  const deleteBM = (id, ind: number) => {
    deleteBookmark({
      variables: { id: id },
      refetchQueries: [{ query: GET_BOOKMARKS }],
    });
    setDelIndecator(ind.toString());
  };
  // ================================================================
  if (error) {
    return (
      <div className="errorBox">
        <h1>Ops! Something Wrong</h1>
        <h3>Please Reload The Page</h3>
      </div>
    );
  }
  // ================================================================
  return (
    <Grid container className="mainContainer">
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className="leftBox">
        <p>BookMarking App</p>
        <div>
          <TextInputField
            label="Enter Title"
            className="inpField"
            value={userInput.title}
            handleChange={(e) =>
              setUserInput({ ...userInput, title: e.target.value })
            }
          />
          <TextInputField
            label="Enter URL"
            className="inpField"
            value={userInput.url}
            handleChange={(e) =>
              setUserInput({ ...userInput, url: e.target.value })
            }
          />
          <span className="colorBox">
            <p>Select Background Color</p>
            <input
              type="color"
              onChange={(e) =>
                setUserInput({ ...userInput, bg: e.target.value })
              }
            />
          </span>
          <Button className="addBtn" onClick={add}>
            Add BookMark
          </Button>
        </div>
        <span className="author">
          <p>
            Created By
            <a href="https://github.com/muhammaduxair" target="_">
              Muhammad Uzair
            </a>
          </p>
        </span>
      </Grid>
      {/* ========================================================= */}
      {/* ========================================================= */}
      <Grid item xs={12} sm={12} md={8} lg={8} xl={8} className="rightBox">
        {loading ? (
          <div className="loadingBox">
            <Animations />
          </div>
        ) : (
          <div>
            {newIndecator && (
              <div className="loadingBox">
                <Animations />
              </div>
            )}
            {bookmarkList.length ? (
              bookmarkList.map((v, i) => (
                <div
                  key={i}
                  className="bookMarkBox"
                  style={{ backgroundColor: v.bg ? v.bg : "#000" }}
                >
                  <a href={v.url} target="_blank">
                    {deletingIndecator === i.toString()
                      ? "Deleting...."
                      : v.title}
                  </a>
                  <FadeMenu
                    className="vertIcon"
                    handleDel={() => deleteBM(v.id, i)}
                  />
                </div>
              ))
            ) : (
              <div
                className="bookMarkBox"
                style={{ backgroundColor: "#c51539" }}
              >
                <h2>Bookmarks is Empty</h2>
              </div>
            )}
          </div>
        )}
      </Grid>
    </Grid>
  );
};
export default Home;
