import React, { useContext } from "react";
import { RecipeContext } from "../Store/RecipeStore.js";
import { Skeleton, Drawer, Card, Avatar, List } from "antd";
import { message } from "antd";
import RecipeEditPage from "../RecipeEditPage/RecipeEditPage";
import axios from "axios";
import { withRouter } from "react-router-dom";

function MyPage(props) {
  const {
    setAddPageVisible,
    setGroceryInputList,
    setRecipeStepInputList,
    setCurrentPageInRecipeStep,
    setTotalPageInRecipeStep,
    setRecipeFields,
  } = useContext(RecipeContext);

  const { Meta } = Card;
  const { MyPageVisible, setMyPageVisible } = useContext(RecipeContext);
  const userData = JSON.parse(localStorage.getItem("userData"));

  console.log(userData)

  const codeArray = ["EDIT", "REGIST", "LOGOUT", "SETTING", "HELP"];
  const buttonTitle = {
    EDIT: "개인정보 수정",
    REGIST: "레시피 추가",
    LOGOUT: "로그아웃",
    SETTING: "설정",
    HELP: "도움말",
  };

  const buttonEvent = {
    EDIT: () => console.log("EDIT"),
    REGIST: () => showAddPageDrawer(),
    LOGOUT: () => logout(),
    SETTING: () => console.log("SETTING"),
    HELP: () => console.log("HELP"),
  };

  const logout = () => {
    axios.post("/api/recipe/signOut").then((response) => {
      if (response.data.loginoutSuccess) {
        props.history.push("/login");
        message.success(response.data.loginoutMessage);
      } else {
        message.error(response.data.loginoutMessage);
      }
    });
  };

  function showAddPageDrawer() {
    setGroceryInputList([]);
    setRecipeStepInputList([]);
    setRecipeFields([
      { name: ["min"], value: "10" },
      { name: ["serving"], value: "2" },
    ]);
    setCurrentPageInRecipeStep(0);
    setTotalPageInRecipeStep(0);
    setMyPageVisible(false);
    setAddPageVisible(true);
  }

  return (
    <>
      <RecipeEditPage />
      <Drawer
        title="개인 페이지"
        placement="right"
        width="70%"
        closable={true}
        onClose={() => setMyPageVisible(false)}
        visible={MyPageVisible}
        bodyStyle={{ padding: "0" }}
      >
        <Card style={{ width: "100%" }}>
          <Skeleton loading={false} avatar active>
            {userData && userData.isAuth && 
            <Meta
              avatar={
                userData.image ? (
                  <Avatar size={64} src={userData.image}></Avatar>
                ) : (
                  <Avatar
                    style={{
                      backgroundColor: "#00a2ae",
                      verticalAlign: "middle",
                    }}
                    size={64}
                    gap={4}
                  >
                    {userData.name}
                  </Avatar>
                )
              }
              title={userData.name}
              description="요리초보 파이팅!"
            />}
          </Skeleton>
        </Card>
        <List
          size="large"
          dataSource={codeArray}
          renderItem={(code) => (
            <List.Item onClick={buttonEvent[code]}>
              {buttonTitle[code]}
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
}

export default withRouter(MyPage);
