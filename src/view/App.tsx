import { useEffect, useRef, useState } from 'react';
import "../style/App.css";
import { asyncGet } from '../utils/fetch';
import { api } from '../enum/api';
import { Student } from '../interface/Student';
import { resp } from '../interface/resp';
import { Link } from 'react-router';

function App() {
  const [students, setStudents] = useState<Array<Student>>([]);
  const cache = useRef<boolean>(false);

  // 重新獲取學生數據的函數
  const fetchStudents = () => {
    asyncGet(api.findAll)
      .then((res: resp<Array<Student>>) => {
        if (res.code === 200) {
          setStudents(res.body);
        } else {
          console.error("查詢資料失敗：", res.message);
        }
      })
      .catch((error) => {
        console.error("API 請求錯誤：", error);
      });
  };

  useEffect(() => {
    if (!cache.current) {
      cache.current = true;
      fetchStudents();
    }
  }, []);

  const studentCards = students.length > 0
    ? students.map((student: Student) => (
        <div className="student" key={student._id}>
          <h1>{student.name}</h1>
          <p>帳號: {student.userName}</p>
          <p>座號: {student.sid}</p>
          <p>院系: {student.department}</p>
          <p>年級: {student.grade}</p>
          <p>班級: {student.class}</p>
          <p>Email: {student.Email}</p>
          <p>缺席次數: {student.absences ?? 0}</p>
        </div>
      ))
    : <div className="no-data"><p>目前無學生資料，請新增學生。</p></div>;

  return (
    <div className="app-container">
      {/* 頁面上方按鈕 */}
      <div className="top-nav">
        <h2>StudentHub</h2>
        <nav>
          <Link to="/" className="nav-button">首頁🏠</Link>
          <Link to="/all" className="nav-button">所有學生🧑‍🎓</Link>
          <Link to="/create" className="nav-button">新增學生➕</Link>
          <Link to="/update" className="nav-button">修改學生資料🔄</Link>
          <Link to="/delete" className="nav-button">刪除學生資料➖</Link>
        </nav>
      </div>

      {/* 主內容 */}
      <div className="main-content">
        {studentCards}
      </div>
    </div>
  );
}

export default App;