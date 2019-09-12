import React, { FormEvent } from 'react'
import { Form, Input, Button } from 'antd'
import { FormComponentProps, ValidationRule } from 'antd/lib/form'
import { useTranslation } from 'react-i18next'

import store from '../store'

interface Props extends FormComponentProps {
  onSignUp: (
    email: string,
    password: string,
    name: string
  ) => void
  onError: (err: Error) => void
}

type FieldsError = Record<string, string[] | undefined>

const SignUpForm: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation()
  const { getFieldDecorator, getFieldsError } = props.form

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    props.form.validateFields((err, values) => {
      if (!err) {
        return props.onSignUp(
          values.email,
          values.password,
          values.name
        )
      }

      props.onError(err)
    })
  }

  const compareToFirstPassword = (rule: ValidationRule, value: string, cb: Function) => {
    const { form } = props

    if (value && value !== form.getFieldValue('password')) {
      cb(t('Passwords do not match'))
    } else {
      cb()
    }
  }

  const hasErrors = (fieldsError: FieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }

  const isButtonDisabled = () => hasErrors(getFieldsError()) || store.getState().isFetching

  return (
    <div className="sign-form">
      <Form onSubmit={handleSubmit}>
        <Form.Item>
          {
            getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: t('Please input your E-mail')
                },
                {
                  pattern: /[^@]+@[^.]+\..+/,
                  message: t('Invalid E-mail address')
                }
              ]
            })(<Input placeholder={t('Enter your e-mail')} />)
          }
        </Form.Item>

        <Form.Item>
          {
            getFieldDecorator(('password'), {
              rules: [
                {
                  required: true,
                  message: t('Please input your password')
                },
                {
                  min: 6,
                  message: t('Password can\'t be less than 6 characters')
                }
              ]
            })(<Input placeholder={t('Enter your password')} type="password" />)
          }
        </Form.Item>

        <Form.Item>
          {
            getFieldDecorator(('password_confirm'), {
              rules: [
                {
                  required: true,
                  message: t('Please input your password')
                },
                {
                  validator: compareToFirstPassword
                }
              ]
            })(<Input placeholder={t('Confirm password')} type="password" />)
          }
        </Form.Item>

        <Form.Item>
          {
            getFieldDecorator(('name'), {
              rules: [
                {
                  required: true,
                  message: t('Please enter your name')
                }
              ]
            })(<Input placeholder={t('Enter your name')} />)
          }
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            disabled={isButtonDisabled()}
          >
            {t('Sign Up')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Form.create<Props>({ name: 'SignUpForm' })(SignUpForm)
