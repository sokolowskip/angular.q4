using System;

namespace Q4.Angular.Models
{
    public class AddFeatureRequest
    {
        public string Name { get; set; }

        public Guid ProjectId { get; set; }
    }
}