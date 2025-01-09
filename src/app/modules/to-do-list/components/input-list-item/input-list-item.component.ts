import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListItem } from '../../../../interfaces/ilist-item';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})
export class InputListItemComponent {
  @Input({required: true}) public inputListItens: IListItem[] = []
  @Output() public outPutUpdateItemCheckbox = new EventEmitter<
    {id: string, checked: boolean, } 
   >
  public updateItemCheckbox(id: string, checked: boolean) {
    return this.outPutUpdateItemCheckbox.emit({id, checked})
  }

  @Output() public outPutUpdateItemText = new EventEmitter<
    {id: string, value: string, } 
  >
  public updateItemText(id: string, value: string) {
    return this.outPutUpdateItemText.emit({id, value})
  }

  @Output() outputDeleteItem = new EventEmitter<string>

  public deleteItem(id: string){
    return this.outputDeleteItem.emit(id)
  }
}
