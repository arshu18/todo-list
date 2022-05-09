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
            
            string query = "SELECT ID, Task, DateTime FROM [dbo].[Task] WHERE DateTime BETWEEN @StartDate AND @EndDate ORDER BY DateTime";

            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@StartDate", startDate, DbType.DateTime);
            parameters.Add("@EndDate", endDate, DbType.DateTime);

            using(IDbConnection connection = _context.CreateConnection())
            {
                taskList = (List<TaskModel>)await connection.QueryAsync<TaskModel>(query, parameters);
            }

            return taskList;
        }

        public async Task<List<TaskModel>> UpcomingTasks()
        {
            List<TaskModel> taskList;

            string query = "SELECT ID, Task, DateTime FROM [dbo].[Task] WHERE DateTime > GETDATE() ORDER BY DateTime";

            using (IDbConnection connection = _context.CreateConnection())
            {
                taskList = (List<TaskModel>)await connection.QueryAsync<TaskModel>(query);
            }

            return taskList;
        }

        public async Task<List<TaskModel>> DeleteTask(long id, DateTime targetDate)
        {
            List<TaskModel> taskList;

            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Id", id, DbType.Int64, ParameterDirection.Input);
            parameters.Add("@TargetDate", targetDate, DbType.DateTime, ParameterDirection.Input);

            using (IDbConnection connection = _context.CreateConnection())
            {
                taskList = (List<TaskModel>)await connection.QueryAsync<TaskModel>("sp_DeleteTask", new { Id = id, TargetDate = targetDate }, commandType: CommandType.StoredProcedure);
            }

            return taskList;
        }
    }
}
