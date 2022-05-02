using TodoListAPI.Models;

namespace TodoListAPI.DataAccessLayer
{
    public interface ITaskRepository
    {
        Task Add(DateTime date, string task);

        Task<List<TaskModel>> GetTasks(DateTime startDate, DateTime endDate);

        Task<List<TaskModel>> UpcomingTasks();
    }
}
