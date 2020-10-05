using Microsoft.AspNetCore.Http;
using Microsoft.CodeAnalysis.Formatting;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
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

        public static void AddPaginationHeader(this HttpResponse response, int currentPage, int totalPages, int pageSize, int totalCount)
        {
            PaginationHeader header = new PaginationHeader(currentPage, totalPages, pageSize, totalCount);
            DefaultContractResolver contractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            };
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(header, new JsonSerializerSettings
            {
                ContractResolver = contractResolver
            }));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
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
