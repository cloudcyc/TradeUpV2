using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.S3;
using System.Collections.Generic;
using System;
using System.Text;
using System.IO;
using SixLabors.ImageSharp;

namespace TradeUpUser
{
 public class UserProvider : IUserProvider
    {
        private readonly IAmazonDynamoDB dynamoDB;
        public UserProvider (IAmazonDynamoDB dynamoDB){
            this.dynamoDB = dynamoDB;
        }

        // search centre by status 
        //example: /centres?inputCentreStatus=Active
        // 
        // public async Task<UserModel[]> GetUserByEmailAndPasswordAsync(string inputUserEmail)
        public async Task<UserModel[]> GetUserByEmailAndPasswordAsync(string inputUserEmail, string inputUserPassword)
        {
            var result = await dynamoDB.QueryAsync(new QueryRequest{
                TableName = "TradeUpUsers-dev",
                ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                    {":userEmail", new AttributeValue { S = inputUserEmail }},
                    {":userPassword", new AttributeValue { S = inputUserPassword }},
                },
                KeyConditionExpression = "userEmail = :userEmail",
                FilterExpression = "userPassword = :userPassword"
            });

            if (result != null && result.Items != null){
                var user = new  List<UserModel>();
                foreach (var item in result.Items){
                    item.TryGetValue("userID", out var userID);
                    item.TryGetValue("userEmail", out var userEmail);
                    item.TryGetValue("userFullname", out var userFullname);
                    item.TryGetValue("userPassword", out var userPassword);
                    item.TryGetValue("userDoB", out var userDoB);
                    item.TryGetValue("userRole", out var userRole);
                    item.TryGetValue("userPhone", out var userPhone);
                    item.TryGetValue("createdTime", out var createdTime);
                    
                    user.Add(new UserModel{
                        userID = userID?.S,
                        userEmail = userEmail?.S,
                        userFullname = userFullname?.S,
                        userPassword = userPassword?.S,
                        userDoB = userDoB?.S,
                        userRole = userRole?.S,
                        userPhone = userPhone?.S,
                        createdTime = createdTime?.S
                    });
                }
                return user.ToArray();
            }
            return Array.Empty<UserModel>();
        }

        public async Task<UserModel[]> GetUserByEmailAsync(string inputUserEmail)
        {
            var result = await dynamoDB.QueryAsync(new QueryRequest{
                TableName = "TradeUpUsers-dev",
                ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                    {":userEmail", new AttributeValue { S = inputUserEmail }},
                    
                },
                KeyConditionExpression = "userEmail = :userEmail",
            });

