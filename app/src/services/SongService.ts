import { QueryService } from "./QueryService";
import { Song } from "../models/Song";

export class SongService {

    static async createSong(song: Song): Promise<Song> {
        try {
            return await QueryService.create<Song>({ tableName: process.env.TABLE_NAME ?? '' }, song);
        } catch (error) {
            throw new Error("Error in createSong: " + error);
        }
    }

    static async getAllSongs(): Promise<Song[]> {
        try {
            const tableName = process.env.TABLE_NAME ?? '';
            return await QueryService.getAll<Song>({ tableName });
        } catch (error) {
            throw new Error("Error in getAllSongs: " + error);
        }
    }

    static async getById(id: string): Promise<Song> {
        try {
            const tableName = process.env.TABLE_NAME ?? '';
            return await QueryService.getById<Song>({ tableName }, id);
        } catch (error) {
            throw new Error("Error in getById: " + error);
        }
    }

}




