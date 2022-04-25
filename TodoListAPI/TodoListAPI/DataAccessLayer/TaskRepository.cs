using Dapper;
using System.Data;
using TodoListAPI.Models;

namespace TodoListAPI.DataAccessLayer
{
    public class TaskRepository : ITaskRepository
    {
        private readonly DapperContext _context;

        public TaskRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task Add(DateTime date, string task)
        {
            string query = "INSERT INTO [dbo].[Task] VALUES(@Task, @DateTime)";

            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@DateTime", date, DbType.DateTime);
            parameters.Add("@Task", task, DbType.String);

            using (IDbConnection connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }

        public async Task<List<TaskModel>> GetTasks(DateTime startDate, DateTime endDate)
        {
            List<TaskModel> taskList;
            
            string query = "SELECT ID, Task, DateTime FROM [dbo].[Task] WHERE DateTime BETWEEN @StartDate AND @EndDate";

            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@StartDate", startDate, DbType.DateTime);
            parameters.Add("@EndDate", endDate, DbType.DateTime);

            using(IDbConnection connection = _context.CreateConnection())
            {
                taskList = (List<TaskModel>)await connection.QueryAsync<TaskModel>(query, parameters);
            }

            return taskList;
        }
    }
}
