// 仓库入口文件
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const store = configureStore({ reducer });
export default store;
