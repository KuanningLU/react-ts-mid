import { useState } from 'react';
import { asyncPost } from '../utils/fetch';
import { api } from '../enum/api';

function Create() {
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    sid: '',
    department: '',
    grade: '',
    class: '',
    email: '',
    absences: 0,
  });

  // 表單輸入變更處理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 表單驗證函數
  const validateForm = () => {
    if (!formData.name || !formData.userName || !formData.email) {
      alert("姓名、帳號和 Email 是必填欄位！");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Email 格式不正確！");
      return false;
    }
    if (isNaN(Number(formData.absences)) || Number(formData.absences) < 0) {
      alert("缺席次數必須是非負數值！");
      return false;
    }
    return true;
  };

  // 表單提交處理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      name: formData.name,
      userName: formData.userName,
      sid: formData.sid,
      department: formData.department,
      grade: formData.grade,
      class: formData.class,
      email: formData.email,
      absences: Number(formData.absences) || 0,
    };

    console.log("傳送的資料:", payload);

    try {
      const response = await asyncPost(api.Create, payload);
      if (response.code === 200) {
        alert('新增學生成功！');
        setFormData({
          name: '',
          userName: '',
          sid: '',
          department: '',
          grade: '',
          class: '',
          email: '',
          absences: 0,
        });
      } else {
        alert(`新增失敗: ${response.message || "未知錯誤"}`);
      }
    } catch (error) {
      console.error("新增學生失敗:", error);
      alert("系統錯誤，請稍後再試！");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>新增學生資料</h2>
      <input
        name="name"
        placeholder="姓名"
        onChange={handleChange}
        value={formData.name}
        required
      />
      <input
        name="userName"
        placeholder="帳號"
        onChange={handleChange}
        value={formData.userName}
        required
      />
      <input
        name="sid"
        placeholder="座號"
        onChange={handleChange}
        value={formData.sid}
      />
      <input
        name="department"
        placeholder="院系"
        onChange={handleChange}
        value={formData.department}
      />
      <input
        name="grade"
        placeholder="年級"
        onChange={handleChange}
        value={formData.grade}
      />
      <input
        name="class"
        placeholder="班級"
        onChange={handleChange}
        value={formData.class}
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        onChange={handleChange}
        value={formData.email}
        required
      />
      <input
        name="absences"
        placeholder="缺席次數"
        type="number"
        min="0"
        onChange={handleChange}
        value={formData.absences}
      />
      <button type="submit">新增學生</button>
    </form>
  );
}

export default Create;