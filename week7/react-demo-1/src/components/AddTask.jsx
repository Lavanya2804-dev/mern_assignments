import { useForm } from "react-hook-form";

function AddTask({ addNewTask }) {
  const { register, handleSubmit, reset } = useForm();

  const onFormSubmit = (taskObj) => {
    addNewTask(taskObj);
    reset();
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-80">
      <h1 className="text-3xl font-semibold text-amber-500 mb-4 text-center">
        Add Task
      </h1>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <input
          type="text"
          {...register("taskname", { required: true })}
          placeholder="Enter task name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;