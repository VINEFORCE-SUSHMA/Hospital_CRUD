using Abp.Zero.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UserCrud.Authorization.Roles;
using UserCrud.Authorization.Users;
using UserCrud.Beds;
using UserCrud.Doctors;
using UserCrud.MultiTenancy;
using UserCrud.Patients;
using UserCrud.Rooms;

namespace UserCrud.EntityFrameworkCore;

public class UserCrudDbContext : AbpZeroDbContext<Tenant, Role, User, UserCrudDbContext>
{
    /* Define a DbSet for each entity of the application */
    public UserCrudDbContext(DbContextOptions<UserCrudDbContext> options)
        : base(options)
    {
    }
    public DbSet<patient> Patients { get; set; }
    public DbSet<Doctor> Doctors { get; set; }
    public DbSet<Room> Rooms { get; set; }
    public DbSet<Bed> Beds { get; set; }
}
