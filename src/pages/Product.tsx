import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import TextInput from '../components/inputs/textInput'
import SelectInput from '../components/inputs/SelectInput'
import NumberInput from '../components/inputs/numberInput'
import Input from '../util/form/input'
import { useForm } from '../hooks/FormHook'
import Alert from 'react-bootstrap/Alert'
import { useApiContext } from '../contexts/ApiContext'
import { postGrocery } from '../api/GroceryApi'
import { fetchCategories } from '../api/CategoryApi'
import { fetchGrocery } from '../api/GroceryApi'
import { Data, useFetch } from '../hooks/FetchHook'
import { useAdmin } from '../hooks/AdminHook'
import { useLoaderData } from 'react-router-dom'

function Product() {
  const id = useLoaderData() as number 
  const api = useApiContext()
  const [form] = useForm(postGrocery.bind(api), {
    error: '',
    success: '',
    token: '',
    title: new Input(),
    price: new Input(),
    description: new Input(),
    image: new Input(),
    category: new Input(),
    id: new Input(),
    calories: new Input(),
    carbohydrates: new Input(),
    proteins: new Input(),
    fats: new Input(),
  })
  const [categories] = useFetch({ f: fetchCategories })
  const [grocery] = useFetch({ f: fetchGrocery, id })
  useAdmin()

  function optionFunction(category:Data) {
    return <option key={category.id} value={category.id}>{category.name}</option>
  }

  return (
    <Container className="mt-4 px-5 text-center avoid-footer">
      {typeof(form.data.error)==='string' && form.data.error !== '' ? (
        <Alert variant="danger">{form.data.error}</Alert>
      ) : null}
      <Form onSubmit={form.formSubmit()} noValidate>
        <Card>
          <Card.Body>
            <Card.Title className="fw-bold mb-4 fs-2">Product</Card.Title>
            <Row>
              <Col sm="12" lg="6">
                <Card>
                  <Card.Body>
                    <Card.Title className="fw-bold mb-4">Basic info</Card.Title>

                    <TextInput
                      changeHandler={form.changeHandler()}
                      input={form.data['id']}
                      defaultValue={(grocery as Data)?.id}
                      name={'id'}
                      id={'id'}
                      label={'Id'}
                      className="visually-hidden"
                    ></TextInput>

                    <TextInput
                      changeHandler={form.changeHandler()}
                      input={form.data['title']}
                      defaultValue={(grocery as Data)?.title}
                      name={'title'}
                      id={'title'}
                      label={'Title'}
                      required={true}
                    ></TextInput>
                    <NumberInput
                      changeHandler={form.changeHandler()}
                      input={form.data['price']}
                      defaultValue={(grocery as Data)?.price}
                      name={'price'}
                      id={'price'}
                      label={'Price'}
                      step={0.01}
                      required={true}
                    ></NumberInput>
                    <TextInput
                      changeHandler={form.changeHandler()}
                      input={form.data['description']}
                      defaultValue={(grocery as Data)?.description}
                      name={'description'}
                      id={'description'}
                      label={'Description'}
                      required={true}
                    ></TextInput>
                    <TextInput
                      changeHandler={form.changeHandler()}
                      input={form.data['image']}
                      defaultValue={grocery!==undefined && 'pictures' in grocery && grocery.pictures!== undefined?grocery.pictures[0]?.path:''}
                      name={'image'}
                      id={'image'}
                      maxlength={1000}
                      label={'Image'}
                      required={true}
                    ></TextInput>
                    <SelectInput
                      changeHandler={form.changeHandler()}
                      input={form.data['category']}
                      name={'category'}
                      id={'category'}
                      label={'Category'}
                      defaultValue={(grocery as Data)?.category}
                      required={true}
                      optionFunction={optionFunction}
                      data={categories as Data[]}
                    ></SelectInput>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm="12" lg="6">
                <Card>
                  <Card.Body>
                    <Card.Title className="fw-bold mb-4">
                      Nutrition facts
                    </Card.Title>

                    <NumberInput
                      changeHandler={form.changeHandler()}
                      input={form.data['calories']}
                      defaultValue={(grocery as Data)?.calories}
                      name={'calories'}
                      id={'calories'}
                      label={'Calories'}
                      step={0.01}
                    ></NumberInput>

                    <NumberInput
                      changeHandler={form.changeHandler()}
                      input={form.data['carbohydrates']}
                      defaultValue={(grocery as Data)?.carbohydrates}
                      name={'carbohydrates'}
                      id={'carbohydrates'}
                      label={'Carbohydrates'}
                      step={0.01}
                    ></NumberInput>

                    <NumberInput
                      changeHandler={form.changeHandler()}
                      input={form.data['proteins']}
                      defaultValue={(grocery as Data)?.proteins}
                      name={'proteins'}
                      id={'proteins'}
                      label={'Proteins'}
                      step={0.01}
                    ></NumberInput>

                    <NumberInput
                      changeHandler={form.changeHandler()}
                      input={form.data['fats']}
                      defaultValue={(grocery as Data)?.fats}
                      name={'fats'}
                      id={'fats'}
                      label={'Fats'}
                      step={0.01}
                    ></NumberInput>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Button variant="dark" type="submit" className="m-4">
              Save product
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  )
}

export default Product
