"use client";

import { useState, useEffect } from "react";
import { plants } from "../data/plants";

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

  const [plantList, setPlantList] = useState(plants);

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

          <p
            style={{
              fontSize:"15px",
              color:"#555",
              margin: "6px 0",
            }}
          >🌡️ 当前湿度：{plant.moisture}</p>

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
                backgroundColor: plant.lastWaterDate
                  ? "#9ca3af"
                  : "#22c55e",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize:"15px"
              }}    

              onClick={() => {

                const today =new Date().toISOString().split("T")[0];

                const updatedPlants = plantList.map((p) =>
                  p.id === plant.id
                    ? {
                      ...p,
                      lastWaterDate: today,
                      }
                    : p
                );

              setPlantList(updatedPlants);
            }}
          >
            {plant.lastWaterDate
              ? "✅ 已记录"
              : "✅ 今天已浇水"}
          </button>

        </div>
      ))}
    </main>
   </div> 
  );
}