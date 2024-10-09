import { Injectable } from '@nestjs/common';
import { FlagsService } from './flags.interface.service';
import { ConfigFlag, FlagTypes, UserFlag } from '../flags';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FlagsLocalService implements FlagsService {

    // Map of all current flag values
    private flagMap: Map<string, FlagTypes>;

    private static LOCAL_FILE_DEFAULT_PATH = "../../config/flags.local.json";
    private static RELOAD_INTERVAL_MS = 5000;

    constructor() {
        this.reloadFlagsFromDisk();

        // Run background task to reload from disk
        // TODO - move the refresh interval into config.
        setInterval(() => {
            this.reloadFlagsFromDisk();
        }, FlagsLocalService.RELOAD_INTERVAL_MS);
    }
    getUserFlag(userContext: any, flag: UserFlag<FlagTypes>): FlagTypes {
        throw new Error('Method not implemented.');
    }

    // TODO - handle errors better
    private reloadFlagsFromDisk(): void {
        console.log(`Starting reload! ${new Date().toString()}`);

        const filePath = path.join(__dirname, FlagsLocalService.LOCAL_FILE_DEFAULT_PATH); // Adjust the filename
        const jsonData = fs.readFileSync(filePath, 'utf-8'); // Read file content as a string
        const data =  JSON.parse(jsonData); // Parse the JSON string to an object

        const reloadedFlags = new Map<string, FlagTypes>();
        // Check if parsed object is indeed an object (and not null or other types)
        if (typeof data === 'object' && data !== null && !Array.isArray(data)) {

            // Loop through object keys and add to the Map
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    // Ensure the key is a string (in case the structure is odd)
                    if (typeof key === 'string') {
                        const val = data[key];
                        if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
                            reloadedFlags.set(key, data[key]);
                        } else {
                            console.log(`Cannot set flag for key : ${key}`);
                        }
                    }
                }
            }
            this.flagMap = reloadedFlags;
            console.log("Finished reloading", this.flagMap);
        } else {
            throw new Error("ERROR! The flag data file is corrupt."); // TODO - better handling.
        }
    }

    public get(flag: ConfigFlag<string>): string;
    public get(flag: ConfigFlag<number>): number;
    public get(flag: ConfigFlag<boolean>): boolean;
    public get(flag: ConfigFlag<FlagTypes>): FlagTypes {
        const flagName = flag.getName();
        const flagType = typeof flag;
        if (flagName in this.flagMap) {
            let val = this.flagMap[flagName]
            if (typeof val === flagType) {
                return val; // Return the value if it's a string
            } else {
                // TODO - Don't throw error? Return default and log.
                throw new Error(`Value for flag ${flagName} is not of type ${flagType}. Returning default value.`)
            }
        }
        return flag.getDefault();
    }

    public getAll(): Map<string, FlagTypes> {
        return this.flagMap;
    }
}


