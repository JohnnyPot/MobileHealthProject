import {Directive} from '@angular/core';
import {ElementRef, Renderer, Input} from '@angular/core';

@Directive({
    selector: '[animateSlidingItem]'
})
export class AnimateSlidingItemDirective {


    @Input('animateSlidingItem') shouldAnimate: boolean;

    constructor(public element: ElementRef, public renderer: Renderer) {}

    ngOnInit() {

        if (this.shouldAnimate) {

            this.renderer.setElementClass(this.element.nativeElement, 'active-slide', true);
            this.renderer.setElementClass(this.element.nativeElement, 'active-options-right', true);

            // Wait to apply animation
            setTimeout(() => {
                this.renderer.setElementClass(this.element.nativeElement.firstElementChild,
                    'itemSlidingAnimation', true);
            }, 2000);

        }

    }

}
