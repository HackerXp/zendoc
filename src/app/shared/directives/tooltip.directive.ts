import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]', // Nome da diretiva
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = ''; // Texto do tooltip
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top'; // Posição do tooltip

  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipText) {
      return; // Não cria o tooltip se o texto não for fornecido
    }

    this.createTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.destroyTooltip();
  }

  private createTooltip() {
    // Criação do elemento do tooltip
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.appendChild(
      this.tooltipElement,
      this.renderer.createText(this.tooltipText)
    );

    // Aplicação das classes de estilo
    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.addClass(this.tooltipElement, `tooltip-${this.tooltipPosition}`);

    // Adiciona o tooltip ao DOM
    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);

    // Ajusta a posição do tooltip
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement?.getBoundingClientRect();

    let top, left;

    switch (this.tooltipPosition) {
      case 'top':
        top = hostPos.top - tooltipPos!.height - 8; // Ajuste para cima
        left = hostPos.left + hostPos.width / 2 - tooltipPos!.width / 2;
        top += 17; // Pequeno ajuste para baixo
        break;

      case 'bottom':
        top = hostPos.bottom + 8 + 2; // Ajuste para baixo com 1px adicional
        left = hostPos.left + hostPos.width / 2 - tooltipPos!.width / 2;
        break;

      case 'left':
        top = hostPos.top + hostPos.height / 2 - tooltipPos!.height / 2;
        left = hostPos.left - tooltipPos!.width - 8; // Ajuste para esquerda
        break;

      case 'right':
        top = hostPos.top + hostPos.height / 2 - tooltipPos!.height / 2;
        left = hostPos.right + 8 + 5; // Ajuste para direita com espaçamento adicional
        break;

      default:
        top = hostPos.bottom + 8;
        left = hostPos.left + hostPos.width / 2 - tooltipPos!.width / 2;
        break;
    }

    // Aplica os estilos calculados
    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'z-index', '1000');
  }

  private destroyTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
