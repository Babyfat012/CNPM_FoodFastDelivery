import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../src/redux/store'
import AddToCartButton from '../src/pages/Users/usershome/AddToCartButton'

describe('Cart Functionality', () => {
  beforeEach(() => {
    // Clear cart before each test
    store.dispatch({ type: 'cart/clearCart' })
  })

  it('should add item to cart', () => {
    const mockItem = {
      _id: '1',
      name: 'Pizza',
      price: 100,
      quantity: 1
    }

    render(
      <Provider store={store}>
        <AddToCartButton item={mockItem} />
      </Provider>
    )

    const addButton = screen.getByRole('button')
    fireEvent.click(addButton)

    const cartItems = store.getState().cart.cartItems
    expect(cartItems).toHaveLength(1)
    expect(cartItems[0].name).toBe('Pizza')
  })
})