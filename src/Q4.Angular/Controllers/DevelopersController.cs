using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Q4.Angular.Models;

namespace Q4.Angular.Controllers
{
    public class DevelopersController : ApiController
    {
        private readonly AngularDbContext context = new AngularDbContext();

        public IEnumerable<DeveloperDTO> GetAllDevelopers()
        {
            return MapToDTO(context.Developers.ToList());
        }

        public DeveloperDTO GetOne(Guid id)
        {
            return MapToDTO(context.Developers.First(x => x.DeveloperId == id));
        }

        public void InsertDeveloper([FromBody] DeveloperDTO developer)
        {

            var model = MaptoModel(developer);
            model.HireDate = DateTime.UtcNow.Date;
            model.DeveloperId = Guid.NewGuid();
            context.Developers.Add(model);
            context.SaveChanges();

        }

        public void Put(string id, [FromBody] DeveloperDTO developer)
        {
            var devModel = context.Developers.First(x => x.DeveloperId == new Guid(id));
            devModel.FirstName = developer.FirstName;
            devModel.LastName = developer.LastName;
            devModel.BirthDate = developer.BirthDate;
            context.SaveChanges();
        }

        private Developer MaptoModel(DeveloperDTO developer)
        {
            return new Developer
            {
                FirstName = developer.FirstName,
                LastName = developer.LastName,
                BirthDate = developer.BirthDate,
            };
        }

        private IEnumerable<DeveloperDTO> MapToDTO(IEnumerable<Developer> toList)
        {
            return toList.Select(MapToDTO).ToList();
        }

        private static DeveloperDTO MapToDTO(Developer x)
        {
            return new DeveloperDTO
            {
                FirstName = x.FirstName,
                LastName = x.LastName,
                BirthDate = x.BirthDate,
                Id = x.DeveloperId.ToString()
            };
        }

        protected override void Dispose(bool disposing)
        {
            context.Dispose();
            base.Dispose(disposing);
        }
    }
}
