using System;
using System.Collections.Generic;

namespace Q4.Angular.Models
{
    public class Feature
    {
        public Feature()
        {
            Tasks = new List<Task>();
        }

        public Guid FeatureId { get; set; }

        public string Name { get; set; }

        public virtual IList<Task> Tasks { get; set; }
    }
}