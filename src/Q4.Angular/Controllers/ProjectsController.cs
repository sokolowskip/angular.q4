using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Q4.Angular.Models;

namespace Q4.Angular.Controllers
{
    public class ProjectsController : EFApiController
    {
        public IEnumerable<Project> Get()
        {
            return context.Projects.ToList();
        }

        public Project Get(Guid id)
        {
            return context.Projects.First(x => x.ProjectId == id);
        }

        public void Post([FromBody] Project project)
        {
            var model = new Project()
            {
                Name = project.Name,
                ClientName = project.ClientName,
                Technology = project.Technology,
                ProjectId = Guid.NewGuid()
            };
            context.Projects.Add(model);
            context.SaveChanges();
        }

        public void Put(Guid id, [FromBody] Project project)
        {
            var projModel = context.Projects.First(x => x.ProjectId == id);
            projModel.Name = project.Name;
            projModel.ClientName = project.ClientName;
            projModel.Technology = project.Technology;
            context.SaveChanges();
        }
    }
}
