using System.Threading.Tasks;
using System;
namespace TradeUpRequest
{
    public interface IRequestProvider
    {
        Task<RequestModel[]> GetAllRequestAsync();
        Task<RequestModel[]> GetAllRequestByUserIDAsync(string inputRequestTradeFromID);
        Task<bool> AddRequestWithImageAsync (RequestModel requestbody);
        Task<bool> AddRequestWithoutImageAsync (RequestModel requestbody);
        Task<bool> UpdateRequestsToRemovedBasedOnID(string inputRequestItemID, string inputNewStatus);
        Task<RequestModel[]> GetRequestByRequestItemIDAsync(string inputRequestItemID);
        Task<bool> DeleteImageByIDAsync(String inputRequestID);
    }
}