using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.S3;
using System.Collections.Generic;
using System;
using System.Text;
using System.IO;
using SixLabors.ImageSharp;



namespace TradeUpRequest
{
 public class RequestProvider : IRequestProvider
    {
        private readonly IAmazonDynamoDB dynamoDB;
        public RequestProvider (IAmazonDynamoDB dynamoDB){
            this.dynamoDB = dynamoDB;
        }

        //Admin view all
        public async Task<RequestModel[]> GetAllRequestAsync()
        {
            var result = await dynamoDB.ScanAsync(new ScanRequest{
                TableName = "TradeUpRequests-dev",
            });

            if (result != null && result.Items != null){
                var requests = new  List<RequestModel>();
                foreach (var item in result.Items){
                    item.TryGetValue("requestID", out var requestID);
                    item.TryGetValue("requestTradeItemName", out var requestTradeItemName);
                    item.TryGetValue("requestTradeItemDesc", out var requestTradeItemDesc);
                    item.TryGetValue("requestTradeDate", out var requestTradeDate);
                    item.TryGetValue("requestTradeStatus", out var requestTradeStatus);
                    item.TryGetValue("requestTradeToID", out var requestTradeToID);
                    item.TryGetValue("requestTradeFromID", out var requestTradeFromID);
                    item.TryGetValue("requestItemID", out var requestItemID);
                    item.TryGetValue("requestMeetLocation", out var requestMeetLocation);
                    
                    
                    requests.Add(new RequestModel{
                        requestID = requestID?.S,
                        requestTradeItemName = requestTradeItemName?.S,
                        requestTradeItemDesc = requestTradeItemDesc?.S,
                        requestTradeDate = requestTradeDate?.S,
                        requestTradeStatus = requestTradeStatus?.S,
                        requestTradeToID = requestTradeToID?.S,
                        requestTradeFromID = requestTradeFromID?.S,
                        requestItemID = requestItemID?.S,
                        requestMeetLocation = requestMeetLocation?.S,
                        
                    });
                }
                return requests.ToArray();
            }
            return Array.Empty<RequestModel>();
        }

        public async Task<RequestModel[]> GetAllRequestByUserIDAsync(string inputRequestTradeFromID)
        {
            var result = await dynamoDB.QueryAsync(new QueryRequest{
                TableName = "TradeUpRequests-dev",
                IndexName = "requestTradeFromID-index",
                ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                    {":requestTradeFromID", new AttributeValue { S = inputRequestTradeFromID }}
                },
                KeyConditionExpression = "requestTradeFromID = :requestTradeFromID",
                
            });

            if (result != null && result.Items != null){
                var requests = new  List<RequestModel>();
                foreach (var item in result.Items){
                    item.TryGetValue("requestID", out var requestID);
                    item.TryGetValue("requestTradeItemName", out var requestTradeItemName);
                    item.TryGetValue("requestTradeItemDesc", out var requestTradeItemDesc);
                    item.TryGetValue("requestTradeDate", out var requestTradeDate);
                    item.TryGetValue("requestTradeStatus", out var requestTradeStatus);
                    item.TryGetValue("requestTradeToID", out var requestTradeToID);
                    item.TryGetValue("requestTradeFromID", out var requestTradeFromID);
                    item.TryGetValue("requestItemID", out var requestItemID);
                    item.TryGetValue("requestMeetLocation", out var requestMeetLocation);
                    
                    
                    requests.Add(new RequestModel{
                        requestID = requestID?.S,
                        requestTradeItemName = requestTradeItemName?.S,
                        requestTradeItemDesc = requestTradeItemDesc?.S,
                        requestTradeDate = requestTradeDate?.S,
                        requestTradeStatus = requestTradeStatus?.S,
                        requestTradeToID = requestTradeToID?.S,
                        requestTradeFromID = requestTradeFromID?.S,
                        requestItemID = requestItemID?.S,
                        requestMeetLocation = requestMeetLocation?.S,
                        
                    });
                }
                return requests.ToArray();
            }
            return Array.Empty<RequestModel>();
        }

