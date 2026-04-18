import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('triggers onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Click Me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies primary variant class by default', () => {
    render(<Button>Primary</Button>);
    // identity-obj-proxy returns the class name as-is
    expect(screen.getByRole('button').className).toMatch(/primary/);
  });

  it('applies secondary variant class when specified', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button').className).toMatch(/secondary/);
  });

  it('applies danger variant class when specified', () => {
    render(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button').className).toMatch(/danger/);
  });

  it('merges a custom className prop', () => {
    render(<Button className="my-custom-class">Custom</Button>);
    expect(screen.getByRole('button').className).toMatch(/my-custom-class/);
  });

  it('renders a submit button when type is submit', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
