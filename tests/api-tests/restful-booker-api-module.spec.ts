import { test, expect } from '../../fixtures/hooks-fixture'
import apiPathData from '../../data/api-data/api-path-data.json';
import restfulApiData from '../../data/api-data/restful-booker-api-module-data.json'


test.skip("Id - 1 - [Restful-Booker > Booking] Verify that the user is able to fetch all the booking IDs using GET API and receive valid response.", {
    tag:['@API', '@UAT']   
},async({request})=>{
    const bookingIdsResp = await request.get(apiPathData.booking_path);
    const boookingIdsJsonResp = await bookingIdsResp.json();
    //console.log(boookingIdsJsonResp);
    expect(bookingIdsResp.status()).toBe(200);
    expect(bookingIdsResp.statusText()).toBe('OK');
    //expect(bookingIdsResp.ok()).toBeTruthy();
    expect(boookingIdsJsonResp).not.toBeNull();
    expect(bookingIdsResp.headers()['content-type']).toBe(restfulApiData.content_type);
})


test.skip("Id - 2 - [Restful-Booker > Booking] Verify that the user is able to fetch booking details for a booking id using GET API and receives valid response", {
    tag:['@API','@UAT']
},async({request})=>{
    const bookingResp = await request.get(`${apiPathData.booking_path}/${restfulApiData.booking_id}`);
    const bookingJsonResp = await bookingResp.json();
    console.log(bookingJsonResp);
    expect(bookingResp.status()).toBe(200);
    expect(bookingResp.statusText()).toBe("OK");
    expect(bookingResp).not.toBeNull();
    expect(bookingJsonResp.firstname).toEqual(restfulApiData.firstname);
})


test.skip("Id - 3 - [Restful-Booker > Booking] Verify that the user is able to Create new booking using Post API and receive valid response.",{
    tag:['@API','@UAT']
}, async({request})=>{
    const createBookingResp = await request.post(apiPathData.booking_path, {
        data: restfulApiData.create_booking
    });
    const createBookingJsonResp = await createBookingResp.json();
    console.log(createBookingJsonResp);
    expect(createBookingResp.status()).toBe(200);
    expect(createBookingJsonResp.booking).toMatchObject(restfulApiData.create_booking)
})

let tokenValue: string; 

test.beforeAll(async ({ commonApiUtils }) => {
    // Generate the token once before any tests run
    tokenValue = await commonApiUtils.createToken();
});

test("Id - 4 - [Restful-Booker > Booking] Verify that the user is able to Update existing booking using Put API and receive valid response.", {
    tag: ['@API', '@UAT']
}, async ({ request }) => {
    const updateBookingResp = await request.put(`${apiPathData.booking_path}/${restfulApiData.booking_id2}`, {
        headers: {
            // Use the tokenValue stored by beforeAll
            Cookie: `token=${tokenValue}`
        },
        data: restfulApiData.update_booking
    });

    const updateBookingJsonResp = await updateBookingResp.json();
    console.log(updateBookingJsonResp);
    
    expect(updateBookingResp.status()).toBe(200);
    expect(updateBookingJsonResp).toMatchObject(restfulApiData.update_booking);
});


test.skip('Id - 5 - [Restful-Booker > Booking] Verify that the user is able to partially update existing booking using PATCH API and receive valid response.', {
    tag:['@API','@UAT']
}, async({request})=>{
    const partialUpdateBookingResp = await request.patch(`${apiPathData.booking_path}/${restfulApiData.booking_id2}`,{
        headers: {
            Cookie: `token=${tokenValue}`
        },
        data: restfulApiData.update_partial_booking
    });
    const partialUpdateBookingJsonResp = await partialUpdateBookingResp.json();
    expect(partialUpdateBookingResp.status()).toBe(200);
    expect(partialUpdateBookingJsonResp.firstname).toMatch(restfulApiData.update_partial_booking.firstname);
    expect(partialUpdateBookingJsonResp.lastname).toMatch(restfulApiData.update_partial_booking.lastname);
})



test.skip('Id - 6 - [Restful-Booker > Booking] Verify that the user is able to delete existing booking using Delete API and receive valid response.', {
    tag:['@API','@UAT']
},async({request})=>{
    const deleteBookingResp = await request.delete(`${apiPathData.booking_path}/${restfulApiData.booking_id3}`,{
        headers: {
            Cookie: `token=${tokenValue}`
        }
    })
    expect(deleteBookingResp.status()).toBe(201);
    expect(deleteBookingResp.statusText()).toBe("Created");
    const getBookingResp = await request.get(`${apiPathData.booking_path}/${restfulApiData.booking_id3}`)
    expect(getBookingResp.status()).toBe(404);
    expect(getBookingResp.statusText()).toBe("Not Found")
})








