import React from 'react';
import { Form, Radio } from 'semantic-ui-react';
import Cookies from 'universal-cookie';
import {withCookies} from 'react-cookie';


const cookies = new Cookies();

class Settings extends React.Component{
    constructor(props)
    {
      super(props);
      this.handleThemeChange = this.handleThemeChange.bind(this);
    }

    handleThemeChange(e, { value }) {
        cookies.set('theme', value, { path: '/' })
        //console.log(cookies.get('theme'));
        this.setState({value});
    }

    render() {
      return(
        <Form>
        <p>Selected Theme: {cookies.get('theme')}</p>
          <Form.Field>
            <Radio
            label='Default'
            name='radioGroup'
            value='default'
            checked={cookies.get('theme') === 'default'}
            onChange={this.handleThemeChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
            label ='Christmas'
            name='radioGroup'
            value='christmas'
            checked={cookies.get('theme') === 'christmas'}
            onChange={this.handleThemeChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
            label ='Halloween'
            name='radioGroup'
            value='halloween'
            checked={cookies.get('theme') === 'halloween'}
            onChange={this.handleThemeChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
            label ='Vikings'
            name='radioGroup'
            value='vikings'
            checked={cookies.get('theme') === 'vikings'}
            onChange={this.handleThemeChange}
            />
          </Form.Field>
        </Form>
      );}
}
export default withCookies(Settings);
