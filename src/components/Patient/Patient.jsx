import { Card } from "react-bootstrap"

export const Patient = props => {
  const { loading, patient } = props

  if (loading) {
    return <div>loading......</div>
  }

  return (
    <div>
      <div>
        <h4 className='text-center'>Patient</h4>
        <Card className='my-2'>
          <Card.Body style={{ backgroundColor: "#cceeff" }}>
            <Card.Text className='font-weight-bold'>
              Name : &nbsp;
              <span className='font-weight-light'>
                 {patient.firstName + " " + patient.lastName}
              </span>
            </Card.Text>
            <Card.Text className='font-weight-bold'>
              MRN : &nbsp;<span className='font-weight-light'>{patient.mrn}</span>
            </Card.Text>
            <Card.Text className='font-weight-bold'>
              FIN : &nbsp; <span className='font-weight-light'>{patient.fin}</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
