﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Q4.Angular.Controllers
{
    public class StatisticsPerStatusController : EFApiController
    {
        public IEnumerable<GroupedByStatus> Get(Guid id)
        {
            return context.Tasks.Where(x => x.Feature.Project.ProjectId == id)
                .GroupBy(x => x.Status)
                .Select(x => new GroupedByStatus {StatusName = x.Key, Count = x.Count()});
        }
    }

    public class GroupedByStatus
    {
        public string StatusName { get; set; }

        public int Count { get; set; }
    }
}