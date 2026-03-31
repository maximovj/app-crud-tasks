export const TaskCard = (props) => {
  const { task } = props;

  return (
    <div>
      {/* Contenido */}
      <h3>{task.title}</h3>
      <p className="">{task.title}</p>
    </div>
  );
};
