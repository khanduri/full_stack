import { useEffect, useState } from "react";

import { BASE_URL } from "utils/xhr";
import { getStoredToken } from "utils/authentication";

import SidenavLayout from "pages/layout/sidenav";
import Title from "components/convention/title";
import ProjectsTable from "components/table_projects";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [projectSummary, setProjectSummary] = useState([]);

  const [forceFetchCtr, setForceFetchCtr] = useState(0);

  useEffect(() => {
    const fetchUserSummary = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL + "/api/v1/projects/bootstrap", {
          method: "GET",
          headers: { Authorization: "Bearer " + getStoredToken() },
        });
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let response_data = await response.json();

        setProjectSummary(response_data.data.projects);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchUserSummary();
  }, [forceFetchCtr]);

  return (
    <SidenavLayout>
      <Title type="sidenav-page">
        <span className="">Home / </span>
        <span className="fancyline">Projects</span>
      </Title>
      <ProjectsTable projects={projectSummary} />
    </SidenavLayout>
  );
}
