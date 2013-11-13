using System.Linq;
using System.Threading;
using Q4.Angular.Models;

namespace Q4.Angular.Controllers
{
    public class UsersController : EFApiController
    {
        [BasicHttpAuthorize]
        public Developer Get()
        {
            var login = Thread.CurrentPrincipal.Identity.Name;
            return context.Developers.First(x => x.Login == login);
           
        }

    }
}
