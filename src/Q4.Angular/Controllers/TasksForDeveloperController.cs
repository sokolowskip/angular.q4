using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Q4.Angular.Models;

namespace Q4.Angular.Controllers
{
    public class TasksForDeveloperController : EFApiController
    {
        public IEnumerable<TaskDTO> Get(Guid id)
        {
            return context.Tasks.Where(x => x.Developer.DeveloperId == id).ToList().Select(Mapper.Map<TaskDTO>);
        }

    }
}
