using System.Data;
using System.Data.SqlClient;

namespace TodoListAPI.DataAccessLayer
{
    public class DapperContext
    {
        public readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public DapperContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("SqlConnection");
        }

        public IDbConnection CreateConnection() => new SqlConnection(_connectionString);
    }
}
