function TaskCount({ tasks }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-80 text-center">
      <h1 className="text-3xl font-semibold text-amber-500 mb-4">
        Task Count
      </h1>

      <p className="text-5xl font-bold text-blue-600">
        {tasks.length}
      </p>

      <p className="text-gray-500 mt-2">Total Tasks</p>
    </div>
  );
}

export default TaskCount;