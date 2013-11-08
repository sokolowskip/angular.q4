using System.Web.Http;
using Q4.Angular.Models;

namespace Q4.Angular.Controllers
{
    public class EFApiController : ApiController
    {
        protected readonly AngularDbContext context = new AngularDbContext();

        protected override void Dispose(bool disposing)
        {
            context.Dispose();
            base.Dispose(disposing);
        }
    }
}