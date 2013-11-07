using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using MongoDB.Driver;
using NUnit.Framework;
using Q4.Angular.Models;

namespace Q4.Angular.Tests
{
    [TestFixture]
    public class Class1
    {
        [Test]
        public void CanSaveDeveloper()
        {
            var d = new Developer
            {
                FirstName = "Paweł",
                LastName = "Sokołowski",
                BirthDate = new DateTime(1988, 3, 6),
                HireDate = new DateTime(2013, 11, 6)
            };

            MongoClient client = new MongoClient();
            MongoServer server = client.GetServer();
            MongoDatabase database = server.GetDatabase("test");
            var collection = database.GetCollection<Developer>("developers");

            collection.Insert(d);
        }

        [Test]
        public void CanLoadDevelopers()
        {
            MongoClient client = new MongoClient();
            MongoServer server = client.GetServer();
            MongoDatabase database = server.GetDatabase("test");
            MongoCollection<Developer> collection = database.GetCollection<Developer>("developers");
            MongoCursor<Developer> developers = collection.FindAll();
            var developer = developers.FirstOrDefault();

            Assert.IsNotNull(developer);
        }

        [Test]
        public void CanSaveDeveloperWithSkills()
        {
            var d = new Developer
            {
                FirstName = "Anna",
                LastName = "Biedrzycka",
                BirthDate = new DateTime(1983, 3, 16),
                HireDate = new DateTime(2013, 11, 6),
                Skills = new List<string> {"C#", "T-SQL", "Database managment"}
            };

            MongoClient client = new MongoClient();
            MongoServer server = client.GetServer();
            MongoDatabase database = server.GetDatabase("test");
            var collection = database.GetCollection<Developer>("developers");

            collection.Insert(d);
        }
    }
}
