import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { Provider, useDispatch } from 'react-redux';
import  { store } from '../../store'; 
import { useSelector } from 'react-redux';
import axios from 'axios';
import { clearUser } from "../../Slices/userSlice";


jest.mock('axios');

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch : jest.fn()
}));

describe('Navbar component', () => {
  beforeEach(() => {

    useSelector.mockReturnValue({ _id: 'user_id' });
  });

  test('renders correctly when user is logged in', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );


    expect(screen.getByText('Tours')).toBeInTheDocument();
    expect(screen.getByText('Add Tour')).toBeInTheDocument();
    expect(screen.getByText('My Tours')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('handles logout correctly', async () => {
  
    const mockDispatch = jest.fn();
    useDispatch.mockImplementation(() => mockDispatch);


    axios.post.mockResolvedValueOnce({}); 

 

    
    const {getByText} =render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );
    
    fireEvent.click(getByText('Logout'));
    

    fireEvent.click(getByText("Logout"));
    

    await waitFor(() => {

      expect(mockDispatch).toHaveBeenCalledWith(clearUser());
    });
});

});
