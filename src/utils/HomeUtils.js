import axios from "axios";

// retrieve a list of items ALL TIME
const retrieveItemsAllTime = async (
  setData,
  setDateRangeFilter,
  setLoading
) => {
  try {
    setLoading(false);
    const response = await axios.get(
      `${process.env.REACT_APP_AWS_BACKEND_URL}/items/`
    );
    setData(response.data.map((item) => ({ ...item, id: item.id })));
    setDateRangeFilter("All");
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(true);
  }
};

// retrieve a list of items from the last 7 days
const retrieveItemsWithinWeek = async (
  setData,
  setDateRangeFilter,
  setLoading
) => {
  try {
    setLoading(false);
    const response = await axios.get(
      `${process.env.REACT_APP_AWS_BACKEND_URL}/items/week`
    );
    setData(response.data.map((item) => ({ ...item, id: item.id })));
    setDateRangeFilter("Last 7 Days");
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(true);
  }
};

// retrieve a list of items from the last 2 weeks
const retrieveItemsWithinTwoWeeks = async (
  setData,
  setDateRangeFilter,
  setLoading
) => {
  try {
    setLoading(false);
    const response = await axios.get(
      `${process.env.REACT_APP_AWS_BACKEND_URL}/items/two_weeks`
    );
    setData(response.data.map((item) => ({ ...item, id: item.id })));
    setDateRangeFilter("Last 14 Days");
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(true);
  }
};

// retrieve a list of items from the last month
const retrieveItemsWithinMonth = async (
  setData,
  setDateRangeFilter,
  setLoading
) => {
  try {
    setLoading(false);
    const response = await axios.get(
      `${process.env.REACT_APP_AWS_BACKEND_URL}/items/month`
    );
    setData(response.data.map((item) => ({ ...item, id: item.id })));
    setDateRangeFilter("Last 30 Days");
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(true);
  }
};

// retrieve a list of items from the last year
const retrieveItemsWithinYear = async (
  setData,
  setDateRangeFilter,
  setLoading
) => {
  try {
    setLoading(false);
    const response = await axios.get(
      `${process.env.REACT_APP_AWS_BACKEND_URL}/items/year`
    );
    setData(response.data.map((item) => ({ ...item, id: item.id })));
    setDateRangeFilter("This Year");
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(true);
  }
};

export {
  retrieveItemsAllTime,
  retrieveItemsWithinWeek,
  retrieveItemsWithinTwoWeeks,
  retrieveItemsWithinMonth,
  retrieveItemsWithinYear,
};
