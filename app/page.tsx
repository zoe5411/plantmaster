"use client";

import { useState, useEffect } from "react";
import { plants, Plant } from "../data/plants";

function getNextWaterDate(
  lastWaterDate: string | null,
  dryDays: number
) {
  if (!lastWaterDate) {
    return "未记录";
  }

  const date = new Date(lastWaterDate);

  date.setDate(date.getDate() + dryDays);

  return date.toISOString().split("T")[0];
}

function getDaysLeft(
  lastWaterDate: string | null,
  dryDays: number
) {
  if (!lastWaterDate) {
    return "未初始化";
  }

  const nextDate = new Date(lastWaterDate);

  nextDate.setDate(
    nextDate.getDate() + dryDays
  );

  const today = new Date();

  const diff =
    nextDate.getTime() - today.getTime();

  return Math.ceil(
    diff / (1000 * 60 * 60 * 24)
  );
}

function isDuePlant(
  lastWaterDate: string | null,
  dryDays: number
) {
  const result = getDaysLeft(
    lastWaterDate,
    dryDays
  );

  return typeof result === "number" &&
         result <= 0;
}

export default function Home() {

  const [plantList, setPlantList] = useState<Plant[]>(plants);

  useEffect(() => {
    const savedPlants =
      localStorage.getItem("plantmaster-plants");

    if (savedPlants) {
      setPlantList(JSON.parse(savedPlants));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "plantmaster-plants",
      JSON.stringify(plantList)
    );
  }, [plantList]);


  return (
  <div
    style={{
      minHeight: "100vh",
      backgroundImage: "url('/plant-bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      padding: "30px",
    }}
  >
    <main
      style={{
        maxWidth: "450px",
        margin: "0 auto",
        padding: "30px",

        background: "rgba(255,255,255,0.15)",

        backdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.6)",

        borderRadius: "24px",

        boxShadow:
          "0 20px 60px rgba(0,0,0,0.15)",
      }}
    >
    <div
      style={{
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(16px)",
        borderRadius: "24px",
        padding: "32px",
        marginBottom: "30px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <h1
        style={{
          fontSize:"28px",
          marginBottom: "30px",
        }}
      >🌱 Plant Master</h1>

      <div
        style={{
        display: "inline-block",
        background: "#ecfdf5",
        padding: "10px 16px",
        borderRadius: "999px",
        fontWeight: "bold",
        color: "#166534",
        }}
      >
        🌿 植物总数：{plantList.length}
      </div>

      <h2>🚨 今日待浇水</h2>
    </div>  

      <ul>
        {plantList
          .filter((plant) =>
            isDuePlant(
              plant.lastWaterDate,
              plant.dryDays
            )
          )
          .map((plant) => (
            <li key={plant.id}>
              {plant.name}
            </li>
          ))}
      </ul>

      <hr />

      {plantList.map((plant) => (
        <div
          key={plant.id}
          style={{
            backgroundColor: "rgba(255,255,255,0.92)",
            borderRadius: "20px",
            padding: "20px",
            marginTop: "16px",
            boxShadow:
              "0 8px 30px rgba(0,0,0,0.10)",
            transition: "all 0.3s ease",
           }}
        >

          <h3
            style={{
              fontSize:"18px",
              marginBottom: "12px",
            }}
          >{plant.name}</h3>

          <p
            style={{
              fontSize:"15px",
              color:"#555",
              margin: "6px 0",
            }}
          >📍 {plant.location}</p>

          <p
            style={{
              fontSize:"15px",
              color:"#555",
              margin: "6px 0",
            }}
          >💧 干透天数：{plant.dryDays}天</p>

          <div
            style={{
              margin: "6px 0",
            }}
          >
            <span
              style={{
                color:
                  plant.moisture === "蓝区"
                    ? "#6F95BB"
                    : plant.moisture === "绿区"
                    ? "#6E9E73"
                    : "#BE7A7A",
              }}
            >
              🌡️ 当前湿度：{plant.moisture}
            </span>
                

            <div
              style={{
              display: "flex",
              gap: "12px",
              marginTop: "6px",
              }}
            >
              {["蓝区", "绿区", "红区"].map((zone) => (
                <button
                  key={zone}
                  onClick={() => {
                    const updatedPlants = plantList.map((p) =>
                      p.id === plant.id
                        ? {
                            ...p,
                            moisture: zone,
                          }
                        : p
                    );

                    setPlantList(updatedPlants);
                  }}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "999px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",

                    backgroundColor:
                      zone === "蓝区"
                        ? (
                            plant.moisture === zone
                              ? "#7DA3C9"
                              : "#EEF5FB"
                          )
                        : zone === "绿区"
                        ? (
                            plant.moisture === zone
                              ? "#7EAF83"
                              : "#EEF6EF"
                          )
                        : (
                            plant.moisture === zone
                              ? "#C98A8A"
                              : "#FAEEEE"
                          ),
                  }}
                  >
                  {zone}
                </button>
              ))}
            </div>
          </div>


          <p
            style={{
              fontSize:"15px",
              color:"#555",
              margin: "6px 0",
            }}
          >📝 {plant.notes}</p>

          <p
            style={{
              fontSize:"15px",
              color:"#555",
              margin: "6px 0",
            }} 
          >
            🗓️ 上次浇水：
            {plant.lastWaterDate ?? "暂无记录"}
          </p>

          <p
            style={{
              fontSize:"15px",
              color:"#555",
              margin: "6px 0",
            }}
          >
            🌱 下次建议浇水：
            {getNextWaterDate(
              plant.lastWaterDate,
              plant.dryDays
            )}
          </p>

          <p
            style={{
              fontSize:"15px",
              color:"#555",
              margin: "6px 0",
            }}
          >
            ⏳ 剩余天数：
            {getDaysLeft(
              plant.lastWaterDate,
              plant.dryDays
            )}
          </p>

          <button
              style={{
                backgroundColor: "#7EAF83",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize:"15px"
              }}    

              onClick={() => {

                const daysLeft = getDaysLeft(
                  plant.lastWaterDate,
                  plant.dryDays
                );

                if (
                  typeof daysLeft === "number" &&
                  daysLeft > 0
                ) {
                  const confirmWater =
                    window.confirm(
                      `距离建议浇水还有 ${daysLeft} 天，确认已经浇水？`
                    );

                  if (!confirmWater) {
                    return;
                  }
                }

                const today =
                  new Date()
                    .toISOString()
                    .split("T")[0];

                const updatedPlants =
                  plantList.map((p) =>
                    p.id === plant.id
                      ? {
                          ...p,

                          previousWaterDate:
                            p.lastWaterDate,

                          lastWaterDate: today,
                        }
                      : p
                  );

                setPlantList(updatedPlants);
              }}
          >
            💧 记录今天浇水
          </button>

          {
            plant.lastWaterDate && (
              <button
                onClick={() => {

                  const updatedPlants =
                    plantList.map((p) =>
                      p.id === plant.id
                        ? {
                            ...p,

                            lastWaterDate:
                              p.previousWaterDate,

                            previousWaterDate: null,
                          }
                        : p
                    );

                  setPlantList(updatedPlants);
                }}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#C98A8A",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                ↩️ 撤销
              </button>
            )
          }

        </div>
      ))}
    </main>
   </div> 
  );
}