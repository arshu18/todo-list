using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Globalization;
using TodoListAPI.Exceptions;
using TodoListAPI.Filters;
using TodoListAPI.DataAccessLayer;

namespace TodoListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository _taskRepo;

        public TaskController(ITaskRepository taskRepo)
        {
            _taskRepo = taskRepo;
        }
        
        [HttpPost("Add")]
        [ExceptionHandling]
        public async Task<IActionResult> AddTask(string dateTime, string task)
        {
            if (String.IsNullOrEmpty(dateTime))
                throw new BusinessException("Date and Time cannot be empty");

            if (String.IsNullOrEmpty(task))
                throw new BusinessException("Task cannot be empty");

            DateTime outputDate;
            if (!DateTime.TryParseExact(dateTime, "dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture, DateTimeStyles.None, out outputDate))
                throw new BusinessException("Date and Time needs to be in dd/MM/yyyy Hours(24 hr format):Minutes format");

            DateTime todayDate = DateTime.Today;
            if (outputDate < todayDate)
                throw new BusinessException("Date and Time cannot be less than current Date and Time");

            await _taskRepo.Add(outputDate, task);

            return Ok();
        }
    }
}
