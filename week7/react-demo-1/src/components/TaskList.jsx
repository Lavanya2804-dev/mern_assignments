function TaskList({ tasks }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-80">
      <h1 className="text-3xl font-semibold text-amber-500 mb-4 text-center">
        Task List
      </h1>

      {tasks.length === 0 ? (
        <p className="text-gray-400 text-center">No tasks added</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((taskObj, index) => (
            <li
              key={index}
              className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-blue-800 font-medium"
            >
              {taskObj.taskname}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;