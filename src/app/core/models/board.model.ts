export interface Members {
    [userId: string]: true;
}

export interface Board {
    _id?: string;
    title: string;
    members: Members;
}
