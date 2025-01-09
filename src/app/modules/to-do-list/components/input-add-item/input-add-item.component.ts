import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, signal, ViewChild,  } from '@angular/core';
import { IListItem } from '../../../../interfaces/ilist-item';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {

  // um detector de mudancas 
  #cdr = inject(ChangeDetectorRef)
  
   @Input({required: true}) public inputListItens: IListItem[] = [] 
  

  // Um objeto que vai emitir informcoes para os outros components  
  @Output() outputListItems = new EventEmitter<IListItem>()
  // O objeto html marcado com o #inputText
  @ViewChild('inputText') public inputText!: ElementRef;
  public focusAndValueItem(value: string) {
    if (value) {
      this.#cdr.detectChanges()
      this.inputText.nativeElement.value = ''
      const id = `ID ${new Date().getTime()}`

      this.outputListItems.emit({
        id: id,
        checked: false,
        value: value,
      })
    }
    return this.inputText.nativeElement.focus()
  }

}
