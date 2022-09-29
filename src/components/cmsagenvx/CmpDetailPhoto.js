import { useState } from 'react'
import { Col, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

//Lightbox
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

import MediaEmptyText from './MediaEmptyText'

const CmpDetailPhoto = ({ masterData }) => {
  if (
    !Array.isArray(masterData.images) ||
    masterData.images.length === undefined ||
    masterData.images.length < 1
  ) {
    return <MediaEmptyText></MediaEmptyText>
  }

  const images = masterData.images

  // console.log(images);

  const [photoIndex, setphotoIndex] = useState(0)
  const [isGallery, setisGallery] = useState(false)

  const setpopovertop = () => {
    setphotoIndex(0)
    setisGallery(true)
  }

  return (
    <>
      {/* for pop up carousel */}
      {isGallery ? (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          enableZoom={false}
          onCloseRequest={() => setisGallery(false)}
          onMovePrevRequest={() => setphotoIndex((photoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setphotoIndex((photoIndex + 1) % images.length)}
          imageCaption={'Photo ' + parseFloat(photoIndex + 1)}
        />
      ) : null}

      <Row>
        {images.map((img, key) => (
          <Col xl={3} md={6} key={key}>
            <Link
              to="#"
              className="gallery-popup"
              title="Open Imagination"
              onClick={() => {
                setpopovertop()
              }}
            >
              <div className="project-item">
                <div className="overlay-container">
                  <img src={img} alt="img" className="gallery-thumb-img" />
                </div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default CmpDetailPhoto
