using System.Threading.Tasks;
using System;
namespace TradeUpUser
{
    public interface IUserProvider
    {
    //    Task<UserModel[]> GetUserByEmailAndPasswordAsync(string inputUserEmail);
       Task<UserModel[]> GetUserByEmailAndPasswordAsync(string inputUserEmail, string inputUserPassword);
       Task<UserModel[]> GetOtherAdminAsync(string inputUserRole,string inputUserID);
       Task<UserModel[]> GetUserByEmailAsync(string inputUserEmail);
       Task<UserModel[]> GetUserByIDAsync(string inputUserID);
       Task<bool> AddNewUser (UserModel user);
       Task<bool> DeleteUserAsync(string inputUserEmail, string inputUserID);
    }
}