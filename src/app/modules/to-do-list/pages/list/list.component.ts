import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListItem } from '../../../../interfaces/ilist-item';
import { InputListItemComponent } from "../../components/input-list-item/input-list-item.component";

import Swal from 'sweetalert2';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  #listLen = 0 

  public addItem = signal(true)
  
  #setListItens = signal<IListItem[]>(this.#parseItens())
  public getListItens = this.#setListItens.asReadonly()

  #parseItens() {
    if (this.#listLen > 0){return JSON.parse(localStorage.getItem('@my-list') || "[]") }
    return []
  }
  public getInputAndAddItem(value: IListItem){
    localStorage.setItem('@my-list',
      JSON.stringify([...this.#setListItens(), value])
    )
    this.#listLen += 1
    return this.#setListItens.set(this.#parseItens())
  }

  public deleteAllItens(){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('@my-list')
        this.#listLen = 0
        return this.#setListItens.set(this.#parseItens())
      }
    });

  }


  public listItensStage(value: 'pending' | 'completed'){
      return this.getListItens().filter( (r: IListItem) => {
        if (value === 'pending'){
          return !r.checked 
        }
        if (value === 'completed'){
          return r.checked
        }

        return r
      })
  }
  public upadteItemCheckBox(item: {id:string, checked:boolean}){
    this.#setListItens.update((old: IListItem[]) =>
      {
        old.filter(res => 
          {
            res.id === item.id ? res.checked = item.checked: res.checked = res.checked
            return res
          }
        )
        return old
      }
      
    )
    return this.#updateLocal()
  }

  public upadteItemText(item: {id:string, value:string}){
    this.#setListItens.update((old: IListItem[]) =>
      {
        old.filter(res => 
          {
            res.id === item.id ? res.value = item.value: res.value = res.value
            return res
          }
        )
        return old
      }
      
    )
    return this.#updateLocal()
  }
  public deleteItem(id: string){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.#setListItens.update((old: IListItem[]) => old.filter(r => r.id !== id))
        this.#listLen -= 1
        return this.#updateLocal()
      }
    });
  }

  #updateLocal(){
    return localStorage.setItem('@my-list', JSON.stringify(this.#setListItens))  
  }
}

