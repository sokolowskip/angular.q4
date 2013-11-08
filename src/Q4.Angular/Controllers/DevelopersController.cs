using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Q4.Angular.Models;

namespace Q4.Angular.Controllers
{
    public class DevelopersController : EFApiController
    {
        
        public IEnumerable<Developer> GetAllDevelopers()
        {
            return context.Developers.ToList();
        }

        public Developer GetOne(Guid id)
        {
            return context.Developers.First(x => x.DeveloperId == id);
        }

        public void InsertDeveloper([FromBody] Developer developer)
        {
            developer.HireDate = DateTime.UtcNow.Date;
            developer.DeveloperId = Guid.NewGuid();
            context.Developers.Add(developer);
            context.SaveChanges();
        }

        public void Put(string id, [FromBody] Developer developer)
        {
            var devModel = context.Developers.First(x => x.DeveloperId == new Guid(id));
            devModel.FirstName = developer.FirstName;
            devModel.LastName = developer.LastName;
            devModel.BirthDate = developer.BirthDate;
            context.SaveChanges();
        }


    }
}
