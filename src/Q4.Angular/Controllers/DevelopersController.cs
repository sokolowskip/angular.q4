using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using MongoDB.Driver;
using Q4.Angular.Infrastructure;
using Q4.Angular.Models;

namespace Q4.Angular.Controllers
{
    public class DevelopersController : ApiController
    {
        public IEnumerable<DeveloperDTO> GetAllDevelopers()
        {
            MongoDatabase database = DatabaseProvider.GetDateabse();
            MongoCollection<Developer> collection = database.GetCollection<Developer>("developers");
            MongoCursor<Developer> developers = collection.FindAll();

            return MapToDTO(developers.ToList());
        }

        public void InsertDeveloper([FromBody] DeveloperDTO developer)
        {
            var collection = DatabaseProvider.GetDateabse().GetCollection<Developer>("developers");
            collection.Insert(MaptoModel(developer));
        }

        private Developer MaptoModel(DeveloperDTO developer)
        {
            return new Developer
            {
                FirstName = developer.FirstName,
                LastName = developer.LastName,
                BirthDate = developer.BirthDate,
                HireDate = developer.HireDate
            }
        }

        private IEnumerable<DeveloperDTO> MapToDTO(List<Developer> toList)
        {
            return toList.Select(x => new DeveloperDTO
            {
                FirstName = x.FirstName,
                LastName = x.LastName,
                BirthDate = x.BirthDate,
                HireDate = x.HireDate
            }).ToList();
        }
    }
}
