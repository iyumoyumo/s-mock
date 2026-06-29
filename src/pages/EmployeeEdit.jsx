import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // MockAPI のベースURL
  const API_URL = "https://6a3dc1420443193a1a0b039e.mockapi.io/employees";

  // 🔵 MockAPIから社員データ取得
  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((res) => {
        setEmployee(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("社員取得エラー:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>読み込み中...</div>;
  if (!employee) return <div>データが見つかりません</div>;

  // 🔵 保存処理（PUT）
  const handleSave = async () => {
    if (!window.confirm("この内容で保存しますか？")) return;

    try {
      await axios.put(`${API_URL}/${id}`, employee);

      alert("MockAPI に保存しました");
      navigate("/employees");
    } catch (error) {
      console.error("保存エラー:", error);
      alert("保存に失敗しました");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow w-full">
      <h2 className="text-xl font-bold mb-4">社員編集（MockAPI）</h2>

      {/* 社員ID */}
      <div className="mb-4">
        <label className="block mb-1">社員ID</label>
        <input
          className="border p-2 rounded w-full"
          value={employee.employeeId}
          onChange={(e) =>
            setEmployee({ ...employee, employeeId: e.target.value })
          }
        />
      </div>

      {/* 名前 */}
      <div className="mb-4">
        <label className="block mb-1">名前</label>
        <input
          className="border p-2 rounded w-full"
          value={employee.name}
          onChange={(e) =>
            setEmployee({ ...employee, name: e.target.value })
          }
        />
      </div>

      {/* 保存ボタン */}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleSave}
      >
        保存（MockAPI）
      </button>
    </div>
  );
}