            if (result != null && result.Items != null){
                var user = new  List<UserModel>();
                foreach (var item in result.Items){
                    item.TryGetValue("userID", out var userID);
                    item.TryGetValue("userEmail", out var userEmail);
                    item.TryGetValue("userFullname", out var userFullname);
                    item.TryGetValue("userPassword", out var userPassword);
                    item.TryGetValue("userDoB", out var userDoB);
                    item.TryGetValue("userRole", out var userRole);
                    item.TryGetValue("userPhone", out var userPhone);
                    item.TryGetValue("createdTime", out var createdTime);
                    
                    user.Add(new UserModel{
                        userID = userID?.S,
                        userEmail = userEmail?.S,
                        userFullname = userFullname?.S,
                        userPassword = userPassword?.S,
                        userDoB = userDoB?.S,
                        userRole = userRole?.S,
                        userPhone = userPhone?.S,
                        createdTime = createdTime?.S
                    });
                }
                return user.ToArray();
            }
            return Array.Empty<UserModel>();
        }

        public async Task<UserModel[]> GetUserByPhoneAsync(string inputUserPhone)
        {
            var result = await dynamoDB.QueryAsync(new QueryRequest{
                TableName = "TradeUpUsers-dev",
                IndexName = "userPhone-index",
                ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                    {":userPhone", new AttributeValue { S = inputUserPhone }},
                },
                KeyConditionExpression = "userPhone = :userPhone",
            });

            if (result != null && result.Items != null){
                var user = new  List<UserModel>();
                foreach (var item in result.Items){
                    item.TryGetValue("userID", out var userID);
                    item.TryGetValue("userEmail", out var userEmail);
                    item.TryGetValue("userFullname", out var userFullname);
                    item.TryGetValue("userPassword", out var userPassword);
                    item.TryGetValue("userDoB", out var userDoB);
                    item.TryGetValue("userRole", out var userRole);
                    item.TryGetValue("userPhone", out var userPhone);
                    item.TryGetValue("createdTime", out var createdTime);
                    
                    user.Add(new UserModel{
                        userID = userID?.S,
                        userEmail = userEmail?.S,
                        userFullname = userFullname?.S,
                        userPassword = userPassword?.S,
                        userDoB = userDoB?.S,
                        userRole = userRole?.S,
                        userPhone = userPhone?.S,
                        createdTime = createdTime?.S
                    });
                }
                return user.ToArray();
            }
            return Array.Empty<UserModel>();
        }

        public async Task<UserModel[]> GetUserByIDAsync(string inputUserID)
        {
            var result = await dynamoDB.QueryAsync(new QueryRequest{
                TableName = "TradeUpUsers-dev",
                IndexName = "userID-index",
                ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                    {":userID", new AttributeValue { S = inputUserID }},
                },
                KeyConditionExpression = "userID = :userID",
            });

            if (result != null && result.Items != null){
                var user = new  List<UserModel>();
                foreach (var item in result.Items){
                    item.TryGetValue("userID", out var userID);
                    item.TryGetValue("userEmail", out var userEmail);
                    item.TryGetValue("userFullname", out var userFullname);
                    item.TryGetValue("userPassword", out var userPassword);
                    item.TryGetValue("userDoB", out var userDoB);
                    item.TryGetValue("userRole", out var userRole);
                    item.TryGetValue("userPhone", out var userPhone);
                    item.TryGetValue("createdTime", out var createdTime);
                    
                    user.Add(new UserModel{
                        userID = userID?.S,
                        userEmail = userEmail?.S,
                        userFullname = userFullname?.S,
                        userPassword = userPassword?.S,
                        userDoB = userDoB?.S,
                        userRole = userRole?.S,
                        userPhone = userPhone?.S,
                        createdTime = createdTime?.S
                    });
                }
                return user.ToArray();
            }
            return Array.Empty<UserModel>();
        }

        public async Task<UserModel[]> GetOtherAdminAsync(string inputUserRole,string inputUserID)
        {
            var result = await dynamoDB.QueryAsync(new QueryRequest{
                TableName = "TradeUpUsers-dev",
                IndexName = "userRole-index",
                ExpressionAttributeValues = new Dictionary<string,AttributeValue> {
                    {":userID", new AttributeValue { S = inputUserID }},
                    {":userRole", new AttributeValue { S = inputUserRole }}
                },
                KeyConditionExpression = "userRole = :userRole",
                FilterExpression = "userID <> :userID"
            });

            if (result != null && result.Items != null){
                var user = new  List<UserModel>();
                foreach (var item in result.Items){
                    item.TryGetValue("userID", out var userID);
                    item.TryGetValue("userEmail", out var userEmail);
                    item.TryGetValue("userFullname", out var userFullname);
                    item.TryGetValue("userPassword", out var userPassword);
                    item.TryGetValue("userDoB", out var userDoB);
                    item.TryGetValue("userRole", out var userRole);
                    item.TryGetValue("userPhone", out var userPhone);
                    item.TryGetValue("createdTime", out var createdTime);
                    
                    user.Add(new UserModel{
                        userID = userID?.S,
                        userEmail = userEmail?.S,
                        userFullname = userFullname?.S,
                        userPassword = userPassword?.S,
                        userDoB = userDoB?.S,
                        userRole = userRole?.S,
                        userPhone = userPhone?.S,
                        createdTime = createdTime?.S
                    });
                }
                return user.ToArray();
            }
            return Array.Empty<UserModel>();
        }

        public async Task<bool> AddNewUser (UserModel user)
        {
            var request = new PutItemRequest
            {
                TableName = "TradeUpUsers-dev",
                Item = new Dictionary<string, AttributeValue>
                {
                    {"userID", new AttributeValue(user.userID)},
                    {"userFullname", new AttributeValue(user.userFullname)},
                    {"userEmail", new AttributeValue(user.userEmail)},
                    {"userPassword", new AttributeValue(user.userPassword)},
                    {"userDoB", new AttributeValue(user.userDoB)},
                    {"userRole", new AttributeValue(user.userRole)},
                    {"userPhone", new AttributeValue(user.userPhone)},
                    {"createdTime", new AttributeValue(user.createdTime)},
                }
            };
        
            var response = await dynamoDB.PutItemAsync(request);
            return response.HttpStatusCode == System.Net.HttpStatusCode.OK;
        }

        
        public async Task<bool> DeleteUserAsync(string inputUserEmail, string inputUserID){
            var request = new DeleteItemRequest
                {
                    TableName = "TradeUpUsers-dev",
                    Key = new Dictionary<string,AttributeValue>() {
                         { "userEmail", new AttributeValue { S = inputUserEmail } },
                         { "userID", new AttributeValue { S = inputUserID } }
                         
                     },
                };

            var response = await dynamoDB.DeleteItemAsync(request);
            
            return response.HttpStatusCode == System.Net.HttpStatusCode.OK;
        }
    }
}