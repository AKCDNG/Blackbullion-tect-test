import React from 'react';
import { expect, test, describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Path from '../path';

const mockPathData = {
  title: 'Test Path',
  image: 'test-image.jpg',
  url: '/test-path',
  internal_title: 'Internal Test Path',
  intro: 'This is a test path',
  duration: '3 weeks',
  type: 'Online',
  has_summative_assessment: true,
};

describe('Path Component', () => {
  it('renders the path component with a button having the correct text', () => {
    render(<Path {...mockPathData} />);
    expect(screen.getByText('View Pathway →')).toBeInTheDocument();
  });

  it('renders the path component with a button having a valid link', () => {
    render(<Path {...mockPathData} />);
    const button = screen.getByText('View Pathway →');
    expect(button.closest('a')).toHaveAttribute('href', '/test-path');
  });

  it('renders the path component with correct image source', () => {
    render(<Path {...mockPathData} />);
    expect(
      screen.getByAltText('image of Test Path to represent course')
    ).toHaveAttribute('src', 'test-image.jpg');
  });

  it('renders the path component without intro text', () => {
    render(<Path {...mockPathData} intro='' />);
    expect(screen.queryByText('This is a test path')).not.toBeInTheDocument();
  });

  it('renders the path component with intro text', () => {
    render(<Path {...mockPathData} />);
    expect(screen.getByText('This is a test path')).toBeInTheDocument();
  });
});
