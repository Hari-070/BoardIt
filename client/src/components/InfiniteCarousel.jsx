import React from 'react'
import Marquee from 'react-fast-marquee'
import '../stylesheets/infiniteCarousel.css'

const InfiniteCarousel = () => {
  return (
    <>
      <div className='slider'>
       <Marquee pauseOnHover speed={100} autoFill gradient >
            <div className="item"><img src='https://www.codeguide.dev/assets/img/ai/1.svg' height="100%" alt='image1'/></div>
            <div className="item"><img src='https://www.codeguide.dev/assets/img/ai/2.svg' height="100%" alt='image2'/></div>
            <div className="item"><img src='https://www.codeguide.dev/assets/img/ai/3.svg' height="100%" alt='image3'/></div>
            <div className="item"><img src='https://www.codeguide.dev/assets/img/ai/4.svg' height="100%" alt='image4'/></div>
            <div className="item"><img src='https://www.codeguide.dev/assets/img/ai/5.svg' height="100%" alt='image5'/></div>
            <div className="item"><img src='https://www.codeguide.dev/assets/img/ai/6.svg' height="100%" alt='image6'/></div>
            <div className="item"><img src='https://www.codeguide.dev/assets/img/ai/7.svg' height="100%" alt='image7'/></div>
            {/* <div className="item"><img src='https://www.codeguide.dev/assets/img/ai/3.svg' height="100%" alt='image8'/></div>
            <div className="item"><img src='https://www.codeguide.dev/assets/img/ai/5.svg' height="100%" alt='image9'/></div>
            <div className="item"><img src='https://www.codeguide.dev/assets/img/ai/4.svg' height="100%" alt='image10'/></div> */}
        </Marquee>
      </div>
    </>
  )
}

export default InfiniteCarousel
