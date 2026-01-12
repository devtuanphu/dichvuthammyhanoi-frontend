"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { ENDPOINT } from "../../enums/endpoint.enum";

const MarqueeComponent = () => {
  const [data, setData] = useState("");
  const getData = async () => {
    try {
      const res = await axios.get(`${ENDPOINT.GET_INTRO}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_DEV}`,
        },
      });
      setData(res.data?.data?.attributes?.label);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-gradient-rose py-2.5 relative overflow-hidden">
      <div className="container-beauty relative z-10">
        <Marquee gradient={false} speed={60}>
          <p className="text-white px-6 font-semibold text-sm tracking-wide">
            ✨ {data || "Chào mừng bạn đến với dịch vụ thẩm mỹ chuyên nghiệp"} ✨
          </p>
        </Marquee>
      </div>
    </div>
  );
};

export default MarqueeComponent;
