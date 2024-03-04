import React from 'react';
import { expect, describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

const sampleData = [
  {
    id: 12,
    title: 'KS4',
    internal_title: 'KS4',
    url: 'https://www.blackbullion.com/pathways/key-stage-4',
    intro: '',
    duration: '9 min',
    image: 'https://prodcontent.blackbullion.com/images/pathways/12/thumb',
    type: 'pathway',
    has_summative_assessment: false,
  },
  {
    id: 24,
    title: 'Starting University',
    internal_title: 'Starting University',
    url: 'https://www.blackbullion.com/pathways/starting-university-uk',
    intro:
      'Figure out your finances, sort out your spending, and start living the university life.',
    duration: '24 min',
    image: 'https://prodcontent.blackbullion.com/images/pathways/24/thumb',
    type: 'pathway',
    has_summative_assessment: true,
  },
  {
    id: 25,
    title: '21 Days of Savings',
    internal_title: '21 Days of Savings',
    url: 'https://www.blackbullion.com/pathways/21-day-money-bootcamp',
    intro:
      'Get your finances in shape for the academic year with some quick, long-lasting changes.',
    duration: '21 min',
    image: 'https://prodcontent.blackbullion.com/images/pathways/25/thumb',
    type: 'pathway',
    has_summative_assessment: true,
  },
];

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Sort')).toBeInTheDocument();
  });

  it('fetches data and renders courses', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(sampleData),
      })
    );

    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Check if courses are rendered
    expect(screen.getByText('KS4')).toBeInTheDocument();
    expect(screen.getByText('Starting University')).toBeInTheDocument();
    expect(screen.getByText('21 Days of Savings')).toBeInTheDocument();
  });
});
