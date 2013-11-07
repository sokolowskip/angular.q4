using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Web.UI.WebControls.WebParts;

namespace Q4.Angular.Models
{
    public class AngularDbContext : DbContext
    {
        public DbSet<Developer> Developers { get; set; }

        public DbSet<Project> Projects { get; set; }

        public AngularDbContext() : base("AngularDb")
        {
        }
    }
}