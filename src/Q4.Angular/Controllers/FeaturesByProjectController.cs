using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Microsoft.Ajax.Utilities;
using Q4.Angular.Models;

namespace Q4.Angular.Controllers
{
    public class FeaturesByProjectController : EFApiController
    {
        public IEnumerable<Feature> Get(Guid id)
        {
            return context.Projects.First(x => x.ProjectId == id).Features;
        } 
    }
}