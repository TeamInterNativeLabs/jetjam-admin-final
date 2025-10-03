import React, { useState, useEffect } from "react";

import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import StatCard from "../../Components/StatsCard/index.js";
import { stats } from "../../Config/Data";
import { CChart } from "@coreui/react-chartjs";
import { SelectBox } from "../../Components/CustomSelect";

import "./style.css";

import Loader from "../../Components/Loader";
import { useGetDashboardQuery } from "../../Redux/Apis/General/index.js";

export const Dashboard = () => {

  const { data, isLoading } = useGetDashboardQuery()

  const [statistics, setStatistics] = useState([]);

  useEffect(() => {

    document.title = 'JetJams | Dashboard';

    setStatistics(stats(data?.data))

  }, [data]);

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row">
                  {statistics.map((stats) => (
                    <div className="col-xl-4 col-md-6 stats" key={stats.id}>
                      <StatCard item={stats} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="d-flex flex-wrap justify-content-between">
                  <h3 className="mainTitle">Users</h3>
                  <SelectBox selectClass="mainInput" name="Monthly" required option={'optionData'}

                  />
                </div>
                <div className="graph-wrapper">
                  {
                    isLoading ? <Loader /> :
                      <CChart
                        type="line"
                        height={90}
                        data={{
                          labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"],
                          tension: "0.5",
                          datasets: [
                            {
                              label: "Users",
                              backgroundColor: "rgba(0, 41, 58, 29%)",
                              borderColor: "#000000",
                              pointBackgroundColor: "#000000",
                              pointBorderColor: "#000000",
                              borderWidth: 1,
                              data: data?.data?.monthWiseCount,
                              tension: 0.5,
                            },
                            {
                              label: "Representatives",
                              backgroundColor: "rgba(178, 222, 39, 29%)",
                              borderColor: "#F6D027",
                              pointBackgroundColor: "#000000",
                              pointBorderColor: "#000000",
                              borderWidth: 1,
                              data: data?.data?.monthWiseCountRepresentative,
                              tension: 0.5,
                            },
                          ],
                        }}
                      />
                  }
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </DashboardLayout>
    </>
  );
};
