import { OnInit, OnDestroy, Input, HostListener, Directive } from "@angular/core";
import { Subscription } from "rxjs";
import { Table } from "primeng/table";
import { DomHandler } from "primeng/primeng";

@Directive({
    selector: '[pSortableColumnX]',
    providers: [DomHandler],
    host: {
        '[class.ui-sortable-column]': 'isEnabled()',
        '[class.ui-state-highlight]': 'sorted'
    }
})
export class SortableColumnX implements OnInit, OnDestroy {

    @Input("pSortableColumnX") field: string;

    @Input("pSortableColumnDisabledX") pSortableColumnDisabled: boolean;

    sorted: boolean;
    
    subscription: Subscription;

    constructor(public dt: Table, public domHandler: DomHandler) {
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.sortSource$.subscribe(sortMeta => {
                this.updateSortState();
            });
        }
    }

    ngOnInit() {
        if (this.isEnabled()) {
            this.updateSortState();
        }
    }

    updateSortState() {
        this.sorted = this.dt.isSorted(this.field);
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.isEnabled() && !this.preventSortClick(event.target)) {
            this.updateSortState();
            this.dt.sort({
                originalEvent: event,
                field: this.field
            });

            this.domHandler.clearSelection();
        }
    }

    isEnabled() {
        return this.pSortableColumnDisabled !== true;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    preventSortClick(target) {
        if (!(this.domHandler.hasClass(target, 'ui-sortable-clickable-area') || this.domHandler.hasClass(target, 'ui-sortable-column-icon'))) {
            return true;
        }
        return false;
    }

}
