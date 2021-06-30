import { Card } from "react-bootstrap"

export const Child = props => {
  const { loading, child } = props

  if (loading) {
    return <div>loading......</div>
  }

  return (
    <div>
      <div>
        <h4 className='text-center'>Child</h4>
        <Card className='my-2'>
          <Card.Body style={{ backgroundColor: "#cceeff" }}>
            <Card.Text className='font-weight-bold'>
              Name : &nbsp;
              <span className='font-weight-light'>
                {child.firstName + " " + child.lastName}
              </span>
            </Card.Text>
            <Card.Text className='font-weight-bold'>
              MRN : &nbsp;<span className='font-weight-light'>{child.mrn}</span>
            </Card.Text>
            <Card.Text className='font-weight-bold'>
              FIN : &nbsp;<span className='font-weight-light'>{child.fin}</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
