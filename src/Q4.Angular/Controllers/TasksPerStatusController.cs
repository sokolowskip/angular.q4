using System;
using System.Collections.Generic;
using System.Linq;
using Q4.Angular.Models;

namespace Q4.Angular.Controllers
{
    public class TasksPerStatusController : EFApiController
    {
        public IEnumerable<GroupedByStatus> Get(Guid id)
        {
            return context.Tasks.Where(x => x.Feature.Project.ProjectId == id)
                .GroupBy(x => x.Status)
                .Select(x => new GroupedByStatus {StatusName = x.Key, Count = x.Count()});
        }
    }
}