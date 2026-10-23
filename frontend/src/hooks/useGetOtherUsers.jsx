import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";
import { api } from "../utils/api";

const useGetOtherUsers = () => {
  // Custom hook to fetch other users from the API and update the Redux store with the retrieved users.
  const dispatch = useDispatch();

  useEffect(() => {
    // Effect hook that runs when the component mounts to fetch other users from the API.
    const fetchOtherUsers = async () => {
      try {
        const res = await api.get("/api/v1/user/getOtherUser", {
          withCredentials: true,
        });

        const users = res?.data?.otherUsers ?? [];
        dispatch(setOtherUsers(users));
      } catch (err) {
        console.error(err);
      }
    };

    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