        public async Task<bool> AddRequestWithImageAsync (RequestModel requestbody)
        {
            var request = new PutItemRequest
            {
                TableName = "TradeUpRequests-dev",
                Item = new Dictionary<string, AttributeValue>
                {
                    {"requestID", new AttributeValue(requestbody.requestID)},
                    {"requestTradeItemName", new AttributeValue(requestbody.requestTradeItemName)},
                    {"requestTradeItemDesc", new AttributeValue(requestbody.requestTradeItemDesc)},
                    {"requestTradeDate", new AttributeValue(requestbody.requestTradeDate)},
                    {"requestTradeStatus", new AttributeValue(requestbody.requestTradeStatus)},
                    {"requestTradeToID", new AttributeValue(requestbody.requestTradeToID)},
                    {"requestTradeFromID", new AttributeValue(requestbody.requestTradeFromID)},
                    {"requestItemID", new AttributeValue(requestbody.requestItemID)},
                    {"requestMeetLocation", new AttributeValue(requestbody.requestMeetLocation)},
                }
            };
            
            byte[] ImageBytes = Convert.FromBase64String(requestbody.requestImage);
            string decodedString = Encoding.UTF8.GetString(ImageBytes);
            Image image = Image.Load(ImageBytes);
            var client = new AmazonS3Client();
            using (var stream = new MemoryStream(ImageBytes)){
                await client.PutObjectAsync(new Amazon.S3.Model.PutObjectRequest
                {
                                BucketName = "tradeups3/RequestAsset",
                                Key = $"{requestbody.requestID}.jpg",
                                ContentType = "image/jpeg",
                                InputStream = stream,
                                CannedACL = S3CannedACL.PublicRead

                });
            }

            var response = await dynamoDB.PutItemAsync(request);
            return response.HttpStatusCode == System.Net.HttpStatusCode.OK;
        }

        public async Task<bool> AddRequestWithoutImageAsync (RequestModel requestbody)
        {
            var request = new PutItemRequest
            {
                TableName = "TradeUpRequests-dev",
                Item = new Dictionary<string, AttributeValue>
                {
                    {"requestID", new AttributeValue(requestbody.requestID)},
                    {"requestTradeItemName", new AttributeValue(requestbody.requestTradeItemName)},
                    {"requestTradeItemDesc", new AttributeValue(requestbody.requestTradeItemDesc)},
                    {"requestTradeDate", new AttributeValue(requestbody.requestTradeDate)},
                    {"requestTradeStatus", new AttributeValue(requestbody.requestTradeStatus)},
                    {"requestTradeToID", new AttributeValue(requestbody.requestTradeToID)},
                    {"requestTradeFromID", new AttributeValue(requestbody.requestTradeFromID)},
                    {"requestItemID", new AttributeValue(requestbody.requestItemID)},
                    {"requestMeetLocation", new AttributeValue(requestbody.requestMeetLocation)},
                    
                }
            };
            var response = await dynamoDB.PutItemAsync(request);
            return response.HttpStatusCode == System.Net.HttpStatusCode.OK;
        }

        //Update status based on delete/traded
        //get requestItemID first
        public async Task<RequestModel[]> GetRequestByRequestItemIDAsync(string inputRequestItemID)
        {
            var result = await dynamoDB.QueryAsync(new QueryRequest{
                TableName = "TradeUpRequests-dev",
                IndexName = "requestItemID-index",
                ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                    {":requestItemID", new AttributeValue { S = inputRequestItemID }}
                },
                KeyConditionExpression = "requestItemID = :requestItemID",
                
            });

