using System;
using System.Linq;
using System.Collections.Generic;
using Q4.Angular.Models;

namespace Q4.Angular.Controllers
{
    public class FinishedTasksPerDayController : EFApiController
    {
        public IEnumerable<FinishedTaskPerDay> Get(Guid id)
        {
            return context.Tasks
                .Where(x => x.Feature.Project.ProjectId == id && x.Status == "Finished")
                .GroupBy(x => x.FinishDate)
                .Select(x => new FinishedTaskPerDay {Count = x.Count(), Date = x.Key.Value});
        }
    }
}