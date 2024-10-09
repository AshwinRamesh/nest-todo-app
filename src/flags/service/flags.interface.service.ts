

// Interface for flags
// - Config flag: applies to the system as a whole
// - User flags: Can be used for experimentation, conditional on user

import { ConfigFlag, FlagTypes, UserFlag } from "../flags";

//  - Override flags: Automatically overrides any user flag value for all users
export interface FlagsService {

    // Retrieve config flag by key for types - string, number, boolean
    get(flag: ConfigFlag<string>): string;
    get(flag: ConfigFlag<number>): number;
    get(flag: ConfigFlag<boolean>): boolean;

    // Get all config flags
    getAll(): Map<string, FlagTypes>;

    // TODO - do the same for the feature flags?
    // TODO - need a userContext that has a map of all flag names and values that apply to that user.
    // TODO - this needs to be set at experiment level...
    getUserFlag(userContext: any, flag: UserFlag<FlagTypes>): FlagTypes;

}


export const FlagsServiceInterface = Symbol("FlagsServiceInterface");