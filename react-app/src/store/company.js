const GET_COMPANIES = "company/GET_COMPANIES"

const getCompaniesAction = (companies) => ({
    type: GET_COMPANIES,
    companies
})

export const getCompaniesThunk = () => async (dispatch) => {
    console.log("😎")
    try {
    const res = await fetch("/api/companies")
    if (res.ok) {
        console.log("😡", res)
        const data = await res.json()
        await dispatch(getCompaniesAction(data))
        return data
    } else {
        const err = await res.json()
        return err
    }} catch(error) {
        console.error("Error fetching companies:", error);
        return error;
    }
}

const initialState = {};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANIES:
        console.log("❤️‍🔥", action)
    default:
      return state;
  }
};

export default companyReducer;