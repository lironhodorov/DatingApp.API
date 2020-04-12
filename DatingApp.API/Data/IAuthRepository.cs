using DatingApp.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    /// <summary>
    ///we are using repository pattern for - diffrent implementation then entity framework(memory,cloud) same for controller
    ///all queries in one place
    ///promotes tests - can be implementred easily 
    ///no double code - for example many controllers would need the same entities
    /// </summary>
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
    }
}
