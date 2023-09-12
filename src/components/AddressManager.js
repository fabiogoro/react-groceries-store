import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useUserContext } from '../contexts/UserContext'
import { useEffect, useState } from 'react'
import ReadOnly from '../components/inputs/readOnly'
import TextInput from '../components/inputs/textInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function AddressManager({ form }) {
  const user = useUserContext()
  const [selected, setSelected] = useState(undefined)

  useEffect(() => {
    if (
      user.data !== {} &&
      user.data?.addresses?.length &&
      form.data.address_id.value === ''
    ) {
      setSelected(user.data.addresses[0])
      form.data.address_id.value = user.data.addresses[0].id
      form.setData({ ...form.data })
    }
  }, [user.data, form])

  function onClick(e) {
    e.preventDefault()
    if (e.target.id) {
      setSelected(
        user.data.addresses.filter((a) => a.id === parseInt(e.target.id))[0]
      )
      form.data.address_id.value = e.target.id
      form.setData({ ...form.data })
    }
  }

  return (
    <>
      <ListGroup className="mb-4">
        {user.data?.addresses?.map((a) => (
          <ListGroup.Item
            action
            id={a.id}
            onClick={onClick}
            key={a.id}
            variant={selected?.id === a.id ? 'dark' : ''}
            className={`d-flex justify-content-between align-items-center ${
              selected?.id === a.id ? 'active' : ''
            }`}
          >
            <Col id={a.id} onClick={onClick}>
              {a.address}, {a.city}, {a.country}
            </Col>
          </ListGroup.Item>
        ))}
        <ListGroup.Item
          action
          id={0}
          onClick={onClick}
          key={0}
          variant={!selected ? 'dark' : ''}
          className={`d-flex justify-content-between align-items-center ${
            !selected ? 'active' : ''
          }`}
        >
          <Col id={0} onClick={onClick}>
            New address...
          </Col>
        </ListGroup.Item>
      </ListGroup>
      {selected ? (
        <>
          <TextInput
            changeHandler={form.changeHandler()}
            input={form.data['address_id']}
            name={'address_id'}
            id={'address_id'}
            label={'Address'}
            required={true}
            className="visually-hidden"
          ></TextInput>
          <ReadOnly label="Zip code" value={selected.zip_code}></ReadOnly>
          <ReadOnly label="Address" value={selected.address}></ReadOnly>
          <ReadOnly label="City" value={selected.city}></ReadOnly>
          <ReadOnly label="State" value={selected.state}></ReadOnly>
          <ReadOnly label="Country" value={selected.country}></ReadOnly>
        </>
      ) : (
        <>
          <TextInput
            changeHandler={form.changeHandler()}
            input={form.data['zip_code']}
            name={'zip_code'}
            id={'zip_code'}
            label={'Zip code'}
            required={true}
          ></TextInput>
          <TextInput
            changeHandler={form.changeHandler()}
            input={form.data['address']}
            name={'address'}
            id={'address'}
            label={'Address'}
            required={true}
          ></TextInput>
          <TextInput
            changeHandler={form.changeHandler()}
            input={form.data['city']}
            name={'city'}
            id={'city'}
            label={'City'}
            required={true}
          ></TextInput>
          <TextInput
            changeHandler={form.changeHandler()}
            input={form.data['state']}
            name={'state'}
            id={'state'}
            label={'State'}
            required={true}
          ></TextInput>
          <TextInput
            changeHandler={form.changeHandler()}
            input={form.data['country']}
            name={'country'}
            id={'country'}
            label={'Country'}
            required={true}
          ></TextInput>
        </>
      )}
    </>
  )
}

export default AddressManager
