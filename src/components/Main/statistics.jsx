import React, { useState, useEffect } from "react";
import axios from "axios";

const RegionStats = ({ accessToken }) => {
  const [activeTab, setActiveTab] = useState("아동 분포");
  const [statsData, setStatsData] = useState({
    "아동 분포": {
      unit: "명",
      stats: [],
      values: [],
      max: 0,
    },
    "급식카드 가맹점 분포": {
      unit: "개",
      stats: [],
      values: [],
      max: 0,
    },
    "후원사용률": {
      unit: "%",
      stats: [],
      values: [],
      max: 100,
    },
  });

  const [currentTime, setCurrentTime] = useState("");

  const extractCityDistrictOrCounty = (address) => {
    const match = address.match(/(\S+(구|군|시))$/); 
    return match ? match[0] : address; 
  };

  const fetchChildStatistics = async () => {
    if (!accessToken) return; 
    try {
      const response = await axios.get("https://api.mymoo.site/api/v1/statistics/children", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const { childStatistics } = response.data;
      const sortedStats = childStatistics
        .sort((a, b) => b.childrenCount - a.childrenCount) 
        .slice(0, 5); 
      const stats = sortedStats.map((stat) => extractCityDistrictOrCounty(stat.address));
      const values = sortedStats.map((stat) => stat.childrenCount);
      const max = Math.max(...values);

      setStatsData((prevData) => ({
        ...prevData,
        "아동 분포": {
          unit: "명",
          stats,
          values,
          max,
        },
      }));
    } catch (error) {
      console.error("아동 분포 통계 데이터를 불러오지 못했습니다:", error);
    }
  };

  const fetchStoreStatistics = async () => {
    if (!accessToken) return; 
    try {
      const response = await axios.get("https://api.mymoo.site/api/v1/statistics/stores", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const { storeStatistics } = response.data;
      const sortedStats = storeStatistics
        .sort((a, b) => b.totalCount - a.totalCount) 
        .slice(0, 5); 

      const stats = sortedStats.map((stat) => extractCityDistrictOrCounty(stat.address));
      const values = sortedStats.map((stat) => stat.totalCount);
      const max = Math.max(...values);

      setStatsData((prevData) => ({
        ...prevData,
        "급식카드 가맹점 분포": {
          unit: "개",
          stats,
          values,
          max,
        },
      }));
    } catch (error) {
      console.error("급식카드 가맹점 통계 데이터를 불러오지 못했습니다:", error);
    }
  };

  const fetchUtilizationStatistics = async () => {
    if (!accessToken) return; 
    try {
      const response = await axios.get("https://api.mymoo.site/api/v1/statistics/utilizations", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const { utilizationStatistics } = response.data;
      const sortedStats = utilizationStatistics
        .sort((a, b) => b.utilization - a.utilization) 
        .slice(0, 5); 

      const stats = sortedStats.map((stat) => extractCityDistrictOrCounty(stat.address));
      const values = sortedStats.map((stat) => stat.utilization); 
      const max = 100;

      setStatsData((prevData) => ({
        ...prevData,
        "후원사용률": {
          unit: "%",
          stats,
          values,
          max,
        },
      }));
    } catch (error) {
      console.error("후원 사용률 통계 데이터를 불러오지 못했습니다:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "아동 분포") {
      fetchChildStatistics();
    } else if (activeTab === "급식카드 가맹점 분포") {
      fetchStoreStatistics();
    } else if (activeTab === "후원사용률") {
      fetchUtilizationStatistics();
    }
  }, [activeTab, accessToken]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      });
      setCurrentTime(formattedTime);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const currentStats = statsData[activeTab];

  const sortedIndices = [...currentStats.values]
    .map((value, index) => [value, index])
    .sort((a, b) => b[0] - a[0])
    .map((item) => item[1]);

  const tabs = ["아동 분포", "급식카드 가맹점 분포", "후원사용률"];

  return (
    <div className={`region-stats ${activeTab === "후원사용률" ? "sponsorship-stats" : ""}`}>
      <header className="region-stats-header">
        <h3>지역별 통계</h3>
      </header>
      <div className="region-stats-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`region-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="region-stats-content">
        <p className="region-stats-title">{currentTime} 기준</p>
        <div className="region-stats-graph">
          {activeTab === "후원사용률" ? (
            <div className="horizontal-chart">
              {sortedIndices.map((index, rank) => (
                <div key={index} className="horizontal-bar-container">
                  <span className="bar-rank">{rank + 1}등</span>
                  <div
                    className="horizontal-bar"
                    style={{
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <div
                      className="bar"
                      style={{
                        width: `${currentStats.values[index]}%`,
                        backgroundColor: rank < 3 ? "#ffc107" : "#ccc", 
                      }}
                    >
                      <span className="bar-value">
                        {currentStats.stats[index]} {currentStats.values[index]}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="region-stats-chart">
              <div className="chart-background">
                {[currentStats.max, currentStats.max * 0.75, currentStats.max * 0.5, currentStats.max * 0.25, 0].map(
                  (value, idx) => (
                    <div key={idx} className="chart-line"></div>
                  )
                )}
              </div>
              {currentStats.values.map((value, index) => (
                <div key={index} className="chart-bar">
                  <div
                    className={`chart-bar-inner ${
                      index === sortedIndices[0] ? "highlight" : ""
                    }`}
                    style={{
                      height: `${(value / currentStats.max) * 100}%`,
                      backgroundColor: index === sortedIndices[0] ? "#ffc107" : "#ccc", 
                    }}
                  >
                    <span className="chart-value">{value}</span>
                  </div>
                  <p className="chart-label">{currentStats.stats[index]}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab !== "후원사용률" && (
            <ul className="region-stats-list">
              {sortedIndices.map((index, rank) => (
                <li key={index} className="region-stat-item">
                  <span>{rank + 1}위</span>
                  <span>{currentStats.stats[index]}</span>
                  <span>
                    {currentStats.values[index]}
                    {currentStats.unit}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegionStats;
