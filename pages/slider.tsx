import Slider from "react-slick";
import React, { Component } from "react";
import Image from "next/image";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div>
            <div
              className="
            z--1
            fixed
            h-screen
            w-screen
            "
            >
              <Image
                src={require("/images/image1.jpeg")}
                alt="Picture of the author"
              fill={true}
              // s="cover"
              />
            </div>
            <p>Annas</p>
          </div>
          <div>
            <div
              className="
            z--1
            fixed
            h-screen
            w-screen
            "
            >
              <Image
                src={require("/images/image1.jpeg")}
                alt="Picture of the author"
              layout="fill"
              objectFit="cover"
              />
            </div>
            <p>Annas</p>
          </div>
        </Slider>
      </div>
    );
  }
}
