import React from 'react'
import Banner from '../Components/Banner'
import ImageDragger from '../Components/ImageDragger'
import imgbackgound  from '../Assets/wavy_background_1.jpg'
const page = () => {
    return (
        <div>
            <Banner imgbackgound={imgbackgound}  heading={"AI-Powered Sketch-to-Image Surveillance System"} sub1={"Transforming hand-drawn sketches into realistic facial images, our advanced AI-driven system enhances suspect identification and real-time surveillance."} sub2={"Instantly converts sketches into realistic faces for suspect identification."}  />

            <ImageDragger />
        </div>
    )
}

export default page


