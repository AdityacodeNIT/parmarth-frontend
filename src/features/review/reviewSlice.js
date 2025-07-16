import { createSlice } from "@reduxjs/toolkit";


const reviewSlice = createSlice({
  name: 'review',
    initialState: {
        reviews: [], // All reviews for products
        loading: false,
        error: null,
    },
    reducers: {
        setReviews: (state, action) => {
            state.reviews = action.payload;
            state.loading = false;
            state.error = null;
        },
        addReview: (state, action) => {
            state.reviews.push(action.payload);
        },
        clearReviews: (state) => {
            state.reviews = [];
            state.loading = false;
            state.error = null;
        }
      

    }

}
)
export const avgReviewByProduct = (state,productId) => {
    const reviews=state.reviews.filter(review=>review.productId===productId);
    if(reviews.length==0) return 0;
    else{
        return reviews.reduce((acc,review)=>acc+review.rating,0)/reviews.length;
    }
}

export const NumofReviewByProduct=(state,productId)=>{
    const numReviews=state.reviews.filter(review=>review.productId===productId);
    return numReviews.length;
}

export const getReviewsMessageByUser = (state, userId) => {
    return state.reviews.filter(review => review.userId === userId)
        .map(review => review.message)
        .join(', ');
}

export const { setReviews, addReview, clearReviews } = reviewSlice.actions;


export default reviewSlice.reducer;

 
        