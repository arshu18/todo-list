using Microsoft.AspNetCore.Mvc.Filters;
using System.Web.Http;
using System.Net;
using TodoListAPI.Exceptions;

namespace TodoListAPI.Filters
{
    public class ExceptionHandlingAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            if(context.Exception is BusinessException)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent(context.Exception.Message),
                    ReasonPhrase = "Exception"
                });
            }

            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.InternalServerError)
            {
                Content = new StringContent("A technical error occured, please try again or contact us"),
                ReasonPhrase = "Critical Exception"
            });
        }
    }
}
