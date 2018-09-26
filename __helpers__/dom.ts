import { fireEvent } from 'react-testing-library'

export function change(element: HTMLElement, value: string): void {
  fireEvent.change(element, {
    target: { value }
  })
}
