import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { dynamoClient, headers, uid } from "../utils";
import { marshall } from "@aws-sdk/util-dynamodb";

export const setLocation = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { lat , lon , photos , phone , name , adrs , time } = JSON.parse(e?.body as string); 
    
    try {
       const locParams = {
          TableName: 'locations', 
          Item: marshall({
            id: uid.slice(0, 4),
            locationId: e?.pathParameters?.id, 
            photos: photos, 
            phone: phone, 
            name: name,
            address: adrs,
            lat: lat,
            lon: lon,
          })
       }; 
       await dynamoClient.putItem(locParams).then((res) => {
          console.log(res);
       }); 
    } catch(e) {
        console.log(e);
    }
    return {
        statusCode: 200,
        headers: headers,
        body: `Location has been added!`
    };
};