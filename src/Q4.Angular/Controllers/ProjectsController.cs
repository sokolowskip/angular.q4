using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Q4.Angular.Models;

namespace Q4.Angular.Controllers
{
    public class ProjectsController : ApiController
    {
        private readonly AngularDbContext context = new AngularDbContext();

        public IEnumerable<ProjectDTO> Get()
        {
            return context.Projects.ToList().Select(x => MapToDTO(x));
        }

        public ProjectDTO Get(Guid id)
        {
            return MapToDTO(context.Projects.First(x => x.ProjectId == id));
        }

        public void Post([FromBody] ProjectDTO project)
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

        public void Put(Guid id, [FromBody] ProjectDTO project)
        {
            var projModel = context.Projects.First(x => x.ProjectId == id);
            projModel.Name = project.Name;
            projModel.ClientName = project.ClientName;
            projModel.Technology = project.Technology;
            context.SaveChanges();
        }

        protected override void Dispose(bool disposing)
        {
            context.Dispose();
            base.Dispose(disposing);
        }

        private ProjectDTO MapToDTO(Project project)
        {
            return new ProjectDTO
            {
                Name = project.Name,
                ClientName = project.ClientName,
                Technology = project.Technology,
                ProjectId = project.ProjectId
            };
        }
    }
}
