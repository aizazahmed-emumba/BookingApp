// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// // import '@testing-library/jest-dom/extend-expect';
// import axios from 'axios'; // Mock axios
// import BasicFormControl from './AddTourForm';
// import { MemoryRouter } from 'react-router-dom';
// import AutoCompleteLocation from '../AutoComplete/AutoCompleteLocation';

// jest.mock('axios');

// describe('BasicFormControl', () => {
//     test('renders form with all fields', async () => {
//         const { getByPlaceholderText, getByText } = render(
//           <MemoryRouter>
//             <BasicFormControl />
//           </MemoryRouter>
//         );
    
//         expect(getByPlaceholderText('Enter Your Name here')).toBeInTheDocument();
//         expect(getByPlaceholderText('Enter descriptions')).toBeInTheDocument();
//         expect(getByPlaceholderText('Enter price')).toBeInTheDocument();
//         expect(getByPlaceholderText('Enter duration number')).toBeInTheDocument();
//         expect(getByPlaceholderText('Enter start date')).toBeInTheDocument();
//         expect(getByPlaceholderText('Enter end date')).toBeInTheDocument();
//         expect(getByText('Upload Picture')).toBeInTheDocument();
//         expect(getByText('List of Facilites')).toBeInTheDocument();
//         expect(getByText('Submit')).toBeInTheDocument();
//       });


//       test('submits form with valid data', async () => {
//         axios.post.mockResolvedValueOnce({ status: 201, data: { _id: '123' } });
      
//         const { getByPlaceholderText, getByText } = render(
//           <MemoryRouter>
//             <BasicFormControl />
//           </MemoryRouter>
//         );

//         const locationData = {
//             id: '1',
//             name: 'Location Name',
//             address: 'Location Address',
//             website: 'Location Website',
//             location: { lat: 123, lng: 456 },
//             types: ['type1', 'type2']
//           };
      
//         fireEvent.change(getByPlaceholderText('Enter Your Name here'), { target: { value: 'Test Name' } });
//         fireEvent.change(getByPlaceholderText('Enter descriptions'), { target: { value: 'Test Description' } });
//         fireEvent.change(getByPlaceholderText('Enter price'), { target: { value: '100' } });
//         fireEvent.change(getByPlaceholderText('Enter duration number'), { target: { value: '5' } });
//         fireEvent.change(getByPlaceholderText('Enter start date'), { target: { value: '2024-04-23' } });
//         fireEvent.change(getByPlaceholderText('Enter end date'), { target: { value: '2024-04-30' } });
      
//         // Simulate selecting a location
      
//         const setSelectedLocation = jest.fn(); // Mock setSelectedLocation function
//         const autoCompleteProps = { selectedLocation: locationData, setSelectedLocation }; // Pass mock props
//         const { getByLabelText } = render(<AutoCompleteLocation {...autoCompleteProps} />);
//         const autoCompleteInput = getByLabelText('Choose a location'); // Find the AutoComplete input element

//         fireEvent.change(autoCompleteInput, { target: { value: 'Location Name' } });
//         await waitFor(() => fireEvent.click(getByText('Location Name (Location Address)')));

//         // Add facilities
//         fireEvent.click(getByText('Add Facility'));
//         fireEvent.change(getByPlaceholderText('Enter facility name'), { target: { value: 'Facility 1' } });
      

//         fireEvent.click(getByText('Submit'));
      

      
//         await waitFor(() => {
//           expect(axios.post).toHaveBeenCalledTimes(1);
//           expect(axios.post).toHaveBeenCalledWith(
//             'http://localhost:5000/api/tour/createTour',
//             expect.any(FormData),
//             { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
//           );
//         });
//       });
      
     

// });
