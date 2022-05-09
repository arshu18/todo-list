using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Globalization;
using TodoListAPI.Exceptions;
using TodoListAPI.Filters;
using TodoListAPI.DataAccessLayer;
using TodoListAPI.Models;

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

        [HttpPost("Delete")]
        [ExceptionHandling]
        public async Task<IActionResult> DeleteTask(long id, string date)
        {
            string formattedDateStr = FormattedDate(date);
            DateTime formattedDate = DateTime.ParseExact(formattedDateStr, "dd/MM/yyyy", CultureInfo.InvariantCulture);

            List<TaskModel> taskList = await _taskRepo.DeleteTask(id, formattedDate);

            var updatedTaskList = taskList.Select(x =>
            {
                string Date = ConvertDateToddMMyyyy(x.DateTime);
                string Time = ConvertDateToHHmm(x.DateTime);

                return new { x.ID, x.Task, Date, Time };
            });

            return Ok(updatedTaskList);
        }

        [HttpGet("GetTasks")]
        [ExceptionHandling]
        public async Task<IActionResult> GetTasks(string date)
        {
            string formattedDateStr = FormattedDate(date);
            DateTime formattedDate = DateTime.ParseExact(formattedDateStr, "dd/MM/yyyy", CultureInfo.InvariantCulture);

            DateTime startDateTime = new DateTime(formattedDate.Year, formattedDate.Month, formattedDate.Day, 0, 0, 0);
            DateTime endDateTime = new DateTime(formattedDate.Year, formattedDate.Month, formattedDate.Day, 23, 59, 59);

            List<TaskModel> taskList = await _taskRepo.GetTasks(startDateTime, endDateTime);

            var updatedTaskList = taskList.Select(x =>
            {
                string Time = x.DateTime.ToString("HH:mm");

                return new { x.ID, x.Task, Time };
            }).ToList();

            return Ok(updatedTaskList);
        }

        [HttpGet("UpcomingTasks")]
        [ExceptionHandling]
        public async Task<IActionResult> UpcomingTasks()
        {
            List<TaskModel> taskList = await _taskRepo.UpcomingTasks();

            var updatedTaskList = taskList.Select(x =>
            {
                string Date = ConvertDateToddMMyyyy(x.DateTime);
                string Time = ConvertDateToHHmm(x.DateTime);

                return new { x.ID, x.Task, Date, Time };
            });

            return Ok(updatedTaskList);
        }

        [HttpPost("DeleteFetchUpcomingTask")]
        [ExceptionHandling]
        public async Task<IActionResult> DeleteFetchUpcomingTask(long id)
        {
            List<TaskModel> taskList = await _taskRepo.DeleteTask(id, DateTime.Now);
            taskList = await _taskRepo.UpcomingTasks();

            var updatedTaskList = taskList.Select(x =>
            {
                string Date = ConvertDateToddMMyyyy(x.DateTime);
                string Time = ConvertDateToHHmm(x.DateTime);

                return new { x.ID, x.Task, Date, Time };
            });

            return Ok(updatedTaskList);
        }


        private static string ConvertDateToddMMyyyy(DateTime date)
        {
            string day = date.Day.ToString();
            if (day.Length == 1)
                day = "0" + day;

            string month = date.Month.ToString();
            if (month.Length == 1)
                month = "0" + month;

            return day + "/" + month + "/" + date.Year;
        }

        private static string ConvertDateToHHmm(DateTime date)
        {
            string hour = date.Hour.ToString();
            if(hour.Length == 1)
                hour = "0" + hour;

            string minute = date.Minute.ToString();
            if(minute.Length == 1)
                minute = "0" + minute;

            return hour + ":" + minute;
        }

        private static string FormattedDate(string date)
        {
            string[] dateComponents = date.Split('/');

            string day = dateComponents[0];
            string month = dateComponents[1];
            string year = dateComponents[2];

            if (day.Length == 1)
                day = "0" + day;

            if (month.Length == 1)
                month = "0" + month;

            return day + "/" + month + "/" + year;
        }
    }
}
