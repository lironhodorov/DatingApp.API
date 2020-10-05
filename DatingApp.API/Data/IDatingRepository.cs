using DatingApp.API.Helpers;
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
    public interface IDatingRepository
    {
        void Add<T> (T entity) where T:class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id);
        Task<Photo> GetPhoto(int id);
        Task<Photo[]> GetMainPhotoForUser(int userId);
        Task<Like> GetLike(int likeeId, int likerId);
    }
}
