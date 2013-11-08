using System;
using System.Collections.Generic;

namespace Q4.Angular.Models
{
    public class Project
    {
        public Guid ProjectId { get; set; }

        public string Name { get; set; }

        public string ClientName { get; set; }

        public string Technology { get; set; }

        public IList<Feature> Features { get; set; }
    }

    public class ProjectDTO
    {
        public Guid ProjectId { get; set; }

        public string Name { get; set; }

        public string ClientName { get; set; }

        public string Technology { get; set; }
    }
}