import { CardBody } from 'reactstrap'
import MediaEmptyText from './MediaEmptyText'

const CmpDetailVideo = ({ masterData }) => {
  if (masterData.video.trim() === '') {
    return <MediaEmptyText></MediaEmptyText>
  }

  return (
    <CardBody>
      <div className="embed-responsive embed-responsive-16by9 ratio ratio-16x9">
        <iframe title="test" className="embed-responsive-item" src={masterData.video} />
      </div>
    </CardBody>
  )
}

export default CmpDetailVideo
