import { Address } from "../../types/api";

export interface ApplicationFlowFormData {
    salutation: string
    first_name: string
    last_name: string
    birthdate: string
    nationality: string
    address: Address
    is_seller: boolean | null
}

export class LocalApplicationFlowDataManager {
    private readonly LOCAL_STORAGE_KEY: string = "applicationFlowFormData";

    public constructor() {
        this.init();
    }

    public get(): ApplicationFlowFormData | null {
        try {
            const localData: any = localStorage.getItem(this.LOCAL_STORAGE_KEY);
            return JSON.parse(localData);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
	
    public update(data: any): void {
        try {
            localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    }
	
    public reset(): void {
        try {
            localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.getInitialStorageState()));
        } catch (error) {
            console.error(error);
        }
    }

    public getInitialStorageState(): ApplicationFlowFormData {
        return {
            salutation: "",
            first_name: "",
            last_name: "",
            birthdate: "",
            nationality: "",
            address: {
                street: "",
                house_number: "",
                city: "",
                postcode: "",
                country: "",
            },
            is_seller: null,
        };
    }

    /**
     * If there's no object in local storage, an empty form data object is initialized and persisted.
     */
    private init(): void {
        try {
            const localDataInitalized: ApplicationFlowFormData = this.getInitialStorageState();

            const localData = localStorage.getItem(this.LOCAL_STORAGE_KEY);

            if (localData == null) {
                localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(localDataInitalized));
            }
        } catch (error) {
            console.error(error);
        }
    }
}