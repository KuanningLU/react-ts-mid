import { useState } from 'react';
import { asyncDelete } from '../utils/fetch'; // 引入剛新增的 asyncDelete 方法
import { api } from '../enum/api'; // 引入 API 列表

function DeleteData() {
  const [id, setId] = useState(''); // 用於儲存輸入的學生 ID

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      alert('請輸入學生 ID！'); // 驗證 ID 是否為空
      return;
    }
    try {
      // 調用 asyncDelete 發送請求
      const res = await asyncDelete(api.Delete, { id });
      if (res.code === 200) {
        alert('學生資料刪除成功！');
      } else {
        alert(`刪除失敗：${res.message}`);
      }
    } catch (error) {
      console.error('刪除學生資料錯誤', error);
      alert('刪除操作失敗，請檢查後再試！');
    }
  };
  return (
    <div>
      <h2>刪除學生資料</h2>
      <form onSubmit={handleSubmit}>
        <label>
          學生 ID:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)} // 更新 ID 值
            placeholder="輸入學生 ID"
          />
        </label>
        <button type="submit">刪除</button>
      </form>
    </div>
  );
}

export default DeleteData;