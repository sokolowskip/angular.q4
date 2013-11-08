using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Web.Http;
using Q4.Angular.Models;

namespace Q4.Angular.Controllers
{
    public class FeaturesController : EFApiController
    {
        public IEnumerable<Feature> Get(Guid projectId)
        {
            return context.Projects.First(x => x.ProjectId == projectId).Features;
        }

        public void Post([FromBody] AddFeatureRequest request)
        {
            var project = context.Projects.First(x => x.ProjectId == request.ProjectId);
            var feature = new Feature {Name = request.Name, FeatureId = Guid.NewGuid()};
            project.Features.Add(feature);
            context.SaveChanges();
        }
    }

    public class GetFeaturesRequest
    {
        public Guid ProjectId { get; set; }
    }

    public class AddFeatureRequest
    {
        public string Name { get; set; }

        public Guid ProjectId { get; set; }
    }
}