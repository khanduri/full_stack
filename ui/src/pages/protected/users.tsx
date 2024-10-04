import { useEffect, useState } from "react";

import { BASE_URL } from "utils/xhr";
import { getStoredToken } from "utils/authentication";

import SidenavLayout from "pages/layout/sidenav";
import Title from "components/convention/title";
import UserTable from "../../components/table_user";

export default function Page() {
  const [loadingUserSummary, setLoadingUserSummary] = useState(false);
  const [userSummary, setUserSummary] = useState([]);

  const [forceFetchCtr, setForceFetchCtr] = useState(0);

  useEffect(() => {
    const fetchUserSummary = async () => {
      setLoadingUserSummary(true);
      try {
        const response = await fetch(BASE_URL + "/api/v1/projects/bootstrap", {
          method: "GET",
          headers: { Authorization: "Bearer " + getStoredToken() },
        });
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let response_data = await response.json();

        setUserSummary(response_data.data.users);
      } catch (err) {
      } finally {
        setLoadingUserSummary(false);
      }
    };
    fetchUserSummary();
  }, [forceFetchCtr]);

  return (
    <SidenavLayout>
      <Title type="sidenav-page">
        <span className="">Home / </span>
        <span className="fancyline">Users</span>
      </Title>
      <UserTable users={userSummary} />
    </SidenavLayout>
  );
}
