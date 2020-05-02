using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
        public static int Age(this DateTime dateOfBirth)
        {
            int age = DateTime.Now.Year - dateOfBirth.Year;
            if (dateOfBirth.AddYears(age) > DateTime.Now.Date)
            {
                age--;
            }
            return age;
        }
    }
}
