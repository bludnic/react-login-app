import React from 'react'
import { Select } from 'antd'

import i18n from '../i18n'
import { locales } from '../i18n'

const { Option } = Select

export default class LanguageSwitcher extends React.Component {
  onChange (locale: string) {
    i18n.changeLanguage(locale)
  }

  genOptions = () => locales.map(
    locale => <Option value={locale} key={locale}>{locale}</Option>
  )

  render () {
    return (
      <Select onChange={this.onChange} defaultValue={i18n.language}>
        {this.genOptions()}
      </Select>
    )
  }
}
