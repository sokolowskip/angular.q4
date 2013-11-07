using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
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

        public DeveloperDTO GetOne(string id)
        {
            ObjectId objId = new ObjectId(id);
            MongoDatabase database = DatabaseProvider.GetDateabse();
            MongoCollection<Developer> collection = database.GetCollection<Developer>("developers");
            Developer developer = collection.FindOne(Query<Developer>.EQ(x => x.Id, objId));
            return MapToDTO(developer);
        }

        public void InsertDeveloper([FromBody] DeveloperDTO developer)
        {
            var collection = DatabaseProvider.GetDateabse().GetCollection<Developer>("developers");
            var model = MaptoModel(developer);
            model.HireDate = DateTime.UtcNow.Date;
            collection.Insert(model);
        }

        public void Put(string id, [FromBody] DeveloperDTO developer)
        {
            ObjectId objId = new ObjectId(id);
            MongoDatabase database = DatabaseProvider.GetDateabse();
            MongoCollection<Developer> collection = database.GetCollection<Developer>("developers");
            Developer developerModel = collection.FindOne(Query<Developer>.EQ(x => x.Id, objId));
            developerModel.FirstName = developer.FirstName;
            developerModel.LastName = developer.LastName;
            developerModel.BirthDate = developer.BirthDate;
            collection.Save(developerModel);
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

        private IEnumerable<DeveloperDTO> MapToDTO(List<Developer> toList)
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
                Id = x.Id.ToString()
            };
        }
    }
}
