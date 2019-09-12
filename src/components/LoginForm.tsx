import React, { FormEvent } from 'react'
import { Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { useTranslation } from 'react-i18next'

import store from '../store'

interface Props extends FormComponentProps {
  onLogin: (email: string, password: string) => void
  onError: (err: Error) => void
}

type FieldsError = Record<string, string[] | undefined>

const LoginForm: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation()
  const { getFieldDecorator, getFieldsError } = props.form

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    props.form.validateFields((err, values) => {
      if (!err) {
        return props.onLogin(values.email, values.password)
      }

      props.onError(err)
    })
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
            })(<Input placeholder={t('E-mail')} />)
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
            })(<Input placeholder={t('Password')} type="password" />)
          }
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            disabled={isButtonDisabled()}
          >
            {t('Log In')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Form.create<Props>({ name: 'LoginForm' })(LoginForm)
