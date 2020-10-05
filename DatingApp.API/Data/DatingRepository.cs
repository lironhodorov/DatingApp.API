using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            this._context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            IQueryable<User> query = _context.Users.Include(p => p.Photos).OrderByDescending(u => u.LastActive);
            query = query.Where(x => x.Gender == userParams.Gender);
            query = query.Where(x => x.Id != userParams.UserId);
            if (userParams.Likees)
            {
                var userLikes = await GetUserLikes(userParams.UserId, userParams.Likers);
                query = query.Where(u => userLikes.Contains(u.Id));
            }
            if (userParams.Likers)
            {
                var userLikes = await GetUserLikes(userParams.UserId, userParams.Likers);
                query = query.Where(u => userLikes.Contains(u.Id));
            }
            if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);
                query = query.Where(x => x.DateOfBirth > minDob && minDob <= maxDob);
            }
            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        {
                            query = query.OrderByDescending(u => u.Created);
                            break;
                        }
                    default:
                        {
                            query = query.OrderByDescending(u => u.LastActive);
                            break;
                        }
                }
            }
            return await PagedList<User>.CreateAsync(query, userParams.PageSize, userParams.CurrentPage);
        }

        public async Task<User> GetUser(int id)
        {
            return await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            return await _context.Photos.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<Photo[]> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(y => y.UserId == userId && y.IsMain).ToArrayAsync();
        }

        public async Task<Like> GetLike(int likeeId, int likerId)
        {
            return await _context.Likes.FirstOrDefaultAsync(l => l.LikeeId == likeeId && l.LikerId == likerId);
        }
        private async Task<IEnumerable<int>> GetUserLikes(int id, bool likers)
        {
            var user = _context.Users.Include(x => x.Likers).Include(x => x.Likees).FirstOrDefault(u => u.Id == id);

            if (likers)
            {
               return  user.Likers.Where(x => x.LikeeId == id).Select(x => x.LikerId);
            }
            else
            {
                return user.Likees.Where(x => x.LikerId == id).Select(x => x.LikeeId);
            }
        }
    }
}
