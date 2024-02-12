import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CreatePost from '../Post/CreatePost';
import '@testing-library/jest-dom';

describe('CreatePost Component', () => {
  test('should persist changes after editing a post', () => {
    const testPost = {
      id: 1,
      username: 'TestUser',
      timestamp: '1 min ago',
      originalContent: 'Original content',
      likes: 0,
      comments: [],
      image: '',
      profile: 'test-profile.jpg'
    };

    const { container } = render(<CreatePost {...testPost} />);

    // Enter edit mode
    const editButton = container.querySelector('.Edit');
    fireEvent.click(editButton);

    // Change the content
    const textArea = container.querySelector('.edit-textarea');
    fireEvent.change(textArea, { target: { value: 'Edited content' } });

    // Save the changes
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

     // Exit edit mode
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    // Re-enter edit mode
    fireEvent.click(editButton);

    // Verify the changes are still there
    expect(textArea.value).toBe('Edited content');

  });
});
