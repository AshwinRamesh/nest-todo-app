
export type FlagTypes = string|number|boolean;

// Maps to the whole system
export class ConfigFlag<FlagTypes> {
    
    private name: string;
    private fallbackValue: FlagTypes;
    
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


// Maps to a set of users
export class UserFlag<FlagTypes> {

}