            if (result != null && result.Items != null){
                var requests = new  List<RequestModel>();
                foreach (var item in result.Items){
                    item.TryGetValue("requestID", out var requestID);
                    item.TryGetValue("requestTradeItemName", out var requestTradeItemName);
                    item.TryGetValue("requestTradeItemDesc", out var requestTradeItemDesc);
                    item.TryGetValue("requestTradeDate", out var requestTradeDate);
                    item.TryGetValue("requestTradeStatus", out var requestTradeStatus);
                    item.TryGetValue("requestTradeToID", out var requestTradeToID);
                    item.TryGetValue("requestTradeFromID", out var requestTradeFromID);
                    item.TryGetValue("requestItemID", out var requestItemID);
                    item.TryGetValue("requestMeetLocation", out var requestMeetLocation);
                    
                    
                    requests.Add(new RequestModel{
                        requestID = requestID?.S,
                        requestTradeItemName = requestTradeItemName?.S,
                        requestTradeItemDesc = requestTradeItemDesc?.S,
                        requestTradeDate = requestTradeDate?.S,
                        requestTradeStatus = requestTradeStatus?.S,
                        requestTradeToID = requestTradeToID?.S,
                        requestTradeFromID = requestTradeFromID?.S,
                        requestItemID = requestItemID?.S,
                        requestMeetLocation = requestMeetLocation?.S,
                        
                    });
                }
                return requests.ToArray();
            }
            return Array.Empty<RequestModel>();
        }

        //use this function when item been removed
        public async Task<bool> UpdateRequestsToRemovedBasedOnID(string inputRequestItemID)
        {
            var result = await dynamoDB.QueryAsync(new QueryRequest{
                TableName = "TradeUpRequests-dev",
                IndexName = "requestItemID-index",
                ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                    {":requestItemID", new AttributeValue { S = inputRequestItemID }}
                },
                KeyConditionExpression = "requestItemID = :requestItemID",
                
            });

            if (result != null && result.Items != null){
                var requests = new  List<RequestModel>();
                foreach (var item in result.Items){
                    item.TryGetValue("requestID", out var requestID);
                    item.TryGetValue("requestItemID", out var requestItemID);
                    
                    var request = new UpdateItemRequest
                    {
                        TableName = "TradeUpRequests-dev",
                        Key = new Dictionary<string, AttributeValue>(){
                            { "requestItemID",new AttributeValue {S = requestItemID?.S}},
                            { "requestID",new AttributeValue {S = requestID?.S}},
                            
                        },
                        ExpressionAttributeNames = new Dictionary<string, string>(){
                            {"#requestTradeStatus", "requestTradeStatus"},
                            
                        },
                        ExpressionAttributeValues = new Dictionary<string, AttributeValue>(){
                            {":newStatus",new AttributeValue {S = "Removed"}},
                            
                            // This updates price only if current price is 20.00.
                            
                        },
                        UpdateExpression = "SET #requestTradeStatus = :newStatus",
                    };
                    var response =  await dynamoDB.UpdateItemAsync(request);
                }
                return true;
            }
            // return Array.Empty<RequestModel>();
            return true;
        }
        
        //     public async Task<bool> DeleteSelectedItemWithImageAsync(String inputItemID, String inputUserID){
        //     var request = new DeleteItemRequest
        //         {
        //             TableName = "TradeUpItems-dev",
        //             Key = new Dictionary<string,AttributeValue>() {
        //                  { "itemID", new AttributeValue { S = inputItemID } },
        //                  { "userID", new AttributeValue { S = inputUserID } }
        //              },
        //         };
        //     var response = await dynamoDB.DeleteItemAsync(request);
        //     await DeleteImageByIDAsync(inputItemID);
        //     return response.HttpStatusCode == System.Net.HttpStatusCode.OK;
        // }

        // public async Task<ItemModel[]> GetActiveItemByModeAndCategoryUserIDExistAsync(string inputItemMode, string inputItemCategory, string inputUserID)
        // {
        //         var result = await dynamoDB.QueryAsync(new QueryRequest{
        //             TableName = "TradeUpItems-dev",
        //             IndexName = "itemMode-itemCategory-index",
        //             ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
        //                 {":itemMode", new AttributeValue { S = inputItemMode }},
        //                 {":itemCategory", new AttributeValue { S = inputItemCategory }},
        //                 {":itemStatus", new AttributeValue { S = "Active" }},
        //                 {":userID", new AttributeValue { S = inputUserID }},
        //             },
        //             KeyConditionExpression = "itemMode = :itemMode AND itemCategory = :itemCategory",
        //             FilterExpression = "itemStatus = :itemStatus AND userID <> :userID"
        //         });

        //         if (result != null && result.Items != null){
        //             var items = new  List<ItemModel>();
        //             foreach (var item in result.Items){
        //                 item.TryGetValue("itemID", out var itemID);
        //                 item.TryGetValue("userID", out var userID);
        //                 item.TryGetValue("itemCategory", out var itemCategory);
        //                 item.TryGetValue("itemDate", out var itemDate);
        //                 item.TryGetValue("itemDesc", out var itemDesc);
        //                 item.TryGetValue("itemMode", out var itemMode);
        //                 item.TryGetValue("itemName", out var itemName);
        //                 item.TryGetValue("itemPrice", out var itemPrice);
        //                 item.TryGetValue("itemStatus", out var itemStatus);
                        
        //                 items.Add(new ItemModel{
        //                     itemID = itemID?.S,
        //                     userID = userID?.S,
        //                     itemCategory = itemCategory?.S,
        //                     itemDate = itemDate?.S,
        //                     itemDesc = itemDesc?.S,
        //                     itemMode = itemMode?.S,
        //                     itemName = itemName?.S,
        //                     itemPrice = itemPrice?.S,
        //                     itemStatus = itemStatus?.S
        //                 });
        //             }
        //             return items.ToArray();
        //         }
        //         return Array.Empty<ItemModel>();
        // }

    
        // public async Task<bool> DeleteSelectedItemWithoutImageAsync(String inputItemID, String inputUserID){
        //     var request = new DeleteItemRequest
        //         {
        //             TableName = "TradeUpItems-dev",
        //             Key = new Dictionary<string,AttributeValue>() {
        //                  { "itemID", new AttributeValue { S = inputItemID } },
        //                  { "userID", new AttributeValue { S = inputUserID } }
        //              },
        //         };
        //     var response = await dynamoDB.DeleteItemAsync(request);
        //     return response.HttpStatusCode == System.Net.HttpStatusCode.OK;
        // }

        // public async Task<bool> DeleteImageByIDAsync(String inputItemID){
        //     var client = new AmazonS3Client();
            
        //     var request = new Amazon.S3.Model.DeleteObjectRequest{
        //                     BucketName = "tradeups3/ItemAsset",
        //                     Key = $"{inputItemID}.jpg"
        //     };

        //     var response = await client.DeleteObjectAsync(request);
        //     Console.WriteLine(response.HttpStatusCode);

        //     return response.HttpStatusCode == System.Net.HttpStatusCode.OK;
        // } 

        
    }
}