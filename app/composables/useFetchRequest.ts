export async function useFetchRequest<T>(url: string, options: object = {}) : Promise<T> {

    const events = useEventsStore()

    try {
        const data: T = await $fetch(url, options);

        return data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            events.trigger('session-expired');
        }
        throw error;
    }
    
}
    