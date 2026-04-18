import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <p>Card content</p>
      </Card>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders without a className prop (uses default empty string)', () => {
    const { container } = render(
      <Card>
        <p>No class</p>
      </Card>
    );
    // Should still render without errors and contain the child
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText('No class')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <Card>
        <p>First child</p>
        <p>Second child</p>
      </Card>
    );
    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
  });
});
