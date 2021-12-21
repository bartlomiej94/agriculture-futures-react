export interface UserAuth {
    id: string
    email: string
}

export class LocalAuthManager {
    private readonly LOCAL_STORAGE_KEY: string = "agriaxAuth";

    public constructor() {
        this.init();
    }

    public get(): UserAuth | null {
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

    public getInitialStorageState(): UserAuth {
        return {
            id: "",
            email: "",
        };
    }

    /**
     * If there's no object in local storage, an empty form data object is initialized and persisted.
     */
    private init(): void {
        try {
            const localDataInitalized: UserAuth = this.getInitialStorageState();

            const localData = localStorage.getItem(this.LOCAL_STORAGE_KEY);

            if (localData == null) {
                localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(localDataInitalized));
            }
        } catch (error) {
            console.error(error);
        }
    }
}