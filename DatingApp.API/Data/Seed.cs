using DatingApp.API.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    public static class Seed
    {
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        public static void SeedUsers(DataContext context)
        {
            if (!context.Users.Any())
            {
                var usersDataFromFile = System.IO.File.ReadAllText("Data/seed.json");
                var users = JsonConvert.DeserializeObject<List<User>>(usersDataFromFile);

                foreach (User user in users)
                {
                    byte[] salt, hash;
                    CreatePasswordHash("password", out hash, out salt);
                    user.PasswordHash = hash;
                    user.PasswordSalt = salt;
                    user.UserName = user.UserName.ToLower();

                    context.Users.Add(user);
                }
                context.SaveChanges();

            }
        }
    }
}
