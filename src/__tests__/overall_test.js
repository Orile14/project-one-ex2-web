import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Feed from '../Feed/Feed';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import '@testing-library/jest-dom';

describe('overall Component', () => {
    test('post and comment edits are persisted', async () => {
        // Mock ThemeContext value
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

        // Add a new post
        const postInput = screen.getByPlaceholderText("What's on your mind?");
        fireEvent.change(postInput, { target: { value: 'New Post Content' } });
        fireEvent.click(screen.getByText('Post'));

        // Entering comments
        const comment = container.querySelector('.commentButton');
        fireEvent.click(comment);

        // Add a new comment
        const AddComment = container.querySelector('.addComment');
        fireEvent.click(AddComment);
        const commentInput = screen.getByPlaceholderText('add a comment...');
        fireEvent.change(commentInput, { target: { value: 'New Comment' } });
        fireEvent.click(screen.getByText('Send'));

        // Exit from comments
        const CloseEditMode = container.querySelector('.CloseEditMode');
        fireEvent.click(CloseEditMode);

        // Varify the post is saved
        expect(screen.getByText('New Post Content')).toBeInTheDocument();

        // Edit the post
        const editButton = container.querySelector('.Edit');
        fireEvent.click(editButton);
        const textArea = container.querySelector('.edit-textarea');
        fireEvent.change(textArea, { target: { value: 'Edited Post Content' } });
        fireEvent.click(screen.getByText('Save'));

        // Enteering comments
        fireEvent.click(comment);

        // Varify the comment is added
        expect(screen.getByText('New Comment')).toBeInTheDocument();

    });
});