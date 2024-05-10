import { useState } from "react"
import { Navbar, Container, Form, Button } from "react-bootstrap"

import axios from "axios"

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    order: '',
    gross_amount: 0,
    first_name: '',
    email: '',
    phone: '',
  })

  function handleInputChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault();

    let parameter = {
      ...form,
      order_id: `order-pulsa-${Date.now()}`,
    }

    setIsLoading(true)

    axios.post('http://localhost:3000/api/v1/checkout', parameter).then((response) => {
      const { redirect_url, token } = response.data.data

      // opsi 1
      // const elLink = document.getElementById('midtrans_link')
      // elLink.href = redirect_url
      // elLink.click()

      // opsi 2
      window.snap.pay(token)

      console.log('RES', redirect_url, token);

      // reset form
      setForm({
        order_id: '',
        gross_amount: 0,
        first_name: '',
        email: '',
        phone: '',
      })
    }).catch((error) => {
      console.error('Error', error.response);
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <>
      <Navbar variant="dark" bg="success">
        <Container>
          <Navbar.Brand>Tokopulsa</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="pt-5">
        <a id="midtrans_link" target="_blank" className="d-none">link</a>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="form_first_name">Name</Form.Label>
            <Form.Control id="form_first_name" name="first_name" type="text" placeholder="Ex: Elon Musk" maxLength="30" value={form.first_name} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label htmlFor="form_email">Email</Form.Label>
            <Form.Control id="form_email" name="email" type="email" placeholder="Ex: example@mail.com" value={form.email} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label htmlFor="form_phone">Phone</Form.Label>
            <Form.Control id="form_phone" name="phone" type="text" placeholder="Ex: 081234567890" maxLength="15" value={form.phone} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label htmlFor="form_gross_amount">Gross Amount</Form.Label>
            <Form.Control id="form_gross_amount" name="gross_amount" type="number" placeholder="10000" value={form.gross_amount} onChange={handleInputChange} />
          </Form.Group>

          <Button disabled={isLoading} type="submit" variant="outline-success" className="mt-3">Checkout</Button>
        </Form>
      </Container>
    </>
  );
}
