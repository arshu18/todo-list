namespace TodoListAPI.DataAccessLayer
{
    public interface ITaskRepository
    {
        Task Add(DateTime date, string task);
    }
}
