using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.UI.WebControls;

namespace Q4.Angular.Controllers
{
    public class TaskManagamentController : EFController
    {
        [System.Web.Http.HttpPut]
        public ActionResult Finish(Guid id)
        {
            var task = context.Tasks.First(x => x.TaskId == id);
            task.Status = "Finished";
            task.FinishDate = DateTime.Today;
            context.SaveChanges();
            return Content(task.Status);
        }

        [System.Web.Http.HttpPut]
        public ActionResult Start(Guid id)
        {
            var task = context.Tasks.First(x => x.TaskId == id);
            task.Status = "In Progress";
            context.SaveChanges();
            return Content(task.Status);
        }

        [System.Web.Http.HttpPut]
        public ActionResult Reject(Guid id)
        {
            var task = context.Tasks.First(x => x.TaskId == id);
            task.Status = "Rejected";
            context.SaveChanges();
            return Content(task.Status);
        }

        [System.Web.Http.HttpPut]
        public ActionResult Stop(Guid id)
        {
            var task = context.Tasks.First(x => x.TaskId == id);
            task.Status = "Assinged";
            context.SaveChanges();
            return Content(task.Status);
        }
    }
}