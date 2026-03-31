import { createTask, deleteTask, getTask, updateTask } from "@/api/task.api";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export const TaskFormPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    const x_action = !params.id
      ? createTask(data)
      : updateTask(params.id, data);
    await x_action;
    navigate("/tasks");
  });

  const onDelete = async () => {
    const confirm = window.confirm("¿Seguro que deseas eliminarlo?");
    if (confirm) {
      await deleteTask(params.id);
      navigate("/tasks");
    }
  };

  const btnText = () => (params?.id ? "Actualizar tarea" : "Crear tarea");

  useEffect(() => {
    setValue("title");
    setValue("description");

    if (params.id) {
      const getTaskForById = async () => {
        const {
          data: { title, description },
        } = await getTask(params.id);
        setValue("title", title);
        setValue("description", description);
      };
      getTaskForById();
      console.log("Obteniendo datos");
    }
  }, [params.id, setValue]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          {...register("title", { required: true })}
          type="text"
          id="title"
          name="title"
          placeholder="Escribe un título"
          className="w-[300px] border border-slate-200 rounded-lg py-3 px-5 outline-none	bg-transparent"
        />
        {errors.title && <span>Este campo es requerido</span>}

        <textarea
          {...register("description", { required: true })}
          id="description"
          name="description"
          placeholder="Escribe una descripción"
          className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none resize-none min-h-[150px]"
        />
        {errors.description && <span>Este campo es requerido</span>}

        <input type="submit" value={btnText()} />
      </form>

      {params.id && (
        <button
          onClick={onDelete}
          className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
        >
          Eliminar tarea
        </button>
      )}
    </div>
  );
};
