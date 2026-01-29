using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Roles.Dto;
using UserCrud.Rooms.Dtos;

namespace UserCrud.Rooms
{
   public class RoomMapperProfile : Profile 
    {
        public RoomMapperProfile()
        {
            CreateMap<Room, RoomDto>();
            CreateMap<CreateRoomDto, Room>();
            CreateMap<UpdateRoomDto, Room>();
        }
    }
}



