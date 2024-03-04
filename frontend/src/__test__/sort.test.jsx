import React from 'react';
import { expect, describe, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Sort from '../Sort';

describe('Sort component', () => {
  it('renders without crashing', () => {
    render(<Sort />);
  });

  it('renders sort buttons', () => {
    const { getByText } = render(<Sort />);
    expect(getByText('A-Z')).toBeInTheDocument();
    expect(getByText('Most Recent')).toBeInTheDocument();
  });

  it('calls sortAlphabetical function when A-Z button is clicked', () => {
    const mockSortAlphabetical = vi.fn();
    const { getByText } = render(
      <Sort sortAlphabetical={mockSortAlphabetical} />
    );

    fireEvent.click(getByText('A-Z'));

    expect(mockSortAlphabetical).toHaveBeenCalled();
  });

  it('calls sortRecent function when Most Recent button is clicked', () => {
    const mockSortRecent = vi.fn();
    const { getByText } = render(<Sort sortRecent={mockSortRecent} />);

    fireEvent.click(getByText('Most Recent'));

    expect(mockSortRecent).toHaveBeenCalled();
  });
});
