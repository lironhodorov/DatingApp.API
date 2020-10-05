using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(LogUserActivity))]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await _repo.GetUser(userId);
            userParams.UserId = userId;
            if (string.IsNullOrWhiteSpace(userParams.Gender))
            {
                userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            }
            var users = await _repo.GetUsers(userParams);
            var mappedUsers = _mapper.Map<IEnumerable<UserForListDto>>(users);
            Response.AddPaginationHeader(users.CurrentPage, users.TotalPages, users.PageSize, users.TotalCount);
            return Ok(mappedUsers);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var mappedUser = _mapper.Map<UserForDetailedDto>(user);
            return Ok(mappedUser);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForEditDto userForEdit)
        {
            //try to edit the not logged in user
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            else
            {
                var user = await _repo.GetUser(id);
                var mappedUser = _mapper.Map(userForEdit, user);
                if (await _repo.SaveAll())
                {
                    return NoContent();
                }
                throw new Exception($"updating user {id} failed on save");
            }
        }

        [HttpPost("{id}/like/{likeeId}")]
        public async Task<IActionResult> LikeUser(int id, int likeeId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var like = await _repo.GetLike(likeeId, id);
            if (like != null)
            {
                return BadRequest("The like already exists");
            }
            var userToLike = _repo.GetUser(likeeId);
            if (userToLike == null)
            {
                return NotFound();
            }
            like = new Like
            {
                LikerId = id,
                LikeeId = likeeId
            };
            _repo.Add<Like>(like);
            if(await _repo.SaveAll())
            {
                return Ok();
            }
            return BadRequest("Failed to like user");
        }


    }
}