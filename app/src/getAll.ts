import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Song } from './models/Song';
import { SongService } from './services/SongService';


export const getAllSongsHandler = async (
    event: APIGatewayProxyEvent
    ): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        const songs: Song[] = await SongService.getAllSongs();
        response = {
            statusCode: 200,
            body: JSON.stringify(songs),
        };
    } catch (err: unknown) {
        console.log(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err instanceof Error ? err.message : 'some error happened',
            }),
        };
    }
    return response;
}