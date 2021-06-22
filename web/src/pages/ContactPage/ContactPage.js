
import { Form, TextField, TextAreaField, FieldError, FormError, Submit, Label } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useForm } from 'react-hook-form'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`


const ContactPage = () => {

  const formMethods = useForm({ mode: 'onBlur' })

  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your submission!')
      formMethods.reset()
    },
  })

  const onSubmit = async (data) => {
    try {
      await create({ variables: { input: data } })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Toaster />
      <Form onSubmit={onSubmit} error={error} validation={{ mode: 'onBlur' }} formMethods={formMethods}>
        <FormError
          error={error}
          wrapperStyle={{ color: 'red', backgroundColor: 'lavenderblush' }}
        />
        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField errorClassName="error" name="name" validation={{ required: true }} />
        <FieldError name="name" className="error"/>

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          errorClassName="error"
          name="email"
          validation={{
            required: true,
            pattern: {
              value: /[^@]+@[^.]+\..+/,
              message: 'Please enter a valid email address',
            },
          }}
        />
        <FieldError name="email" className="error"/>

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField errorClassName="error" name="message" validation={{ required: true }} />
        <FieldError name="message" className="error"/>

        <Submit disabled={loading}>Save</Submit>
      </Form>
    </>
  )
}

export default ContactPage
