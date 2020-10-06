import { TrackByFunction } from '@angular/core';

export const trackById: TrackByFunction<any> = (_: number, item: any): string => {
    return item._id;
};
