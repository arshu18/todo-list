using Dapper;
using System.Data;
using TodoListAPI.Filters;

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
    }
}
