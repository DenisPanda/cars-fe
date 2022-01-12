import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  renderer!: Renderer2;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    rendererFactory: RendererFactory2
  ) {
    // renderer isn't available in services by default
    // but we can bypass this behaviour by creating a
    // renderer instance from the renderer factory
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Use it to set the class on the HTML body element.
   * @param klass -> css class to be added
   */
  setBodyClass(klass: string): void {
    if (klass) {
      this.renderer.addClass(this.doc.body, klass);
    }
  }

  /**
   * Use it to remove the class on the HTML body element.
   * @param klass -> css class to be removed
   */
  removeBodyClass(klass: string): void {
    if (klass) {
      this.renderer.removeClass(this.doc.body, klass);
    }
  }
}
