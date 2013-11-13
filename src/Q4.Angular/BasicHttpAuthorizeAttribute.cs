using System;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web.Http.Controllers;
using System.Web.Security;
using Q4.Angular.Models;

namespace Q4.Angular
{
    public class BasicHttpAuthorizeAttribute : System.Web.Http.AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            if (Thread.CurrentPrincipal.Identity.Name.Length == 0)
            { // If an identity has not already been established by other means:
                AuthenticationHeaderValue auth = actionContext.Request.Headers.Authorization;
                if (string.Compare(auth.Scheme, "Basic", StringComparison.OrdinalIgnoreCase) == 0)
                {
                    string credentials = UTF8Encoding.UTF8.GetString(Convert.FromBase64String(auth.Parameter));
                    int separatorIndex = credentials.IndexOf(':');
                    if (separatorIndex >= 0)
                    {
                        string userName = credentials.Substring(0, separatorIndex);
                        string password = credentials.Substring(separatorIndex + 1);
                        if (PasswordIsCorrect(userName, password))
                            Thread.CurrentPrincipal  = new GenericPrincipal(new GenericIdentity(userName, "Basic"), new string[0]);
                    }
                }
            }
            return base.IsAuthorized(actionContext);
        }

        public bool PasswordIsCorrect(string login, string password)
        {
            using (var context = new AngularDbContext())
            {
                return context.Developers.Any(x => x.Login == login && x.Password == password);
            }
        }
    }
}