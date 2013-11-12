using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Q4.Angular.Models;

namespace Q4.Angular.Controllers
{
    public class FeaturesByProjectController : EFApiController
    {
        public IEnumerable<FeatureDTO> Get(Guid id)
        {
            return context.Projects.First(x => x.ProjectId == id).Features.Select(Mapper.Map<FeatureDTO>);
        } 
    }
}