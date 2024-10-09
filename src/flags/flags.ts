
export type FlagTypes = string|number|boolean;

// Maps to the whole system (not at a user level like a feature flag)
// TODO - need a way to pass these flags to FE also...

export class ConfigFlag<FlagTypes> {
    
    private readonly name: string;
    private readonly fallbackValue: FlagTypes;
    
    private static flagNameList: string[]
    
    constructor(name:string, fallbackValue: FlagTypes) {
        this.name = name;
        this.fallbackValue = fallbackValue;
        
        // TODO - track the name of the flag in the flagNameList and ensure we are not duplicating.
    }

    public getDefault(): FlagTypes {
        return this.fallbackValue;
    }

    public getName(): string {
        return this.name;
    }

}


// Maps to a set of users - Still in development (aka. Feature Flags)
export class UserFlag<FlagTypes> {

}