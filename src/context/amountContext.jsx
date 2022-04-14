import {createContext} from 'react';

export const AmountContext = createContext({

    fetchListing : () => {},
    regularPrice : null,
    discountedPrice : null,
})
