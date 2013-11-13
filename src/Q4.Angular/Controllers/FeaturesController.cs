using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Web.Http;
using AutoMapper;
using Q4.Angular.Models;

namespace Q4.Angular.Controllers
{
    public class FeaturesController : EFApiController
    {
        public FeatureDTO Get(Guid id)
        {
            return Mapper.Map<FeatureDTO>(context.Projects.SelectMany(x => x.Features).First(x => x.FeatureId == id));
        }

        public void Post([FromBody] AddFeatureRequest request)
        {
            var project = context.Projects.First(x => x.ProjectId == request.ProjectId);
            var feature = new Feature {Name = request.Name, FeatureId = Guid.NewGuid()};
            project.Features.Add(feature);
            context.SaveChanges();
        }

        public void Put(Guid id, [FromBody] Feature feature)
        {
            var toUpdate = context.Projects.SelectMany(x => x.Features).First(x => x.FeatureId == id);
            toUpdate.Name = feature.Name;
            context.SaveChanges();
        }
    }

    public class AddFeatureRequest
    {
        public string Name { get; set; }

        public Guid ProjectId { get; set; }
    }
}