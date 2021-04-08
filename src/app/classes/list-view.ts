import { BehaviorSubject, Observable } from 'rxjs';
import { IListPaginationData } from '../core/interfaces/back-end.interface';

export class ListView<T> {
    // search filter
    public search: Search;

    // list
    public list: T[];

    // pages
    public totalElements: number;

    constructor(id?) {
        this.search = new Search(id);
    }

    public setList(data: IListPaginationData<T> | any): void {
        this.list = data.data;
        this.totalElements = data.total;
    }

    public setId(id): void {
        this.search.key = id;
    }
}

export class Search {

    public key: string;
    public changes: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
    private searchValue: string;

    public set value(value: string) {
        this.searchValue = value;
    }
    public get value(): string {
        return this.searchValue;
    }

    constructor(key) {
        this.key = key;
        this.changes.next(this.value);
    }

    public change(): void {
        if (this.value === '') {
            this.value = undefined;
        }
        this.changes.next(this.value);
    }
}

export class Filter {
    public changes;
    public values;
    public selectedValue;
    constructor(values, defaultValue?) {
        this.changes = new BehaviorSubject(defaultValue);
        this.values = values;
        this.selectedValue = defaultValue;
    }

    public setValue(value): void {
        this.selectedValue = value;
        this.changes.next(this.selectedValue);
    }

    public clearValue(): void {
        this.selectedValue = undefined;
        this.changes.next(this.selectedValue);
    }
}

export class DateFilter {
    public changes;
    public selectedDate;
    constructor(defaultValue?) {
        this.changes = new BehaviorSubject(defaultValue);
        this.selectedDate = this.selectedDate;
    }

    public setValue(value): void {
        this.selectedDate = value;
        this.changes.next(this.selectedDate);
    }

    public clearValue(): void {
        this.selectedDate = undefined;
        this.changes.next(this.selectedDate);
    }
}
