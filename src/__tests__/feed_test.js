import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Feed from '../Feed/Feed';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import '@testing-library/jest-dom';

describe('Feed Component', () => {
  test('new post should be added and then removed from the feed', () => {
    const mockThemeContextValue = {
      theme: 'light',
      toggleTheme: jest.fn(),
    };

    // Wrap Feed component in BrowserRouter and ThemeContext.Provider
    const { container } = render(
      <BrowserRouter>
        <ThemeContext.Provider value={mockThemeContextValue}>
          <Feed />
        </ThemeContext.Provider>
      </BrowserRouter>
    );

    // Define the test post content
    const testPostContent = 'Test post content';

    // Simulate entering post content
    const postInput = screen.getByPlaceholderText("What's on your mind?");
    fireEvent.change(postInput, { target: { value: testPostContent } });

    // Simulate submitting the post
    const postButton = screen.getByText('Post');
    fireEvent.click(postButton);

    // Verify that the post appears in the feed
    expect(screen.getByText(testPostContent)).toBeInTheDocument();

    // Simulate removing the post using container.querySelector
    const removeButton = container.querySelector('.x-button');
    fireEvent.click(removeButton);

    // Verify that the post is no longer displayed
    expect(screen.queryByText(testPostContent)).not.toBeInTheDocument();
  });
});
