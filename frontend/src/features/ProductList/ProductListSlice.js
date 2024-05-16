import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts,fetchFilterOptions,fetchSortOptions,fetchAllProductsByFilter ,fetchSelectedProductDetails} from './ProductListAPI';
//initial State
const initialState = {
products:[],
filters:[],
sortOptions:[],
state:'idle',
selectedProduct:{},
selectedProductLoading:true
};
//fetchAllProductsAsync
export const fetchAllProductsAsync = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
)
//fetch products By filter
export const fetchAllProductsByFilterAsync=createAsyncThunk(
  'products/fetchAllProductsByFilter',
  async ({filter,sort,isAdmin}) => {
    const response = await fetchAllProductsByFilter(filter,sort,isAdmin);
    return response.data;
  }
)
//fetchSortOptionsAsync
export const fetchSortOptionsAsync=createAsyncThunk('/products/fetchSortOptions',async()=>{
  const response=await fetchSortOptions()
  return response.data
})
//fetchFilterOptionsAsync
export const fetchFilterOptionsAsync=createAsyncThunk('/products/fetchFilterOptions',async()=>{
  const response=await fetchFilterOptions()
  return response.data
})
//fetch selected Product details async
export const fetchSelectedProductDetailsAsync=createAsyncThunk('/products/fetchSelectedProductDetails',async({id})=>{
  const response=await fetchSelectedProductDetails(id)
  return response.data
})
//products slice
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
//extraReducers
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllProductsAsync.pending,(state)=>{
      state.state='loading'
    })
    .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.state='loaded'
      })
    .addCase(fetchAllProductsByFilterAsync.pending,(state)=>{
state.state='loading'
    })
    .addCase(fetchAllProductsByFilterAsync.fulfilled, (state, action) => {
      state.products = action.payload;
      state.state='loaded'
    })
    .addCase(fetchFilterOptionsAsync.fulfilled,(state,action)=>{
      state.filters=action.payload
    })
    .addCase(fetchSortOptionsAsync.fulfilled,(state,action)=>{
      state.sortOptions=action.payload
    })
    .addCase(fetchSelectedProductDetailsAsync.pending,(state)=>{
      state.selectedProductLoading=true
    })
    .addCase(fetchSelectedProductDetailsAsync.fulfilled,(state,action)=>{
      state.selectedProduct=action.payload
      state.selectedProductLoading=false
    })
  },
});
//

export const {  } = productsSlice.actions;

export const allProducts = (state) => state.products.products;
export const currentState=(state)=>state.products.state
export const filterOption=(state)=>state.products.filters
export const sortOption=(state)=>state.products.sortOptions
export const selectedProductLoading=(state)=>state.products.selectedProductLoading
export const selectedProduct=(state)=>state.products.selectedProduct
export default productsSlice.reducer;
