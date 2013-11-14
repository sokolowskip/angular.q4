using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Q4.Angular.Models;

namespace Q4.Angular.Controllers
{
    public class TasksController : EFApiController
    {
        public void Post([FromBody] Task task)
        {
            task.TaskId = Guid.NewGuid();
            context.Developers.Attach(task.Developer);
            context.Features.Attach(task.Feature);
            context.Tasks.Add(task);
            context.SaveChanges();
        }
    }
}
