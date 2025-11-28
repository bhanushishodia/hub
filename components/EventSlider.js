"use client";

import React from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { getImage } from "../app/utils/getImage";
// Blog images
const img1 = getImage("blog/gitexblog.jpeg");
const msmeexpoImg = getImage("blog/3days-milestones.jpg");
const AutomationblogImg = getImage("blog/entrepreneur.jpg");

const BlogSlider = () => {
  React.useEffect(() => {
    const swiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        640: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 40 },
        1024: { slidesPerView: 3, spaceBetween: 50 },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    return () => swiper && swiper.destroy();
  }, []);

  const slides = [
   
    {
      img: msmeexpoImg,
      link: "https://anantya.ai/blog/msme-india-expo-2025-highlights",
      title: "MSME Expo 2025",
      desc: "Anantya marked it’s homecoming at the MSME Expo, empowering Indian MSMEs with AI-powered WhatsApp automation.",
    },
    {
      img: AutomationblogImg,
      link: "https://anantya.ai/blog/whatsapp-marketing-automation-entrepreneur-india-2025",
      title: "Entrepreneur India 15th Edition",
      desc: "Anantya.ai participated in Entrepreneur India 2025, joining leading innovators in shaping the future of business innovation.",
    },
     {
      img: img1,
      link: "https://anantya.ai/blog/gitex-2023-highlights-anantya-ai-ai-powered-messaging-evolution",
      title: "GITEX Global 2023",
      desc: "Anantya.ai made a strong mark at GITEX 2023, showcasing WhatsApp solutions  transforming business communication.",
    },
  ];

  return (
    <section className="blog_Slider related-posts">
      <div className="container py-5">
        <div className="related-postes-slider position-relative">

          <div className="swiper-container">
            <div className="swiper-wrapper blog">

              {slides.map((item, index) => (
                <div className="swiper-slide" key={index}>
                  <div className="card border-0 bg-transparent rounded-0 p-0 d-block">
                    
                    <a href={item.link} className="img radius-7 overflow-hidden img-cover">
                      <img src={item.img} className="card-img-top" alt={item.title} />
                    </a>

                    <div className="card-body px-0">
                      <h5 className="fw-bold mt-10 title">
                        <a href={item.link}>{item.title}</a>
                      </h5>

                      <p className="small mt-2 op-8">{item.desc}</p>

                      <a href={item.link}>Read More</a>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>

          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>

        </div>
      </div>
    </section>
  );
};

export default BlogSlider;
