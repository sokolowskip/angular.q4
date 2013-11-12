using System;
using System.Collections.Generic;

namespace Q4.Angular.Models
{
    public class Project
    {
        public Project()
        {
            Features = new List<Feature>();
        }

        public Guid ProjectId { get; set; }

        public string Name { get; set; }

        public string ClientName { get; set; }

        public string Technology { get; set; }

        public DateTime StartDate { get; set; }

        public virtual IList<Feature> Features { get; set; }
    }

    public class ProjectDTO
    {
        public Guid ProjectId { get; set; }

        public string Name { get; set; }

        public string ClientName { get; set; }

        public string Technology { get; set; }

        public DateTime StartDate { get; set; }
    }
}