import { useState } from 'react';
import { api } from '../enum/api';
import { asyncPost } from '../utils/fetch'; // 發送 PUT 請求函式

function UpdateData() {
  const [updateData, setUpdateData] = useState({
    id: '',
    name: '',
    grade: '',
    absences: 0,
  });

  // 處理表單提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { id, name, grade, absences } = updateData;

    // 驗證必要欄位
    if (!id || !name || !grade) {
      alert('請填寫所有必要欄位！');
      return;
    }

    // 驗證缺席次數
    const absencesNumber = Number(absences);
    if (isNaN(absencesNumber) || absencesNumber < 0) {
      alert('缺席次數必須是非負整數！');
      return;
    }

    try {
      // 準備要發送的資料
      const payload = { ...updateData, absences: absencesNumber };

      // 發送 PUT 請求
      const res = await asyncPost(api.Update, payload);

      if (res.code === 200 && res.body) {
        alert(`資料更新成功！\n\n名稱: ${res.body.name}\n年級: ${res.body.grade}\n缺席次數: ${res.body.absences ?? 0}`);

        // 清空表單
        resetForm();
      } else {
        alert(`更新失敗：${res.message || '未知錯誤'}`);
      }
    } catch (error) {
      console.error('更新資料錯誤:', error);
      alert('發生錯誤，請檢查伺服器連線或後端設定！');
    }
  };

  // 處理輸入變更
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({
      ...prev,
      [name]: name === 'absences' ? Number(value) || 0 : value, // absences 強制轉換為數字
    }));
  };

  // 清空表單
  const resetForm = () => {
    setUpdateData({ id: '', name: '', grade: '', absences: 0 });
  };

  return (
    <div>
      <h2>修改學生資料</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input
            type="text"
            name="id"
            value={updateData.id}
            onChange={handleChange}
            placeholder="請輸入學生 ID"
            required
          />
        </label>
        <br />
        <label>
          名稱:
          <input
            type="text"
            name="name"
            value={updateData.name}
            onChange={handleChange}
            placeholder="請輸入學生名稱"
            required
          />
        </label>
        <br />
        <label>
          年級:
          <select name="grade" value={updateData.grade} onChange={handleChange} required>
            <option value="">請選擇年級</option>
            <option value="一">一年級</option>
            <option value="二">二年級</option>
            <option value="三">三年級</option>
            <option value="四">四年級</option>
          </select>
        </label>
        <br />
        <label>
          缺席次數:
          <input
            type="number"
            name="absences"
            value={updateData.absences}
            onChange={handleChange}
            min="0"
            placeholder="請輸入缺席次數"
          />
        </label>
        <br />
        <button type="submit">更新</button>
        <button type="button" onClick={resetForm} style={{ marginLeft: '10px' }}>
          清空
        </button>
      </form>
    </div>
  );
}

export default UpdateData;