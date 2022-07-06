import React from 'react';
import fetchMock from 'fetch-mock';
import { getData } from './api'

test("getData  ", async () => {
    const response = await getData()
    console.log(response.data[0])
    expect("hello").toEqual("hello")
    expect(response.data[0].Population).toEqual(328239523)
})

