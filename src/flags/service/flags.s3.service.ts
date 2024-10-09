import { ConfigFlag, FlagTypes, UserFlag } from "../flags";
import { FlagsService } from "./flags.interface.service";


// TODO - will map to a file in s3. 
// Refresh file every N seconds
export class FlagsS3Service implements FlagsService {
    
    get(flag: ConfigFlag<string>): string;
    get(flag: ConfigFlag<number>): number;
    get(flag: ConfigFlag<boolean>): boolean;
    get(flag: ConfigFlag<FlagTypes>): string | number | boolean {
        throw new Error("Method not implemented.");
    }
    
    getAll(): Map<string, FlagTypes> {
        throw new Error("Method not implemented.");
    }

    getUserFlag(userContext: any, flag: UserFlag<FlagTypes>): FlagTypes {
        throw new Error("Method not implemented.");
    }

}