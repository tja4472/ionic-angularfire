export interface Todo {
    $key: string;
    index: number;
    name: string;
    description?: string;
    isComplete: boolean;
}
