import { createBrowserRouter } from 'react-router';
import App from '../view/App';
import CreateData from '../view/Create';
import UpdateData from '../view/Update';
import DeleteData from '../view/Delete';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // 顯示所有學生資料
  },
  {
    path: '/all',
    element: <App />, // 顯示所有學生資料
  },
  {
    path: '/create',
    element: <CreateData />, // 新增學生頁面
  },
  {
    path: '/update',
    element: <UpdateData />, // 修改學生資料頁面
  },
  {
    path: '/delete',
    element: <DeleteData />, // 刪除學生資料頁面
  },
]);