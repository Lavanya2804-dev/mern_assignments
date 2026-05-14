import API from "../api/axios";

export const getActivities =
  async () => {

    const res =
      await API.get(
        "/activities"
      );

    return res.data;
};