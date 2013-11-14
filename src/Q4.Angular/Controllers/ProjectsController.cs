using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using Q4.Angular.Models;

namespace Q4.Angular.Controllers
{
    public class ProjectsController : EFApiController
    {
        [HttpGet]
        public IEnumerable<FeatureDTO> GetFeatures(Guid projectId)
        {
            return context.Projects.First(x => x.ProjectId == projectId).Features.Select(Mapper.Map<FeatureDTO>);
        }

        [HttpGet]
        public IEnumerable<GroupedByStatus> GetTaskPerStatus(Guid projectId)
        {
            return context.Tasks.Where(x => x.Feature.Project.ProjectId == projectId)
                .GroupBy(x => x.Status)
                .Select(x => new GroupedByStatus { StatusName = x.Key, Count = x.Count() });
        }

        [HttpGet]
        public IEnumerable<FinishedTaskPerDay> GetFinishedTaskPerDay(Guid projectId)
        {
            return context.Tasks
                .Where(x => x.Feature.Project.ProjectId == projectId && x.Status == "Finished")
                .GroupBy(x => x.FinishDate)
                .Select(x => new FinishedTaskPerDay { Count = x.Count(), Date = x.Key.Value });
        }

        public IEnumerable<ProjectDTO> Get()
        {
            return context.Projects.ToList().Select(Mapper.Map<ProjectDTO>);
        }
        
        [HttpGet]
        public ProjectDTO Get(Guid id)
        {
            return Mapper.Map<ProjectDTO>(context.Projects.First(x => x.ProjectId == id));
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
