import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { HomePage } from '../home/pages';

describe('Index Page', () => {
  it('should render Hi text', () => {
    render(<HomePage />);
    const hiText = screen.getByText(/Hi/i);
    expect(hiText).toBeInTheDocument();
  });
});
