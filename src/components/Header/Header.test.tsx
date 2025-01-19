import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from '.'
jest.mock('next-auth')

describe('Home', () => {
  it('renders a heading', () => {
    render(<Header />)

    const title = screen.getByText('DrPrompt')

    expect(title).toBeInTheDocument()
  })
})
