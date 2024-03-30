const GET_COMPANIES = "company/GET_COMPANIES"

const getCompaniesAction = (companies) => ({
    type: GET_COMPANIES,
    companies
})

export const getCompaniesThunk = () => async (dispatch) => {
    try {
    const res = await fetch("/api/companies")
    if (res.ok) {
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
  const newState = { ...state }
  switch (action.type) {
    case GET_COMPANIES:
        const companies = Object.values(action.companies)
        companies.map(company => {
            newState[company.id] = company
        })
    return newState;
    default:
      return state;
  }
};

export default companyReducer;