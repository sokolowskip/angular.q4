using MongoDB.Driver;

namespace Q4.Angular.Infrastructure
{
    public class DatabaseProvider 
    {

        public static MongoDatabase GetDateabse()
        {
            MongoClient client = new MongoClient();
            MongoServer server = client.GetServer();
            MongoDatabase database = server.GetDatabase("test");
            return database;
        }

    }
}
