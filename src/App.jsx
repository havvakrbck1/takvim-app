import React, { useState } from "react";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState("");

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const days = daysInMonth(year, month);

  const dateKey = selectedDate.toISOString().split("T")[0];

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newTask.trim()],
    }));
    setNewTask("");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="bg-white shadow p-4 text-2xl font-semibold text-center">
        Takvim Planlayıcı 🗓️
      </header>

      <div className="flex justify-between items-center mb-4 px-4">
        <button
          onClick={() => setSelectedDate(new Date(year, month - 1, 1))}
          className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          ← Önceki Ay
        </button>

        <h2 className="text-xl font-bold">{year} - {month + 1}</h2>

        <button
          onClick={() => setSelectedDate(new Date(year, month + 1, 1))}
          className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          Sonraki Ay →
        </button>
      </div>

      <main className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <section className="md:col-span-2 bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            {year} - {month + 1}
          </h2>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(days)].map((_, i) => {
              const day = i + 1;
              const dayKey = new Date(year, month, day).toISOString().split("T")[0];
              const hasTasks = tasks[dayKey]?.length > 0;

              return (
                <div
                  key={day}
                  className={`p-4 rounded cursor-pointer text-center transition
                    ${hasTasks ? "bg-green-200 hover:bg-green-300" : "bg-blue-100 hover:bg-blue-300"}
                    ${dayKey === dateKey ? "ring-2 ring-blue-600" : ""}`}
                  onClick={() => setSelectedDate(new Date(year, month, day))}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">
            {selectedDate.toLocaleDateString()} – Görevler
          </h3>

          <ul className="mb-4 list-disc list-inside text-sm text-gray-700">
            {(tasks[dateKey] || []).map((task, i) => (
              <li key={i} className="flex justify-between items-center">
                {task}
                <button
                  onClick={() => {
                    const updated = [...tasks[dateKey]];
                    updated.splice(i, 1);
                    setTasks((prev) => ({
                      ...prev,
                      [dateKey]: updated,
                    }));
                  }}
                  className="ml-2 text-red-500 hover:text-red-700 text-xs"
                >
                  Sil
                </button>
              </li>
            ))}
            {!(tasks[dateKey]?.length > 0) && (
              <li className="text-gray-400">Görev yok</li>
            )}
          </ul>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Yeni görev ekle..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 border px-2 py-1 rounded"
            />
            <button
              onClick={addTask}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Ekle
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
