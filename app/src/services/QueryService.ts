
import { dynamoClient } from "./DynamoClient";

export interface OptionsQueryService{
    tableName: string;
}

export class QueryService<T> {

    static async create<T extends Object>(options: OptionsQueryService, item: T): Promise<T> {
        await dynamoClient.put({
            TableName: options.tableName,
            Item: item
        }).promise();
        return item as T;
    }

    static async getAll<T extends Object>(options: OptionsQueryService): Promise<T[]> {
        const response = await dynamoClient.scan({
            TableName: options.tableName
        }).promise();
        return response.Items as T[];
    }

    static async getById<T extends Object>(options: OptionsQueryService, id: string): Promise<T> {
        const response = await dynamoClient.get({
            TableName: options.tableName,
            Key: { id }
        }).promise();
        return response.Item as T;
    }

    static async update<T extends Object>(tableName: string, id: string, item: T): Promise<T> {
    //TODO: implement update
     return await item;
    }

    static async delete<T extends Object>(options: OptionsQueryService, id: string): Promise<{message: string}> {
        await dynamoClient.delete({
            TableName: options.tableName,
            Key: { id }
        }).promise();
        return {
            message: `Item with id ${id} deleted`
        } 
    }

}