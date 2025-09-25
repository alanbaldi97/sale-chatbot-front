export interface Route {
    path: string;
    name: string;
    icon: string;
    section?: boolean;
    children?: Route[] | []
}